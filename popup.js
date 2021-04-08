document.addEventListener('DOMContentLoaded', async () => {
    
    await displayBills();

});

const displayBills = (function(){
    const emptyElement = document.getElementById('empty-list');
    
    return async function() {
        const savedBills = await BillService.getBills();
        
        //Hide the "show more" button
        const showMoreButton = document.getElementById('show-more');
        showMoreButton.setAttribute('hidden', '');
        
        //Append the empty element to the items list
        const items = document.getElementById('items-list');
        items.innerHTML = '';
        items.append(emptyElement);
        
        if (savedBills.length) {
            //Show the "show more" button
            showMoreButton.removeAttribute('hidden');
        
            //Remove the empty message from the items list
            items.removeChild(emptyElement);
        
            //Display max 5 bills
            let maxBills = 5;
            for (let i = 0; (i < savedBills.length) && (i < maxBills); i++) {
                //Create the elements for the bills
                const { fullName, affiliateNumber, tokenNumber } = savedBills[i];
                
                const patientFullname = document.createElement('h2');
                patientFullname.classList.add('patient-fullname');
                patientFullname.appendChild(document.createTextNode(fullName))
                
                const patientAffiliateNumber = document.createElement('p');
                patientAffiliateNumber.classList.add('patient-affiliate-number');
                patientAffiliateNumber.appendChild(document.createTextNode(
                `Nro. de Afiliado: ${affiliateNumber}`))
                
                const billPatient = document.createElement('div');
                billPatient.classList.add('patient');
                billPatient.appendChild(patientFullname);
                billPatient.appendChild(patientAffiliateNumber);
                
                const tokenNumberElement = document.createElement('span');
                tokenNumberElement.classList.add('token-number');
                tokenNumberElement.appendChild(document.createTextNode(tokenNumber));
                
                const billToken = document.createElement('h4');
                billToken.classList.add('token');
                billToken.appendChild(document.createTextNode('Nro. de Comprobante:'));
                billToken.appendChild(document.createTextNode("\u00A0"));
                billToken.appendChild(tokenNumberElement);
                
                const bill = document.createElement('div');
                bill.classList.add('item');
                bill.appendChild(billPatient);
                bill.appendChild(billToken);
                
                //Append them into the list
                items.appendChild(bill);
            }
        }
    }
})();