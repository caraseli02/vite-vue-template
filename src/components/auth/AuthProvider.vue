<script setup lang="ts">
import { computed } from 'vue'
import { PhoneIcon, XCircleIcon } from '@heroicons/vue/outline'
import type { AuthProvider } from 'firebase/auth'
import { GoogleAuthProvider, OAuthProvider } from 'firebase/auth'
import { useRouter } from 'vue-router'
import type { Provider } from '~/types/auth'
import { useAuthStore } from '~/stores/AuthStore'

interface LoginProvider {
  name: Provider
  color: string
  icon: string
  provider: AuthProvider
  datacy: string
}

defineProps({
  showMovilSignIn: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['toggleMovilSignIn'])
const { loginWithFirebase } = useAuthStore()
const router = useRouter()

const phoneNumber = $ref('')
// const store = useStore()

const phoneNumberIsInvalid = computed(() => {
  // check if phone number is valid and has 9 digits and only numbers
  return !phoneNumber || phoneNumber.length !== 9 || !/^\d+$/.test(phoneNumber)
})

const loginProviderList: LoginProvider[] = [
  {
    name: 'Google',
    provider: new GoogleAuthProvider(),
    color: 'redYellow',
    datacy: 'google-sign-in',
    icon: '',
  },
  {
    name: 'Yahoo',
    provider: new OAuthProvider('yahoo.com'),
    color: 'greenBlue',
    datacy: 'yahoo-sign-in',
    icon: '',
  },
]

const signInWithMovil = () => {
  // store.dispatch('auth/signInWithMovil', {
  //   phoneNumber: phoneNumber.value
  // })
}

const events = {
  async onClickLogin(provider: AuthProvider, name: Provider) {
    await loginWithFirebase(provider, name)
    localStorage.setItem('provider', name)
    await router.push('/')
  },
}
</script>

<template>
  <div class="glass flex flex-col justify-center items-center mt-4">
    <TransitionGroup name="slide-fade">
      <div
        v-show="!showMovilSignIn"
        :key="1"
        class="flex flex-col justify-center items-center"
      >
        <PrimaryBtn v-for="(provider, index) in loginProviderList" :key="index" class="mb-4" :color="provider.color" @click="events.onClickLogin(provider.provider, provider.name)">
          <span
            class="relative flex justify-around w-64 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            Entrar con {{ provider.name }} Mail
          </span>
        </PrimaryBtn>
        <PrimaryBtn
          data-cy="movil-sign-in"
          color="purpleBlue"
          @click="emit('toggleMovilSignIn')"
        >
          <span
            class="relative flex justify-around w-64 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 items-center"
          >
            <PhoneIcon class="h-5 w-5" />
            Entrar con Movil
          </span>
        </PrimaryBtn>
      </div>
      <form v-show="showMovilSignIn" :key="2" class="w-full">
        <label
          for="email-adress-icon"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Introduce los 9 dígitos:</label>
        <div class="relative">
          <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
          >
            <PhoneIcon
              class="h-5 w-5 mr-2"
              :class="phoneNumberIsInvalid ? 'text-red-500' : 'text-green-500'"
            />
          </div>
          <input
            id="email-adress-icon"
            v-model="phoneNumber"
            data-cy="phone-input"
            type="tel"
            :class="
              phoneNumberIsInvalid
                ? 'bg-red-300'
                : 'bg-gray-50 dark:bg-gray-700'
            "
            class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tu teléfono"
            pattern="[0-9]{9}"
          >
        </div>
        <div class="flex justify-between">
          <PrimaryBtn
            :disabled="phoneNumberIsInvalid"
            class="mt-4"
            :class="[{ 'cursor-not-allowed': phoneNumberIsInvalid }]"
            @click.prevent="signInWithMovil()"
          >
            Enviar
          </PrimaryBtn>
          <XCircleIcon
            id="close-movil-sign-in"
            class="mt-4 w-10 h-10 text-red-500 cursor-pointer opacity-75 hover:opacity-100 hover:rotate-12 transition-all close-movil-sign-in"
            @click="$emit('toggleMovilSignIn')"
          >
            Cerrar
          </XCircleIcon>
        </div>
        <div id="recaptcha-container" class="mt-4" />
      </form>
    </TransitionGroup>
  </div>
</template>
