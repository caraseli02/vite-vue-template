<script setup lang="ts">
import {
  ChartBarIcon,
  ClockIcon,
  HomeIcon,
  UserCircleIcon,
} from '@heroicons/vue/outline'

const links = [
  {
    component: HomeIcon,
    path: '/',
    name: 'Inicio',
  },
  {
    component: ClockIcon,
    path: '/dashboard',
    name: 'Dashboard',
  },
  {
    component: ChartBarIcon,
    path: '/info',
    name: 'Info',
  },
  {
    component: UserCircleIcon,
    path: '/perfil',
    name: 'Perfil',
  },
]
</script>

<template>
  <div
    class="flex lg:flex-col items-center justify-center h-full space-x-4 lg:space-x-0 lg:space-y-4 py-2 lg:py-4 lg:rouded-xl"
  >
    <router-link
      v-for="link in links"
      :key="link.name"
      :to="link.path"
      class="group"
    >
      <div
        :class="
          $route.path === link.path
            ? 'transform -translate-y-8 lg:-translate-y-0 lg:translate-x-8 duration-300 w-36'
            : 'opacity-50 border-2 border-blue-500 duration-300 w-10'
        "
        class="flex justify-center items-center h-10 lg:w-14 lg:h-14 rounded-xl bg-secondary text-primary transform shadow-xl"
      >
        <component :is="link.component" class="w-6 h-6" />
        <span v-show="$route.path === link.path" class="ml-2 md:hidden">
          {{ link.name }}
        </span>
      </div>
    </router-link>
  </div>
</template>
