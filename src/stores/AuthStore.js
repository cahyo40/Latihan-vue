import { defineStore } from 'pinia'
import { auth, db } from '@/config/firebase'
import { ref, reactive } from 'vue'
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'


export const useAuthStore = defineStore('Auth', () => {
    // const userCollection = collection(db, 'users');
    const router = useRouter();

    const formInput = ref(false);
    const isError = ref(false)
    const message = ref(null)
    const user = reactive({
        username: '',
        email: '',
        password: '',
    })
    const currentUser = ref(null);



    const authUser = async (isLogin = false) => {
        try {
            isError.value = false;
            message.value = null;
            if (isLogin) {
                await signInWithEmailAndPassword(auth, user.email, user.password)
            } else {
                await createUserWithEmailAndPassword(auth, user.email, user.password).then(async (value) => {
                    await setDoc(doc(db, 'users', value.user.uid), {
                        username: user.username,
                        isAdmin: false,
                    })

                })
                alert("Berhasil Registrasi");
            }
            user.email = '';
            user.password = '';
            user.username = '';
            if (!isError.value) {

                router.push({ name: 'Dashboard' });
            }
        } catch (error) {
            isError.value = true;
            message.value = error.message;
            console.log(error);
        }
    }




    const logoutUser = async () => {
        await signOut(auth).then(() => {
            currentUser.value = null;
            router.push({ name: 'LandingPage' });
        })
    }

    const sessionUser = () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const data = await getDoc(doc(db, 'users', user.uid));

                currentUser.value = {};
                currentUser.value.uid = user.uid;
                currentUser.value.email = user.email;
                currentUser.value.isAdmin = data.data().isAdmin;
                currentUser.value.username = data.data().username;

            } else {
                currentUser.value = null;
            }
        });
    }







    return {
        formInput, user, currentUser, isError, message,
        authUser,
        sessionUser,
        logoutUser,
    }
})
