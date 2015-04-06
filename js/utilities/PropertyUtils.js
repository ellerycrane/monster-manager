var _ = require("underscore"),
    PropertyUtils;
PropertyUtils = {
    isNullOrUndefined: function(object){
        return _.isNull(object) || _.isUndefined(object);
    },

    exists: function(object, propertyName){
        if(PropertyUtils.isNullOrUndefined(object) || !_.isObject(object) || _.isArray(object) || !_.isString(propertyName)){
            return false;
        }
        return _.has(object, propertyName) && !PropertyUtils.isNullOrUndefined(_.property(propertyName)(object));
    },

    safeGet: function(object, propertyName){
        if(PropertyUtils.exists(object, propertyName)){
            return _.property(propertyName)(object);
        }
        return null;
    }

};

module.exports = PropertyUtils;