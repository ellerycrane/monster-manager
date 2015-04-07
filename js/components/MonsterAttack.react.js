var React = require("react"),
    _ = require("underscore"),
    ModifierUtils = require('../utilities/ModifierUtils'),
    PropertyUtils = require('../utilities/PropertyUtils');

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
        var detailsString = damageStrings.join(' plus ');

        var valueString;
        var className = 'attack-icon ';
        if(PropertyUtils.exists(attack, 'toHit')){
            className += 'to-hit';
            valueString = ModifierUtils.modifierToString(attack.toHit);
        }
        if(PropertyUtils.exists(attack, 'save')){
            valueString = attack.save.dc;
            detailsString = attack.save.type + ' save. ' + detailsString;
            className += 'dc';
        }



        return (
            <div className="monster-attack">
                <div className={className}>
                    <div className="icon"></div>
                    <div className="value">{valueString}</div>
                </div>
                <div className="attack-name">{attack.name}.</div>
                <div className="attack-details">{detailsString}.</div>
            </div>
        );
    }
});


module.exports = MonsterAttack;