import { defineStore } from "pinia";
import { auth, signInWithEmailAndPassword, User } from "../helpers/firebase";
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
  },
});
