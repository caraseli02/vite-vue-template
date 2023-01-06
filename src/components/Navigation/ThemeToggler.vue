<script setup lang="ts">
import { useColorMode, useCycleList } from "@vueuse/core";
import { MoonIcon, SunIcon, DesktopComputerIcon } from "@heroicons/vue/outline";

const mode = useColorMode({
  emitAuto: true,
});
const { next } = useCycleList(["dark", "light", "auto"], {
  initialValue: mode,
});
</script>

<template>
  <PrimaryBtn
    :color="mode === 'dark' ? 'purpleBlue' : 'redYellow'"
    @click="next()"
  >
    <TransitionGroup name="slide-fade" mode="out-in">
      <MoonIcon
        key="dark"
        v-if="mode === 'dark'"
        class="h-5 w-5 MoonIcon"
      />
      <SunIcon
        key="light"
        v-if="mode === 'light'"
        class="h-5 w-5 SunIcon"
      />
      <DesktopComputerIcon
        key="auto"
        v-if="mode === 'auto'"
        class="h-5 w-5 DesktopComputerIcon"
      />
    </TransitionGroup>
  </PrimaryBtn>
</template>

<style></style>
