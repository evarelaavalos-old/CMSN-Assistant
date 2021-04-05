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
}