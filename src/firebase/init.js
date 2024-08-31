import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyAN3yB-VZ-mdpNwPzhtPVxZVKOMS71kdmI',
  authDomain: 'distribunity.firebaseapp.com',
  projectId: 'distribunity',
  storageBucket: 'distribunity.appspot.com',
  messagingSenderId: '826284233878',
  appId: '1:826284233878:web:554dd43d78df38846f9eb7'
}

export const firebaseApp = initializeApp(firebaseConfig)
export const database = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
