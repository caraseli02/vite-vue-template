<template>
  <section class="max-w-sm mx-auto mt-10">
    <div class="mb-4">
      <h1 class="text-3xl leading-9 font-extrabold text-primary mb-4">
        APIMOSA APP
      </h1>

      <PrimaryBtn v-show="!isLogin" id="authLogin" @click="setIsLogin(true)">
        INICIAR SESIÓN
        <LoginIcon class="ml-2 w-5 h-5" />
      </PrimaryBtn>

      <PrimaryBtn v-show="isLogin" id="authCreate" @click="setIsLogin(false)">
        CREAR CUENTA
        <IdentificationIcon class="ml-2 w-5 h-5" />
      </PrimaryBtn>
    </div>
    <Transition name="list">
      <SignIn v-if="isLogin" />
      <Register v-else />
    </Transition>
  </section>
</template>

<script setup lang="ts">
  import SignIn from '~/components/auth/SignIn.vue'
  import PrimaryBtn from '~/components/buttons/PrimaryBtn.vue'
  import Register from '~/components/auth/SignUp.vue'
  import { ref } from 'vue'
  import { IdentificationIcon, LoginIcon } from '@heroicons/vue/outline'

  const props = defineProps({
    showSignUp: {
      type: Boolean,
      default: false
    }
  })

  const isLogin = ref(!props.showSignUp)

  const setIsLogin = (nextVal: boolean) => {
    isLogin.value = nextVal
  }
</script>

<style scoped>
  .list-enter-active,
  .list-leave-active {
    transition: all 1s ease;
  }

  .list-enter-from {
    opacity: 0;
    transform: translateX(-50%);
    z-index: 1;
  }

  .list-leave-to {
    position: absolute;
    opacity: 0;
    transform: translateX(50%);
    z-index: -1;
  }
</style>
