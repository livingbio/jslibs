// --------------------------------------------------------
// Unit Test Init
// --------------------------------------------------------

require('./config').init(__filename, __dirname);
require('../libs/cookie.js');
var sinon = require('sinon');

// --------------------------------------------------------
// Your Unit Test Start
// --------------------------------------------------------

describe('TEST_' + fileName, function() {
    describe('cookie', function() {
        // need to stub cookie
        // mock property
        global.document = {"cookie": ""};

        var cookie = Tagtoo.Cookie;
        var cookie_format = Tagtoo.CookieFormat;

        it('test add / remove object value', function() {
            global.document = {"cookie": ""};
            // test add / remove item
            assert.isFalse(cookie.hasItem('test'));
            cookie.setItem('test', {"a":"b"});
            assert.deepEqual(global.document.cookie, "test=a+b; path=/");
            assert.isTrue(cookie.hasItem('test'));
            cookie.removeItem('test');
            assert.deepEqual(global.document.cookie, "test=; expires=Thu, 01 Jan 1970 00:00:00 GMT");
        });


        it('test add / remove array value', function() {
            global.document = {"cookie": ""};
            assert.isFalse(cookie.hasItem('test'));
            cookie.setItem('test', ['a','b']);
            assert.isTrue(cookie.hasItem('test'));
            assert.deepEqual(cookie.getItem('test'), ["a", "b"]);
            cookie.getOrSetItem('test1', ["1","2","3"]);
            assert.deepEqual(cookie.getItem("test1"), ["1", "2", "3"]);
            assert.isTrue(cookie.hasItem('test1'));
        });
    });
});
