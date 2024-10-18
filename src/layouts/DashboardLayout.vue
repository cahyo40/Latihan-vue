<template>
  <v-layout>
    <!-- SIDEBAR -->
    <SideBar v-model="drawer" />

    <!-- HEADER -->
    <NavBar @openClose="drawerOpenClose" />

    <!-- MAIN CONTENT -->
    <v-main style="height: 500px" container>
      <v-card-text>
        <RouterView />
      </v-card-text>
    </v-main>
  </v-layout>
</template>
<script setup>
import { RouterView } from 'vue-router'
import { ref, provide } from 'vue'
import SideBar from '../components/SideBar.vue'
import NavBar from '../components/NavBar.vue'

const drawer = ref(false)

provide('username', 'Mdcnugroho')

const drawerOpenClose = () => {
  drawer.value = !drawer.value
}
</script>
