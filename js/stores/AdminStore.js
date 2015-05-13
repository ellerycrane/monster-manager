var Fluxxor = require('fluxxor'),
    Constants = require('../constants/MonsterManagerConstants');

var AdminStore = Fluxxor.createStore({
    initialize: function() {
        this.activeToolbarItemName = null;
        this.bindActions(
            Constants.SELECT_ACTIVE_TOOLBAR_ITEM, this.handleSelectActiveToolbarItem
        );
    },

    handleSelectActiveToolbarItem: function (payload, type) {
        this.activeToolbarItemName = this.activeToolbarItemName === payload ? null : payload;
        this.emit(Constants.change);
    },

    getState: function(){
        return {
            activeToolbarItemName: this.activeToolbarItemName
        };
    }
});

module.exports = AdminStore;