import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAs-H6UfYZ9s0s4vQQpQ4QvQvJv9pJuY-M",
  authDomain: "crud-firebase-5c5d0.firebaseapp.com",
  projectId: "crud-firebase-5c5d0",
  storageBucket: "crud-firebase-5c5d0.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
