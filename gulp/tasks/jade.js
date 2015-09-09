var env = require('../env.js');
var gulp = require('gulp');

var argv = require('yargs').argv;
var changed = require('gulp-changed');
var debug = require('gulp-debug');
var jade = require('gulp-jade');
var util = require('gulp-util');


module.exports = function() {

  // Via yargs we will set if we are in distribution mode,
  // we will change directory and the code output to minified version
  env.jade.pretty = argv.dist ? false : true;
  var destination = argv.dist ? env.folder.dist : env.folder.dev;

  return gulp.src([
    env.folder.src + '/**/*.jade',
    '!' + env.folder.src + '/**/_*.jade'
  ])
    .pipe(jade(env.jade))
    .on('error', function (err) {
      util.log(err.message);
      this.emit('end');
    })

    // We will write only the changed files
    .pipe(changed(destination, {hasChanged: changed.compareSha1Digest}))

    .pipe(gulp.dest(destination))

    .pipe(debug({title: 'Views compiled: '}));
};
