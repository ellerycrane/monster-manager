var yaml = require('js-yaml'),
    _ = require("underscore"),
    PROPS = require('../constants/MonsterProperties');

var parseStatValue = function (values, index) {
    if (values == null || values.length <= index || _.isNaN(values[index])) {
        return 0;
    }
    return values[index];
};

var isAttackBonus = function(value){
    var parsed = parseInt(value);
    return _.isNumber(parsed) && !_.isNaN(parsed);
};

var isSavingThrowDC = function(value){
    return value.indexOf("DC") === 0;
};

var hasDamage = function(values){
    return values.length > 1;
};

var parseSavingThrowDC = function(value){
    var savingThrowComponents = value.split(' '),
        savingThrowData = {};
    savingThrowData[PROPS.dc] = savingThrowComponents[1];
    savingThrowData[PROPS.type] = savingThrowComponents.length == 3 ? savingThrowComponents[2] : null;
    return savingThrowData;

};

var parseDamage = function(values){
    var damage = {};
    for (var i = 1; i < values.length; i++) {
        var damageValues = values[i].trim().split(' ');
        damage[damageValues[1]] = damageValues[0];
    }
    return damage;
};


var valueFunctions = {
    DEFAULT: function (value) {
        return value;
    }
};

valueFunctions[PROPS.stats] = function (values) {
    return {
        STR: parseStatValue(values, 0),
        DEX: parseStatValue(values, 1),
        CON: parseStatValue(values, 2),
        INT: parseStatValue(values, 3),
        WIS: parseStatValue(values, 4),
        CHA: parseStatValue(values, 5)
    };
};
valueFunctions[PROPS.attacks] = function (data) {
    return data.map(function (obj) {
        var result = {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[PROPS.name] = key;
                var values = (''+obj[key]).split(","),
                    firstValue = values[0].trim();

                if(isAttackBonus(firstValue)){
                    result[PROPS.toHit] = parseInt(firstValue);
                }
                if(isSavingThrowDC(firstValue)){
                    result[PROPS.save] = parseSavingThrowDC(firstValue);
                }
                if(hasDamage(values)){
                    result[PROPS.damage] = parseDamage(values);
                }
            }
        }
        return result;
    });
};

var getValueFunction = function (key) {
    if (valueFunctions.hasOwnProperty(key)) {
        return valueFunctions[key];
    }
    return valueFunctions.DEFAULT;
};

var parseMonster = function (monsterData) {
    var monster = {};
    if (!monsterData.hasOwnProperty(PROPS.stats)) {
        monsterData[PROPS.stats] = [10, 10, 10, 10, 10, 10];
    }
    if (!monsterData.hasOwnProperty(PROPS.ac)) {
        monsterData[PROPS.ac] = 0;
    }
    if (!monsterData.hasOwnProperty(PROPS.hp)) {
        monsterData[PROPS.hp] = 0;
    }
    if (!monsterData.hasOwnProperty(PROPS.attacks)) {
        monsterData[PROPS.attacks]= [];
    }
    for (var key in monsterData) {
        if (monsterData.hasOwnProperty(key)) {
            monster[key] = getValueFunction(key)(monsterData[key]);
        }
    }
    return monster;
};

var isValidMonster = function (monsterDocument, key) {
    return (typeof key == 'string' || key instanceof String) &&
        monsterDocument[key] != null &&
        typeof monsterDocument[key] == 'object';

};

var parseMonstersFromYaml = function (monsterYamlData) {
    var monsterDocument = yaml.safeLoad(monsterYamlData);
    var monsters = [];
    for (var key in monsterDocument) {
        if (monsterDocument.hasOwnProperty(key) && isValidMonster(monsterDocument, key)) {
            var monster = monsterDocument[key];
            monster.name = key;
            monster.id = monsters.length;
            monsters.push(parseMonster(monster));
        }
    }
    return monsters;
};

module.exports = {parseMonstersFromYaml: parseMonstersFromYaml};
