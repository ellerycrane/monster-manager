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
    },
    rollAttack: function(monster, attack){
        Roll20Client.rollAttack(monster, attack);
    },
    toggleExpanded: function(){
        this.dispatch(Constants.TOGGLE_EXPANDED);
    },
    selectActiveToolbarItem: function(toolbarItemName){
        this.dispatch(Constants.SELECT_ACTIVE_TOOLBAR_ITEM, toolbarItemName);
    },
    clearActiveToolbarItem: function(){
        this.dispatch(Constants.CLEAR_ACTIVE_TOOLBAR_ITEM);
    },
    setActionDialogComponent: function(component){
        this.dispatch(Constants.SET_ACTION_DIALOG_COMPONENT, component);
    },
    closeActionDialog: function(){
        this.dispatch(Constants.CLOSE_ACTION_DIALOG);
    },
    setMonsterYaml: function(monsterYaml){
        this.dispatch(Constants.SET_MONSTER_YAML, monsterYaml);
    }

};

module.exports = Actions;