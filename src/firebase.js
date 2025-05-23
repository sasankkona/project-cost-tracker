import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDpsnZIj9M4lxIX5fijMB9iAPk-bg1g_XM",
    authDomain: "project-cost-tracker-9879d.firebaseapp.com",
    projectId: "project-cost-tracker-9879d",
    storageBucket: "project-cost-tracker-9879d.firebasestorage.app",
    messagingSenderId: "161324386064",
    appId: "1:161324386064:web:5a45123233945bb72dc795"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
