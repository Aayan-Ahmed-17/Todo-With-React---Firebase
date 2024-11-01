// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwuK6hEwCSqTpFR0Zj2oQJJWikwDUUSuo",
  authDomain: "todo-011124.firebaseapp.com",
  projectId: "todo-011124",
  storageBucket: "todo-011124.firebasestorage.app",
  messagingSenderId: "426617539712",
  appId: "1:426617539712:web:b2f1facfc36ab0d63d2a65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);