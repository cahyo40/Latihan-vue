<template>
  <h1>Profile</h1>
  <p v-for="user in users.userData" :key="user.email">
    {{ user.name }} - {{ user.email }}
  </p>

  <v-divider></v-divider>
  <IconLink icon="mdi-youtube" color="red" href="https://www.youtube.com" />
  <IconLink icon="mdi-linkedin" color="blue" href="https://www.linkedin.com" />
  <IconLink
    icon="mdi-instagram"
    color="purple"
    href="https://www.instagram.com"
  />
  <IconLink
    icon="mdi-github"
    color="black"
    href="https://www.github.com/cahyo40"
  />
</template>

<script setup>
import IconLink from '../../components/IconLink.vue'
import { useUserStorage } from '../../stores/UserStorage'

const users = useUserStorage()
</script>
