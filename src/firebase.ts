// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAw7orH6aPIDJ_BnpSWrkdAtmuCxverDB4",
  authDomain: "manashomes-beb62.firebaseapp.com",
  projectId: "manashomes-beb62",
  storageBucket: "manashomes-beb62.firebasestorage.app",
  messagingSenderId: "749089674334",
  appId: "1:749089674334:web:ba0eddc4c10938628090cf",
  measurementId: "G-PFD2TZZY2S"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);