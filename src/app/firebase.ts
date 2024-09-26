// Import the necessary Firebase functions and services
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getMessaging, isSupported } from "firebase/messaging";

// Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DBURL,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
let messaging;

// Check if messaging is supported in the current browser
if (typeof window !== "undefined" && isSupported()) {
  messaging = getMessaging(app);
}

export const saveMessageToFirebase = (chatId: string, message: any) => {
  const messagesRef = ref(db, `chats/${chatId}/messages`);
  const newMessageRef = push(messagesRef);
  set(newMessageRef, message);
};

// Function to retrieve chat data from Firebase
export const getChatDataFromFirebase = (callback: (data: any) => void) => {
  const chatsRef = ref(db, "chats");
  onValue(chatsRef, (snapshot) => {
    const data = snapshot.val();
    callback(data); // Call the callback with the retrieved data
  });
};

// Export Firebase services and modules
export { auth, provider, signInWithPopup, storage, messaging };
