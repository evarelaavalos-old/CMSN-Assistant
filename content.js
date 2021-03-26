chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.type) {
        case 'SEARCH_SUBMIT_BUTTON':
            getSubmitButton();
            break;
        default:
            console.log(`Command ${command} not founded`);
    }
});

function addEventToSubmitButton() {
    // If multiple identical EventListeners are registered on the same
    // EventTarget with the same parameters, the duplicate instances are
    // discarded. They do not cause the EventListener to be called twice,
    // and they do not need to be removed manually with the removeEventListener method.
    // See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    const button = getSubmitButton();
    button.addEventListener('click', storeBill);
}

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

            if (!(button === undefined || button === null)) {
                break;
            }    
        }    
    }

    console.log( (button === undefined || button === null) 
        ? 'Submit button not founded' 
        : 'Submit button founded', button);

    return button || undefined;
}    

function storeData() {
    const bill = new Bill();
    // Store the bill somewhere using bill.toObject()
}

addEventToSubmitButton();