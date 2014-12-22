'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');

// --------------------------------------------------------
// unit Test
// --------------------------------------------------------

(function(scope){

    gulp.task('mocha', function () {
        return gulp.src("test/*.js", {read: false})
            .pipe(mocha({reporter: 'spec'}));
    });

})(this);

// --------------------------------------------------------
// gulp command
// --------------------------------------------------------

(function(scope){

    gulp.task('default', [], function() {
        gulp.start('test');
    });

    gulp.task('test', function() {
        gulp.start('mocha');
    });

})(this);

