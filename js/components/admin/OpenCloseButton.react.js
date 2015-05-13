var React = require("react"),
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React);

var OpenCloseButton = React.createClass({
    mixins: [FluxMixin],
    handleClick: function(){
        this.getFlux().actions.toggleExpanded();
    },
    render: function () {
        var cx = React.addons.classSet;
        var classes = cx({
            'open-close-button': true,
            'expanded': this.props.expanded
        });

        return (
            <div className={classes} onMouseDown={this.handleClick}>
                <div className="icon"></div>
            </div>
        );
    }
});

module.exports = OpenCloseButton;