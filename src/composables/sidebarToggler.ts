import { ref } from 'vue'

export const showSidebar = ref(false)

export const hideSidebar = () => {
  showSidebar.value = !showSidebar.value
}
