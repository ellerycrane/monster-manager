var React = require("react");
var MonsterList = require("./MonsterList.react.js");

var MonsterManager = React.createClass({
    render: function() {
        return <div className="monster-manager"><MonsterList monsters={this.props.monsters}></MonsterList></div>;
    }
});

module.exports = MonsterManager;