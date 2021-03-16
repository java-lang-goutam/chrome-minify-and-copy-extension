function shortenUrl(url, api_details, credentials) {
    var params = {
        "group_guid": credentials.group_guid,
        "domain": api_details.domain,
        "long_url": url
    }
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", api_details.url, true);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            displayTinyUrl(JSON.parse(this.responseText).link);
        }
    };

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader('Accept', 'application/json');
    xhttp.setRequestHeader('Authorization', 'Bearer ' + credentials.token);
    xhttp.send(JSON.stringify(params));
}

function copyTextToClipboard(text) {
    //Create a textbox field where we can insert text to. 
    var copyFrom = document.createElement("textarea");

    //Set the text content to be the text you wished to copy.
    copyFrom.textContent = text;

    //Append the textbox field into the body as a child. 
    //"execCommand()" only works when there exists selected text, and the text is inside 
    //document.body (meaning the text is part of a valid rendered HTML element).
    document.body.appendChild(copyFrom);

    //Select all the text!
    copyFrom.select();

    //Execute command
    document.execCommand('copy');

    //(Optional) De-select the text using blur(). 
    copyFrom.blur();

    //Remove the textbox field from the document.body, so no other JavaScript nor 
    //other elements can get access to this.
    document.body.removeChild(copyFrom);
}

function hideSpinner() {
    document.getElementById("loading").style.display = 'none';
    document.getElementById("loaded").style.display = 'block';
}

function displayTinyUrl(tinyurl) {
    if (tinyurl) {
        document.getElementById("tinyurl").value = tinyurl;
        copyTextToClipboard(tinyurl);
    }
    hideSpinner();
}


function main() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        let currentUrl = tabs[0].url;

        chrome.storage.sync.get(['api_details', 'credentials'], function(result) {
            shortenUrl(currentUrl, result.api_details, result.credentials);
        });
    });
}

main();