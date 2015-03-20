var React = require("react");

var MonsterValue = React.createClass({
    render: function () {
        return (
            <div className={this.props.className + " monster-value"}>
                <div className="value">{this.props.value}</div>
            </div>
        );
    }
});

module.exports = MonsterValue;