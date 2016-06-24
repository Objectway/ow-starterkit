var env = require('../env.js');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var changed = require('gulp-changed');
var notify = require('gulp-notify');
var typescript = require('gulp-typescript');
// var util = require('gulp-util');

module.exports = function() {
  var sources = env.folder.src + '/scripts/**/*.ts';

  return gulp.src(sources)
    .pipe(sourcemaps.init())
    .pipe(changed(env.folder.dev + '/scripts/'))
    .pipe(typescript({
      module: 'amd',
      verbose: false,
      target: 'es5',
      fast: 'never',
      sourceMap: true,
      allowImportModule: true,
      out: 'main.js'
    }))
    .on('error', notify.onError(function(error) {
      return {
        title: 'TYPESCRIPT ERROR:',
        message: error.message,
        notifier: function(options) {
          this.emit('end');
        }
      };
    }))
    .js.pipe(gulp.dest(env.folder.dev + '/scripts/'));
};
