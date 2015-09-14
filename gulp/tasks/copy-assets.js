var argv = require('yargs').argv;
var changed = require('gulp-changed');
var debug = require('gulp-debug');
var env = require('../env.js');
var gulp = require('gulp');


module.exports = function() {
  gulp.src([
    env.folder.src + '/**/*.*',
    '!' + env.folder.src + '/**/*.+(scss|sass|jade|ts)',
    '!' + env.folder.src + '/assets',
    '!' + env.folder.src + '/assets/**/*'
  ])
      .pipe(changed(env.folder.dev))
      .pipe(debug({title: 'Copied files: '}))
      .pipe(gulp.dest(env.folder.dev));
};

