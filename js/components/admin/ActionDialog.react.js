var React = require('react');

var ActionDialog = React.createClass({
    render: function () {
        if (this.props.content === null) {
            return null;
        }
        return (
            <div className="dialog-container">
                <div className="modal-overlay">
                    <div className={"action-dialog "+this.props.type} >
                        <div className="dialog-content">
                            {React.createElement(this.props.content)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ActionDialog;