require('codemirror/mode/yaml/yaml');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/css/css');
require('codemirror/mode/htmlmixed/htmlmixed');

var fs = require('fs');
var _ = require("underscore");
var CodeMirror = require('codemirror/lib/codemirror');
var hasher = require("hasher");
var MonsterParser = require('./MonsterParser');
var base64 = require("./Base64");
var BookmarkletGenerator = require('../services/BookmarkletGenerator');

var INITIAL_MONSTER_DATA = fs.readFileSync(__dirname + '/../../test.yaml', 'utf8');

var initialize = function (updateMonstersCallback) {
    var codeMirrorEditor,
        permalink = document.getElementById('permalink'),
        fallback = INITIAL_MONSTER_DATA || '',
        sourceTextArea = document.getElementById('source'),
        bookmarkletLink = document.getElementById('bookmarklet-link');

    sourceTextArea.innerHTML = INITIAL_MONSTER_DATA;
    bookmarkletLink.href = BookmarkletGenerator.generated;

    var _parse = function() {
        var str, monsters;
        str = codeMirrorEditor.getValue();
        permalink.href = '#yaml=' + base64.encode(str);
        monsters = MonsterParser.parseMonstersFromYaml(str);
        updateMonstersCallback(monsters);
    };
    var parse = _.debounce(_parse, 500);
    var updateSource = function() {
        var yaml;
        if (location.hash && '#yaml=' === location.hash.toString().slice(0, 6)) {
            yaml = base64.decode(location.hash.slice(6));
        }
        codeMirrorEditor.setValue(yaml || fallback);
    };
    codeMirrorEditor = CodeMirror.fromTextArea(sourceTextArea, {
        mode: 'yaml',
        //theme: 'monokai',
        undoDepth: 1
    });
    codeMirrorEditor.on("change", function (instance, changeObj) {
        parse();
    });
    codeMirrorEditor.setOption("extraKeys", {
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