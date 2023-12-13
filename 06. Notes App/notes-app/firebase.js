// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,  collection } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzRWDOj0ioXrjYdODhTsD9MKHVr18iuxw",
  authDomain: "react-notes-d8570.firebaseapp.com",
  projectId: "react-notes-d8570",
  storageBucket: "react-notes-d8570.appspot.com",
  messagingSenderId: "1089230009605",
  appId: "1:1089230009605:web:bbf4dfd55922bc03cd736c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const notesCollection = collection(db, "notes");