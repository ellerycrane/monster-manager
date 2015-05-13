var MonsterManagerStore= require('./MonsterManagerStore'),
    AdminStore = require('./AdminStore');
module.exports = {
    MonsterManagerStore: new MonsterManagerStore(),
    AdminStore: new AdminStore()
};