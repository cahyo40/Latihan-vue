<template>
  <v-alert
    title="Alert title"
    :type="typeValue"
    variant="tonal"
    closable
    close-label="Close Alert"
  >
    <slot></slot>
    <slot name="footer"></slot>
  </v-alert>
</template>
<script setup>
defineProps({
  typeValue: {
    type: String,
    required: true,
  },
})
</script>
