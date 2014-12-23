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
    isArray: function(obj) {
        // from jquery
        return toString.call(obj) == "[object Array]" ? true : false;
    },
    _has: function(obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
    },
    _keys: function(obj) {
        if (!Tagtoo.Set._isObject(obj)) return [];
        var keys = [];
        for (var key in obj)
            if (Tagtoo.Set._has(obj, key)) keys.push(key);
        return keys;
    },
    _isObject: function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    },
    map: function(obj, iteratee, context) {
        // from underscore
        if (obj == null) return [];
        var keys = obj.length !== +obj.length && Tagtoo.Set._keys(obj),
            length = (keys || obj).length,
            results = Array(length),
            currentKey;
        for (var index = 0; index < length; index++) {
            currentKey = keys ? keys[index] : index;
            results[index] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
    }
}

module.exports = Tagtoo.Set;
