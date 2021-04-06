class DomLocator {
    static deepQuerySelector = (selector) => {
        let element = document.querySelector(selector);
    
        //If not founded, search inside iframes
        if (!element) {
            let iframes = document.getElementsByTagName('iframe');
            
            for (iframe of iframes) {
                let innerDoc = iframe.contentDocument || iframe.contentWindow.document;
                element = innerDoc.querySelector(selector);
                if (element) break;
            }
        }
        return element;
    }

    static getMultipleElements = selectors =>
        Object.entries(selectors).reduce(
            (acc, [key, value]) => ({
                ...acc,
                [key]: this.deepQuerySelector(value)
            }),
            {}
        )
        
    static getMultipleValues = elements => 
        Object.entries(elements).reduce(
            (acc, [key, value]) => {
                return value
                ? ({
                    ...acc,
                    [key]: value.getAttribute('value') || ''
                })
                : ({
                    ...acc,
                    [key]: undefined,
                });
            },
            {}
        )
}