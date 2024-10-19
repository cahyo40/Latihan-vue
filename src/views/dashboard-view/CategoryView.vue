<template>
  <h1>Category</h1>
  <div class="d-flex justify-end my-6">
    <v-btn @click="addCategory()" color="primary" icon="mdi-plus"></v-btn>
  </div>
  <DialogComponent v-model="dialog">
    <template #title>{{
      form.isUpdate ? 'Update Category' : 'Add Category'
    }}</template>
    <template #content>
      <form @submit.prevent="onSubmitData">
        <v-text-field
          label="Name Category"
          v-model="form.name"
          class="mb-3"
          :rules="nameRules"
        ></v-text-field>
        <v-textarea
          label="Description"
          v-model="form.description"
          class="mb-3"
          :rules="descriptionRules"
        ></v-textarea>
        <v-btn
          :disabled="!isFormValid"
          color="primary"
          block
          size="large"
          type="submit"
          variant="elevated"
          >{{ form.isUpdate ? 'Update' : 'Add' }}</v-btn
        >
      </form>
    </template>
  </DialogComponent>

  <DialogComponent v-model="detailDialog">
    <template #title>{{ form.name }}</template>
    <template #content>
      <p>{{ form.description }}</p>
    </template>
  </DialogComponent>

  <DialogComponent v-model="deleteDialog">
    <template #title>Delete Category {{ form.name }}</template>
    <template #content>
      <p>Are you sure want to delete this category?</p>
      <v-row class="d-flex justify-end mt-5">
        <v-col>
          <v-btn color="primary" @click="deleteDialog = false" block
            >Cancel</v-btn
          >
        </v-col>
        <v-col>
          <v-btn color="error" block @click="deleteData(form.id)">Delete</v-btn>
        </v-col>
      </v-row>
    </template>
  </DialogComponent>

  <v-table hover>
    <thead>
      <tr>
        <th class="text-left">No.</th>
        <th class="text-left">Name</th>
        <th class="text-center">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in categories" :key="item.id">
        <td>{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td class="text-center">
          <v-btn
            size="x-small"
            icon="mdi-information"
            color="info"
            @click="onReadDetailData(item)"
          ></v-btn>
          <v-btn
            size="x-small"
            icon="mdi-pencil"
            color="warning"
            class="mx-3"
            @click="onUpdateData(item)"
          ></v-btn>
          <v-btn
            size="x-small"
            icon="mdi-delete"
            color="error"
            @click="onDeleteData(item)"
          ></v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import DialogComponent from '../../components/dashboard/DialogComponent.vue'
import { onMounted } from 'vue'
import { useCategoryStore } from '../../stores/CategoryStore'
import { storeToRefs } from 'pinia'

// store
const categoryStore = useCategoryStore()
// state
const { dialog, form, isFormValid, categories, detailDialog, deleteDialog } =
  storeToRefs(categoryStore)
// action
const {
  onSubmitData,
  onReadData,
  onReadDetailData,
  addCategory,
  onUpdateData,
  onDeleteData,
  deleteData,
} = categoryStore

onMounted(() => {
  onReadData()
})

// validation rules

const nameRules = [
  value => {
    if (value) return true
    return 'name is required'
  },
]

const descriptionRules = [
  value => {
    if (value) return true
    return 'description is required'
  },
]
</script>
