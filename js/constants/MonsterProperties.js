var keyMirror = require('keymirror');

var MonsterProperties = {
    ac: null,
    hp: null,
    stats: null,
    sidebar: null,
    senses: null,
    attacks: null,
    avatar: null,
    speed: null,
    skills: null,
    dc: null,
    type: null,
    save: null,
    toHit: null,
    damage: null,
    name: null
};
MonsterProperties = keyMirror(MonsterProperties);
module.exports = MonsterProperties;