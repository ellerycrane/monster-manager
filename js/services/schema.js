var yaml = require('js-yaml');

var AttacksType = new yaml.Type('!attacks', {
    kind: 'sequence',
    construct: function (data) {
        console.log("Calling AttacksType with data:");
        console.log(data);
        return data.map(function (obj) {
            var result = {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    var values = obj[key].split(",");
                    var toHit = parseInt(values[0]);
                    var damage = {};
                    for(var i = 1; i < values.length; i++){
                        var damageValues = values[i].trim().split(' ');
                        damage[damageValues[1]] = damageValues[0];
                    }
                    result['toHit'] = toHit;
                    result['damage'] = damage;
                }
            }
            return result;
        });
    }
});


module.exports = {
    MonsterSchema: yaml.Schema.create([AttacksType])
};
