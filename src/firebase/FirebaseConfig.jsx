// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0R8q2J8XHrozVjlcUJdO-Jt49xt8Alks",
  authDomain: "ecommproject-64bcd.firebaseapp.com",
  projectId: "ecommproject-64bcd",
  storageBucket: "ecommproject-64bcd.appspot.com",
  messagingSenderId: "148874291410",
  appId: "1:148874291410:web:e80cb7a788e543cd2a650b"
};

const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }