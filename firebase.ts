import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyCgnB1hcrCTJEkkaT4i8xSYrzZ-VkylqxY",
    authDomain: "dv300-classproject-2025.firebaseapp.com",
    projectId: "dv300-classproject-2025",
    storageBucket: "dv300-classproject-2025.firebasestorage.app", // this is our bucket storage
    messagingSenderId: "1000270471116",
    appId: "1:1000270471116:web:86c9dfda65c19dfde0c769"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// TODO: Initialize Cloud Firestore, Cloud Storage and get a reference to the service
export const storage = getStorage(app);
export const db = getFirestore(app);