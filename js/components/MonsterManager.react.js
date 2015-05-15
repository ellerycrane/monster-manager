var React = require("react"),
    Draggable = require("react-draggable"),
    MonsterManagerAdministrator = require('./admin/MonsterManagerAdministrator.react'),
    MonsterList = require("./MonsterList.react.js"),
    _ = require("underscore");


var MonsterManager = React.createClass({
    handleStart: function (event, ui) {
        //console.log('Event: ', event);
        //console.log('Position: ', ui.position);
    },

    handleDrag: function (e, ui) {
        //console.log('Event: ', e);
        //console.log('Position: ', ui.position);
        if(e.stopPropagation) e.stopPropagation();
        if(e.preventDefault) e.preventDefault();
        e.cancelBubble=true;
        e.returnValue=false;
        return false;
    },

    handleStop: function (event, ui) {
        console.log('Event: ', event);
        console.log('Position: ', ui.position);
    },

    render: function () {
        var monsterList = this.props.expanded ? <MonsterList monsters={this.props.monsters} key="list"></MonsterList> : null;
        return (
            <Draggable
                zIndex={10000}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}
                cancel=".dialog-container *">
                <div className="monster-manager">
                    <MonsterManagerAdministrator monsters={this.props.monsters} expanded={this.props.expanded} key="admin"></MonsterManagerAdministrator>
                    {monsterList}
                </div>
            </Draggable>
        );
    }
});

module.exports = MonsterManager;