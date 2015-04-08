var React = require("react"),
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React),
    _ = require("underscore"),
    PROPS = require('../constants/MonsterProperties'),
    ModifierUtils = require('../utilities/ModifierUtils'),
    PropertyUtils = require('../utilities/PropertyUtils');

var MonsterAttack = React.createClass({
    mixins: [FluxMixin],

    handleOnMouseDown: function () {
        this.getFlux().actions.rollAttack(this.props.monster, this.props.attack);
    },

    render: function () {
        var m = this.props.monster,
            attack = this.props.attack;
        var detailsString = "";
        if(PropertyUtils.exists(attack, PROPS.damage)) {
            var damageStrings = [];
            _.pairs(attack.damage).forEach(function (pair) {
                var type = pair[0];
                var amount = pair[1];
                damageStrings.push(amount + ' ' + type + ' damage');
            });
            detailsString = damageStrings.join(' plus ')+'.';
        }

        var valueString;
        var className = 'attack-icon ';
        if(PropertyUtils.exists(attack, PROPS.toHit)){
            className += 'to-hit';
            valueString = ModifierUtils.modifierToString(attack.toHit);
        }
        if(PropertyUtils.exists(attack, PROPS.save)){
            className += 'dc';
            valueString = attack.save.dc;
            if(PropertyUtils.exists(attack.save, PROPS.type)) {
                detailsString = attack.save.type + ' save. ' + detailsString;
            }
        }

        return (
            <div className="monster-attack" onMouseDown={this.handleOnMouseDown}>
                <div className={className}>
                    <div className="icon"></div>
                    <div className="value">{valueString}</div>
                </div>
                <div className="attack-name">{attack.name}.</div>
                <div className="attack-details">{detailsString}</div>
            </div>
        );
    }
});


module.exports = MonsterAttack;