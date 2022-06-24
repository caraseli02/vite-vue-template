<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { MoonIcon, SunIcon } from '@heroicons/vue/outline'

const nightMode = ref(localStorage.getItem('theme') === 'dark')

const themeInnit = () => {
  if (
    localStorage.theme === 'dark'
      || (!('theme' in localStorage)
        && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.querySelector('html').classList.add('dark')
    localStorage.setItem('theme', 'dark')
    nightMode.value = true
  }
}

const toggleTheme = () => {
  const htmlClasses = document.querySelector('html').classList
  if (localStorage.theme === 'dark') {
    htmlClasses.remove('dark')
    localStorage.removeItem('theme')
  }
  else {
    htmlClasses.add('dark')
    localStorage.theme = 'dark'
  }
  nightMode.value = !nightMode.value
}

onMounted(themeInnit)
</script>

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

<style></style>
