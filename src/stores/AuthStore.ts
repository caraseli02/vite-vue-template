import { defineStore } from 'pinia'
import type {
  AuthProvider,
  User,
} from 'firebase/auth'
import {
  browserSessionPersistence,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from '../helpers/firebase'

// TYPES
import type { Provider } from '~/types/auth'

export const useAuthStore = defineStore('AuthStore', {
  state: () => {
    return {
      user: null as User | null,
      provider: null as AuthProvider | null,
    }
  },
  actions: {
    async signInWithEmailAndPassword(email: string, password: string) {

      await signInWithEmailAndPassword(auth, email, password).then((user) => {
        this.user = auth.currentUser
      })

    },
    async loginWithFirebase(provider: AuthProvider, providedBy: Provider) {
      await auth.setPersistence(browserSessionPersistence)
      return await signInWithPopup(auth, provider).then((user) => {
        this.user = auth.currentUser
      })
    },
    async signOut() {
      await getAuth().signOut()
      this.user = null
    },
  },
  getters: {
    authUser: (state) => {
      return state.user
    },
    userId: (state) => {
      return state.user?.uid
    },
  },
})
