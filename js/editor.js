var App = require('./app.js'),
    Editor = require('./services/MonsterEditor');
App.initialize();
Editor.initialize(window.flux.actions.updateMonsters);