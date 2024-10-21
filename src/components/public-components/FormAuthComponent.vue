<template>
  <div>
    <div class="mx-auto my-6 text-center text-h3 text-primary">
      {{ isLogin ? 'Login' : 'Register' }}
    </div>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <v-form v-model="formInput" @submit.prevent="authUser(isLogin)">
        <v-alert
          v-if="isError"
          type="error"
          :title="`Error`"
          :text="message"
          variant="tonal"
        />
        <div v-if="!isLogin">
          <div class="text-subtitle-1 text-medium-emphasis">Username</div>

          <v-text-field
            density="compact"
            placeholder="Username"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
            :rules="usernameRules"
            v-model="user.username"
          ></v-text-field>
        </div>

        <div class="text-subtitle-1 text-medium-emphasis">Email</div>

        <v-text-field
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          :rules="emailRules"
          v-model="user.email"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Password
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          :rules="[passwordRules.required, passwordRules.min]"
          v-model="user.password"
        ></v-text-field>

        <v-btn
          :disabled="!formInput"
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
          type="submit"
        >
          {{ isLogin ? 'Login' : 'Register' }}
        </v-btn>

        <div v-if="isLogin">
          <v-card-text class="text-center">
            <router-link
              class="text-blue text-decoration-none"
              :to="{ name: 'Register' }"
              rel="noopener noreferrer"
            >
              Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
            </router-link>
          </v-card-text>
        </div>
        <div v-if="!isLogin">
          <v-card-text class="text-center">
            <router-link
              class="text-blue text-decoration-none"
              :to="{ name: 'Login' }"
              rel="noopener noreferrer"
            >
              Login now <v-icon icon="mdi-chevron-right"></v-icon>
            </router-link>
          </v-card-text>
        </div>
      </v-form>
    </v-card>
  </div>
</template>
<script setup>
import { defineProps, ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { formInput, user, isError, message } = storeToRefs(authStore)

const { authUser } = authStore

const visible = ref(false)

defineProps({
  isLogin: {
    type: Boolean,
    default: false,
  },
})

const emailRules = [
  v => !!v || 'Email is required',
  v =>
    !!v ||
    /^\w+([._]?\w+)*@\w+([-.]\w+)*\.\w{2,3}$/.test(v) ||
    'E-mail must be valid',
]

const usernameRules = [
  v => !!v || 'Username is required',
  v => (v && v.length <= 10) || 'Username must be less than 10 characters',
]

const passwordRules = {
  required: v => !!v || 'Password is required',
  min: v => (v && v.length >= 8) || 'Password must be at least 8 characters',
}
</script>
