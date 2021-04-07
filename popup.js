document.addEventListener('DOMContentLoaded', async () => {
    
    await displayBills();

});

const displayBills = async () => {
    const savedBills = await BillService.getBills();
    
    const items = document.getElementById('items-list');
    const emptyElement = document.getElementById('empty-list');
    const showMoreButton = document.getElementById('show-more');

    if (savedBills === []) {
        showMoreButton.setAttribute('hidden');
    } else {
        showMoreButton.removeAttribute('hidden');
    }
}

