// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhq7WHb5x4WYwe3MgxC5IYwQMLhRanKpA",
  authDomain: "melanoma-society-australia.firebaseapp.com",
  projectId: "melanoma-society-australia",
  storageBucket: "melanoma-society-australia.firebasestorage.app",
  messagingSenderId: "273211173417",
  appId: "1:273211173417:web:2bef067da0f3d1fc8f0a38",
  measurementId: "G-3L57JH6LPX"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); init this breaks everything

//  init firestore service
const db = getFirestore();
export default db