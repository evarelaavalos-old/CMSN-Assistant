/** Shared logic */
class Bill {
    constructor() {
        this.date = '';
        this.fullName = '';
        this.affiliateNumber = 0;
        this.voucherNumber = '';
        this.tokenNumber = 0;
        this.diagnosis = '';
        this.practice = '';
        this.registeredDate = Date.now();
    }

    populateFromDom = (querySelectors, attribute = 'value', callback = undefined) => {
        if (!querySelectors) return;

        for (let property in querySelectors) {
            if (property in this) {
                let element = DomLocator.deepQuerySelector(querySelectors[property]);
                if (element) {
                    this[property] = callback ?
                        callback(element.getAttribute(attribute) || '') :
                        element.getAttribute(attribute) || '';
                }
            }
        }
    }

    toObject = () => {
        return {
            date: this.date,
            fullName: this.fullName,
            affiliateNumber: this.affiliateNumber,
            voucherNumber: this.voucherNumber,
            tokenNumber: this.tokenNumber,
            diagnosis: this.diagnosis,
            practice: this.practice,
            registeredDate: this.RegisteredDate,
        };
    }
}