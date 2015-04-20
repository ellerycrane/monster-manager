var React = require("react"),
    p = require("../utilities/PropertyUtils"),
    MonsterProperties = require('../constants/MonsterProperties');
var MonsterSidebar = React.createClass({
    _isInViewport: function () {
        if(!this.getDOMNode()){
            return false;
        }
        var rect = this.getDOMNode().getBoundingClientRect();
        console.log("bounding rectangle: ");
        console.log(rect);
        console.log("window.innerHeight: "+window.innerHeight);
        console.log("document.documentElement.clientHeight: "+document.documentElement.clientHeight);


        return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    },

    _logViewport: function(){
        //var msg = this._isInViewport() ? "is in viewport" : "is NOT in viewport";
        //console.log("Sidebar for monster "+this.props.monster.name+" "+msg);
    },

    componentDidMount: function(){
        this._logViewport();
    },

    render: function () {
        var m = this.props.monster,
            sidebarUrl = p.safeGet(m, MonsterProperties.sidebar);
        if (sidebarUrl === null) {
            return null;
        }
        var sidebarUrls = sidebarUrl.constructor === Array ? sidebarUrl : [sidebarUrl];
        var sidebarContent = sidebarUrls.map(function (url, i) {
            return (
                <div key={m.id + '-' + url + '-' + i} className="sidebar-content-pane">
                    <div className="sidebar-content" style={{backgroundImage: 'url(' + url + ')'}}>
                        <img src={url} style={{visibility: "hidden"}}/>
                    </div>
                    <div className="cover" />
                </div>
            );
        }.bind(this));
        return (
            <div className="sidebar-container" onMouseDown={this._logViewport} >
                <div className="sidebar-scrollable-area">
                    <div className="sidebar-inner">
                    {sidebarContent}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = MonsterSidebar;