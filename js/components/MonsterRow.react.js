var React = require("react"),
    MonsterValue = require('./MonsterValue.react'),
    StatValue = require('./StatValue.react'),
    MonsterSidebar = require('./MonsterSidebar.react'),
    MonsterAttack= require('./MonsterAttack.react'),
    MonsterAvatar = require('./MonsterAvatar.react');

var STATS = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

var MonsterRow = React.createClass({

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

        var actions = m.attacks.map(function(attack, i){
            return <MonsterAttack key={m.id + '-' + i + '-' +attack.name} monster={m} attack={attack} />;
        });

        var log = function(){
            this.refs.sidebar._logViewport();
        }.bind(this);


        return (
            <div className="monster-row" onClick={log}>
                <div className="monster-card">
                    <MonsterAvatar monster={m} />
                    <div className="monster-card-values">
                        <MonsterValue key="hp" className="hp" value={m.hp} />
                        <MonsterValue key="ac" className="ac" value={m.ac} />
                    </div>
                    <div className="card-border">
                        <div className="monster-name">{m.name}</div>
                        <div className="body">
                            <div className="stat-values">
                            {statValues}
                            </div>
                        </div>
                    </div>
                    <div className="shelf-clipping-box">
                        <div className="action-shelf">
                            {actions}
                        </div>
                    </div>
                    <MonsterSidebar monster={m} ref="sidebar"/>

                </div>
            </div>
        );
    }
});

module.exports = MonsterRow;