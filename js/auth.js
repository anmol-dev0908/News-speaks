import { auth, db } from "./firebase.js";

import {

    createUserWithEmailAndPassword,

    signInWithEmailAndPassword,

    updateProfile

}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {

    doc,

    setDoc

}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* SIGNUP */

const signupForm =
document.getElementById("signupForm");

if(signupForm){

    signupForm.addEventListener("submit",
    async (e) => {

        e.preventDefault();

        const name =
        document.getElementById("name").value;

        const email =
        document.getElementById("email").value;

        const password =
        document.getElementById("password").value;

        const country =
        document.getElementById("country").value;

        const state =
        document.getElementById("state").value;

        const district =
        document.getElementById("district").value;

        try{

            /* CREATE USER */

            const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            /* UPDATE USER PROFILE */

            await updateProfile(user, {

                displayName: name

            });

            /* SAVE USER DATA */

            await setDoc(doc(db, "users", user.uid), {

                name,
                email,
                country,
                state,
                district

            });

            alert("Signup Successful");

            window.location.href = "login.html";

        }catch(error){

            alert(error.message);

        }

    });

}

/* LOGIN */

const loginForm =
document.getElementById("loginForm");

if(loginForm){

    loginForm.addEventListener("submit",
    async (e) => {

        e.preventDefault();

        const email =
        document.getElementById("loginEmail").value;

        const password =
        document.getElementById("loginPassword").value;

        try{

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            alert("Login Successful");

            window.location.href = "index.html";

        }catch(error){

            alert(error.message);

        }

    });

}