// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8HrWZOfj2PeBqw34mG2PUxB441W97GPI",
  authDomain: "hiinfluencer-1c689.firebaseapp.com",
  projectId: "hiinfluencer-1c689",
  storageBucket: "hiinfluencer-1c689.appspot.com",
  messagingSenderId: "67287188654",
  appId: "1:67287188654:web:ee5f5de8bd8fb832b4593f",
  measurementId: "G-2KMYMVR8ST",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, provider, signInWithPopup, storage };
