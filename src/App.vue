<template>
  <RouterView />
</template>
<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { storeToRefs } from 'pinia'
import { provide } from 'vue'

const authStore = useAuthStore()
const { sessionUser } = authStore

const { currentUser } = storeToRefs(authStore)

provide('currentUser', currentUser)

onMounted(() => {
  sessionUser()
})
</script>
