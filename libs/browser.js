GCloud = (typeof GCloud === 'undefined') ? {} : GCloud;

GCloud.Browser = {
    get_browser_tags: function() {

        var result = [];
        GCloud.Browser.hasFlash() && result.push('hasFlash');

        return result;

    },
    hasFlash: function() {
        var hasFlash = false;
        try {
            var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            if (fo) {
                hasFlash = true;
            }
        } catch (e) {
            if (navigator.mimeTypes && navigator.mimeTypes['application/x-shockwave-flash'] != undefined && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
                hasFlash = true;
            }
        }
        return hasFlash;
    }
}
module.exports = GCloud.Browser;

