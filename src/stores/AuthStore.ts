// src/stores/AuthStore.js (Pinia)
import { defineStore } from 'pinia'
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth();

type SignIn = {
    email: string,
    password: string
}

export const useAuthStore = defineStore('AuthStore', {
  state: () => {
    return {
      authId: null,
      authUserUnsubscribe: null,
      authObserverUnsubscribe: null
    }
  },
  getters: {
    authUser: (state) =>{ 
      return {
        authId: state.authId,
      } // get authId on `state`
     }
  },
  actions: {
    signInWithEmailAndPassword ({ email, password }: SignIn) {
      return signInWithEmailAndPassword(auth, email, password)
    },
    async signOut () {
      await signOut(auth)
      this.authId = null
    }
  }
})
