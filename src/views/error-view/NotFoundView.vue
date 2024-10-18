<template>
  <div class="d-flex justify-center">
    <div>
      <img :src="NotFoundImage" alt="404" style="width: 40vw" />

      <div class="my-10">
        <h1 class="text-center">404 - Page Not Found</h1>
      </div>
      <div class="d-flex justify-center my-10">
        <v-btn :to="{ name: 'LandingPage' }" color="primary" block
          >Back to Home</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import NotFoundImage from '../../assets/404.svg'
</script>
