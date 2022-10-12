<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: 'default',
  },
})

const classes = computed(() => {
  const applyForAll = 'relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br'
  switch (props.color) {
    case 'purpleBlue':
      return `${applyForAll} from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800`
    case 'greenBlue':
      return `${applyForAll} from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800`
    case 'pinkOrange':
      return `${applyForAll} from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800`
    case 'redYellow':
      return `${applyForAll} from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400`
    default:
      return `${applyForAll} from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800`
  }
})
</script>

<template>
  <button data-cy="primaryBtn" :class="classes">
    <span
      class="relative flex item-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
    >
      <slot />
    </span>
  </button>
</template>
