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

    toObject = () => ({
        date: this.date,
        fullName: this.fullName,
        affiliateNumber: this.affiliateNumber,
        voucherNumber: this.voucherNumber,
        tokenNumber: this.tokenNumber,
        diagnosis: this.diagnosis,
        practice: this.practice,
        registeredDate: this.RegisteredDate,
    })
}
