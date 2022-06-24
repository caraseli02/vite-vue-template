<script setup lang="ts">
// import { mapActions } from 'vuex'
import { ArrowCircleRightIcon } from '@heroicons/vue/outline'
import { Form as VeeForm, configure, defineRule } from 'vee-validate'
import { confirmed, email, min, required, url } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import { auth, db } from '~/helpers/firebase'

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

interface Form {
  name: string
  surname: string
  email: string
  password: string
}

const form = $ref<Form>({
  name: '',
  surname: '',
  email: '',
  password: '',
})
// let error = $ref(null)

// ...mapActions('auth', ['registerUserWithEmailAndPassword'])
function registerUserWithEmailAndPassword(form: Form): void {
  // console.log('registerUserWithEmailAndPassword', form)
}
</script>

<template>
  <div id="signUp" class="flex-grid justify-center glass relative">
    <VeeForm class="card card-form" @submit="registerUserWithEmailAndPassword(form)">
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
          <ArrowCircleRightIcon class="h-5 w-5 ml-4" />
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
