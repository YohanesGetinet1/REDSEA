// src/firebase/config.ts
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// IMPORTANT: Replace "YOUR_API_KEY" with your actual Firebase API key
const firebaseConfig = {
  apiKey: "AIzaSyB6wDg_bcVBK-8AMeYksBDbTIaMUPe3PCE", // Make sure to use your actual API key here
  authDomain: "chatter-636b6.firebaseapp.com",
  projectId: "chatter-636b6",
  storageBucket: "chatter-636b6.appspot.com",
  messagingSenderId: "698348068060",
  appId: "1:698348068060:web:1d8b176c1c60cdc8912819"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize and export Firebase services
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

export { app, auth, db, storage };