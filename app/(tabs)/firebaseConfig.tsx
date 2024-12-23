// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvrG4dl--iH8H1ttHVAH7BEFIm0ES3fOk",
  authDomain: "dcworks-2b975.firebaseapp.com",
  projectId: "dcworks-2b975",
  storageBucket: "dcworks-2b975.firebasestorage.app",
  messagingSenderId: "23115499916",
  appId: "1:23115499916:web:e6999222457539cc8a2ea9"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it
const db = getFirestore(app);

export { db };