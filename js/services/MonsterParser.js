var yaml = require('js-yaml');

var valueFunctions = {
    stats: function(values){
        return {
            STR: values[0],
            DEX: values[1],
            CON: values[2],
            INT: values[3],
            WIS: values[4],
            CHA: values[5]
        };
    },
    attacks: function (data) {
        return data.map(function (obj) {
            var result = {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    var values = obj[key].split(",");
                    var toHit = parseInt(values[0]);
                    var damage = {};
                    for (var i = 1; i < values.length; i++) {
                        var damageValues = values[i].trim().split(' ');
                        damage[damageValues[1]] = damageValues[0];
                    }
                    result['toHit'] = toHit;
                    result['damage'] = damage;
                }
            }
            return result;
        });
    },
    DEFAULT: function(value){
        return value;
    }
};
var getValueFunction = function(key){
    if(valueFunctions.hasOwnProperty(key)){
        return valueFunctions[key];
    }
    return valueFunctions.DEFAULT;
};

var parseMonster = function (monsterData) {
    var monster = {};
    if(!monsterData.hasOwnProperty('stats')){
        monsterData.stats = [10, 10, 10, 10, 10, 10];
    }
    for (var key in monsterData) {
        if (monsterData.hasOwnProperty(key)) {
            monster[key] = getValueFunction(key)(monsterData[key]);
        }
    }
    return monster;
};

var parseMonstersFromYaml = function(monsterYamlData){
    var monsterDocument = yaml.safeLoad(monsterYamlData);
    var monsters = [];
    for (var key in monsterDocument) {
        if (monsterDocument.hasOwnProperty(key)) {
            var monster = monsterDocument[key];
            monster.name = key;
            monster.id = monsters.length;
            monsters.push(parseMonster(monster));
        }
    }
    return monsters;
};

module.exports = {parseMonstersFromYaml: parseMonstersFromYaml};
