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

function setFigures(elementId, figureData) {
    if ((typeof elementId === 'string')) {

        var figureSection = document.querySelector(elementId);
        var figures = figureSection.querySelectorAll('figure');

        figures.forEach((figure, id) => {
            var img = figure.querySelector('img');
            img.src = figureData[id].img.ref;
            img.alt = figureData[id].img.alt-text;
            figure.querySelector('h2').textContent = cardsData[id].title;
        });
    }
}

async function firstChoiceSelected(position) {
    if (typeof position === 'string') {
        var data = await getData();

        switch (position) {
            case 'topLeft':
                var page = data.choice-pages.idiophones;
                setText('#title', page.title);
                var choices = page.choices;
                setFigures('#choices', choices);
                break;
            case 'topRight':
                var page = data.choice-pages.membranophones;
                setText('#title', page.title);
                var choices = page.choices;
                setFigures('#choices', choices);
                break;
            case 'botLeft':
                var page = data.choice-pages.chordophones;
                setText('#title', page.title);
                var choices = page.choices;
                setFigures('#choices', choices);
                break;
            case 'botRight':
                var page = data.choice-pages.aerophones;
                setText('#title', page.title);
                var choices = page.choices;
                setFigures('#choices', choices);
                break;
        }
    }
}

function init() {
    var topLeftButton = document.querySelector('#topLeftButton');
    var topRightButton = document.querySelector('#topRightButton');
    var botLeftButton = document.querySelector('#botLeftButton');
    var botRightButton = document.querySelector('#botRightButton');

    topLeftButton.addEventListener('click', firstChoiceSelected('topLeft'));
    topRightButton.addEventListener('click', firstChoiceSelected('topRight'));
    botLeftButton.addEventListener('click', firstChoiceSelected('botLeft'));
    botRightButton.addEventListener('click', firstChoiceSelected('botRight'));
}

window.onload = init;
