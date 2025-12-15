import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAqp1vxeMoSCLY1kwiYem0o32k0sWjOFv8",
  authDomain: "crud-firebase-app-e099c.firebaseapp.com",
  databaseURL: "https://crud-firebase-app-e099c-default-rtdb.firebaseio.com",
  projectId: "crud-firebase-app-e099c",
  storageBucket: "crud-firebase-app-e099c.firebasestorage.app",
  messagingSenderId: "701002807138",
  appId: "1:701002807138:web:50acffa54c94a84fdd5e3b"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
