import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDG8yi0qMjCpvtMzdRXSiHNqIxVnrVTqeE",
    authDomain: "challenge-1a5cf.firebaseapp.com",
    projectId: "challenge-1a5cf",
    storageBucket: "challenge-1a5cf.appspot.com",
    messagingSenderId: "929899897452",
    appId: "1:929899897452:web:1ad5cfd88187ae15302e49",
    measurementId: "G-J8LYYS289H"
  };
  

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const database = getDatabase(app);

  export { auth, db, database, collection, addDoc, getDocs, onAuthStateChanged };