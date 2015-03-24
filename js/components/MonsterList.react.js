var React = require("react"),
    MonsterRow = require('./MonsterRow.react');

var MonsterList = React.createClass({
    render: function () {
        var monsterRows = [];
        this.props.monsters.forEach(function (monster) {
            monsterRows.push(<MonsterRow monster={monster} key={'monster-'+monster.id} />);
        }.bind(this));
        return (
            <div className="monster-list">
                {monsterRows}
            </div>
        );
    }
});

module.exports = MonsterList;