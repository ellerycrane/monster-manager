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

var MonsterManagerAdministrator = React.createClass({
    render: function () {
        return (
            <div className="monster-manager-administrator">
                <div className="toolbar">
                    <div className="logo"></div>
                    <div className="search-bar"></div>
                    <div className="list button">
                        <div className="icon"></div>
                        <div className="drawer">
                            <div className="drawer-content">
                                <ul className="action-list">
                                    <li>Roll Initiative</li>
                                    <li>
                                        Roll Stat
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="settings button">
                        <div className="icon"></div>
                        <div className="drawer">
                            <div className="drawer-content">
                                <ul className="action-list">
                                    <li className="edit">Edit Monster Data</li>
                                    <li className="load">Load Monster Data</li>
                                    <li className="filter">Filter Monster List</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
});

module.exports = MonsterManagerAdministrator;