// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanager-24af0.firebaseapp.com",
  projectId: "taskmanager-24af0",
  storageBucket: "taskmanager-24af0.appspot.com",
  messagingSenderId: "517032414085",
  appId: "1:517032414085:web:c287f3a7d9b64c8959d2ec",
  measurementId: "G-BYCTE6HT7G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);