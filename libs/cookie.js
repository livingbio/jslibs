/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * Tagtoo.Cookie.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * Tagtoo.Cookie.getItem(name)
|*|  * Tagtoo.Cookie.removeItem(name[, path], domain)
|*|  * Tagtoo.Cookie.hasItem(name)
|*|  * Tagtoo.Cookie.keys()
|*|
|*|  :: cookie Format js ::
|*|
|*|  擴充 cookie.js  setTime & getItem 直接存取 array list string 部份boolean (無法分辨數字＆部份boolean)
|*|  制定一個有限制的資料格式來達到一個較精簡的資料格式
|*|  1. 支援單層的 {} 不支援多層..
|*|  2. 支援 字串 array, 數字會被強制轉型
|*|
|*|
|*|  Syntaxes:
|*|  CookieFormat.encode(data)
|*|  CookieFormat.decode(queryString)
|*|
|*|
|*|  updated:
|*|     2014-4-7: 拔除 key name 容錯, 避免前後端溝通上問題, example
|*|         Tagtoo.Cookie.setItem('中文', "value")
|*|         這樣實際上存在 cookie 裡面的會是 %E4%B8%AD%E6%96%87=value
|*|         後端就需要用 %E4%B8%AD%E6%96%87 才能拿到 value.. 不過假如用這package 的不知道內部用 encodeURIComponent 壓過.. 那後端就永遠不知道出問題了..
|*|
\*/

(function(){
    /* cookie format */
    var equ= "+";
    var split= "&";
    var array_split= "`";
    var replacement= "^";

    var __encode= function(v){
        //array
        if(v.constructor === Array){
            var tmp=[];
            for(var idx in v){

                if( !v.hasOwnProperty( idx )){
                    continue;
                }

                tmp.push(encodeURIComponent(v[idx]).replace(/%/g, replacement));
            }
            return tmp.join(array_split);
        }
        //string
        if(v.constructor == String || v.constructor == Number){
            return encodeURIComponent(v).replace(/%/g, replacement);
        }

        throw 'value type error';
    };

    var __decode= function(v){
        if(v.indexOf(array_split) !== -1){
            var tmp = v.split(array_split);
            var result = [];
            for(var idx in tmp){

                if( !v.hasOwnProperty( idx )){
                    continue;
                }

                result.push(decodeURIComponent(tmp[idx].replace(RegExp("\\"+replacement, "g"), "%")));
            }
            return result;
        }else{
            return decodeURIComponent(v.replace(RegExp("\\"+replacement, "g"), "%"));
        }
    };

    var CookieFormat = {
        decode: function (queryString) {
            // not dict

            if(queryString.indexOf(split) === -1 && queryString.indexOf(equ) === -1 ){
                return __decode(queryString);
            }

            var result = {};
            var pairs = queryString.split(split);
            for(var idx in pairs){

                if( !pairs.hasOwnProperty( idx )){
                    continue;
                }

                var cur = pairs[idx];
                // 空字串
                if(!cur){
                    continue;
                }
                var info = cur.split(equ);

                //boolean
                if(info.length == 1){
                    result[info[0]] = true;
                }

                //key value
                if(info.length == 2){
                    result[__decode(info[0])] = __decode(info[1]);
                }
            }
            return result;

        },

        encode: function (decodedObject) {
            if(decodedObject.constructor == String || decodedObject.constructor == Number || decodedObject.constructor == Array){
                return __encode(decodedObject);
            }

            var result = [];
            for(var key in decodedObject){
                var value = decodedObject[key];
                if(value.constructor === Boolean){
                    if(value){
                        result.push(__encode(key));
                    }
                    continue;
                }
                result.push(
                        __encode(key) + equ + __encode(value)
                        );
            }
            return result.join(split);
        }
    };

    //驗證 key name 不得有特殊字元
    function verification_key(key){
        if(key !== encodeURIComponent(key)){
            throw 'key verificate error'
        }
    }


    /* moz cookie lib use cookie format */
    var Cookie = {

        getItem: function (sKey, default_val) {

            verification_key(sKey)
            return CookieFormat.decode(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + sKey.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || default_val;
        },
        setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            verification_key(sKey)
            var sPath = sPath || "/";
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
            var sExpires = "";
            if (vEnd) {
                switch (vEnd.constructor) {
                    case Number:
                        var td = new Date();
                        td.setTime(td.getTime() + vEnd*1000);
                        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; expires=" + td.toGMTString();
                        break;
                    case String:
                        sExpires = "; expires=" + vEnd;
                        break;
                    case Date:
                        sExpires = "; expires=" + vEnd.toUTCString();
                        break;
                }
            }
            document.cookie = sKey + "=" + CookieFormat.encode(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
            return true;
        },
        removeItem: function (sKey, sPath, sDomain) {
            verification_key(sKey)
            if (!sKey || !Tagtoo.Cookie.hasItem(sKey)) { return false; }
            document.cookie = sKey + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
            return true;
        },
        hasItem: function (sKey) {
            verification_key(sKey)
            return (new RegExp("(?:^|;\\s*)" + sKey.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        },
        keys: function () {
            /* optional method: you can safely remove it! */
            var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            return aKeys;
        },
        getOrSetItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (Tagtoo.Cookie.getItem(sKey)) {
                return Tagtoo.Cookie.getItem(sKey)
            }else{
                Tagtoo.Cookie.setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure)
                return sValue
            }
        }
    };
    Tagtoo = (typeof Tagtoo === 'undefined') ? {} : Tagtoo;
    Tagtoo.CookieFormat = CookieFormat;
    Tagtoo.Cookie = Cookie;
    module.exports = Tagtoo.Cookie;
}());

