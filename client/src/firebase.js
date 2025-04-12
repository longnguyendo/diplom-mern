// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "diplom-blog-mern.firebaseapp.com",
  projectId: "diplom-blog-mern",
  storageBucket: "diplom-blog-mern.firebasestorage.app",
  messagingSenderId: "525648142611",
  appId: "1:525648142611:web:c2e882ffdd16c357f43ae6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);