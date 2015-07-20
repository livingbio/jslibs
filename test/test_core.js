// --------------------------------------------------------
// Unit Test Init
// --------------------------------------------------------

require('./config').init(__filename, __dirname);
var core = require("../libs/core");
var sinon = require('sinon');

// --------------------------------------------------------
// Your Unit Test Start
// --------------------------------------------------------

describe('TEST_' + fileName, function() {
    describe('format', function() {
        it('test format with string', function() {
            assert.deepEqual("0:1:2:3", core.format("{0}:{1}:{2}:{3}", "0", "1", "2", "3"));
            assert.deepEqual("0:1:2:{3}", core.format("{0}:{1}:{2}:{3}", "0", "1", "2"));
            assert.deepEqual("0:1:3:2", core.format("{0}:{1}:{3}:{2}", 0, 1, 2, 3));
            assert.deepEqual("0:0:0:0", core.format("{0}:{0}:{0}:{0}", 0, 2, 3, 3));
        });
    });

    describe('encodeQueryData & decodeQueryData', function() {
        var a = {"a": "1", "b": "2"};
        var b = {"a": "2", "c": "3"};
        var c = {"b": "5", "a": "4", "d": "5"};
        var core = GCloud.Core;
        var set = GCloud.Set;

        var qa = core.encodeQueryData(a);
        var qb = core.encodeQueryData(b);
        var qc = core.encodeQueryData(c);
        var ab = core.encodeQueryData(a, b);
        var bc = core.encodeQueryData(b, c);
        var ac = core.encodeQueryData(a, c);
        var abc = core.encodeQueryData(a, b, c);

        global.document = {};

        it('test encodeQueryData and decode', function() {
            assert.deepEqual(a, core.decodeQueryData(qa));
            assert.deepEqual(b, core.decodeQueryData(qb));
            assert.deepEqual(c, core.decodeQueryData(qc));
            assert.deepEqual(set.merge(a,b), core.decodeQueryData(ab));
            assert.deepEqual(set.merge(b,c), core.decodeQueryData(bc));
            assert.deepEqual(set.merge(a,c), core.decodeQueryData(ac));
            assert.deepEqual(set.merge(a,b,c), core.decodeQueryData(abc));
        });
    });
});
