<template>
  <div class="my-3">
    <h1>Latest News</h1>
  </div>
  <v-divider class="border-opacity-100" color="primary" />
  <v-row class="my-3">
    <v-col cols="12" v-for="news in allNews" :key="news.id">
      <v-card class="mx-auto" max-width="500">
        <v-img
          class="align-end text-white"
          height="400"
          :src="
            news.image
              ? news.image
              : 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
          "
          cover
        >
          <v-card-title>{{ news.title }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pt-4">
          {{ news.category.name }}
        </v-card-subtitle>

        <v-card-text>
          <p>{{ news.description.substring(0, 200) }}</p>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="orange"
            text="Read More"
            @click="toDetail(news.id)"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
import { useNewsStore } from '@/stores/NewsStore'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const newsStore = useNewsStore()

const { allNews } = storeToRefs(newsStore)
const { readNews } = newsStore

const router = useRouter()
const toDetail = id => {
  router.push({ name: 'DetailNewsPublic', params: { id: id } })
}

onMounted(() => {
  readNews()
})
</script>
