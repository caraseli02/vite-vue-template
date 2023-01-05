<script setup lang="ts">
import {
  ChartBarIcon,
  ClockIcon,
  UserCircleIcon,
} from '@heroicons/vue/outline'
import PrimaryBtn from '~/components/buttons/PrimaryBtn.vue'

definePage({
  name: 'Home',
  meta: {
    requiresAuth: true,
  },
})

const links = [
  {
    text: 'Fichar',
    path: '/dashboard',
    iconName: ClockIcon,
  },
  {
    text: 'Asistencia',
    path: '/info',
    iconName: ChartBarIcon,
  },
  {
    text: 'Mi perfil',
    path: '/perfil',
    iconName: UserCircleIcon,
  },
]
</script>

<template>
  <article class="max-h-screen flex flex-col justify-aroud items-center mt-8">
    <h1 class="text-center mb-4 font-bold text-primary text-2xl">
      APIMOSA APP ADMIN
    </h1>
    <section data-cy="homeBtns">
      <router-link
        v-for="(link, index) in links"
        :key="index"
        :data-cy="link.text"
        :to="link.path"
        class="flex flec-col"
      >
        <PrimaryBtn class="mb-4">
          <span class="flex justify-center items-center w-32 text-xl">{{
            link.text
          }}</span>
          <component :is="link.iconName" class="w-10 h-10 ml-4" />
        </PrimaryBtn>
      </router-link>
    </section>
  </article>
</template>
