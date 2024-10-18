<template>
  <h1>Category</h1>
  <v-list>
    <v-list-item :to="{ name: 'Categoryname', params: { name: 'Politik' } }"
      >Politik</v-list-item
    >
    <v-list-item :to="{ name: 'Categoryname', params: { name: 'Olahraga' } }"
      >Olahraga</v-list-item
    >
    <v-list-item :to="{ name: 'Categoryname', params: { name: 'Teknologi' } }"
      >Teknologi</v-list-item
    >
  </v-list>
</template>

<script setup></script>
