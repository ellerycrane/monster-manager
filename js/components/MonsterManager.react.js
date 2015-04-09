var React = require("react"),
    Draggable = require("react-draggable"),
    MonsterList = require("./MonsterList.react.js");

var MonsterManager = React.createClass({

    handleStart: function (event, ui) {
        console.log('Event: ', event);
        console.log('Position: ', ui.position);
    },

    handleDrag: function (e, ui) {
        console.log('Event: ', e);
        console.log('Position: ', ui.position);
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
        return (
            <Draggable
                zIndex={10000}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
                <div className="monster-manager">
                    <MonsterList monsters={this.props.monsters} key="list"></MonsterList>
                </div>
            </Draggable>
        );
    }
});

module.exports = MonsterManager;