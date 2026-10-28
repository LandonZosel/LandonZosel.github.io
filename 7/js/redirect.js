'use strict';

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

function redirectInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, do nothing
            return;
        } else {
            // User is signed out, redirect
            window.location.replace('/7/index.html');
        }
    });
}

window.addEventListener('load', redirectInit);
