<template>
  <v-app>
    <!-- header section -->
    <HeaderComponent />
    <!-- main content -->
    <v-container style="min-height: 100vh" class="my-10">
      <RouterView />
    </v-container>
    <!-- footer section -->
    <FooterComponent />
  </v-app>
</template>
<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from '../components/public-components/HeaderComponent.vue'
import FooterComponent from '../components/public-components/FooterComponent.vue'
</script>
