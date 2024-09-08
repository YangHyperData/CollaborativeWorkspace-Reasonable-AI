// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "loop-clone-b1137.firebaseapp.com",
  projectId: "loop-clone-b1137",
  storageBucket: "loop-clone-b1137.appspot.com",
  messagingSenderId: "841188584703",
  appId: "1:841188584703:web:f5b2bd8d19a340934b70ca",
  measurementId: "G-GPQ5BPMMZB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const analytics = getAnalytics(app);