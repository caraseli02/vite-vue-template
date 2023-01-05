<script setup lang="ts">
import {
  ClockIcon,
  ExclamationIcon,
  HomeIcon,
  LogoutIcon,
} from "@heroicons/vue/outline";

import { useCurrentUser, useFirebaseAuth } from "vuefire";

// Router
import { useRouter } from "vue-router";
import { useSidebarStore } from "~/stores/SidebarStore";

const router = useRouter();

const sidebarStore = useSidebarStore();
const showSidebar = computed(() => sidebarStore.showSidebar);

const authUser = useCurrentUser();
const auth = useFirebaseAuth();

const workplaceList = computed(() => {
  return null;
  // return Array.isArray(authUser.workplace)
  //   ? authUser.value?.workplace
  //   : [authUser.value?.workplace];
});

watch(
  showSidebar,
  () => {
    // if (import.meta.client) {
    //   if (showSidebar) document.body.style.setProperty("overflow", "hidden");
    //   else document.body.style.removeProperty("overflow");
    // }
  },
  { immediate: true, deep: true }
);

const toggleSidebar = () => {
  sidebarStore.toggleSidebar();
};
const deleteUser = async () => {
  console.log("delete");
};
const closeSession = async () => {
  await toggleSidebar();
  await auth?.signOut().then(() => {
    router.replace({ name: "/auth" });
  });
};

onMounted(() => {
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 27 && showSidebar) toggleSidebar;
  });
});
</script>

<template>
  <div v-if="authUser">
    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0"
    >
      <div
        v-show="showSidebar"
        data-cy="sidebarOverlay"
        class="z-10 fixed inset-0 transition-opacity"
        @keydown.esc="toggleSidebar"
      >
        <div
          class="absolute inset-0 bg-black opacity-50"
          tabindex="0"
          @click="toggleSidebar"
        />
      </div>
    </transition>
    <aside
      v-if="authUser"
      class="transform top-0 left-0 w-64 bg-primary fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
      :class="showSidebar ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="overflow-hidden shadow dark:shadow-gray-400 max-w-xs pt-6">
        <div class="text-center px-3 pb-6 pt-2">
          <h3 data-cy="name" class="text-primary text-xl">
            {{ "Usuario" }}
          </h3>
          <h3
            v-if="'surname' in authUser"
            data-cy="surname"
            class="text-primary text-xl"
          >
            {{ "surname" }}
          </h3>
          <p data-cy="email" class="mt-2 font-sans font-light text-primary">
            {{ authUser.email }}
          </p>
        </div>
      </div>
      <div class="w-full px-3 mb-6 md:mb-0 mt-4">
        <label
          class="flex justify-start items-center uppercase tracking-wide text-secondary text-xs font-bold mb-2"
          for="grid-state"
        >
          Horario de Trabajo
          <ClockIcon class="h-6 w-6 mx-2 text-blue-500" />
        </label>
        <div v-if="!authUser" class="relative">
          <select
            id="grid-state"
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-primary py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option>40 horas</option>
            <option>39 horas</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </div>
        <div
          class="flex border-b-2 border-gray-500 items-center text-primary p-2"
        >
          <div class="flex">
            <span
              v-if="'schedule' in authUser"
              class="block font-bold text-primary mt-2 text-xl"
            >
              <!-- {{ authUser["schedule"] }} horas -->
            </span>
          </div>
        </div>
      </div>
      <div class="w-full px-3 mb-6 md:mb-0 mt-4">
        <div
          class="flex justify-start items-center uppercase tracking-wide text-secondary text-xs font-bold"
          for="grid-state"
        >
          Centro de Trabajo
          <HomeIcon class="h-6 w-6 mx-2 text-blue-500" />
        </div>
        <div class="flex items-center p-2 border-b-2 border-gray-500 relative">
          <div>
            <span class="block text-3xl font-bold" />
            <div
              v-if="'workplace' in authUser"
              data-cy="workplaceSidebar"
              class="workplace"
            >
              <span
                v-for="(place, index) in workplaceList"
                :key="index"
                class="block cursor-pointer text-xl font-bold text-primary hover:bg-indigo-800 hover:border-2 rounded-lg"
                >{{ place }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <legalLinks class="mt-4 my-2" />
      <div
        class="absolute ml-3 mb-8 bottom-0 inline-flex flex-col justify-center"
      >
        <PrimaryBtn class="mb-3" data-cy="sidebarLogout" @click="closeSession">
          <LogoutIcon class="text-primary mr-4 ml-2 w-6 h-6" />
          <span class="text-primary pl-3 flex justify-center items-center">
            Cerrar Session
          </span>
        </PrimaryBtn>
        <PrimaryBtn id="deleteUser" color="pinkOrange" @click="deleteUser">
          <ExclamationIcon class="text-yellow-300 mr-4 ml-2 w-6 h-6" />
          <span class="text-primary flex justify-center items-center"
            >Borrar la cuenta</span
          >
        </PrimaryBtn>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.workplace:first-child {
  border-bottom: 2px solid blue;
}

.svg-icon {
  width: 2em;
  height: 2em;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  fill: #0551b5;
}

.svg-icon circle {
  stroke: #4691f6;
  stroke-width: 2;
}
</style>
