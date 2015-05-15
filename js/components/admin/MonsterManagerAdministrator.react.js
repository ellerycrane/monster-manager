var React = require("react"),
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin,
    _ = require("underscore"),
    classNames = require('classnames'),
    OpenCloseButton = require('./OpenCloseButton.react'),
    DataLoader = require('./DataLoader.react'),
    ActionDialog = require('./ActionDialog.react');

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
        classes = classNames(classes);
        return (
            <div className={classes}>
                <div className="button" onMouseDown={this.handleClick}>
                    <div className={classNames({"icon": true, active: active})} />
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

var MenuItem = React.createClass({
    handleClick: function () {
        this.props.onCommand ? this.props.onCommand() : null;
    },

    render: function () {
        return (
            <li className={this.props.className} onMouseDown={this.handleClick}>{this.props.children}</li>
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

    handleClick: function (e) {
        if (this.getDOMNode().contains(e.target)) {
            return; // the click was on the administrator, do nothing
        }
        this.getFlux().actions.clearActiveToolbarItem(); // the click was on something else; close any open toolbar drawers.
    },

    componentWillMount: function () {
        document.addEventListener("click", this.handleClick, false);
    },

    componentWillUnmount: function () {
        document.removeEventListener("click", this.handleClick, false);
    },

    showDialog: function (dialogComponent, type) {
        var that = this;
        return function () {
            that.getFlux().actions.setActionDialogComponent({component:dialogComponent, type:type});
        };
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
                            <li className="edit">Edit Monster Data</li>
                            <MenuItem className="load" onCommand={this.showDialog(DataLoader, 'load')}>Load Monster Data</MenuItem>
                            <li className="filter">Filter Monster List</li>
                        </ul>
                    </AdminToolbarItem>
                    <OpenCloseButton expanded={this.props.expanded} />
                </div>
                <ActionDialog content={this.state.actionDialogContentComponent} type={this.state.actionDialogType}/>
            </div>
        );
    }
});

module.exports = MonsterManagerAdministrator;