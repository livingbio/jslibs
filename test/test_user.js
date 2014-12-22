// --------------------------------------------------------
// Unit Test Init
// --------------------------------------------------------

require('./config').init(__filename, __dirname);
var user = require('../libs/user.js');
var cookie = require('../libs/cookie.js');
var sinon = require('sinon');

// --------------------------------------------------------
// Your Unit Test Start
// --------------------------------------------------------

describe('TEST_' + fileName, function() {

    describe('genUUID', function() {

        var result = user.genUUID();

        it('genUUID length according to 16', function() {
            assert.lengthOf(result, 16, "genUUID wrong length!");
            // assert(cookie.getItem.calledOnce);
            // 判斷小寫跟數字
            // 至少呼叫兩次要不一樣
        });

    });

    describe('getUserId', function() {
        var mock_cookie_getItem, mock_cookie_setItem, mock_user_genUUID;

        beforeEach(function() {
            mock_cookie_getItem = sinon.stub(cookie, "getItem");
            mock_cookie_setItem = sinon.stub(cookie, "setItem");
            mock_user_genUUID = sinon.stub(user, "genUUID");
        });

        afterEach(function() {
            mock_cookie_getItem.restore();
            mock_cookie_setItem.restore();
            mock_user_genUUID.restore();
        });

        it('UUID with the expected outputs of the same', function() {

            // 預計自動產出的 UUID
            var default_UUID = 'qazwsxedcrfvtgby';
            // auto gen uuid on have no tuid in cookie
            mock_user_genUUID.returns(default_UUID);
            // case 1 no cookie then user id == genUUID
            assert.equal(user.getUserId(), default_UUID);

        });

        it('tuid with the expected outputs of the same', function() {

            // case 2 has cookie pre set cookie = 1234567890123456 so getUserId == 1234567890123456
            var default_cookie_tuid = '1234567890123456';
            mock_cookie_getItem.withArgs('tuid').returns(default_cookie_tuid);
            assert.equal(user.getUserId(), default_cookie_tuid);

        });

    });

    describe('getSessionId', function() {


        var mock_cookie_getItem, mock_cookie_setItem, mock_user_genUUID;

        beforeEach(function() {
            mock_cookie_getItem = sinon.stub(cookie, "getItem");
            mock_cookie_setItem = sinon.stub(cookie, "setItem");
            mock_user_genUUID = sinon.stub(user, "genUUID");
        });

        afterEach(function() {
            mock_cookie_getItem.restore();
            mock_cookie_setItem.restore();
            mock_user_genUUID.restore();
        });

        it('UUID with the expected outputs of the same', function() {

            // 預計自動產出的 UUID
            var default_UUID = 'qazwsxedcrfvtgby';
            // auto gen uuid on have no tuid in cookie
            mock_user_genUUID.returns(default_UUID);
            // case 1 no cookie then user id == genUUID
            assert.equal(user.getSessionId(), default_UUID);

        });

        it('tsid with the expected outputs of the same', function() {

            // case 2 has cookie pre set cookie = 1234567890123456 so getUserId == 1234567890123456
            var default_cookie_tuid = '1234567890123456';
            mock_cookie_getItem.withArgs('tsid').returns(default_cookie_tuid);
            assert.equal(user.getSessionId(), default_cookie_tuid);

        });



    });

    describe('get_tags', function() {

        var mock_cookie_getItem, mock_cookie_getKeys, mock_user_genUUID;

        beforeEach(function() {
            mock_cookie_getItem = sinon.stub(cookie, "getItem");
            mock_cookie_getKeys = sinon.stub(cookie, "keys");
        });

        afterEach(function() {
            mock_cookie_getItem.restore();
            mock_cookie_getKeys.restore();
        });

        it('get cookie tags within', function() {

            var tags = {
                'male': [((new Date()).getTime() / 1e6) - 1000, ((new Date()).getTime() / 1e6) + 1000],
                'female': [((new Date()).getTime() / 1e6) - 1000, ((new Date()).getTime() / 1e6) + 1000]
            };
            var expect = ['male', 'female'];

            mock_cookie_getItem.withArgs('tags').returns(tags);
            result = user.get_tags();

            assert.deepEqual(result, expect);

        });

        it('get cookie tags over time', function() {

            var tags = {
                'male': [((new Date()).getTime() / 1e6) - 1000, ((new Date()).getTime() / 1e6) + 1000],
                'female': [((new Date()).getTime() / 1e6), ((new Date()).getTime() / 1e6)]
            };
            var expect = ['male'];

            mock_cookie_getItem.withArgs('tags').returns(tags);
            result = user.get_tags();

            assert.deepEqual(result, expect);

        });

        it('get cookie keys', function() {

            var keys = ["GOOGAPPUID", "csrftoken", "imp", "pl_189", "tagtoo_opt", "language", "pl_153", "pl_197", "tuid"];
            var expect = ["view_189", "view_153", "view_197"];

            mock_cookie_getKeys.returns(keys);
            result = user.get_tags();

            assert.deepEqual(result, expect);

        });
    });

})
