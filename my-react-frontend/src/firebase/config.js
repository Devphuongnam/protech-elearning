// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRXRzFZ0sAbIC0KeghYk8L5ltQVi-VF8k",
  authDomain: "protech-elearning.firebaseapp.com",
  projectId: "protech-elearning",
  storageBucket: "protech-elearning.appspot.com",
  messagingSenderId: "612439816898",
  appId: "1:612439816898:web:91ea001f7ae9e6b3e5595b",
  measurementId: "G-DFZD34XE5S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
