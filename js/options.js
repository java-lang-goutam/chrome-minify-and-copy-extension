function handleButtonClick(event) {

    var credentials = {
        "token": document.getElementById("token").value,
        "group_guid": document.getElementById("group-guid").value
    }
    chrome.storage.sync.set({ credentials }, function() {
        document.getElementsByClassName("remember_me")[0].style.display = 'block';
    });

}

function constructOptions() {
    chrome.storage.sync.get(['credentials'], function(value) {
        if (value.credentials.token) {
            document.getElementById("token").value = value.credentials.token;
        }
        if (value.credentials.group_guid) {
            document.getElementById("group-guid").value = value.credentials.group_guid
        }
    });
    document.getElementById("save-button").addEventListener("click", handleButtonClick);
}

constructOptions();