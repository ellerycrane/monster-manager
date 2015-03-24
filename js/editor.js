var App = require('./app.js'),
    Editor = require('./services/MonsterEditor');
App.initialize();
Editor.initialize(window.flux.actions.updateMonsters);


function receiveMessage(event) {
    console.log("got message!");
    console.log(event);
    console.log(event.source);
    console.log(event.data);
    event.source.postMessage("Got an event: "+JSON.stringify(event), event.origin);
}

window.addEventListener("message", receiveMessage, false);