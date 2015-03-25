var $ = require('jquery');
var fs = require('fs');
var BOOKMARKLET_CODE = fs.readFileSync(__dirname + '/../bookmarklet.js', 'utf8');

var minify = function(source) {
    console.log(source);
    var lines = source.split(/\r\n|\r|\n/g).map(function(line){return line.trim();});
    return lines.join('').replace(/;$/, '');
};

var generate = function(){
    return 'javascript:'+encodeURIComponent('(function(){' + minify(BOOKMARKLET_CODE) + '})()');
};

module.exports = {
    generated: generate()
};