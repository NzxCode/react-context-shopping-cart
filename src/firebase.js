import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAz22MdlfADCYJ-xVJtsP-FnTL_OYHVl30",
  authDomain: "toko-nico-db.firebaseapp.com",
  projectId: "toko-nico-db",
  storageBucket: "toko-nico-db.firebasestorage.app",
  messagingSenderId: "252960580934",
  appId: "1:252960580934:web:1db0f5a30e1c0d117ff147"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);