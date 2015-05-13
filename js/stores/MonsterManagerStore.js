var Fluxxor = require('fluxxor'),
    Constants = require('../constants/MonsterManagerConstants');

var MonsterManagerStore = Fluxxor.createStore({
    initialize: function () {
        this.monsters = [];
        this.expanded = true;
        this.bindActions(
            Constants.UPDATE_MONSTERS, this.handleUpdateMonsters,
            Constants.TOGGLE_EXPANDED, this.handleToggleExpanded
        );
    },

    handleToggleExpanded: function(payload, type) {
        console.log("Calling handleToggleExpanded");
        this.expanded = !this.expanded;
        this.emit(Constants.change);
    },

    handleUpdateMonsters: function (payload, type) {
        this.monsters = payload.monsters;
        this.emit(Constants.change);
    },

    getState: function () {
        return {
            monsters: this.monsters,
            expanded: this.expanded
        };
    }
});

module.exports = MonsterManagerStore;