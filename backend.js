import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAN3yB-VZ-mdpNwPzhtPVxZVKOMS71kdmI",
  authDomain: "distribunity.firebaseapp.com",
  projectId: "distribunity",
  storageBucket: "distribunity.appspot.com",
  messagingSenderId: "826284233878",
  appId: "1:826284233878:web:554dd43d78df38846f9eb7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const todosRef = collection(db, 'todos');

export { app as firebaseApp };