<script setup lang="ts">
import { computed } from 'vue'
import { PhoneIcon, XCircleIcon } from '@heroicons/vue/outline'

defineProps({
  showMovilSignIn: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggleMovilSignIn'])

const phoneNumber = $ref(null)
// const store = useStore()

const phoneNumberIsInvalid = computed(() => {
  // check if phone number is valid and has 9 digits and only numbers
  return !phoneNumber || phoneNumber.length !== 9 || !/^\d+$/.test(phoneNumber)
})

const signInWithGoogle = () => {
  // store.dispatch('auth/signInWithGoogle')
}

const signInWithYahoo = () => {
  // store.dispatch('auth/signInWithYahoo')
}

const signInWithMovil = () => {
  // store.dispatch('auth/signInWithMovil', {
  //   phoneNumber: phoneNumber.value
  // })
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
        <button
          class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800"
          data-cy="google-sign-in"
          @click="signInWithGoogle"
        >
          <span
            class="relative flex justify-around w-64 px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              width="1.5em"
              height="1.5em"
              style="color: rgb(15, 20, 25)"
            >
              <g>
                <path
                  d="M18.977 4.322L16 7.3c-1.023-.838-2.326-1.35-3.768-1.35-2.69 0-4.95 1.73-5.74 4.152l-3.44-2.635c1.656-3.387 5.134-5.705 9.18-5.705 2.605 0 4.93.977 6.745 2.56z"
                  fill="#EA4335"
                />
                <path
                  d="M6.186 12c0 .66.102 1.293.307 1.89L3.05 16.533C2.38 15.17 2 13.63 2 12s.38-3.173 1.05-4.533l3.443 2.635c-.204.595-.307 1.238-.307 1.898z"
                  fill="#FBBC05"
                />
                <path
                  d="M18.893 19.688c-1.786 1.667-4.168 2.55-6.66 2.55-4.048 0-7.526-2.317-9.18-5.705l3.44-2.635c.79 2.42 3.05 4.152 5.74 4.152 1.32 0 2.474-.308 3.395-.895l3.265 2.533z"
                  fill="#34A853"
                />
                <path
                  d="M22 12c0 3.34-1.22 5.948-3.107 7.688l-3.265-2.53c1.07-.67 1.814-1.713 2.093-3.063h-5.488V10.14h9.535c.14.603.233 1.255.233 1.86z"
                  fill="#4285F4"
                />
              </g>
            </svg>
            Entrar con Google Mail
          </span>
        </button>
        <button
          class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800"
          data-cy="yahoo-sign-in"
          @click="signInWithYahoo"
        >
          <span
            class="relative flex justify-around w-64 px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            <svg
              viewBox="0 0 24 24"
              width="1.5em"
              height="1.5em"
              style="color: rgb(15, 20, 25)"
            >
              <g>
                <circle cx="10" cy="10" r="7" />
                <path
                  fill="#FFF"
                  d="M7.115 7.813L8.27 10.62l1.165-2.809h1.877l-2.861 6.563H6.563l.773-1.738-2.149-4.825h1.928zm4.586 2.57c.673 0 1.172.484 1.172 1.09 0 .616-.52 1.128-1.213 1.128-.673 0-1.173-.493-1.173-1.09 0-.606.52-1.127 1.214-1.127zm3.497-4.717l-1.917 4.3h-2.14l1.916-4.3h2.14z"
                />
              </g>
            </svg>
            Entrar con Yahoo Mail
          </span>
        </button>
        <button
          class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          data-cy="movil-sign-in"
          @click="emit('toggleMovilSignIn')"
        >
          <span
            class="relative flex justify-around w-64 px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 items-center"
          >
            <PhoneIcon class="h-5 w-5" />
            Entrar con Movil
          </span>
        </button>
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
            :class="phoneNumberIsInvalid ? 'bg-red-300' : 'bg-gray-50 dark:bg-gray-700'"
            class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tu teléfono"
            pattern="[0-9]{9}"
          >
        </div>
        <div class="flex justify-between">
          <PrimaryBtn
            :disabled="phoneNumberIsInvalid"
            class="mt-4" :class="[{ 'cursor-not-allowed': phoneNumberIsInvalid }]"
            @click.prevent="signInWithMovil({ phoneNumber })"
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
