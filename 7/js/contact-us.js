'use strict';

import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

const db = getFirestore(window.app);

async function submitToDatabase(name, email, message) {
    try {
        if ((typeof name === 'string') && (typeof email === 'string') && (typeof message === 'string')) {
            const docRef = await addDoc(collection(db, "forms"), {
                name: name,
                email: email,
                message: message
            });
            return docRef;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

//called when the form is submitted
async function formSubmitted() {
    //populate fields
    var nameField = document.querySelector('#nameField');
    var nameText = nameField.value;

    var emailField = document.querySelector('#emailField');
    var emailText = emailField.value;

    var messageField = document.querySelector('#messageField');
    var messageText = messageField.value;

    var helperTextElement = document.querySelector('#helperText');
    //clear helper text
    helperTextElement.textContent = "";

    if (nameText.length === 0 || emailText.length === 0 || messageText.length === 0) {
        //dont submit but tell user why
        helperTextElement.textContent = "Please fill out all fields.";
        return;
    } else {
        //submit to database
        var dbResult = await submitToDatabase(nameText, emailText, messageText);

        if (dbResult === null) {
            //uh oh something went wrong, tell user why
            helperTextElement.textContent = "Error with database submission, please try again later.";
            return;
        } else {
            //clear values
            nameField.value = '';
            emailField.value = '';
            messageField.value = '';

            //show helper text to indicate completion
            helperTextElement.textContent = "Form Submitted!";
        }
    }
}

function contactUsInit() {
    //get form submit button
    var submitButton = document.querySelector('#submitButton');

    //set event listener to submit function
    submitButton.addEventListener('click', () => formSubmitted());
}

window.addEventListener('load', contactUsInit);
