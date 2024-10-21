<template>
  <div v-if="!currentUser">
    <h1>Loading...</h1>
  </div>
  <div v-else>
    <h1>{{ currentUser.username }}</h1>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)
</script>
