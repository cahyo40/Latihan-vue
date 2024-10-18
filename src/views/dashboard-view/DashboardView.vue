<template>
  <main>
    <h1>Dashboard</h1>
    <h3>Jumlah User : {{ users.countUser }}</h3>
    <p v-for="user in users.userData" :key="user.email">
      {{ user.name }} ({{ user.email }})
    </p>
    <hr />
    <form @submit.prevent="submitForm">
      <label for="name">Name</label>
      <br />
      <input type="text" v-model="users.userInput.name" />
      <br /><br />
      <label for="email">Email</label>
      <br />
      <input type="text" v-model="users.userInput.email" />
      <br /><br />
      <input type="submit" value="Add" />
    </form>
  </main>
</template>

<script setup>
import { useUserStorage } from '../../stores/UserStorage'

const users = useUserStorage()

const submitForm = () => {
  users.addUser()
}
</script>
<style scoped>
input {
  margin-bottom: 10px;
  border: 1px solid #000;
}
input[type='submit'] {
  border: 1px solid #000;
  padding: 10px;
  cursor: pointer;
}
</style>
