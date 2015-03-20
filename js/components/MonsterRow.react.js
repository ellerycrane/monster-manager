var React = require("react"),
    MonsterValue = require('./MonsterValue.react'),
    StatValue = require('./StatValue.react'),
    MonsterAvatar = require('./MonsterAvatar.react');

var MonsterRow = React.createClass({
    render: function () {
        var m = this.props.monster;
        return (
            <div className="monster-row">
                <div className="monster-card">
                    <MonsterAvatar monster={m} />
                    <div className="monster-card-values">
                        <MonsterValue className="hp" value={m.hp} />
                        <MonsterValue className="ac" value={m.ac} />
                    </div>
                    <div className="card-border">
                        <div className="monster-name">{m.name}</div>
                        <div className="body">
                            <StatValue stat="str" monster={m} />
                            <StatValue stat="dex" monster={m} />
                            <StatValue stat="con" monster={m} />
                            <StatValue stat="int" monster={m} />
                            <StatValue stat="wis" monster={m} />
                            <StatValue stat="cha" monster={m} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = MonsterRow;