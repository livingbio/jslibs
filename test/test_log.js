// --------------------------------------------------------
// Unit Test Init
// --------------------------------------------------------

// testDependencies root path: apps/campaign_creater/stacit/ad/js

require('./config').init(__filename, __dirname);
var log = require('../static/ad/js/lib/log.js');
var tracker = require('../static/ad/js/lib/tracker.js');
var set = require('../static/ad/js/lib/set.js');
var sinon = require('sinon');
// --------------------------------------------------------
// Your Unit Test Start
// --------------------------------------------------------

describe('TEST_' + fileName, function() {

    describe('log', function() {

        var lv = 10;
        var msg = "hello";
        var d = {};

        beforeEach(function() {
            mock_tracker_track = sinon.stub(tracker, "track");
            mock_set_merge = sinon.stub(set, "merge");
        });

        afterEach(function() {
            mock_tracker_track.restore();
            mock_set_merge.restore();
        });


        it('should call tracker.track func', function() {
            log.log(lv, msg, d);
            assert.isTrue(mock_tracker_track.called, "tracker.track is not called");
        });

        it('should call set.merge func', function() {
            log.log(lv, msg, d);
            assert.isTrue(mock_set_merge.called, "set.merge is not called");
        });

    });

    describe('debug', function() {

        var msg = "hello";
        var d = {};

        beforeEach(function() {
            mock_log_log = sinon.stub(log, "log");
        });

        afterEach(function() {
            mock_log_log.restore();
        });

        it('should call log.log func', function() {
            log.debug(msg, d);
            assert.isTrue(mock_log_log.called, "log.log is not called");
        });

    });

    describe('info', function() {
        var msg = "hello";
        var d = {};

        beforeEach(function() {
            mock_log_log = sinon.stub(log, "log");
        });

        afterEach(function() {
            mock_log_log.restore();
        });

        it('should call log.log func', function() {
            log.info(msg, d);
            assert.isTrue(mock_log_log.called, "log.log is not called");
        });

    });

    describe('warn', function() {
        var msg = "hello";
        var d = {};

        beforeEach(function() {
            mock_log_log = sinon.stub(log, "log");
        });

        afterEach(function() {
            mock_log_log.restore();
        });

        it('should call log.log func', function() {
            log.warn(msg, d);
            assert.isTrue(mock_log_log.called, "log.log is not called");
        });

    });

    describe('error', function() {
        var msg = "hello";
        var d = {};

        beforeEach(function() {
            mock_log_log = sinon.stub(log, "log");
        });

        afterEach(function() {
            mock_log_log.restore();
        });

        it('should call log.log func', function() {
            log.error(msg, d);
            assert.isTrue(mock_log_log.called, "log.log is not called");
        });

    });

    describe('critical', function() {
        var msg = "hello";
        var d = {};

        beforeEach(function() {
            mock_log_log = sinon.stub(log, "log");
        });

        afterEach(function() {
            mock_log_log.restore();
        });

        it('should call log.log func', function() {
            log.critical(msg, d);
            assert.isTrue(mock_log_log.called, "log.log is not called");
        });

    });

    describe('exception', function() {
        var e = {
            name: "abc",
            message: "test"
        };
        var d = {};

        beforeEach(function() {
            mock_set_merge = sinon.stub(set, "merge");
            mock_log_log = sinon.stub(log, "log");
            mock_log_error = sinon.stub(log, "error");
        });

        afterEach(function() {
            mock_log_log.restore();
            mock_set_merge.restore();
            mock_log_error.restore();
        });

        it('should call set.merge func', function() {
            log.exception(e, d);
            // assert.isTrue(mock_log_log.called, "log.log is not called");
            assert.isTrue(mock_set_merge.called, "set.merge is not called");
        });

        it('should call log.error func', function() {
            log.exception(e, d);
            // assert.isTrue(mock_log_log.called, "log.log is not called");
            assert.isTrue(mock_log_error.called, "log.error is not called");
        });

    });

})
