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
    },
    deep_get: function(obj, full_path) {
        var paths = full_path.split('.');
        var result = obj;
        try {
            for (var idx in paths) {
                if(!paths.propertyIsEnumerable(idx)){
                    continue;
                }
                result = result[paths[idx]]
            }
        } catch (err) {
            result = undefined;
        }
        return result;
    },
    deep_set: function(obj, full_path, value) {
        var set = function(obj, paths, value) {
            if (paths.length == 0) {
                return value;
            }
            if (obj == undefined) {
                obj = {};
            }
            if (obj.constructor != Object && path) {
                throw 'type error';
            }
            var path = paths[0];
            obj[path] = set(obj[path], paths.slice(1), value)
            return obj
        }

        var paths = full_path.split('.');
        return set(obj, paths, value);
    },
    getRamdomNumber: function(l,range) {
        var r = range || 36;//default a-z + 0-9
        var s = "";
        for (var i = l; i >= 0; i--) {
            s += (Math.random() * 100 % r | 0).toString(r)
        };
        return s
    }
}

module.exports = Tagtoo.Set;
