import Swal from 'sweetalert2'
import { data } from '../assets/firebase-errors.json'

type Keys = keyof typeof data;

const showFirebaseErr = (error: Keys ) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: data[error],
    timer: 3500,
  })
}
const showErrorMsg = (msg: string) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: msg,
    timer: 3500,
  })
}

export default function useNotifications() {
  return { showErrorMsg, showFirebaseErr }
}
