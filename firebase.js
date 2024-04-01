// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBE3mEGxlPrCjTfsw-sqiFyVUgWtq7-ykI",
  authDomain: "supplend.firebaseapp.com",
  projectId: "supplend",
  storageBucket: "supplend.appspot.com",
  messagingSenderId: "578897915116",
  appId: "1:578897915116:web:3470238db3e57e20e109c9",
  measurementId: "G-DM5DKQ2KBW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);