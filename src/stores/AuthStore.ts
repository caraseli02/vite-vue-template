import { defineStore } from "pinia";
import {
  AuthProvider,
  browserSessionPersistence,
  User,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword
} from 'firebase/auth'

//TYPES
import { Provider } from '~/types/auth'

export const useAuthUserStore = defineStore("AuthUserStore", {
  state: () => {
    return {
      user: null as User | null,
      provider: null as AuthProvider | null,
      
    };
  },
  actions: {
    async signInWithEmailAndPassword(email: string, password: string) {
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, email, password).then((user) => {
        this.user = auth.currentUser;
      });
    },
    async loginWithFirebase (provider: AuthProvider, providedBy: Provider) {
      const auth = getAuth()
      await auth.setPersistence(browserSessionPersistence)
      return await signInWithPopup(auth, provider)
    },
    async signOut() {
      await getAuth().signOut()
      this.user = null;
    },
  },
  getters: {
    authUser: (state) => {
      return state.user;
    },
    userId: (state) => {
      return state.user?.uid;
    },
  },
});
