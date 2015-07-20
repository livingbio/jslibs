// --------------------------------------------------------
// Unit Test Init
// --------------------------------------------------------

require('./config').init(__filename, __dirname);
var set = require('../libs/set.js');

// --------------------------------------------------------
// Your Unit Test Start
// --------------------------------------------------------

describe('TEST_' + fileName, function() {
    describe('intersect', function() {

        var a = ["1", "2", "3"];
        var b = ["3", "4", "5"];
        var c = ["4", "5", "6"];
        var set = GCloud.Set;

        var ab = set.intersect(a, b);
        var bc = set.intersect(b, c);
        var ac = set.intersect(a, c);
        var abc = set.intersect(a, b, c);

        it('test intersect', function() {
            assert.deepEqual(ab, ["3"], "ab not equal");
            assert.deepEqual(bc, ["4", "5"], "bc not equal");
            assert.deepEqual(ac, [], "ac not equal");
            assert.deepEqual(abc, [], "abc not equal");
        });
    });
    describe('union', function() {
        var a = ["1", "2", "3"];
        var b = ["3", "4", "5"];
        var c = ["4", "5", "6", "7"];
        var set = GCloud.Set;

        var ab = set.union(a, b);
        var bc = set.union(b, c);
        var ac = set.union(a, c);
        var abc = set.union(a, b, c);

        it('test union', function() {
            assert.deepEqual(ab, ["1", "2", "3", "4", "5"], "ab not equal");
            assert.deepEqual(bc, ["3", "4", "5", "6", "7"], "bc not equal");
            assert.deepEqual(ac, ["1", "2", "3", "4", "5", "6", "7"], "ac not equal");
            assert.deepEqual(abc, ["1", "2", "3", "4", "5", "6", "7"], "abc not equal");
        });
    });
    describe('merge', function() {
        var a = {
            "a": 1,
            "b": 2
        };
        var b = {
            "a": 1,
            "c": 3
        };
        var c = {
            "a": 2,
            "d": 4
        };

        var set = GCloud.Set;
        var ab = set.merge(a, b);
        var bc = set.merge(b, c);
        var ac = set.merge(a, c);
        var abc = set.merge(a, b, c);

        it('test object', function() {
            assert.deepEqual(ab, {
                "a": 1,
                "b": 2,
                "c": 3
            }, "ab not equal");
            assert.deepEqual(bc, {
                "a": 2,
                "c": 3,
                "d": 4
            }, "bc not equal");
            assert.deepEqual(ac, {
                "a": 2,
                "b": 2,
                "d": 4
            }, "ac not equal");
            assert.deepEqual(abc, {
                "a": 2,
                "b": 2,
                "c": 3,
                "d": 4
            }, "abc not equal");
        });
    })

})
