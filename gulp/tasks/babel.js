var env = require('../env.js');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var changed = require('gulp-changed');
var notify = require('gulp-notify');
// var util = require('gulp-util');

module.exports = function() {
  var sources = [
    env.folder.src + '/scripts/**/*.js',
    '!' + env.folder.src + '/scripts/vendor/**/*.*'
  ];

  return gulp.src(sources)
    .pipe(sourcemaps.init())
    .pipe(changed(env.folder.dev + '/scripts/'))
    .pipe(babel())
    .on("error", notify.onError(function(error) {
      return {
        title: 'TYPESCRIPT ERROR:',
        message: error.message,
        notifier: function(options) {
          this.emit('end');
        }
      };
    }))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(env.folder.dev + '/scripts/'));
};
