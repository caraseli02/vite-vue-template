<script setup lang="ts">
import { LogoutIcon, UserCircleIcon } from '@heroicons/vue/outline'
import { useRouter } from 'vue-router'
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
// PINIA
import { useSidebarStore } from '~/stores/SidebarStore'

// Router
const router = useRouter()

const sidebarStore = useSidebarStore()

// access an state/getters from the store
const auth = useFirebaseAuth()
const user = useCurrentUser()

// access an action/mutations from the store
const toggleSidebar = () => sidebarStore.toggleSidebar()

const closeSession = async () => {
  await auth?.signOut().then(() => {
    router.push({ name: '/auth' })
  })
}

// store.dispatch("attendance/fetchAllAttends")
// store.dispatch("users/fetchAllUsers");
</script>

<template>
  <header
    :class="user ? 'justify-between' : 'justify-end'"
    class="flex p-2 relative z-10 absolute top-0"
  >
    <!-- PROFILE ICON FOR OPEN/CLOSE SIDEBAR -->
    <div
      v-if="user"
      data-cy="sidebarBtn"
      class="flex items-center"
      @click="toggleSidebar"
    >
      <PrimaryBtn id="sidebarBtn" aria-label="Open Menu">
        <UserCircleIcon class="w-5 h-5 text-primary" />
      </PrimaryBtn>
    </div>
    <!-- LOGOUT, ThemeToggler Btn -->
    <div class="flex justify-end items-center">
      <ThemeToggler class="mr-4" />

      <PrimaryBtn v-if="user" id="btnLogout" @click.prevent="closeSession">
        <LogoutIcon class="w-5 h-5" />
      </PrimaryBtn>
    </div>
  </header>
</template>
