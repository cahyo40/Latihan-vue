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

      <v-card-actions>
        <v-btn color="orange" @click="back()" text="Back"></v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useNewsStore } from '@/stores/NewsStore'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

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
</script>
