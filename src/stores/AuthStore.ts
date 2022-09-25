import { defineStore } from 'pinia'
import type {
  AuthProvider,
  User,
} from 'firebase/auth'
import {
  browserSessionPersistence,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from '../helpers/firebase'
// Firebase Errors
import { data } from '~/assets/firebase-errors.json'
// TYPES
import type { Provider } from '~/types/auth'
// Other stores
import { useAlertsStore } from '~/stores/AlertsStore'

interface FireAuthError {
  [key: string]: string
}

interface IForm {
  name:string
  surname: string
  email: string
  password: string
}
const errorsArr: FireAuthError = data

export const useAuthStore = defineStore('AuthStore', {
  state: () => {
    return {
      user: null as User | null,
      provider: null as AuthProvider | null,
      loading : false
    }
  },
  actions: {
    async signInWithEmailAndPassword({email, password}: Pick<IForm, 'email' | 'password'>) {
      const alertsStore = useAlertsStore()

      try {
        this.loading = true
        await signInWithEmailAndPassword(auth, email, password).then((user) => {
          this.user = auth.currentUser
          console.log(user)
        })
      }
      catch (err: any) {
        console.log(err.code);
        alertsStore.authError(errorsArr[err.code])
      }
      finally {
        this.loading = false
      }
    },
    async createUserWithEmailAndPassword({email, password, name, surname}: IForm) {
      const alertsStore = useAlertsStore()

      try {
        this.loading = true
        await createUserWithEmailAndPassword(auth, email, password).then((user) => {
          this.user = auth.currentUser
        })
      }
      catch (err: any) {
        console.log(err.code);
        alertsStore.authError(errorsArr[err.code])
      }
      finally {
        this.loading = false
      }
    },
    async loginWithFirebase(provider: AuthProvider, providedBy: Provider) {
      const alertsStore = useAlertsStore()
      try {
        await auth.setPersistence(browserSessionPersistence)
        return await signInWithPopup(auth, provider).then((user) => {
          this.user = auth.currentUser
        })
      }
      catch (err: any) {
        alertsStore.authError(errorsArr[err.code])
      }
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
