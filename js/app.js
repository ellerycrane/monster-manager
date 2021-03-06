var React = require('react'),
    Fluxxor = require('fluxxor'),
    Stores = require('./stores/Stores.js'),
    Actions = require('./actions/Actions.js'),
    MonsterParser = require('./services/MonsterParser'),
    MonsterManagerApplication = require('./components/MonsterManagerApplication.react.js');

var initialize = function (monsterManagerContainerElement) {
    if(!monsterManagerContainerElement){
        monsterManagerContainerElement = document.getElementById('monster-manager-container');
    }
    var flux = new Fluxxor.Flux(Stores, Actions);
    flux.on("dispatch", function (type, payload) {
        if (console && console.log) {
            console.log("[Dispatch]", type, payload);
        }
    });
    window.React = React;
    window.flux = flux;

    React.render(
        <MonsterManagerApplication flux={flux} />,
        monsterManagerContainerElement
    );

    window.MonsterManager.updateMonsters = function(data){
        monsters = MonsterParser.parseMonstersFromYaml(data);
        flux.actions.updateMonsters(monsters);
    }
};

window.MonsterManager = {
    initialize: initialize
};

module.exports = {
    initialize: initialize
};