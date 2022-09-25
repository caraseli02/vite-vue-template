<script setup lang="ts">
// import { mapActions } from 'vuex'
import { ArrowCircleRightIcon } from '@heroicons/vue/outline'
import { Form as VeeForm, configure, defineRule } from 'vee-validate'
import { confirmed, email, min, required, url } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
// PINIA
import { useAuthStore } from '~/stores/AuthStore'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('url', url)
defineRule('confirmed', confirmed)

configure({
  generateMessage: localize('en', {
    messages: {
      required: '{field} es requerido',
      email: '{field} debe ser un correo electrónico válido',
      min: '{field} debe tener un mínimo de 0:{min} caracteres',
      unique: '{field} ya está elegido',
      url: '{field} debe ser una URL válida',
      confirmed: '{field} debe ser igual a la contraseña',
    },
  }),
})

const form = $ref({
  name: '',
  surname: '',
  email: '',
  password: '',
})

// PINIA Stores
const authStore = useAuthStore()

function createUserWithEmailAndPassword(): void {
  authStore.createUserWithEmailAndPassword(form)
}
</script>

<template>
  <div id="signUp" class="flex-grid justify-center glass relative">
    <VeeForm @submit="createUserWithEmailAndPassword()">
      <AppFormField
        v-model="form.email"
        name="email"
        label="Email"
        rules="required|email"
        type="email"
      />
      <AppFormField
        v-model="form.password"
        name="password"
        label="Contraseña"
        rules="required|min:6"
        type="password"
      />
      <AppFormField v-model="form.name" name="name" label="Nombre" rules="required" />
      <AppFormField
        v-model="form.surname"
        name="surname"
        label="Apellidos"
        rules="required"
      />
      <!-- <div class="mt-4">
        <label for="avatar">
          Avatar
          <div v-if="avatarPreview">
            <img :src="avatarPreview" class="avatar-xlarge" />
          </div>
        </label>
        <VeeField
          v-show="!avatarPreview"
          id="avatar"
          name="avatar"
          type="file"
          class
          accept="image/*"
          @change="handleImageUpload"
        />
      </div> -->
      <PrimaryBtn class="mt-4">
        <button id="makeCreate" type="submit" class="w-40 flex justify-center">
          Register
          <svg v-if="authStore.loading" class="animate-spin ml-4 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
          <ArrowCircleRightIcon v-else class="h-5 w-5 ml-4" />
        </button>
      </PrimaryBtn>
    </VeeForm>
    <!-- <div class="text-center">
      <button @click="registerWithGoogle" class="mt-4 text-secondary">
        <i class="fa fa-google fa-btn"></i>Sign up with Google
      </button>
    </div> -->
  </div>
</template>
