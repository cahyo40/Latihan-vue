<template>
  <div v-if="allNews.length > 0">
    <div class="my-3">
      <h1>News By Category {{ allNews[0].category.name }}</h1>
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
  </div>
  <div v-else>
    <h2>Tidak ada Berita di Kategori ini</h2>
  </div>
</template>
<script setup>
import { useNewsStore } from '@/stores/NewsStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const newsStore = useNewsStore()
const { readNewsByCategory } = newsStore
const { allNews } = storeToRefs(newsStore)

onMounted(() => {
  readNewsByCategory(route.params.id)
})

const toDetail = id => {
  router.push({ name: 'DetailNewsPublic', params: { id: id } })
}
</script>
