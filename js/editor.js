var App = require('./app.js'),
    Editor = require('./services/MonsterEditor');
App.initialize();
Editor.initialize(window.flux.actions.updateMonsters);


//function receiveMessage(event) {
//    var eventUrl = event.data.url;
//    if(eventUrl == null){
//        console.log("No url to load, aborting");
//    } else {
//        $.ajax({
//            url: eventUrl,
//            dataType: "text"
//        }).done(function (data) {
//            console.log("Loaded data");
//            eval(data);
//            //event.source.postMessage({urldata: data}, event.origin);
//        });
//    }
//    //
//    //console.log("got message!");
//    //console.log(event);
//    //console.log(event.source);
//    //console.log(event.data);
//    //event.source.postMessage({test:true, foo:'bar', app:App}, event.origin);
//}
//
//window.addEventListener("message", receiveMessage, false);