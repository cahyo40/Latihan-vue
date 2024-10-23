import { defineStore, storeToRefs } from 'pinia'
import { db } from '@/config/firebase'
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'




export const useNewsStore = defineStore('news', () => {
    const newsCollection = collection(db, 'news');
    const authStore = useAuthStore()
    const { currentUser } = storeToRefs(authStore)
    const router = useRouter()


    const form = reactive({
        title: '',
        description: '',
        category: '',
        isUpdate: false,
        id: '',
    })

    const formInput = ref(false)
    const allNews = ref(null)
    const detailNews = ref(null)


    const createOrUpdateNews = async () => {
        if (form.isUpdate == false) {
            // create
            await addDoc(newsCollection, {
                title: form.title,
                description: form.description,
                category: {
                    id: form.category.id,
                    name: form.category.name,
                },
                isApproved: false,
                author: {
                    uid: currentUser.value.uid,
                    username: currentUser.value.username,
                    email: currentUser.value.email,
                },
                image: null,
                createdAt: Date.now()
            })
            alert('News created successfully')
        } else {
            await updateDoc(doc(newsCollection, form.id), {
                title: form.title,
                description: form.description,
                category: {
                    id: form.category.id,
                    name: form.category.name,
                },
            })
            alert('News updated successfully')
        }

        clearForm()
        router.back()
    }

    const readNews = async () => {
        const docs = await getDocs(newsCollection)

        allNews.value = docs.docs.map((news) => {

            return { ...news.data(), id: news.id }
        })
    }

    const readNewsByCategory = async (idCategory) => {
        const q = query(collection(db, 'news'), where('category.id', '==', idCategory));

        const docs = await getDocs(q)
        allNews.value = docs.docs.map((news) => {
            return { ...news.data(), id: news.id }
        })
    }

    const getDetailNews = async (id) => {
        const docRef = doc(newsCollection, id)
        const docs = await getDoc(docRef);
        detailNews.value = docs.data()
    }

    const deleteNews = async (id) => {
        await deleteDoc(doc(newsCollection, id));
        alert('News deleted successfully')
        readNews()
    }

    const clearForm = () => {
        form.title = ''
        form.description = ''
        form.category = ''
        form.isUpdate = false
        form.id = ''
    }

    const setUpdate = async (id) => {
        const docRef = doc(newsCollection, id)
        const docs = await getDoc(docRef)
        form.id = docs.id
        form.isUpdate = true
        form.title = docs.data().title
        form.description = docs.data().description
        form.category = docs.data().category
        console.log(form.id)

    }

    return {
        createOrUpdateNews,
        readNews,
        readNewsByCategory,
        deleteNews,
        getDetailNews,
        setUpdate,
        clearForm,
        form,
        formInput,
        allNews,
        detailNews,
    }

})