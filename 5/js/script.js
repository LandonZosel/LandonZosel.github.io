'use strict';

async function getData() {
    try {
        const response = await fetch('/5/js/boardingData.json');
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

        console.log('Changed ' + elementId + 's text to: ' + text);
    }
}

function setCardsText(elementId, cardsData) {
    if ((typeof elementId === 'string')) {

        var cardSection = document.querySelector(elementId);
        var cards = cardSection.querySelectorAll('.card');

        cards.forEach((card, id) => {
            card.querySelector('h3').textContent = cardsData[id].title;
            card.querySelector('p').textContent = cardsData[id].description;
        });
    }
}

function setBackgroundImage(elementId, imgUrl) {
    if ( (typeof elementId === 'string') && (typeof imgUrl === 'string') ) {

        document.querySelector(elementId).style.setProperty('--hero-img', imgUrl);

        console.log('Changed ' + elementId + 's image to: ' + imgUrl);
    }
}

async function init() {
    var data = await getData()
    
    setText('title', data.title);

    setText('h1', data.header);

    setText('#heroTitle', data.hero.headline);
    setText('#heroDesc', data.hero.description);

    setText('#sec1Title', data.sections.overview.title);
    setText('#sec1Subtitle', data.sections.overview.subtitle);

    setCardsText('#sec1Grid', data.sections.overview.cards);

    setText('#sec2Title', data.sections.equipment.title);
    setText('#sec2Subtitle', data.sections.equipment.subtitle);

    setCardsText('#sec2Grid', data.sections.equipment.cards);

    setBackgroundImage('.hero', 'url(' + data.hero.image + ')');
}

window.onload = init;
