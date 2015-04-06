var React = require("react"),
    _ = require("underscore"),
    ModifierUtils = require('../utilities/ModifierUtils');

var MonsterAttack = React.createClass({
    render: function () {
        var m = this.props.monster,
            attack = this.props.attack;
        var damageStrings = [];
        _.pairs(attack.damage).forEach(function(pair){
            var type = pair[0];
            var amount = pair[1];
            damageStrings.push(amount + ' ' + type + ' damage');
        });
        return (
            <div className="monster-attack"><span className="attack-name">{attack.name}. </span>
                <span className="attack-details">{ModifierUtils.modifierToString(attack.toHit)} to hit, {damageStrings.join(' plus ')}.</span>
            </div>
        );
    }
});


module.exports = MonsterAttack;