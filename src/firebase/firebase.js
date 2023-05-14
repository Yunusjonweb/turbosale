import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCCBtpj_exw8SaQ5qTlhq73F7RubudBBCY",
  authDomain: "turbosale-22420.firebaseapp.com",
  projectId: "turbosale-22420",
  storageBucket: "turbosale-22420.appspot.com",
  messagingSenderId: "462960377401",
  appId: "1:462960377401:web:e8f631004b4ab4209c97e8",
  measurementId: "G-RWS13MRVPB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
