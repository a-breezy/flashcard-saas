// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKQF74SlA0MCpRkDEz8704clC5hNh3B04",
  authDomain: "flashcard-cc49a.firebaseapp.com",
  projectId: "flashcard-cc49a",
  storageBucket: "flashcard-cc49a.appspot.com",
  messagingSenderId: "163349364514",
  appId: "1:163349364514:web:43640d40d84623e012ef7b",
  measurementId: "G-CVT9EE29JB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
