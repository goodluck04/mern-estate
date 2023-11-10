// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "goodluck-8d0f7.firebaseapp.com",
  projectId: "goodluck-8d0f7",
  storageBucket: "goodluck-8d0f7.appspot.com",
  messagingSenderId: "245578035405",
  appId: "1:245578035405:web:85457a2bfe2e5b4a5df984",
  measurementId: "G-KWSJFN77WF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);