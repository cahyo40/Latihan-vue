import { defineStore } from 'pinia'
import { db } from '../config/firebase'
import { ref, reactive, computed } from 'vue'
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'

export const useCategoryStore = defineStore('category', () => {
    const categoryCollection = collection(db, 'categories');

    const categories = ref([]);

    const dialog = ref(false)
    const detailDialog = ref(false)
    const deleteDialog = ref(false)
    const form = reactive({
        id: '',
        name: '',
        description: '',
        isUpdate: false,
    })

    const isFormValid = computed(() => {
        return form.name.trim() !== '' && form.description.trim() !== ''
    })

    const clearForm = () => {
        form.id = ''
        form.name = ''
        form.description = ''
    }

    const addCategory = () => {
        clearForm()
        form.isUpdate = false
        dialog.value = true
    }

    const onSubmitData = async () => {
        if (!isFormValid.value) return alert('Form not valid')

        if (form.isUpdate) {
            await updateDoc(doc(categoryCollection, form.id), {
                name: form.name,
                description: form.description,
            })
        } else {
            await addDoc(categoryCollection, {
                name: form.name, description: form.description,
            })
        }

        dialog.value = false;
        clearForm()
        onReadData()

    }

    const onReadData = async () => {

        const docs = await getDocs(categoryCollection)
        categories.value = docs.docs.map((category) => {
            return { ...category.data(), id: category.id }
        })
        console.log(docs)
    }

    const onReadDetailData = (category) => {
        form.name = category.name
        form.description = category.description
        form.id = category.id
        detailDialog.value = true
    }

    const onUpdateData = async (category) => {
        form.isUpdate = true,
            form.name = category.name;
        form.description = category.description;
        form.id = category.id;
        dialog.value = true;
    }
    const deleteData = async (id) => {
        await deleteDoc(doc(categoryCollection, id))
        onReadData()
        deleteDialog.value = false
        clearForm()
    }


    const getIdData = (category) => {
        form.id = category.id
        form.name = category.name
        form.description = category.description
    }

    const onDeleteData = (category) => {
        deleteDialog.value = true
        getIdData(category)
    }


    return {
        dialog,
        form,
        isFormValid,
        onSubmitData,
        onReadData,
        categories,
        onReadDetailData,
        onUpdateData,
        detailDialog,
        addCategory,
        deleteDialog,
        deleteData,
        onDeleteData,
    }
})