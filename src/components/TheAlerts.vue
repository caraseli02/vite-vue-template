<script setup lang="ts">
import {
  XCircleIcon,
} from '@heroicons/vue/outline'
import { useAlertsStore } from '~/stores/AlertsStore'
const alerts = useAlertsStore()
</script>

<template>
  <div class="toast toast-end">
    <TransitionGroup name="alerts">
      <div
        v-for="alert in alerts.items"
        :key="alert.id"
        :class="`alert alert-${alert.style} min-w-[200px] max-w-[400px]`"
      >
        <div class="flex">
          <div>{{ alert.message }}</div>
          <div class="w-[20px] flex h-full justify-center items-center">
            <button class="px-5" @click="alerts.remove(alert.id)">
              <XCircleIcon class="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.alerts-enter-active,
.alerts-leave-active {
  transition: all 0.5s ease;
}
.alerts-enter-from,
.alerts-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
