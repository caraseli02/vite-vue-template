<template>
  <PrimaryBtn
    :color="nightMode ? 'purpleBlue' : 'redYellow'"
    @click="toggleTheme"
  >
    <transition name="slide-fade" mode="out-in">
      <MoonIcon v-if="!nightMode" class="h-5 w-5 text-black" />
      <SunIcon v-else class="h-5 w-5 text-white" />
    </transition>
  </PrimaryBtn>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { MoonIcon, SunIcon } from '@heroicons/vue/outline'
  import PrimaryBtn from '@/components/utils/PrimaryBtn.vue'

  const nightMode = ref(localStorage.getItem('theme') === 'dark')

  const themeInnit = () => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.querySelector('html').classList.add('dark')
      localStorage.setItem('theme', 'dark')
      nightMode.value = true
    }
  }

  const toggleTheme = () => {
    let htmlClasses = document.querySelector('html').classList
    if (localStorage.theme == 'dark') {
      htmlClasses.remove('dark')
      localStorage.removeItem('theme')
    } else {
      htmlClasses.add('dark')
      localStorage.theme = 'dark'
    }
    nightMode.value = !nightMode.value
  }

  onMounted(themeInnit)
</script>

<style></style>
