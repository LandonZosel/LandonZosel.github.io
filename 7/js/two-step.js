'use strict';

//retrives data from JSON
async function getData() {
    try {
        const response = await fetch('/7/js/data.json');
        if (!response.ok) {
        throw new Error('Response status: ${response.status}');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message);
    }
}

//sets the text of a query using elementId to text
function setText(elementId, text) {
    if ((typeof elementId === 'string') && (typeof text === 'string')) {

        document.querySelector(elementId).textContent = text;
    }
}

//sets an image of a query using elementId to a src and its alt text
function setImage(elementId, src, alt) {
    if ((typeof elementId === 'string') && (typeof src === 'string') && (typeof alt === 'string')) {

        var img = document.querySelector(elementId);
        img.src = src;
        img.alt = alt;
    }
}

//sets an audio's src of a query using elementId
function setAudio(elementId, src) {
    if ((typeof elementId === 'string') && (typeof src === 'string')) {

        document.querySelector(elementId).src = src;
    }
}

let currentChoice = "none";

//sets the choices from the first choice to the second
function setFigures(elementId, figureData) {
    if ((typeof elementId === 'string')) {

        var figureSection = document.querySelector(elementId);
        var figures = figureSection.querySelectorAll('figure');

        figures.forEach((figure, id) => {
            var img = figure.querySelector('img');
            img.src = figureData[id].img.ref;
            img.alt = figureData[id].img.alt;
            figure.querySelector('h2').textContent = figureData[id].title;
        });
    }
}

//sets the info for the final page
function setInfoFields(data) {
    //set title
    setText('h1', data.title);

    //set text
    var text = data.text;
    setText('#definition', text.definition);
    setText('#classical', text.classical);
    setText('#imgCaption', text.imgCaption);
    setText('#pieceInfo', text.pieceInfo);
    setText('#pieceCaption', text.pieceCaption);
    setText('#funFact', text.funFact);

    //set images
    var imgs = data.imgs;
    setImage('#normal', imgs.normal.ref, imgs.normal.alt);
    setImage('#fun', imgs.fun.ref, imgs.fun.alt);

    //set audio
    var audio = data.audio;
    setAudio('#sample', audio.sample);
    setAudio('#piece', audio.piece);
}

//hides figures after final choice made
function hideFigures() {
    document.querySelector('#choices').hidden = true;
}

//reveals info after final choice made
function revealInfo() {
    document.querySelector('#info').hidden = false;
}

//called when a button is pressed and passes in the position of that button to determine what to display
//uses 'currentChoice' to decide if it is a first choice press or second
async function choiceSelected(position) {
    if (typeof position === 'string') {
        var data = await getData();

        if (currentChoice === "none") {
            //must be first choice
            switch (position) {
                case 'topLeft':
                    currentChoice = "idiophones";
                    var page = data.choicePages.idiophones;
                    //set title
                    setText('h1', page.title);
                    var choices = page.choices;
                    //set choices
                    setFigures('#choices', choices);
                    break;
                case 'topRight':
                    currentChoice = "membranophones";
                    var page = data.choicePages.membranophones;
                    //set title
                    setText('h1', page.title);
                    var choices = page.choices;
                    //set choices
                    setFigures('#choices', choices);
                    break;
                case 'botLeft':
                    currentChoice = "chordophones";
                    var page = data.choicePages.chordophones;
                    //set title
                    setText('h1', page.title);
                    var choices = page.choices;
                    //set choices
                    setFigures('#choices', choices);
                    break;
                case 'botRight':
                    currentChoice = "aerophones";
                    var page = data.choicePages.aerophones;
                    //set title
                    setText('h1', page.title);
                    var choices = page.choices;
                    //set choices
                    setFigures('#choices', choices);
                    break;
            }
        } else if (currentChoice === "idiophones") {
            //hide figures
            hideFigures();
            switch (position) {
                case 'topLeft':
                    //update the info fields
                    var instrumentData = data.instrumentPages.bells;
                    setInfoFields(instrumentData);
                    break;
                case 'topRight':
                    //update the info fields
                    var instrumentData = data.instrumentPages.cymbals;
                    setInfoFields(instrumentData);
                    break;
                case 'botLeft':
                    //update the info fields
                    var instrumentData = data.instrumentPages.gongs;
                    setInfoFields(instrumentData);
                    break;
                case 'botRight':
                    //update the info fields
                    var instrumentData = data.instrumentPages.xylophone;
                    setInfoFields(instrumentData);
                    break;
            }
            //make info fields visible
            revealInfo();
        } else if (currentChoice === "membranophones") {
            //hide figures
            hideFigures();
            switch (position) {
                case 'topLeft':
                    //update the info fields
                    var instrumentData = data.instrumentPages.bassDrum;
                    setInfoFields(instrumentData);
                    break;
                case 'topRight':
                    //update the info fields
                    var instrumentData = data.instrumentPages.snareDrum;
                    setInfoFields(instrumentData);
                    break;
                case 'botLeft':
                    //update the info fields
                    var instrumentData = data.instrumentPages.tambourine;
                    setInfoFields(instrumentData);
                    break;
                case 'botRight':
                    //update the info fields
                    var instrumentData = data.instrumentPages.timpani;
                    setInfoFields(instrumentData);
                    break;
            }
            //make info fields visible
            revealInfo();
        } else if (currentChoice === "chordophones") {
            //hide figures
            hideFigures();
            switch (position) {
                case 'topLeft':
                    //update the info fields
                    var instrumentData = data.instrumentPages.doubleBass;
                    setInfoFields(instrumentData);
                    break;
                case 'topRight':
                    //update the info fields
                    var instrumentData = data.instrumentPages.harp;
                    setInfoFields(instrumentData);
                    break;
                case 'botLeft':
                    //update the info fields
                    var instrumentData = data.instrumentPages.piano;
                    setInfoFields(instrumentData);
                    break;
                case 'botRight':
                    //update the info fields
                    var instrumentData = data.instrumentPages.violin;
                    setInfoFields(instrumentData);
                    break;
            }
            //make info fields visible
            revealInfo();
        } else if (currentChoice === "aerophones") {
            //hide figures
            hideFigures();
            switch (position) {
                case 'topLeft':
                    //update the info fields
                    var instrumentData = data.instrumentPages.flute;
                    setInfoFields(instrumentData);
                    break;
                case 'topRight':
                    //update the info fields
                    var instrumentData = data.instrumentPages.frenchHorn;
                    setInfoFields(instrumentData);
                    break;
                case 'botLeft':
                    //update the info fields
                    var instrumentData = data.instrumentPages.oboe;
                    setInfoFields(instrumentData);
                    break;
                case 'botRight':
                    //update the info fields
                    var instrumentData = data.instrumentPages.trombone;
                    setInfoFields(instrumentData);
                    break;
            }
            //make info fields visible
            revealInfo();
        }
    }
}

//sets buttons to function
function twoStepInit() {
    //get buttons
    var topLeftButton = document.querySelector('#topLeftButton');
    var topRightButton = document.querySelector('#topRightButton');
    var botLeftButton = document.querySelector('#botLeftButton');
    var botRightButton = document.querySelector('#botRightButton');

    //set event listeners to choiceSelected function
    topLeftButton.addEventListener('click', () => choiceSelected('topLeft'));
    topRightButton.addEventListener('click', () => choiceSelected('topRight'));
    botLeftButton.addEventListener('click', () => choiceSelected('botLeft'));
    botRightButton.addEventListener('click', () => choiceSelected('botRight'));
}

window.addEventListener('load', twoStepInit);
