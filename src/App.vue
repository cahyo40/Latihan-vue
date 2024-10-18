<template>
  <RouterView />
</template>
<script setup>
import { RouterView } from 'vue-router'
import { provide } from 'vue'

provide('username', 'Mdcnugroho')
</script>
