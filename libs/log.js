Tagtoo = (typeof Tagtoo === 'undefined') ? {} : Tagtoo;

var set = require('./set.js');
var tracker = require('./tracker.js');

Tagtoo.Log = {
    log: function(level, msg, data) {
        var data = data instanceof Object ? data : {};
        data = set.merge(data, {
            't': 'log',
            'e': level,
            'qp': msg
        });
        tracker.track(data);
    },
    debug: function(msg, data) {
        Tagtoo.Log.log(10, msg, data);
    },
    info: function(msg, data) {
        Tagtoo.Log.log(20, msg, data);
    },
    warn: function(msg, data) {
        Tagtoo.Log.log(30, msg, data);
    },
    error: function(msg, data) {
        Tagtoo.Log.log(40, msg, data);
    },
    critical: function(msg, data) {
        Tagtoo.Log.log(50, msg, data);
    },
    exception: function(e, data) {
        data = set.merge(data, {
            qm: e.name
        });
        Tagtoo.Log.error(e.message, data);
    }
};

module.exports = Tagtoo.Log;
