var React = require("react"),
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin,
    _ = require("underscore"),
    OpenCloseButton = require('./OpenCloseButton.react');

var STORE = 'AdminStore';

//var Toolbar = React.createClass({
//
//});
/*
 <Icon />
 <SearchBar />
 <OpenEditor />
 <RollInitiative />
 <ExpandList />
 */

/*
 <ul className="list-group">
 <li>Strength</li>
 <li>Dexterity</li>
 <li>Constitution</li>
 <li>Intelligence</li>
 <li>Wisdom</li>
 <li>Charisma</li>
 </ul>
 */

var AdminToolbarItem = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin(STORE)],

    propTypes: {
        className: React.PropTypes.string.isRequired
    },

    getInitialState: function () {
        return {};
    },

    getStateFromFlux: function () {
        return this.getFlux().store(STORE).getState();
    },
    handleClick: function () {
        this.getFlux().actions.selectActiveToolbarItem(this.props.className);
    },

    render: function () {
        var active = this.props.className === this.state.activeToolbarItemName;
        var classes = {
            'toolbar-item': true,
            active: active
        };
        classes[this.props.className] = true;
        var cx = React.addons.classSet;
        classes = cx(classes);
        return (
            <div className={classes}>
                <div className="button" onMouseDown={this.handleClick}>
                    <div className={cx({"icon":true, active:active})} />
                </div>
                <div className="drawer">
                    <div className="drawer-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

});

var MonsterManagerAdministrator = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin(STORE)],

    getInitialState: function () {
        return {};
    },

    getStateFromFlux: function () {
        return this.getFlux().store(STORE).getState();
    },


    render: function () {

        return (
            <div className="monster-manager-administrator">
                <div className="toolbar">
                    <div className="logo"></div>
                    <div className="search-bar"></div>
                    <AdminToolbarItem className="list">
                        <ul className="action-list">
                            <li>Roll Initiative</li>
                            <li>Roll Stat</li>
                        </ul>
                    </AdminToolbarItem>
                    <AdminToolbarItem className="settings">
                        <ul className="action-list">
                            <div className="drawer-content">
                                <ul className="action-list">
                                    <li className="edit">Edit Monster Data</li>
                                    <li className="load">Load Monster Data</li>
                                    <li className="filter">Filter Monster List</li>
                                </ul>
                            </div>
                        </ul>
                    </AdminToolbarItem>
                    <OpenCloseButton expanded={this.props.expanded} />

                </div>
            </div>
        );
    }
});

module.exports = MonsterManagerAdministrator;