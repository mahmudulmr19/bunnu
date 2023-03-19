import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAX05pCuMo-NPDFPpbtIAU70q2btBzmRZ8",
  authDomain: "bunnu-be11b.firebaseapp.com",
  projectId: "bunnu-be11b",
  storageBucket: "bunnu-be11b.appspot.com",
  messagingSenderId: "118860857310",
  appId: "1:118860857310:web:ad749f50ed8022dae1674f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;
