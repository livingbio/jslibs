// --------------------------------------------------------
// Unit Test Init
// --------------------------------------------------------

// testDependencies root path: apps/campaign_creater/stacit/ad/js

require('./config').init(__filename, __dirname);
var browser = require('../libs/browser.js');

// --------------------------------------------------------
// Your Unit Test Start
// --------------------------------------------------------

describe('TEST_' + fileName, function() {
  describe('get_browser_tags', function(){
    ActiveXObject = function() {};
    var res = browser.get_browser_tags();
    var expect_res = ['hasFlash'];
    it('should return an array', function(){
      assert.isArray(res, "res is not an array");
    });
    it("should return ['hasFlash']", function(){
      assert.deepEqual(expect_res, res, "expect_res is not equal");
    });

    ActiveXObject = null;
    navigator = {};
    var res2 = browser.get_browser_tags();

    it('should return an array', function(){
      assert.isArray(res2, "res is not an array");
    });
    it("should return []", function(){
      assert.deepEqual(res2, [], "res2 is not equal");
    });

  });

  describe('hasFlash', function(){
    ActiveXObject = function() {};
    var result1 = browser.hasFlash();

    it('should return true', function(){
      assert.isTrue(result1, "hasFlash does not return true");
    });

    ActiveXObject = null;
    navigator = {};
    result2 = browser.hasFlash();

    it('should return false', function(){
      assert.isFalse(result2, "hasFlash does not return false");
    });


    navigator = {
        mimeTypes: {
            "application/x-shockwave-flash": {
                enabledPlugin: {}
            }
        }
    };

    result3 = browser.hasFlash();

    it('should return true', function(){
      assert.isTrue(result3, "hasFlash does not return true");
    });
  });


})
