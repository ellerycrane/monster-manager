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
        var sidebarUrls = sidebarUrl.constructor === Array ? sidebarUrl : [sidebarUrl];
        var sidebarContent = sidebarUrls.map(function(url, i){
            return (
                <div key={m.id+'-'+url+'-'+i} className="sidebar-content-pane">
                    <div className="sidebar-content" style={{backgroundImage: 'url(' + url + ')'}}>
                        <img src={url} style={{visibility: "hidden"}}/>
                    </div>
                    <div className="cover" />
                </div>
            );
        }.bind(this));
        return (
            <div className="sidebar-container">
                <div className="sidebar-scrollable-area">
                    <div className="sidebar-inner">
                    {sidebarContent}
                    </div>
                </div>
            </div>
        )

    }
});

module.exports = MonsterSidebar;