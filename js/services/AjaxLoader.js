var $ = require('jquery');
var MonsterParser = require('./MonsterParser');

// Get document, or throw exception on error
var load = function (url, successCallback) {
    try {
        $.ajax({
            url: url,
            context: document.body
        }).done(function (data) {
            var monsters = MonsterParser.parseMonstersFromYaml(data);
            successCallback(monsters);
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {load: load};
