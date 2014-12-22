exports.init = function (fn, dn, td) {


    // var fs = require('fs');
    // var vm = require('vm');

    expect = require("chai").expect;
    assert = require("chai").assert;
    // td = td || [];

    fileName = fn.replace(dn,'').replace('/test_','');
    // td.unshift(fileName);

    // var gs = require('glob-stream');
    // var stream = gs.create(__dirname.replace('test','') + 'static/ad/js/**/*.js');
    // var num = 0;
    // console.log(td)
    // stream.on('data', function(file){
    //     // file has path, base, and cwd attrs
    //     for (var i=0; i<td.length; i++) {
    //         if (file.path.match(td[i])) {
    //             console.log(num + fileName + 'true')
    //             // absPath = __dirname.replace('test','') + 'static/ad/js/' + td[i];
    //             // cpms
    //     console.log(file.path)
    //             code = fs.readFileSync(file.path);
    //             vm.runInThisContext(code);
    //             num++
    //         }
    //     }

    // });

    // for (var i=0; i<td.length; i++) {
    //     absPath = __dirname.replace('test','') + 'static/ad/js/' + td[i];
    //     code = fs.readFileSync(absPath);
    //     vm.runInThisContext(code);
    // }
}
