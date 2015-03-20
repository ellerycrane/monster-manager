var React = require('react'),
    Fluxxor = require('fluxxor'),
    Stores = require('./stores/Stores.js'),
    Actions = require('./actions/Actions.js');

var flux = new Fluxxor.Flux(Stores, Actions);
flux.on("dispatch", function(type, payload) {
    if (console && console.log) {
        console.log("[Dispatch]", type, payload);
    }
});
window.React = React;
window.flux = flux;
var MonsterManagerApplication = require('./components/MonsterManagerApplication.react.js');

React.render(
    <MonsterManagerApplication flux={flux} />,
    document.getElementById('monster-manager-container')
);