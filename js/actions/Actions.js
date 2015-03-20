var Constants = require('../constants/MonsterManagerConstants');
var AjaxLoader = require('../services/AjaxLoader');
var Roll20Client = require('../services/Roll20Client');

var Actions;
Actions = {
    updateMonsters: function(monsters){
        this.dispatch(Constants.UPDATE_MONSTERS, {monsters: monsters});
    },
    loadMonsters: function(url){
        AjaxLoader.load(url, Actions.updateMonsters.bind(this));
    },
    rollStat: function(monster, stat){
        Roll20Client.rollStat(monster, stat);
    }

};

module.exports = Actions;