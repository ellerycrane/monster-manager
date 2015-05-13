var keyMirror = require('keymirror');

var Constants = {
    UPDATE_MONSTERS: null,
    LOAD_MONSTERS: null,
    TOGGLE_EXPANDED: null,
    change: null
};
Constants = keyMirror(Constants);

module.exports = Constants;