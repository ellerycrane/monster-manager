require('codemirror/mode/yaml/yaml');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/css/css');
require('codemirror/mode/htmlmixed/htmlmixed');

var CodeMirror = require('codemirror/lib/codemirror');
var hasher = require("hasher");
var MonsterParser = require('./MonsterParser');
var base64 = require("./Base64");

var initialize = function (updateMonstersCallback) {
    var source, result, initial, permalink, timer1, timer2 = null,
        fallback = document.getElementById('source').value || '';

    function parse() {
        var str, monsters;

        try {
            str = source.getValue();
            permalink.href = '#yaml=' + base64.encode(str);
            monsters = MonsterParser.parseMonstersFromYaml(str);
            updateMonstersCallback(monsters);
        } catch (err) {
            console.log("Error!! ");
            console.log(err);
        }
    }

    function updateSource() {
        var yaml;

        if (location.hash && '#yaml=' === location.hash.toString().slice(0, 6)) {
            yaml = base64.decode(location.hash.slice(6));
        }

        source.setValue(yaml || fallback);
        parse();
    }

    permalink = document.getElementById('permalink');

    source = CodeMirror.fromTextArea(document.getElementById('source'), {
        mode: 'yaml',
        //theme: 'monokai',
        undoDepth: 1
    });
    source.on("change", function (instance, changeObj) {
        window.clearTimeout(timer1);
        timer1 = window.setTimeout(parse, 500);

        if (null === timer2) {
            timer2 = setTimeout(function () {
                window.clearTimeout(timer1);
                window.clearTimeout(timer2);
                timer2 = null;
                parse();
            }, 1000);
        }
    });
    source.setOption("extraKeys", {
        Tab: function(cm) {
            var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
            cm.replaceSelection(spaces);
        }
    });

    // initial source
    updateSource();

    // start monitor hash change
    hasher.prependHash = '';
    hasher.changed.add(updateSource);
    hasher.initialized.add(updateSource);
    hasher.init();

};

module.exports = {initialize: initialize};