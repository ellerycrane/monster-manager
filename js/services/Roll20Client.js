var $ = require("jquery"),
    _ = require("underscore"),
    PropertyUtils = require('../utilities/PropertyUtils'),
    PROPS = require('../constants/MonsterProperties'),
    exists = PropertyUtils.exists,
    safeGet = PropertyUtils.safeGet;
var STAT_NAMES = {
    str: "Strength",
    dex: "Dexterity",
    con: "Constitution",
    int: "Intelligence",
    wis: "Wisdom",
    cha: "Charisma"
};

var rollD20WithModifier = function (modifier) {
    var sign = modifier < 0 ? "" : "+";
    return "[[1d20" + sign + modifier + "]]";
};

var damageCommand = function (damage) {
    var damageStrings = [];
    _.pairs(damage).forEach(function (pair) {
        var type = pair[0];
        var amount = pair[1];
        damageStrings.push(['[[' + amount + ']]', type, 'damage'].join(' '));
    });
    return damageStrings.join(' plus ');
};

var enterCommand = function(command){
    if(command === null || !_.isString(command) || _.isEmpty(command)){
        console.log("Empty command; aborting.");
        return;
    }
    console.log("Entering roll20 Command: " + command);
    var input = $('#textchat-input'),
        textarea = input.find('textarea')[0],
        button = input.find('button')[0],
        oldValue;
    if (textarea && button) {
        oldValue = textarea.value;
        textarea.value = command;
        button.click();
        textarea.value = oldValue;
    }
};

var Roll20Client;
Roll20Client = {
    rollStat: function (monster, stat) {
        var value = monster.stats[stat.toUpperCase()];
        var modifier = Math.floor((value) / 2) - 5;
        var checkName = "a";
        if (stat == "int") {
            checkName = "an";
        }
        checkName += " " + STAT_NAMES[stat];
        var command = "/emas " + monster.name + " makes " + checkName + " check: " + rollD20WithModifier(modifier);
        console.log("Rolling stat '" + stat + "' for monster " + monster.name + '[id=' + monster.id + ']');
        enterCommand(command);
    },

    rollAttack: function (monster, attack) {
        var monsterName = safeGet(monster,PROPS.name),
            attackName = safeGet(attack, PROPS.name),
            toHit = safeGet(attack, PROPS.toHit),
            damage = safeGet(attack, PROPS.damage),
            save = safeGet(attack, PROPS.save),
            saveType = safeGet(save, PROPS.type),
            separator = (toHit !== null || save !== null) ? ',' : '!';

        console.log("Rolling attack: " + attackName + " for monster " + monsterName);

        var sb = ["/emas " + monsterName + " attacks"];
        if(attackName){
            sb.push("with " + attackName + separator)
        } else {
            sb[0] += separator;
        }
        if(toHit){
            var attackRoll = rollD20WithModifier(toHit);
            sb.push("hitting AC " + attackRoll);
            if(damage){
                sb.push("and dealing " + damageCommand(damage) + " if it hits.");
            }
            sb.push("([dis]advantage die: "+attackRoll+")");
        }
        if(save){
            var savingThrowText = "saving throw";
            if(saveType){
                var typeText = saveType;
                if(exists(STAT_NAMES, saveType.toLowerCase())){
                    typeText = STAT_NAMES[saveType.toLowerCase()];
                }
                savingThrowText = [typeText,savingThrowText].join(' ');
            }
            if(damage){
                sb.push("dealing " + damageCommand(damage)+" on a failed "+savingThrowText+'.');
            } else {
                sb.push("hitting on a failed "+savingThrowText+'.');
            }
        }
        var command = sb.join(' ');
        enterCommand(command);
    }
};

module.exports = Roll20Client;