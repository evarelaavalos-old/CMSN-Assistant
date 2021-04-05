chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.type) {
        case 'SEARCH_SUBMIT_BUTTON':
            addEventToSubmitButton();
            break;
        default:
            console.log(`Command ${command} not founded`);
    }
});

function getSubmitButton() {
    let button = DomLocator.deepQuerySelector('a#ctl00_body_btnEnviarPractica');
    return button;
}    

function createBill() {
    const bill = new Bill();
    bill.voucherNumber = 'Ambulatorio';
    
    bill.populateFromDom({
        date: 'input#ctl00_body_txtFechaRealizacion',
        fullName: 'input#ctl00_body_txtNombreApellido',
        affiliateNumber: 'input#ctl00_body_txtNroAfiliado',
        diagnosis: 'input#ctl00_body_txtCodigoCie10',
        practice: 'input#ctl00_body_txtCodigoPractica',
    });
    
    bill.populateFromDom({
        tokenNumber: 'input#UNKNOWN',
    },'value', (value) => {
        //Apply some filters to value
        return value;
    })

    return bill;
}

function storeBill() {
    const bill = createBill();
    //Store it somewhere
}

function addEventToSubmitButton() {
    // If multiple identical EventListeners are registered on the same
    // EventTarget with the same parameters, the duplicate instances are
    // discarded. They do not cause the EventListener to be called twice,
    // and they do not need to be removed manually with the removeEventListener method.
    // See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    const button = getSubmitButton();
    button.addEventListener('click', storeBill);
}

addEventToSubmitButton();