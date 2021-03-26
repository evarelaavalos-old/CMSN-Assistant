chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.runtime.sendMessage({
        type: 'SEARCH_SUBMIT_BUTTON',
        url: tab.url,
        payload: undefined
    });
})