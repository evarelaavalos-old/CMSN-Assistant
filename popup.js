document.addEventListener('DOMContentLoaded', async () => await displayBills());

const displayBills = (function(){
    
    const MAX_BILLS = 5;
    const emptyElement = document.getElementById('empty-list');
    
    return async function() {
        //Getting the bills from the storage
        const savedBills = await BillService.getBills();
        const bills = savedBills.slice(0, MAX_BILLS);

        //Hide the "show more" button
        const showMoreButton = document.getElementById('show-more');
        showMoreButton.setAttribute('hidden', '');
        
        //Append the empty element to the items list
        const items = document.getElementById('items-list');
        items.innerHTML = '';
        items.append(emptyElement);
        
        if (bills.length) {
            //Show the "show more" button
            showMoreButton.removeAttribute('hidden');
        
            //Remove the empty message from the items list
            items.removeChild(emptyElement);
        
            //Display the bills
            for (bill of bills) {
                //Create the elements for the bills
                const { fullName, affiliateNumber, tokenNumber } = bill;
                
                const patient = getPatientHtml(fullName, affiliateNumber);
                const token = getTokenHtml(tokenNumber);
    
                const billElement = document.createElement('div');
                billElement.className = 'item';
                billElement.innerHTML += patient;
                billElement.innerHTML += token;
                
                //Append the bill to the list
                items.appendChild(billElement);
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