<template>
  <v-btn
    class="ma-2"
    :color="color"
    :icon="icon"
    :href="href"
    target="_blank"
  ></v-btn>
</template>
<script setup>
import { defineProps } from 'vue'

defineProps({
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
})
</script>
