var jQuery = require("jquery");
window.parent.postMessage({monsterManagerLoaded:true}, '*');
function receiveMessage(event) {
    event.preventDefault();
    var eventUrl = event.data.url;
    if(eventUrl == null){
        console.log("No url to load, aborting");
    } else {
        jQuery.ajax({
            url: eventUrl,
            dataType: "text"
        }).done(function (data) {
            console.log("Loaded data from url: "+eventUrl);
            event.source.postMessage({data: data, type: event.data.type, url: eventUrl}, event.origin);
        });
    }
}
window.addEventListener("message", receiveMessage, false);