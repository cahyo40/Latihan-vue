import { reactive, ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStorage = defineStore('UserStorage', () => {
    const userData = ref([
        {
            name: 'mdcnugroho',
            email: 'mdcnugroho@gmail.com',
        },
        {
            name: 'admin',
            email: 'admin@gmail.com',
        },
    ]);

    const userInput = reactive({
        name: '',
        email: '',
    });

    function addUser() {
        if (userInput.name === '' || userInput.email === '') {
            alert('Please fill in the form')
            return
        }
        userData.value.push({
            name: userInput.name,
            email: userInput.email,
        })
        clearInput()
    }

    const clearInput = () => {
        userInput.name = ''
        userInput.email = ''
    }

    const countUser = computed(() => {
        return userData.value.length;
    });

    return { userData, userInput, addUser, clearInput, countUser }
})
