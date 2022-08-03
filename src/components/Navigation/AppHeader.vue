<script setup lang="ts">
import { computed } from 'vue'
// import { useRouter } from "vue-router";
import { LogoutIcon, UserCircleIcon } from '@heroicons/vue/outline'
import { useRouter } from 'vue-router'
import PrimaryBtn from '~/components/buttons/PrimaryBtn.vue'
import ThemeToggler from '~/components/Navigation/ThemeToggler.vue'
// PINIA
import { useAuthStore } from '~/stores/AuthStore'
import { useSidebarStore } from '~/stores/SidebarStore'

// Router

const router = useRouter()

const authStore = useAuthStore()
const sidebarStore = useSidebarStore()

// access an state/getters from the store
const userId = computed(() => authStore.userId)
const user = computed(() => authStore.authUser)

// access an action/mutations from the store
const toggleSidebar = () => sidebarStore.toggleSidebar()

const closeSession = async () =>
  await authStore.signOut().then(() => {
    router.push({ name: 'Auth' })
  })

// store.dispatch("attendance/fetchAllAttends")
// store.dispatch("users/fetchAllUsers");
</script>

<template>
  <header class="flex justify-between p-2 relative z-10">
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
    <ThemeToggler />
    <!-- LOGOUT, ThemeToggler Btn -->
    <div class="flex justify-end items-center">
      <PrimaryBtn v-if="userId" id="btnLogout" @click.prevent="closeSession">
        <LogoutIcon class="w-5 h-5" />
      </PrimaryBtn>
    </div>
  </header>
</template>
