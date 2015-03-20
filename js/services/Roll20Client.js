var Roll20Client = {
    rollStat: function(monster, stat){
        console.log("Rolling stat '"+stat+"' for monster "+monster.name+'[id='+monster.id+']');
    }
};

module.exports = Roll20Client;