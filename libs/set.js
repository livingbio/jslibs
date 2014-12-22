Tagtoo = (typeof Tagtoo === 'undefined') ? {} : Tagtoo;

Tagtoo.Set = {
    countKey: function() {
        var temp = {};
        for (var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];
            for (var j = obj.length - 1; j >= 0; j--) {
                temp[obj[j]] = (typeof temp[obj[j]] === "undefined" ? 1 : (temp[obj[j]] + 1));
            }
        }
        return temp;
    },
    intersect: function() {
        var temp = Tagtoo.Set.countKey.apply(this, arguments);
        var results = [];

        for (var i in temp) {
            if (temp[i] == arguments.length) {
                results.push(i);
            }
        }
        return results;
    },
    union: function() {
        var temp = Tagtoo.Set.countKey.apply(this, arguments);
        var results = [];
        for (var k in temp)
            results.push(k);
        return results;
    },
    merge: function() {
        var temp = {};
        for (var i = 0; i < arguments.length; i++) {
            var dic = arguments[i];
            for (var attr in dic) {
                temp[attr] = dic[attr];
            }
        }
        return temp;
    }
}

module.exports = Tagtoo.Set;
