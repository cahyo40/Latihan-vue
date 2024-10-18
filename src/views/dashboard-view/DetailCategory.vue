<template>
  <h1>Detail Category</h1>
  <p>Name: {{ $route.params.name }}</p>
  <v-btn @click="BackCategory" class="my-5">Back</v-btn>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const BackCategory = () => {
  // router.push({ name: 'Category' })
  router.back()
}
</script>
