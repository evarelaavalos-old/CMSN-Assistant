chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.type) {
        case 'SEARCH_SUBMIT_BUTTON':
            addEventToSubmitButton();
            break;
        default:
            console.log(`Command ${command} not founded`);
    }
});

const getSubmitButton = () => {
    let button = DomLocator.deepQuerySelector('a#ctl00_body_btnEnviarPractica');
    return button;
}

const createBill = () => {
    const dataSelectors = {
        date: 'input#ctl00_body_txtFechaRealizacion',
        fullName: 'input#ctl00_body_txtNombreApellido',
        affiliateNumber: 'input#ctl00_body_txtNroAfiliado',
        diagnosis: 'input#ctl00_body_txtCodigoCie10',
        practice: 'input#ctl00_body_txtCodigoPractica',
        tokenNumber: 'input#UNKNOWN',
    }
    
    const dataElements = DomLocator.getMultipleElements(dataSelectors);
    
    const data = DomLocator.getMultipleValues(dataElements);

    //apply filters to data.tokenNumber

    const bill = new Bill();
    bill.date = data.date;
    bill.fullName = data.fullName;
    bill.affiliateNumber = data.affiliateNumber;
    bill.voucherNumber = 'Ambulatorio';
    bill.tokenNumber = data.tokenNumber;
    bill.diagnosis = data.diagnosis;
    bill.practice = data.practice;

    return bill;
}

const storeBill = async () => {
    const newBill = createBill();
    
    await BillService.saveBill(newBill);
}

const addEventToSubmitButton = () => {
    // If multiple identical EventListeners are registered on the same
    // EventTarget with the same parameters, the duplicate instances are
    // discarded. They do not cause the EventListener to be called twice,
    // and they do not need to be removed manually with the removeEventListener method.
    // See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    const button = getSubmitButton();
    button.addEventListener('click', storeBill);
}

addEventToSubmitButton();