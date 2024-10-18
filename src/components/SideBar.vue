<template>
  <v-navigation-drawer
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'left' : undefined"
    color="indigo-lighten-4"
  >
    <ListSideBar :items="items" />
  </v-navigation-drawer>
</template>
<script setup>
import ListSideBar from './ListSideBar.vue'
import { ref } from 'vue'

const drawer = ref(true)

const items = [
  { text: 'Dashboard', icon: 'mdi-view-dashboard', pathName: 'Dashboard' },
  { text: 'Category', icon: 'mdi-view-list', pathName: 'Category' },
  { text: 'News', icon: 'mdi-newspaper-variant-outline', pathName: 'News' },
  { text: 'Profile', icon: 'mdi-account-outline', pathName: 'User' },
]
</script>
