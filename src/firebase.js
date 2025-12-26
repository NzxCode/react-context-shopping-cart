import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAz7H_oFATefaU62_Sc1zUYk0j6ldUnvA0",
  authDomain: "toko-nico-usa.firebaseapp.com",
  projectId: "toko-nico-usa",
  storageBucket: "toko-nico-usa.firebasestorage.app",
  messagingSenderId: "799751290052",
  appId: "1:799751290052:web:d4ddb6789b77c90f499d91"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);