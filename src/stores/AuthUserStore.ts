import { defineStore } from "pinia";
import { auth } from "../helpers/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();

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
        router.push("/");
      });
    },
    async signOut() {
      await signOut(auth);
      this.user = null;
      router.push("/auth");
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    userId: (state) => state.user?.uid,
    user: (state) => state.user,
  },
});
