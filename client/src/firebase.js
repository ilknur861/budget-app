import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKyV7ZeUDyHeiMrAtzRjIPU8L5n3TuMEM",
  authDomain: "budget-app-8e9aa.firebaseapp.com",
  projectId: "budget-app-8e9aa",
  storageBucket: "budget-app-8e9aa.firebasestorage.app",
  messagingSenderId: "879256361038",
  appId: "1:879256361038:web:bfe71c6d7ed87739608b1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);

export default app;
