<template>
  <div>
    <div class="mt-8">
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        rounded="lg"
        max-width="85%"
      >
        <v-form v-model="formInput" @submit.prevent="createOrUpdateNews">
          <v-alert
            v-if="isError"
            type="error"
            :title="`Error`"
            :text="message"
            variant="tonal"
          />

          <div class="text-subtitle-1 text-medium-emphasis">Title</div>

          <v-text-field
            class="my-5"
            density="compact"
            placeholder="Title"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
            :rules="titleRules"
            v-model="form.title"
          ></v-text-field>

          <div class="text-subtitle-1 text-medium-emphasis">Content</div>

          <v-textarea
            density="compact"
            class="my-5"
            label="Content "
            :rules="contentRules"
            v-model="form.description"
          >
          </v-textarea>

          <div v-if="categories">
            <v-select
              class="my-5"
              :rules="categoryRules"
              :items="categories"
              item-title="name"
              item-value="id"
              label="Category"
              return-object
              variant="outlined"
              v-model="form.category"
            >
            </v-select>
          </div>

          <v-btn
            :disabled="!formInput"
            class="mb-8"
            color="blue"
            size="large"
            variant="tonal"
            block
            type="submit"
          >
            Submit
          </v-btn>
        </v-form>
      </v-card>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import { storeToRefs } from 'pinia'
import { useNewsStore } from '@/stores/NewsStore'

const newsStore = useNewsStore()
const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)
const { onReadData } = categoryStore

const { form, formInput } = storeToRefs(newsStore)
const { createOrUpdateNews } = newsStore

onMounted(() => {
  onReadData()
})

defineProps({
  isUpdate: {
    type: Boolean,
    default: false,
  },
})

const titleRules = [v => !!v || 'Title is required']

const contentRules = [v => !!v || 'Content is required']
const categoryRules = [v => !!v || 'Category is required']
</script>
