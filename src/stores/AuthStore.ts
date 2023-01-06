import { defineStore } from 'pinia'
import type { AuthProvider } from 'firebase/auth'
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from '../helpers/firebase'
// Firebase Errors
import { data } from '~/assets/firebase-errors.json'
// Other stores
import { useAlertsStore } from '~/stores/AlertsStore'

interface FireAuthError {
  [key: string]: string
}

interface IForm {
  name: string
  surname: string
  email: string
  password: string
}
const errorsArr: FireAuthError = data

const alertsStore = useAlertsStore()

export const useAuthStore = defineStore('AuthStore', {
  state: () => {
    return {
      provider: null as AuthProvider | null,
      loading: false,
    }
  },
  actions: {
    async signInWithEmailAndPassword({ email, password }: Pick<IForm, 'email' | 'password'>) {
      try {
        this.loading = true
        await signInWithEmailAndPassword(auth, email, password)
      }
      catch (err: any) {
        alertsStore.authError(errorsArr[err.code])
      }
      finally {
        this.loading = false
      }
    },
    async createUserWithEmailAndPassword({ email, password }: IForm) {
      const alertsStore = useAlertsStore()

      try {
        this.loading = true
        await createUserWithEmailAndPassword(auth, email, password)
      }
      catch (err: any) {
        alertsStore.authError(errorsArr[err.code])
      }
      finally {
        this.loading = false
      }
    },
    async loginWithFirebase(provider: AuthProvider) {
      const alertsStore = useAlertsStore()
      try {
        await auth.setPersistence(browserSessionPersistence)
        return await signInWithPopup(auth, provider)
      }
      catch (err: any) {
        alertsStore.authError(errorsArr[err.code])
      }
    },
    async signInWithPhoneNumber(phoneNumber: string) {
      const appVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth)
      try {
        const phoneNumberFormatted = `+34${phoneNumber}`
        const phoneNumberE164 = `+${phoneNumberFormatted.replace(/\D/g, '')}`
        signInWithPhoneNumber(auth, phoneNumberE164, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            const verificationCode = prompt('Ingresa el codigo de verificacion')
            if (verificationCode) {
              const credential = PhoneAuthProvider.credential(confirmationResult.verificationId, verificationCode)
              signInWithCredential(auth, credential)
            }
          })
      }
      catch (error) {
        // Error; SMS not sent
        appVerifier.clear() // reset the reCAPTCHA widget
        if (error instanceof Error && 'code' in error)
          alertsStore.authError(errorsArr[error.code as string])
      }
    },
    async signOut() {
      await getAuth().signOut()
    },
    sendEmailReset(email: string) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          alertsStore.info('Success')
        })
        .catch((error) => {
          // Error; SMS not sent
          alertsStore.authError(errorsArr[error.code as string])
        })
    },
  },
  getters: {
  },
})
