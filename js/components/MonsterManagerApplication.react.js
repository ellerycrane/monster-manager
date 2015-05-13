var React = require('react'),
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin,
    MonsterManager = require('./MonsterManager.react');

var STORE = 'MonsterManagerStore';

var MonsterManagerApplication = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin(STORE)],

    getInitialState: function() {
        return {};
    },

    getStateFromFlux: function() {
        return this.getFlux().store(STORE).getState();
    },

    //componentDidMount: function() {
    //    this.getFlux().actions.loadMonsters('test.yaml');
    //},

    render: function() {
        return (
            <MonsterManager monsters={this.state.monsters} expanded={this.state.expanded}/>
        );
    }
});

module.exports = MonsterManagerApplication;