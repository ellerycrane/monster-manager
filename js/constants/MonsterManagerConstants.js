var keyMirror = require('keymirror');

var Constants = {
    UPDATE_MONSTERS: null,
    LOAD_MONSTERS: null,
    TOGGLE_EXPANDED: null,
    SELECT_ACTIVE_TOOLBAR_ITEM: null,
    CLEAR_ACTIVE_TOOLBAR_ITEM: null,
    SET_ACTION_DIALOG_COMPONENT:null,
    CLOSE_ACTION_DIALOG:null,
    SET_MONSTER_YAML: null,
    change: null
};
Constants = keyMirror(Constants);

module.exports = Constants;