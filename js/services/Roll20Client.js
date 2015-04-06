var $ = require("jquery");
var STAT_NAMES = {
    str: "Strength",
    dex: "Dexterity",
    con: "Constitution",
    int: "Intelligence",
    wis: "Wisdom",
    cha: "Charisma"
};
var Roll20Client;
Roll20Client = {
    rollStat: function (monster, stat) {
        var value = monster.stats[stat.toUpperCase()];
        var modifier = Math.floor((value) / 2) - 5;
        var sign = modifier < 0 ? "" : "+";
        var checkName = "a";
        if (stat == "int") {
            checkName = "an";
        }
        checkName += " " + STAT_NAMES[stat];
        var command = "/emas " + monster.name + " makes " + checkName + " check: [[1d20" + sign + modifier + "]]";
        console.log("Rolling stat '" + stat + "' for monster " + monster.name + '[id=' + monster.id + ']');
        console.log("Command: "+command);
        var input = $('#textchat-input'),
            textarea = input.find('textarea')[0],
            button = input.find('button')[0];
        if(textarea && button) {
            var oldValue = textarea.value;
            textarea.value = command;
            button.click();
            textarea.value = oldValue;
        }
    }
};

module.exports = Roll20Client;