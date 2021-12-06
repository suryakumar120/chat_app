// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrobFCXoFkuZuMo8qWF2_hPoGPtra25ME",
  authDomain: "chat-app-1f95d.firebaseapp.com",
  projectId: "chat-app-1f95d",
  storageBucket: "chat-app-1f95d.appspot.com",
  messagingSenderId: "841827701422",
  appId: "1:841827701422:web:f43b7c41f664c00350933f",
  measurementId: "G-8612ZKFBHJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
var firestore = getFirestore();
// var storage = getStorage();
export default firestore = getFirestore();