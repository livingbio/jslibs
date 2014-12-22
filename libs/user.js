Tagtoo = (typeof Tagtoo === 'undefined') ? {} : Tagtoo;
var cookie = require('./cookie.js');

Tagtoo.User = {

    //
    genUUID: function() {
        var l = 16;
        var s = "";
        for (var i = l; i > 0; i--) {
            s += (Math.random() * 100 % 36 | 0).toString(36)
        };
        return s;
    },

    // For Tagtoo userid
    getUserId: function() {
        var user = cookie.getItem("tuid");
        if (!user || user.length != 16) {
            user = Tagtoo.User.genUUID();
        }
        cookie.setItem("tuid", user, 10 * 365 * 24 * 60 * 60);
        return user;
    },

    // 一次瀏覽行為
    getSessionId: function() {
        var session = cookie.getItem("tsid");
        if (!session || session.length != 16) {
            session = Tagtoo.User.genUUID();
        }
        cookie.setItem("tsid", session);
        return session;
    },

    get_tags: function() {
        var tags = cookie.getItem("tags");
        var result = [];
        var now = (new Date()).getTime() / 1e6;
        for (var tag_name in tags) {
            var end_time = parseInt(tags[tag_name][1]);
            var start_time = parseInt(tags[tag_name][0]);
            if (start_time <= now && end_time >= now) {
                result.push(tag_name);
            }
        }

        var cookie_keys = cookie.keys()
        for (var idx in cookie_keys) {
            if (cookie_keys[idx].match(/^pl_/)) {
                result.push(cookie_keys[idx].replace('pl_', 'view_'))
            }

        }

        return result;
    }
};

module.exports = Tagtoo.User;
