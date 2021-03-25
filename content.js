console.log(`Is this working?`);

let BUTTON_FOUNDED = false;

function getSubmitButton() {
    console.log(`The function getSubmitButton() is executing.`);
    let button = document.querySelector('a#ctl00_body_btnEnviarPractica');

    //If not founded, search inside iframes
    if (button === undefined || button === null) {
        console.log(`Searching inside iframes`);
        let iframes = document.getElementsByTagName('iframe');
        
        for (iframe of iframes) {
            let innerDoc = iframe.contentDocument || iframe.contentWindow.document;
            button = innerDoc.querySelector('a#ctl00_body_btnEnviarPractica');

            if (button !== undefined && button !== null) {
                BUTTON_FOUNDED = true;
                break;
            }
        }
    } else {
        BUTTON_FOUNDED = true;
    }

    BUTTON_FOUNDED
        ? console.log('Submit button founded')
        : console.log('Submit button not founded');

    console.log(button);

    return button;
}

getSubmitButton();

// setInterval(getSubmitButton, 10000);
