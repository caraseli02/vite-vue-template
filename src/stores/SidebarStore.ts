// src/stores/AuthStore.js (Pinia)
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('SidebarStore', {
  state: () => {
    return {
      showSidebar: false
    }
  },
  getters: {
    showSidebar: (state) =>{ 
      return state.showSidebar
     }
  },
  actions: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar
    }
  }
})
