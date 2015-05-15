var base64 = require("./Base64"),
    MONSTER_DATA_KEY = 'MONSTER_MANAGER_DATA';

var browserSupportsLocalStorage = function(){
    return typeof(Storage) !== "undefined";
};
var hasLocalData = function(){
    return browserSupportsLocalStorage() && window.localStorage[MONSTER_DATA_KEY];
};

var getLocalData = function(){
    if(hasLocalData()) {
        return base64.decode(window.localStorage[MONSTER_DATA_KEY]);
    }
    return null;
};

var setLocalData = function(data){
    if(browserSupportsLocalStorage()) {
        window.localStorage[MONSTER_DATA_KEY] = base64.encode(data);
    }
    return null;
};

var LocalStorageService = {
    hasLocalData: hasLocalData,
    getLocalData: getLocalData,
    setLocalData: setLocalData
};

module.exports = LocalStorageService;