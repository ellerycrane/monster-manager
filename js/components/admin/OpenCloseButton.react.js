var React = require('react'),
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React),
    classNames = require('classnames');

var OpenCloseButton = React.createClass({
    mixins: [FluxMixin],
    handleClick: function(){
        this.getFlux().actions.toggleExpanded();
    },
    render: function () {
        var classes = classNames({
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