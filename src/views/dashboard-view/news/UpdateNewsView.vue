<template>
  <v-row class="mt-4">
    <v-btn
      @click="back()"
      class="mr-4"
      icon="mdi-arrow-left"
      color="primary"
    ></v-btn>
    <h1>Update News</h1>
  </v-row>

  <FormInputNews :isUpdate="true" />
</template>

<script setup>
import FormInputNews from '@/components/news/FormInputNews.vue'
import { useNewsStore } from '@/stores/NewsStore'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const newsStore = useNewsStore()
const route = useRoute()
const router = useRouter()

const { form } = storeToRefs(newsStore)

onMounted(() => {
  console.log(form.id)
  newsStore.setUpdate(route.params.id)
})

const back = () => {
  router.back()
}
</script>
