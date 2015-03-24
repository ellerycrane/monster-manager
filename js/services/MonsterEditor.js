require('codemirror/mode/yaml/yaml');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/css/css');
require('codemirror/mode/htmlmixed/htmlmixed');

var _ = require("underscore");
var CodeMirror = require('codemirror/lib/codemirror');
var hasher = require("hasher");
var MonsterParser = require('./MonsterParser');
var base64 = require("./Base64");


var initialize = function (updateMonstersCallback) {
    var source, result, initial, permalink, timer1, timer2 = null,
        fallback = document.getElementById('source').value || '';

    function _parse() {
        var str, monsters;
        str = source.getValue();
        permalink.href = '#yaml=' + base64.encode(str);
        monsters = MonsterParser.parseMonstersFromYaml(str);
        updateMonstersCallback(monsters);
    }

    var parse = _.debounce(_parse, 500);


    function updateSource() {
        var yaml;

        if (location.hash && '#yaml=' === location.hash.toString().slice(0, 6)) {
            yaml = base64.decode(location.hash.slice(6));
        }

        source.setValue(yaml || fallback);
    }

    permalink = document.getElementById('permalink');

    source = CodeMirror.fromTextArea(document.getElementById('source'), {
        mode: 'yaml',
        //theme: 'monokai',
        undoDepth: 1
    });
    source.on("change", function (instance, changeObj) {
        parse();
    });
    source.setOption("extraKeys", {
        Tab: function (cm) {
            var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
            cm.replaceSelection(spaces);
        }
    });

    // initial source
    _parse();

    // start monitor hash change
    hasher.prependHash = '';
    hasher.changed.add(updateSource);
    hasher.initialized.add(updateSource);
    hasher.init();

};

module.exports = {initialize: initialize};