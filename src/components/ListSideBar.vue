<template>
  <v-list>
    <v-list-subheader class="pa-5 text-uppercase text-h8">{{
      username
    }}</v-list-subheader>
    <v-list-item
      v-for="(item, index) in items"
      :key="index"
      :title="item.title"
      :icon="item.icon"
      :to="{ name: `${item.pathName}` }"
    >
      <template v-slot:prepend>
        <v-icon :icon="item.icon"></v-icon>
      </template>
      <v-list-item-title>{{ item.text }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>
<script setup>
import { inject } from 'vue'

// get data from provide username at App.Vue
const username = inject('username')

defineProps({
  items: {
    type: Object,
    required: true,
  },
})
</script>
