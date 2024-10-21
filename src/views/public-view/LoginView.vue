<template>
  <div>
    <FormAuthComponent :isLogin="isLogin" />
  </div>
</template>

<script setup>
import FormAuthComponent from '@/components/public-components/FormAuthComponent.vue'

const isLogin = true
</script>
