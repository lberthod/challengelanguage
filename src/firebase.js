import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDG8yi0qMjCpvtMzdRXSiHNqIxVnrVTqeE",
  authDomain: "challenge-1a5cf.firebaseapp.com",
  databaseURL: "https://challenge-1a5cf-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "challenge-1a5cf",
  storageBucket: "challenge-1a5cf.appspot.com",
  messagingSenderId: "929899897452",
  appId: "1:929899897452:web:7d96f058b65cf4ef302e49",
  measurementId: "G-FDCVZL2HBT"
  };
  

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const database = getDatabase(app);

  export { auth, db, database, collection, addDoc, getDocs, onAuthStateChanged };