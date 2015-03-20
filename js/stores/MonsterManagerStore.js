var Fluxxor = require('fluxxor'),
    Constants = require('../constants/MonsterManagerConstants');

var MonsterManagerStore = Fluxxor.createStore({
    initialize: function() {
        this.monsters = [];
        this.bindActions(
            Constants.UPDATE_MONSTERS, this.handleUpdateMonsters
        );
    },

    handleUpdateMonsters: function(payload, type) {
        this.monsters = payload.monsters;
        this.emit(Constants.change);
    },

    getState: function(){
        return {
            monsters: this.monsters
        };
    }
});

module.exports = MonsterManagerStore;