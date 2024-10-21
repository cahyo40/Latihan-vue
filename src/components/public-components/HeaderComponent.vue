<template>
  <v-toolbar app class="bg-indigo">
    <RouterLink :to="{ name: 'LandingPage' }" class="pl-10 text-h6">
      <span>YooNews</span>
    </RouterLink>
    <v-spacer> </v-spacer>
    <v-toolbar-items v-if="!currentUser">
      <v-btn
        flat
        v-for="item in menuItems"
        :key="item.title"
        :to="{ name: item.pathName }"
      >
        <v-icon class="mr-1" left>{{ item.icon }}</v-icon>
        <span> {{ item.title }}</span>
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-else>
      <v-btn
        flat
        v-for="item in menuAdmin"
        :key="item.title"
        :to="{ name: item.pathName }"
      >
        <v-icon class="mr-1" left>{{ item.icon }}</v-icon>
        <span> {{ item.title }}</span>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script setup>
import { inject } from 'vue'

const currentUser = inject('currentUser')

const menuItems = [
  {
    title: 'Category',
    icon: 'mdi-newspaper',
    pathName: 'Categorypublic',
  },
  {
    title: 'Login',
    icon: 'mdi-login',
    pathName: 'Login',
  },
  {
    title: 'Register',
    icon: 'mdi-account-plus',
    pathName: 'Register',
  },
]

const menuAdmin = [
  {
    title: 'Category',
    icon: 'mdi-newspaper',
    pathName: 'Categorypublic',
  },
  {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard',
    pathName: 'Dashboard',
  },
]
</script>

<style scoped>
.v-toolbar-items {
  margin-left: 10px;
}
a {
  text-decoration: none;
  cursor: pointer;
  color: white;
}
</style>
