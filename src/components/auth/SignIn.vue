<script setup lang="ts">
import { ArrowCircleRightIcon, KeyIcon, XCircleIcon } from '@heroicons/vue/outline'
import { Form as VeeForm, configure, defineRule } from 'vee-validate'
import { email, required } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'

defineRule('required', required)
defineRule('email', email)

configure({
  generateMessage: localize('en', {
    messages: {
      required: '{field} es requerido',
      email: '{field} debe ser un correo electrónico válido',
    },
  }),
})

interface Form {
  email: string
  password: string
}

const showMovilSignIn = $ref(false)
const form: Form = $ref({
  email: '',
  password: '',
})
const showForgotPopUp = $ref(false)

const signInWithEmailAndPassword = (form: Form) => {
  // console.log(form)
}
</script>

<template>
  <section>
    <div id="signIn" class="flex-grid glass justify-center relative">
      <transition-group tag="span" name="slide-fade">
        <VeeForm v-if="!showForgotPopUp" class @submit="signInWithEmailAndPassword(form)">
          <AppFormField
            v-model="form.email"
            label="Email"
            name="email"
            type="email"
            rules="required|email"
          />
          <AppFormField
            v-model="form.password"
            label="Contraseña"
            name="password"
            type="password"
            rules="required"
          />

          <PrimaryBtn class="mt-4">
            <button id="loginBtn" type="submit" class="w-40 flex justify-center">
              Entrar
              <ArrowCircleRightIcon class="h-5 w-5 ml-4" />
            </button>
          </PrimaryBtn>
        </VeeForm>
        <forgot-password
          v-if="showForgotPopUp"
          key="forgot"
          @closePopUp="showForgotPopUp = $event"
        >
          <span class="absolute right-0 top-0 -mt-4 -mr-4">
            <PrimaryBtn
              color="redYellow"
              type="button"
              @click="showForgotPopUp = !showForgotPopUp"
            >
              <XCircleIcon class="h-6 w-6" />
            </PrimaryBtn>
          </span>
        </forgot-password>
      </transition-group>
      <div
        v-show="!showForgotPopUp"
        class="text-lg leading-5 my-4 text-center flex justify-center items-center"
      >
        <button
          class="font-medium text-secondary text-xs focus:outline-none underline transition ease-in-out duration-150 mt- uppercase"
          @click="showForgotPopUp = !showForgotPopUp"
        >
          ¿Has olvidado tu contraseña?
        </button>
        <KeyIcon class="h-5 w-5 ml-4 text-secondary" />
      </div>
    </div>
    <AuthProvider
      :show-movil-sign-in="showMovilSignIn"
      @toggleMovilSignIn="showMovilSignIn = !showMovilSignIn"
    />
  </section>
</template>
