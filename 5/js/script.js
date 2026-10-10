'use strict';

function setText(elementId, message) {
	if ( (typeof elementId === 'string') && (typeof message === 'string') ) {
	
		var output = document.getElementById(elementId);

		output.textContent = message;
	}
}

async function init() {
    try {
        const response = await fetch('/js/boardingData.json');
        if (!response.ok) {
        throw new Error('Response status: ${response.status}');
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }

	var message = 'yay';

    console.log(message);
    // setText('output', message);
}

window.onload = init;
