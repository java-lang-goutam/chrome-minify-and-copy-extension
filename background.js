let api_details = {
    "domain": "bit.ly",
    "url": "https://api-ssl.bitly.com/v4/shorten"
}

let credentials = {}

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        credentials
    });
    chrome.storage.sync.set({
        api_details
    });
    chrome.tabs.create({ url: "options.html" });
});