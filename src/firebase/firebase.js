import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA3wdiRWGDJBxbNDLj6k9256LR4y3FqvxE",
  authDomain: "tubosale-12529.firebaseapp.com",
  projectId: "tubosale-12529",
  storageBucket: "tubosale-12529.appspot.com",
  messagingSenderId: "588534453622",
  appId: "1:588534453622:web:e18f3608daf3c9997e9657",
  measurementId: "G-B9716F7GC8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
