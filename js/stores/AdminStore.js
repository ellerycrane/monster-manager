var Fluxxor = require('fluxxor'),
    Constants = require('../constants/MonsterManagerConstants');

var AdminStore = Fluxxor.createStore({
    initialize: function() {
        //this.bindActions();
    },



    getState: function(){
        return {
        };
    }
});

module.exports = AdminStore;