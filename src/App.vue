<script setup lang="ts">
import { useCurrentUser } from 'vuefire'
const user = useCurrentUser()
</script>

<template>
  <div class="min-w-screen min-h-screen box-border mb-24">
    <AppHeader />
    <AppSidebar />
    <main class="max-w-md mx-auto px-4" :class="{ 'lg:pl-24': user }">
      <router-view />
    </main>
    <!-- <Footer /> -->
    <section
      v-if="user"
      class="glass-blue fixed bottom-0 w-full rounded-none rounded-t-lg lg:w-20 lg:h-full lg:rounded-r-lg lg:rounded-t-none"
    >
      <MainNav />
    </section>
    <TheAlerts />
  </div>
</template>

<style>
@import "./assets/css/icons.css";
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,700;1,100;1,400&display=swap");
/* @import "assets/style.css"; */

* {
  font-family: "Poppins";
}

html {
  background: radial-gradient(circle at top left, #dad4cd 0%, #00c6fb 20%, #005bea 100%);
}

.dark {
  background: radial-gradient(circle at top right, #014393 0%, #020c6b 20%, #010948 100%);
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
