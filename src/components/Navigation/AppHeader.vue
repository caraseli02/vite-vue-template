<script setup lang="ts">
import { computed } from 'vue'
// import { useRouter } from "vue-router";
import { LogoutIcon, UserCircleIcon } from '@heroicons/vue/outline'
import PrimaryBtn from '~/components/buttons/PrimaryBtn.vue'
import ThemeToggler from '~/components/Navigation/ThemeToggler.vue'

// const store = useStore();
// const router = useRouter();

// access an state/getters from the store
// const userId = computed(() => store.state.auth.authId);
const userId = computed(() => '')
// const user = computed(() => store.getters["auth/authUser"]);
const user = computed(() => 'user')

// access an action/mutations from the store
// const toggleSidebar = () => store.dispatch("toggleSidebar");
const toggleSidebar = () => {}

const closeSession = async () => null
// await store.dispatch("auth/signOut").then(() => router.replace("auth"));

// store.dispatch("attendance/fetchAllAttends")
// store.dispatch("users/fetchAllUsers");
</script>

<template>
  <header class="flex justify-between p-4">
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
