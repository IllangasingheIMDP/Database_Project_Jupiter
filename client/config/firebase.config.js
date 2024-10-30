// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIDUYDWgZaVJRLdQYVAKgraOFqVBNBzC8",
  authDomain: "hrms-3be91.firebaseapp.com",
  projectId: "hrms-3be91",
  storageBucket: "hrms-3be91.appspot.com",
  messagingSenderId: "715248093728",
  appId: "1:715248093728:web:50f90fbc740f43b5ec8a45",
  measurementId: "G-49K1YJW3P8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Optional, if you're using analytics

// Initialize Firestore and Storage after initializing the app
const firestoreDB = getFirestore(app);
const storage = getStorage(app);

// Export Firestore and Storage
export { storage, firestoreDB };
