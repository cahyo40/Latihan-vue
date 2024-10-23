<template>
  <div v-if="detailNews">
    <v-card class="mx-auto" max-width="100%">
      <v-img
        class="align-end text-white"
        height="200"
        :src="
          detailNews.image
            ? detailNews.image
            : `https://cdn.vuetifyjs.com/images/cards/docks.jpg`
        "
        cover
      >
        <v-card-title>{{ detailNews['title'] }}</v-card-title>
      </v-img>

      <v-card-subtitle class="pt-4">
        {{ detailNews.category.name }}
      </v-card-subtitle>

      <v-card-text>
        <div>
          {{ detailNews.description }}
        </div>
        <div class="text-primary mt-3">
          {{ detailNews.author.username }}
        </div>
        <div class="mt-2">
          {{ new Date(detailNews.createdAt).toLocaleDateString() }}
        </div>
      </v-card-text>

      <v-card-text>
        <v-form
          style="max-width: 300px"
          @submit.prevent="uploadImage(detailNews)"
          v-model="formUpload"
        >
          <p class="text-error mb-1">{{ fileError }}</p>
          <v-file-input
            label="Upload Image"
            variant="filled"
            prepend-icon="mdi-image"
            @change="handlingChange"
          >
          </v-file-input>
          <v-btn
            type="Submit"
            :disabled="fileError || !formUpload"
            block
            class="my-2"
            color="primary"
            variant="tonal"
            size="large"
          >
            Upload file
          </v-btn>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange" @click="back()" text="Back"></v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useNewsStore } from '@/stores/NewsStore'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { storage, db } from '@/config/firebase'
import {
  ref as refFile,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'

const file = ref(null)
const fileError = ref(null)
const filePath = ref(null)
const fileUrl = ref(null)
const formUpload = ref(false)

const typeFile = ['image/jpeg', 'image/png', 'image/jpg']

const route = useRoute()
const router = useRouter()
const newsStore = useNewsStore()
const { detailNews } = storeToRefs(newsStore)
onMounted(() => {
  newsStore.getDetailNews(route.params.id)
  console.log(detailNews)
})

const back = () => {
  router.back()
}
const handlingChange = e => {
  const selected = e.target.files[0]
  console.log(typeFile.includes(selected.type))
  console.log(selected.type)

  if (selected && typeFile.includes(selected.type)) {
    file.value = selected
    formUpload.value = true
    fileError.value = null
  } else {
    file.value = null
    fileError.value = 'Please select an image file (png, jpeg, jpg)'
  }
}

const uploadImage = async news => {
  if (!file.value) return
  filePath.value = `thumbnail/${news.author.uid}/${Date.now()}-${file.value.name}`
  const storageRef = refFile(storage, filePath.value)

  try {
    // Upload the file
    const uploadTask = await uploadBytesResumable(storageRef, file.value)

    // Get the download URL after the upload is complete
    const url = await getDownloadURL(uploadTask.ref)
    fileUrl.value = url

    // Update the document in Firestore
    await updateDoc(doc(db, 'news', route.params.id), {
      image: fileUrl.value,
    })

    router.back()
  } catch (error) {
    console.error('Error uploading image:', error)
  }
}
</script>
