<template>
  <h1>Category</h1>

  <v-container>
    <v-row class="my-3">
      <v-col cols="12" md="4" v-for="category in categories" :key="category.id">
        <v-sheet
          class="align-center justify-center py-6 flex-wrap text-center"
          color="blue-lighten-4"
          height="200"
          rounded="lg"
          width="90%"
          elevation="10"
        >
          <h2 class="mb-2 text-h5">{{ category.name }}</h2>
          <p class="mb-4 text-body-2">
            {{ category.description.substring(0, 100) }}
          </p>
          <v-btn
            color="orange"
            text="Read More"
            variant="text"
            @click="toNewsByCategory(category.id)"
          ></v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useCategoryStore } from '@/stores/CategoryStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)
const { onReadData } = categoryStore
const router = useRouter()

onMounted(() => {
  onReadData()
})

const toNewsByCategory = id => {
  router.push({ name: 'NewsByCategory', params: { id: id } })
}
</script>
