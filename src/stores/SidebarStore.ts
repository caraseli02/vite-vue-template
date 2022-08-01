// src/stores/AuthStore.js (Pinia)
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('SidebarStore', {
  state: () => {
    return {
      sidebar: false,
    }
  },
  getters: {
    showSidebar: (state) => {
      return state.sidebar
    },
  },
  actions: {
    toggleSidebar() {
      this.sidebar = !this.sidebar
    },
  },
})
