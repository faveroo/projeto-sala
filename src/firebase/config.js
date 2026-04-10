// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTq3tbEQf5WQ7hUhHrhqr4RKKU7FV_haE",
  authDomain: "vue-firebase-e3a19.firebaseapp.com",
  projectId: "vue-firebase-e3a19",
  storageBucket: "vue-firebase-e3a19.firebasestorage.app",
  messagingSenderId: "301683849680",
  appId: "1:301683849680:web:7c507da039c0a1211621d5",
  measurementId: "G-13FW939GP9"
};

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }