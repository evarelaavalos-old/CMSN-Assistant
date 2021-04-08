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
                
                const patient = getPatientHtml(fullName, affiliateNumber);
                const token = getTokenHtml(tokenNumber);

                const bill = document.createElement('div');
                bill.className = 'item';
                bill.innerHTML += patient;
                bill.innerHTML += token;
                
                //Append them into the list
                items.appendChild(bill);
            }
        }
    }
})();

const getPatientHtml = (fullName, affiliateNumber) =>
    `<div class="patient">
        <h2 class="patient-fullname">${fullName}</h2>
        <p class="patient-affiliate-number">Nro. de Afiliado: ${affiliateNumber}</p>
    </div>`
    
const getTokenHtml = (tokenNumber) =>
    `<h4 class="token">Nro. de Comprobante:
        <span class="token-number">${tokenNumber}</span>
    </h4>`