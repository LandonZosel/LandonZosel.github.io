'use strict';

import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDG49YVN6JoKhv2OMddvKTF6Ik2j69GWmg",
    authDomain: "landonzoselgithubio.firebaseapp.com",
    projectId: "landonzoselgithubio",
    storageBucket: "landonzoselgithubio.firebasestorage.app",
    messagingSenderId: "462471670623",
    appId: "1:462471670623:web:a2c2c57d6b98d267fb64ea"
};

// Initialize Firebase
window.app = initializeApp(firebaseConfig);

const auth = getAuth(window.app);

async function googleLogOut() {
    await signOut(auth).then(() => {
        //redirect to home page
        window.location.replace('/7/pages/index.html');
    }).catch((error) => {
        // Handle Errors
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode + ": " + errorMessage)
    });
}

function accountInit() {
    //get account buttons
    var logOutButton = document.querySelector('#logOutButton');

    //set event listeners to buttons
    logOutButton.addEventListener('click', () => googleLogOut());
}

window.addEventListener('load', accountInit);
