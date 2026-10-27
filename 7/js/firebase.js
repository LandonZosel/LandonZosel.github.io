'use strict';

import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import { getAuth, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged, getRedirectResult, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

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
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

const db = getFirestore(app);

function googleLogInPopup() {
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
    // getRedirectResult(auth)
    // .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access Google APIs.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;

    //     // The signed-in user info.
    //     const user = result.user;
    //     // IdP data available using getAdditionalUserInfo(result)
    //     // ...
    //     console.log('Signing in...');
    // }).catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    //     console.log('Signing in error!');
    // });
}

function googleLogInRedirect() {
    signInWithRedirect(auth, provider);
    getRedirectResult(auth)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log('Signing in...');
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log('Signing in error!');
    });
}

async function googleLogOut() {
    await signOut(auth).then(() => {
        // Sign-out successful.
        console.log('Signing out...');
    }).catch((error) => {
        // An error happened.
        console.log('Sign out error!');
    });

    
}

function init() {
    //get auth buttons
    var logOutButton = document.querySelector('#logOutButton');
    var logInButton = document.querySelector('#logInButton');

    //get nav
    var navBar = document.querySelector('#navBar');

    //check user status
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            // ...

            //user signed in, expose nav bar and hide log in button
            navBar.classList.remove('hidden');
            logOutButton.classList.remove('hidden');
            logInButton.classList.add('hidden');

            console.log("the user is signed in horray!");
        } else {
            // User is signed out
            // ...
            navBar.classList.add('hidden');
            logOutButton.classList.add('hidden');
            logInButton.classList.remove('hidden');

            console.log("the user is not signed in...");
        }
    });

    //set event listeners to buttons
    logOutButton.addEventListener('click', () => googleLogOut());
    logInButton.addEventListener('click', () => googleLogInRedirect());
}

window.onload = init;
