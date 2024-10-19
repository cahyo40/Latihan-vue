// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBvNub7fZMFklOOkNnz5Bb8K1Q17J834SM",
    authDomain: "point-of-sale-4354c.firebaseapp.com",
    projectId: "point-of-sale-4354c",
    storageBucket: "point-of-sale-4354c.appspot.com",
    messagingSenderId: "1012393055736",
    appId: "1:1012393055736:web:45deb614daf6460cf6720d",
    measurementId: "G-XFCXXRT3YC"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }


