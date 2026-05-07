import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getFirestore
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* FIREBASE CONFIG */

const firebaseConfig = {

    apiKey: "AIzaSyAHSWo_3dgB2uMiOtTahB4Wawf8O7T3Gqs",

    authDomain: "news-app-cc6a9.firebaseapp.com",

    projectId: "news-app-cc6a9",

    storageBucket: "news-app-cc6a9.firebasestorage.app",

    messagingSenderId: "544675179946",

    appId: "1:544675179946:web:3decd636874dddefa08fd3"

};

/* INITIALIZE FIREBASE */

const app = initializeApp(firebaseConfig);

/* AUTH */

const auth = getAuth(app);

/* FIRESTORE DATABASE */

const db = getFirestore(app);

/* EXPORT */

export { auth, db };

