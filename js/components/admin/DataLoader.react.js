var React = require('react'),
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React),
    _ = require('underscore'),
    MonsterParser = require('../../services/MonsterParser'),
    classNames = require('classnames');

var DataLoader = React.createClass({
    mixins: [FluxMixin],

    getInitialState: function () {
        return {
            fileText: null,
            loading: false,
            total: null,
            loaded: null,
            error: null
        };
    },

    // prevent form from submitting; we are going to capture the file contents
    handleSubmit: function (e) {
        e.preventDefault();
        var self = this,
            parsed = MonsterParser.parseWithErrorChecking(self.state.fileText);
        if (parsed.errors.length > 0) {
            console.log("Error parsing monster data: ");
            console.log(parsed.errors);
            self.setState({
                fileText: null,
                loading: false,
                total: null,
                loaded: null,
                error: parsed.errors
            });
        } else {
            self.getFlux().actions.setMonsterYaml(self.state.fileText);
            self.getFlux().actions.updateMonsters(parsed.monsterYaml);
            self.closeDialog();
        }
    },

    // when a file is passed to the input field, retrieve the contents as a
    // base64-encoded data URI and save it to the component's state
    handleFile: function (e) {
        var self = this;
        var reader = new FileReader();
        var file = e.target.files[0];


        console.log("File selected: ");
        console.log(file);
        if (file) {
            reader.onprogress = function (event) {
                console.log("File load progress:");
                console.log(event);
                if (event.lengthComputable) {
                    self.setState({
                        loading: true,
                        total: event.total,
                        loaded: event.loaded
                    });
                }
            };
            reader.onloadstart = function (event) {
                console.log("Starting to load file");
                self.setState({
                    loading: true,
                    total: 0,
                    loaded: 0,
                    error: null
                });

            };

            reader.onloadend = function (event) {
                var contents = event.target.result,
                    error = event.target.error;

                if (error != null) {
                    console.error("File could not be read! Code " + error.code);
                    self.setState({
                        fileText: null,
                        loading: false,
                        total: null,
                        loaded: null,
                        error: [{type:'file',message:"Error reading file; Code " + error.code}]
                    });
                } else {
                    self.setState({
                        fileText: contents,
                        loading: false,
                        total: null,
                        loaded: null,
                        error: null
                    });
                    console.log("Finished loading file");
                }
            };
            reader.readAsText(file);
        } else {
            // No file selected; clear file text and error
            self.setState({
                fileText: null,
                error: null
            });
        }
    },

    progressBar: function () {
        if (!this.state.loading) {
            return null
        }
        return (
            <progress max={this.state.total} value={this.state.loaded}></progress>
        )
    },

    errorLabel: function () {
        var self = this;
        if (self.state.error) {
            var errors = [];
            self.state.error.forEach(function(error, i){
                errors.push(
                    <li key={i} className={error.type}>{error.message}</li>
                );
            });
            return (
                <div className="error">
                    <h4>There were errors while attempting to load your file:</h4>
                    <ul>
                        {errors}
                    </ul>
                </div>
            );
        }
        return null;
    },

    closeDialog: function () {
        this.getFlux().actions.closeActionDialog();
    },

    render: function () {
        return (
            <form onSubmit={this.handleSubmit} encType="multipart/form-data" className="data-loader-form">
                <p className="instructions">Browse your computer or drag and drop the file to load.</p>
                <input type="file" onChange={this.handleFile} accept=".yaml,text/*" className="file-input"/>
                {this.progressBar()}
                {this.errorLabel()}
                <div className="controls">
                    <button className="cancel-button" type="button" value="cancel" onMouseDown={this.closeDialog}>Cancel</button>
                    <button className="load-data-button" type="submit" value="Load Monster Data" disabled={this.state.fileText === null}>Load Monster Data</button>
                </div>
            </form>
        );
    }
});

module.exports = DataLoader;