var ModifierUtils;
ModifierUtils = {
    calculateModifier : function(value){
        return Math.floor((value) / 2) - 5;
    },
    modifierToString: function(modifier){
        var sign = modifier < 0 ? '' : '+';
        return sign + modifier;
    }
};
module.exports = ModifierUtils;