var React = require("react"),
    MonsterValue = require('./MonsterValue.react'),
    StatValue = require('./StatValue.react'),
    MonsterAvatar = require('./MonsterAvatar.react');

var STATS = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

var MonsterRow = React.createClass({
    getInitialState: function() {
        return {actions: []};
    },

    //handleOnMouseEnter: function () {
    //    console.log("onMouseEnter called for MonsterRow["+this.props.monster.name+"]");
    //    this.setState({actions: [true]});
    //},
    //handleOnMouseLeave: function () {
    //    console.log("onMouseLeave called for MonsterRow["+this.props.monster.name+"]");
    //    this.setState({actions: []});
    //},

    render: function () {
        var m = this.props.monster;
        var statValues = STATS.map(function (stat) {
            return <StatValue stat={stat} key={m.id + '-' + stat} monster={m} />;
        });

        var actions = m.attacks.map(function(attack){
            return <p>{attack.name}</p>
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
                    <div className="action-shelf">
                        {actions}
                    </div>

                </div>
            </div>
        );
    }
});

module.exports = MonsterRow;