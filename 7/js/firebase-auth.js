'use strict';

import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import { getAuth, signInWithPopup, onAuthStateChanged, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

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
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

function googleLogInPopup() {
    signInWithPopup(auth, provider)
    .then(() => {

    }).catch((error) => {
        // Handle Errors
        const errorCode = error.code;
        const errorMessage = error.message;
        
        console.log(errorCode + ": " + errorMessage)
    });
}

function authInit() {
    //get auth buttons
    var accountButton = document.querySelector('#accountButton');
    var logInButton = document.querySelector('#logInButton');

    //get nav
    var navBar = document.querySelector('#navBar');

    //check user status
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            //expose nav bar and hide log in button
            navBar.classList.remove('hidden');
            accountButton.classList.remove('hidden');
            logInButton.classList.add('hidden');
        } else {
            // User is signed out
            navBar.classList.add('hidden');
            accountButton.classList.add('hidden');
            logInButton.classList.remove('hidden');
        }
    });

    //set event listeners to buttons
    logInButton.addEventListener('click', () => googleLogInPopup());
}

window.addEventListener('load', authInit);
