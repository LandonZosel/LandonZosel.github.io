'use strict';

async function getData() {
    try {
        const response = await fetch('/6/js/data.json');
        if (!response.ok) {
        throw new Error('Response status: ${response.status}');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error.message);
    }
}

function setText(elementId, text) {
    if ((typeof elementId === 'string') && (typeof text === 'string')) {

        document.querySelector(elementId).textContent = text;
    }
}

function setImage(elementId, src, alt) {
    if ((typeof elementId === 'string') && (typeof src === 'string') && (typeof alt === 'string')) {

        var img = document.querySelector(elementId);
        img.src = src;
        img.alt = alt;
    }
}

function setAudio(elementId, src) {
    if ((typeof elementId === 'string') && (typeof src === 'string')) {

        document.querySelector(elementId).src = src;
    }
}

let currentChoice = "none";

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

function hideFigures() {
    document.querySelector('#choices').hidden = true;
}

function revealInfo() {
    document.querySelector('#info').hidden = false;
}

async function choiceSelected(position) {
    if (typeof position === 'string') {
        var data = await getData();

        if (currentChoice === "none") {
            switch (position) {
                case 'topLeft':
                    currentChoice = "idiophones";
                    var page = data.choicePages.idiophones;
                    setText('h1', page.title);
                    var choices = page.choices;
                    setFigures('#choices', choices);
                    break;
                case 'topRight':
                    currentChoice = "membranophones";
                    var page = data.choicePages.membranophones;
                    setText('h1', page.title);
                    var choices = page.choices;
                    setFigures('#choices', choices);
                    break;
                case 'botLeft':
                    currentChoice = "chordophones";
                    var page = data.choicePages.chordophones;
                    setText('h1', page.title);
                    var choices = page.choices;
                    setFigures('#choices', choices);
                    break;
                case 'botRight':
                    currentChoice = "aerophones";
                    var page = data.choicePages.aerophones;
                    setText('h1', page.title);
                    var choices = page.choices;
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
                    
                    break;
                case 'botLeft':
                    
                    break;
                case 'botRight':
                    
                    break;
            }
            //make info fields visible
            revealInfo();
        } else if (currentChoice === "membranophones") {
            
        } else if (currentChoice === "chordophones") {

        } else if (currentChoice === "aerophones") {

        }
        
    }
}

function init() {
    var topLeftButton = document.querySelector('#topLeftButton');
    var topRightButton = document.querySelector('#topRightButton');
    var botLeftButton = document.querySelector('#botLeftButton');
    var botRightButton = document.querySelector('#botRightButton');

    topLeftButton.addEventListener('click', () => choiceSelected('topLeft'));
    topRightButton.addEventListener('click', () => choiceSelected('topRight'));
    botLeftButton.addEventListener('click', () => choiceSelected('botLeft'));
    botRightButton.addEventListener('click', () => choiceSelected('botRight'));
}

window.onload = init;
