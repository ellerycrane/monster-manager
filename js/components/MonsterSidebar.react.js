var React = require("react"),
    p = require("../utilities/PropertyUtils"),
    MonsterProperties = require('../constants/MonsterProperties');
var MonsterSidebar = React.createClass({
    render: function () {
        var m = this.props.monster,
            sidebarUrl = p.safeGet(m, MonsterProperties.sidebar);
        if(sidebarUrl === null){
            return null;
        }
        return (
            <div className="sidebar-container">
                <div className="sidebar-content" style={{backgroundImage:'url('+sidebarUrl+')'}}>
                    <img src={sidebarUrl} style={{visibility:"hidden"}}/>
                </div>
                <div className="cover" />
            </div>
        )

    }
});

module.exports = MonsterSidebar;