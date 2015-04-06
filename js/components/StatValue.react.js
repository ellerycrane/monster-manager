var React = require("react"),
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React),
    ModifierUtils = require('../utilities/ModifierUtils');

var StatValue = React.createClass({
    mixins: [FluxMixin],

    handleOnMouseDown: function () {
        //console.log("onMouseDown called for " + this.props.stat + " of monster " + this.props.monster.id);
        this.getFlux().actions.rollStat(this.props.monster, this.props.stat);
    },
    handleOnMouseEnter: function () {
        //console.log("onMouseEnter called for "+this.props.stat);
    },
    handleOnMouseLeave: function () {
        //console.log("onMouseLeave called for "+this.props.stat);
    },
    handleOnMouseMove: function () {
        //console.log("onMouseMove called for "+this.props.stat);
    },
    handleOnMouseOut: function () {
        //console.log("onMouseOut called for "+this.props.stat);
    },
    handleOnMouseOver: function () {
        //console.log("onMouseOver called for "+this.props.stat);
    },
    handleOnMouseUp: function () {
        //console.log("onMouseUp called for "+this.props.stat);
    },

    render: function () {
        var value = this.props.monster.stats[this.props.stat.toUpperCase()];
        var modifier = ModifierUtils.calculateModifier(value);
        var valueClass = 'value';
        if (modifier < 0) {
            valueClass += ' negative';
            if (modifier <= -3) {
                valueClass += ' extreme';
            }
        }
        if (modifier > 0) {
            valueClass += ' positive';
            if (modifier >= 5) {
                valueClass += ' extreme';
            }
        }
        return (
            <div className={this.props.stat + " stat-value"}
                onMouseDown={this.handleOnMouseDown}
                onMouseEnter={this.handleOnMouseEnter}
                onMouseLeave={this.handleOnMouseLeave}
                onMouseUp={this.handleOnMouseUp}
            >
                <div className="name">{this.props.stat.toUpperCase()}</div>
                <div className={valueClass}>{ModifierUtils.modifierToString(modifier)}</div>
            </div>
        );
    }
});

module.exports = StatValue;