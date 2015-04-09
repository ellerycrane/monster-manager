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

var enterCommand = function (command) {
    if (command === null || !_.isString(command) || _.isEmpty(command)) {
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

var observeDOM = (function() {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback) {
        if (MutationObserver) {
            var obs = new MutationObserver(function(mutations, observer) {
                if (mutations[0].addedNodes.length || mutations[0].removedNodes.length)
                    callback(mutations);
            });
            obs.observe(obj, {
                childList: true,
                subtree: true
            });
        } else if (eventListenerSupported) {
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    }
})();

var INITIATIVE_REGEX = /^(.+) rolls for Initiative\: (\d+)$/;

var setupInitiativeTracking = function() {
    observeDOM(document.querySelector('#textchat > .content'), function (mutations) {
        var added = mutations[0].addedNodes;
        if (added.length === 3 && added[1].className == "message emote" && added[1].innerText) {
            var matches = added[1].innerText.trim().match(INITIATIVE_REGEX);
            if (matches && matches.length === 3) {
                console.log("Initiative was rolled: " + matches[1] + " rolled " + matches[2]);
                Roll20Client.addMonsterToInitiative(matches[1], matches[2]);
            }
        }
    });
};
var Roll20Client;
Roll20Client = {
    addMonsterToInitiative: function (name, initiative) {
        if (window.is_gm) {
            var n = window.Campaign.initiativewindow.cleanList(),
                r = {
                    id: "-1",
                    pr: "" + initiative,
                    custom: name
                };
            n.push(r);
            window.Campaign.initiativewindow.model.save({
                turnorder: JSON.stringify(n)
            });
        }
    },

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
        var monsterName = safeGet(monster, PROPS.name),
            attackName = safeGet(attack, PROPS.name),
            toHit = safeGet(attack, PROPS.toHit),
            damage = safeGet(attack, PROPS.damage),
            save = safeGet(attack, PROPS.save),
            saveType = safeGet(save, PROPS.type),
            separator = (toHit !== null || save !== null) ? ',' : '!';

        console.log("Rolling attack: " + attackName + " for monster " + monsterName);

        var sb = ["/emas " + monsterName + " attacks"];
        if (attackName) {
            sb.push("with " + attackName + separator)
        } else {
            sb[0] += separator;
        }
        if (toHit) {
            var attackRoll = rollD20WithModifier(toHit);
            sb.push("hitting AC " + attackRoll);
            if (damage) {
                sb.push("and dealing " + damageCommand(damage) + " if it hits.");
            }
            sb.push("([dis]advantage die: " + attackRoll + ")");
        }
        if (save) {
            var savingThrowText = "saving throw";
            if (saveType) {
                var typeText = saveType;
                if (exists(STAT_NAMES, saveType.toLowerCase())) {
                    typeText = STAT_NAMES[saveType.toLowerCase()];
                }
                savingThrowText = [typeText, savingThrowText].join(' ');
            }
            if (damage) {
                sb.push("dealing " + damageCommand(damage) + " on a failed " + savingThrowText + '.');
            } else {
                sb.push("hitting on a failed " + savingThrowText + '.');
            }
        }
        var command = sb.join(' ');
        enterCommand(command);
    }
};

module.exports = Roll20Client;