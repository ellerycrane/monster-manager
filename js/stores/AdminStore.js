var Fluxxor = require('fluxxor'),
    Constants = require('../constants/MonsterManagerConstants');

var AdminStore = Fluxxor.createStore({
    initialize: function() {
        this.activeToolbarItemName = null;
        this.actionDialogContentComponent = null;
        this.actionDialogType = null;
        this.monsterYaml = null;
         this.bindActions(
            Constants.SELECT_ACTIVE_TOOLBAR_ITEM, this.handleSelectActiveToolbarItem,
            Constants.CLEAR_ACTIVE_TOOLBAR_ITEM, this.handleClearActiveToolbarItem,
            Constants.SET_ACTION_DIALOG_COMPONENT, this.handleSetActionDialogContentComponent,
            Constants.CLOSE_ACTION_DIALOG, this.handleCloseActionDialog,
            Constants.SET_MONSTER_YAML, this.handleSetMonsterYaml
        );
    },

    handleSelectActiveToolbarItem: function (payload, type) {
        this.activeToolbarItemName = this.activeToolbarItemName === payload ? null : payload;
        this.emit(Constants.change);
    },

    handleClearActiveToolbarItem: function(){
        if(this.activeToolbarItemName != null){
            this.activeToolbarItemName = null;
            this.emit(Constants.change);
        }
    },

    handleSetActionDialogContentComponent: function(payload){
        this.actionDialogContentComponent = payload.component;
        this.actionDialogType = payload.type;
        this.activeToolbarItemName = null;
        this.emit(Constants.change);
    },

    handleCloseActionDialog: function(){
        if(this.actionDialogContentComponent != null){
            this.actionDialogContentComponent = null;
            this.actionDialogType = null;
            this.emit(Constants.change);
        }
    },

    handleSetMonsterYaml: function(monsterYaml){
        this.monsterYaml = monsterYaml;
        this.emit(Constants.change);
    },

    getState: function(){
        return {
            activeToolbarItemName: this.activeToolbarItemName,
            actionDialogContentComponent: this.actionDialogContentComponent,
            actionDialogType: this.actionDialogType,
            monsterYaml: this.monsterYaml
        };
    }
});

module.exports = AdminStore;