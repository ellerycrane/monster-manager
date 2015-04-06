var React = require("react"),
    p = require("../utilities/PropertyUtils");
var StatBlockInsert = React.createClass({
    render: function () {
        var m = this.props.monster,
            statblockUrl = p.safeGet(m, 'statblock');
        if(statblockUrl === null){
            return null;
        }
        return (
            <div className="statblock-insert">
                <div className="statblock" style={{backgroundImage:'url('+statblockUrl+')'}}>
                    <img src={statblockUrl} style={{visibility:"hidden"}}/>
                </div>
                <div className="cover" />
            </div>
        )

    }
});

module.exports = StatBlockInsert;