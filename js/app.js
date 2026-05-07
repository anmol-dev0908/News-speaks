import { auth }
from "./firebase.js";

import {

    onAuthStateChanged,

    signOut

}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* SHOW USER NAME */

const userName =
document.getElementById("userName");

onAuthStateChanged(auth, (user) => {

    if(user){

        userName.innerText =
        `Welcome ${user.displayName}`;

    }else{

        userName.innerText = "Guest";

    }

});

/* LOGOUT */

const logoutBtn =
document.getElementById("logoutBtn");

logoutBtn.addEventListener("click",
async () => {

    await signOut(auth);

    alert("Logged Out");

    window.location.href = "login.html";

});