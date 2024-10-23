<template>
  <div class="d-flex justify-end my-6">
    <v-btn color="primary" icon="mdi-plus" size="large" @click="toCreate()">
    </v-btn>
  </div>
  <v-row justify="start">
    <v-col v-for="item in allNews" :key="item.id" cols="4">
      <v-card class="mx-auto" max-width="400">
        <v-img
          class="align-end text-white"
          height="200"
          :src="
            item.image
              ? item.image
              : 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
          "
          cover
        >
          <v-card-title>{{ item.title.substring(0, 20) }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pt-4">
          {{ item.category.name }}
        </v-card-subtitle>

        <v-card-text>
          <label>
            {{ item.description.substring(0, 200) }}
          </label>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="toDetail(item.id)" color="info" text="Detail"></v-btn>
          <v-btn
            @click="toUpdate(item.id)"
            color="warning"
            text="Update"
          ></v-btn>
          <v-btn
            @click="deleteNews(item.id)"
            color="error"
            text="Delete"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
import { onMounted } from 'vue'
import { useNewsStore } from '@/stores/NewsStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const newsStore = useNewsStore()
const { allNews, clearForm } = storeToRefs(newsStore)

onMounted(() => {
  console.log(allNews)
  newsStore.readNews()
})

const toDetail = id => {
  router.push({ name: 'DetailNews', params: { id: id } })
}
const toUpdate = id => {
  router.push({ name: 'UpdateNews', params: { id: id } })
}

const toCreate = () => {
  router.push({ name: 'CreateNews' })
  clearForm()
}

const deleteNews = id => {
  newsStore.deleteNews(id)
}
</script>
