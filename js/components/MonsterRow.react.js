var React = require("react"),
    MonsterValue = require('./MonsterValue.react'),
    StatValue = require('./StatValue.react'),
    MonsterAvatar = require('./MonsterAvatar.react');

var STATS = ['str','dex','con','int','wis','cha'];

var MonsterRow = React.createClass({
    render: function () {
        var m = this.props.monster;
        var statValues = STATS.map(function(stat){
            return <StatValue stat={stat} key={m.id+'-'+stat} monster={m} />;
        });
        return (
            <div className="monster-row">
                <div className="monster-card">
                    <MonsterAvatar monster={m} />
                    <div className="monster-card-values">
                        <MonsterValue key="hp" className="hp" value={m.hp} />
                        <MonsterValue key="ac" className="ac" value={m.ac} />
                    </div>
                    <div className="card-border">
                        <div className="monster-name">{m.name}</div>
                        <div className="body">
                            {statValues}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = MonsterRow;