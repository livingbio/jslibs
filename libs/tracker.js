Tagtoo = (typeof Tagtoo === 'undefined') ? {} : Tagtoo;

var core = require('./core.js');
var cookie = require('./cookie.js');
var user = require('./user.js');
var base64 = require('base64-js');
var set = require('./set.js');

Tagtoo.Tracker = {
    pixel: function(imgurl, data) {
        data = data instanceof Object ? data : {};
        data['n'] = Math.random();

        if (imgurl.indexOf('//') == 0) {
            console.log(document);
            imgurl = (("https:" == document.location.protocol) ? "https://" : "http://") + imgurl;
        }

        imgurl = imgurl + (imgurl.indexOf('?') == -1 ? '?' : '&') + core.encodeQueryData(data);
        var imgElem = document.createElement("img");
        imgElem.src = imgurl;

        var node = document.getElementsByTagName("script")[0];
        node.parentNode.insertBefore(imgElem, node);
    },
    cookie_match: function() {
        // doubleclick
        Tagtoo.Tracker.pixel("//cm.g.doubleclick.net/pixel", {
            google_nid: "tagtooadex",
            google_cm: 1,
            google_sc: 1,
            google_hm: base64.fromByteArray(user.getUserId()),
            _tid: user.getUserId()
        });
        // tanx
        Tagtoo.Tracker.pixel("//cms.tanx.com/t.gif", {
            tanx_cm: 1,
            tanx_nid: 44115911,
            e: "tanx",
            _tid: user.getUserId()
        });
    },
    track: function(data, carry_querystr, carry_cookie) {
        // The merge order is cookie < url < data
        var opts = {};

        opts.a = user.getUserId();
        opts.b = user.getSessionId();
        var ad = data.ad;

        if (carry_cookie !== false) {
            if (document.location.hostname != "ad.tagtoo.co") {

                // open an iframe to send tracking pixel with cookie info
                // by default, it won't send querystr data.
                // need test!!

                // TODO: if pixel html exists, fire event via hash change
                var iframe = core.createIframe("//ad.tagtoo.co/pixel.html#" + core.encodeQueryData(data));

                return;
            }

            var tr = cookie.getItem('tr');
            if (tr && tr instanceof Object) {
                // Carry default cookie info
                // such as google id, facebook id, email
                opts = set.merge(opts, tr);
            }
            // TODO: how to get ad
            if (ad) {
                var tr = cookie.getItem("tr_" + ad);
                if (tr && tr instanceof Object) {
                    // Carry ad specify cookie info
                    // such as page,
                    opts = set.merge(opts, tr);
                }
            }
        }

        if (carry_querystr !== false) {
            // automatically carry url parameters forward, expect disabled explicitly or has _ prefix
            var url_opts = core.decodeQueryData(document.location.href);
            opts = set.merge(opts, url_opts);
        }

        opts = set.merge(opts, data);
        for (att in opts) {
            // parameters startswith _ won't send to server
            if (att[0] == "_") {
                // delete operation not support array.
                // http://stackoverflow.com/questions/346021/how-do-i-remove-objects-from-a-javascript-associative-array/9973592#9973592
                delete opts[att];
            }
        }
        Tagtoo.Tracker.pixel('//track.tagtoo.co/ad/tr.gif', opts);
    }
}

module.exports = Tagtoo.Tracker;
