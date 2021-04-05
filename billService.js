/** @private */
const BILLS_KEY = 'bills';

/** Shared Logic */
class BillService {
    /**
     * @returns {Promise<Array>}
     */
    static getBills = () => {
        const promise = new Promise((resolve, reject) => {
            try {
                chrome.storage.local.get([BILLS_KEY], (result) => {
                    if (chrome.runtime.lastError)
                        reject(chrome.runtime.lastError);
                    
                    const researches = result.bills ?? [];
                    resolve(researches);
                })
            }
            catch (err) {
                reject(err);
            }
        })

        return promise;
    }

    static saveBill = async (newBill) => {
        const bills = await this.getBills();
        const updatedBills = [...bills, newBill];

        const promise = new Promise((resolve, reject) => {
            try {
                chrome.storage.local.set({ [BILLS_KEY]: updatedBills }, () => {
                    if (chrome.runtime.lastError)
                        reject(chrome.runtime.lastError);
                    resolve(updatedBills);
                });
            }
            catch (err) {
                reject(err);
            }
        });

        return promise;
    }

    static clearBills = async () => {
        const promise = new Promise((resolve, reject) => {
            try {
                chrome.storage.local.clear(() => {
                    if (chrome.runtime.lastError)
                        reject(chrome.runtime.lastError);

                    resolve();
                });
            }
            catch (err) {
                reject(err);
            }
        });

        return promise;
    }
}