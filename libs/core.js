Tagtoo = (typeof Tagtoo === 'undefined') ? {} : Tagtoo;

set = require('./set.js');

Tagtoo.Core = {
    format: function(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    },
    encodeQueryData: function() {
        // TODO: need to test
        var data = set.merge.apply(this, arguments);

        var ret = [];
        var v;
        for (var d in data) {
            if (!data.hasOwnProperty(d)) continue;
            v = data[d];
            if (typeof v === "string" && v != "" || typeof v === "number" && !isNaN(v)) ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(v));
        }
        return ret.join("&");
    },
    decodeQueryData: function(str) {
        // support parameter extract from both querystring or hash
        // not support multi value for single key yet.
        var data = {};
        str = str.replace(/.*\?/, '')
        var parts = str.split(/[#&]/);
        // remove the first part

        for (var i = 0; i < parts.length; i++) {
            var vs = parts[i].split('=');
            if (vs.length == 2) {
                var key = decodeURIComponent(vs[0]);
                var value = decodeURIComponent(vs[1]);
                data[key] = value;
            }
        }
        return data;
    },
    concatAndResolveUrl: function(url, concat) {
        var url1 = url.split('/');
        var url2 = concat.split('/');
        var url3 = [ ];
        for (var i = 0, l = url1.length; i < l; i ++) {
            if (url1[i] == '..') {
                url3.pop();
            } else if (url1[i] == '.') {
                continue;
            } else {
                url3.push(url1[i]);
            }
        }
        for (var i = 0, l = url2.length; i < l; i ++) {
            if (url2[i] == '..') {
                url3.pop();
            } else if (url2[i] == '.') {
                continue;
            } else {
                url3.push(url2[i]);
            }
        }
        return url3.join('/');
    },
    hash: function(url, salt){
        var data = "_" +  salt + url;
        return "_" + data.replace(/[^\w]/g, '')
    },
    ajax: function(url, cb) {
        $.get(url, cb);
    },
    jsonp: function(info) {
        var cache = Boolean(info.cache);
        var cache_salt = info.cache_salt || "";
        var url = info.url;
        var jsonpCallback = Tagtoo.Core.hash(url, cache_salt);
        var error = info.error || function(){};
        var success = info.success;
        $.ajax({
            dataType:"jsonp",
            cache: cache, 
            jsonpCallback: jsonpCallback,
            url: url, 
            type:"get",
            success: success,
            error: error,
        });
    },
    createIframe: function(url) {
        var iframe = document.createElement('iframe');
        iframe.setAttribute('src', url);
        iframe.width = 0;
        iframe.height = 0;

        // TODO: handle no body error;
        document.getElementsByTagName("body")[0].appendChild(iframe);
        return iframe;
    },
    loadScript: function(url, callback) {
        var script = document.createElement("script")
            script.type = "text/javascript";

        if (script.readyState) {
            // IE
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    if (typeof callback !== "undefined")
                        callback();
                }
            };
        } else {
            //Others
            script.onload = function() {
                if (typeof callback !== "undefined")
                    callback();
            };
        }

        script.src = url;
        // TODO: handle no head error?
        document.getElementsByTagName("head")[0].appendChild(script);
    }
}

module.exports = Tagtoo.Core;
