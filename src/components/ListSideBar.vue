<template>
  <v-list>
    <v-list-subheader class="pa-5 text-uppercase text-h8" />
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
// get data from provide username at App.Vue

defineProps({
  items: {
    type: Object,
    required: true,
  },
})
</script>
