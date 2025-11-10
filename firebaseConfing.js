// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASooNqoqQG2lThuRvV-AL1ekcq3ctaRiw",
  authDomain: "barbechatbot.firebaseapp.com",
  projectId: "barbechatbot",
  storageBucket: "barbechatbot.firebasestorage.app",
  messagingSenderId: "51035787161",
  appId: "1:51035787161:web:b9bdb77ac521c6df3c8d08",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
