<template>
  <v-app-bar color="indigo" prominent>
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="$emit('openClose')"
    ></v-app-bar-nav-icon>

    <v-toolbar-title>Admin News</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon="mdi-logout" variant="text" @click="logoutUser"></v-btn>
  </v-app-bar>
</template>
<script setup>
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
const { logoutUser } = authStore

defineEmits(['openClose'])
</script>
