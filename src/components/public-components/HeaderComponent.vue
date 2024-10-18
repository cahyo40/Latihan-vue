<template>
  <v-toolbar app class="bg-indigo">
    <RouterLink :to="{ name: 'LandingPage' }" class="pl-10 text-h6">
      <span>YooNews</span>
    </RouterLink>
    <v-spacer> </v-spacer>
    <v-toolbar-items>
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
  </v-toolbar>
</template>

<script setup>
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
