// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-da863.firebaseapp.com",
  projectId: "mern-blog-da863",
  storageBucket: "mern-blog-da863.firebasestorage.app",
  messagingSenderId: "458517538875",
  appId: "1:458517538875:web:15f79c336d66c4f142d41e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);