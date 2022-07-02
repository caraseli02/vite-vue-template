import { defineStore } from "pinia";
import {
  auth,
  signInWithEmailAndPassword,
  User,
  signOut,
} from "../helpers/firebase";

export const useAuthUserStore = defineStore("AuthUserStore", {
  state: () => {
    return {
      user: null as User | null,
    };
  },
  actions: {
    async signInWithEmailAndPassword(email: string, password: string) {
      await signInWithEmailAndPassword(auth, email, password).then((user) => {
        this.user = auth.currentUser;
      });
    },
    async signOut() {
      await signOut(auth);
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
