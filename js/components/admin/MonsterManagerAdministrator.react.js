var React = require("react"),
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React),
    _ = require("underscore");

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

var MonsterManagerAdministrator = React.createClass({
    render: function () {
        return (
            <div className="monster-manager-administrator">
                <div className="toolbar">
                    <div className="logo"></div>
                    <div className="settings button">
                        <div className="icon"></div>
                        <div className="drawer"><p>Hello, world!</p></div>
                    </div>
                    <div className="settings button">
                        <div className="icon"></div>
                        <div className="drawer">
                            <p>This is a settings drawer!</p>
                            <p>This is a settings drawer!</p>
                            <p>This is a settings drawer!</p>
                            <p>This is a settings drawer!</p>
                            <p>This is a settings drawer!</p>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
});

module.exports = MonsterManagerAdministrator;