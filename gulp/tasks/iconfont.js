var env = require('../env.js');
var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
// var iconfontcss = require('gulp-iconfont-css');
var consolidate = require('gulp-consolidate');
var util = require('gulp-util');

module.exports = function() {
  var fontName = 'OwFont';
  var className = 'OwIcon';

  gulp.src([env.folder.src + '/assets/icons/svgs/*.svg'])
    .pipe(iconfont({
      className: className,
      appendCodepoints: true,
      fontName: fontName,
      prependUnicode: true
    }))
    .on('glyphs', function(glyphs, options) {
      for (var i = 0; i < glyphs.length; i++) {
        glyphs[i].codepoint = 0xEA01 + i;
      }
      gulp.src([env.folder.src + '/assets/icons/template/iconsViewer.html'])
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: fontName,
          className: className
        }))
        .pipe(gulp.dest(env.folder.src + '/fonts/dev/'));

      gulp.src(env.folder.src + '/assets/icons/template/iconsViewer.css')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: fontName,
          className: className,
          fontPath: '../fonts/'
        }))
        .pipe(gulp.dest(env.folder.src + '/fonts/dev/'));

      gulp.src(env.folder.src + '/assets/icons/template/_icons.scss')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: fontName,
          className: className,
          fontPath: './fonts/'
        }))
        .pipe(gulp.dest(env.folder.src + '/styles/4-base/partials/'));
    })
    .on('error', function(err) {
      util.log(util.colors.yellow(err.message));
      this.emit('end');
    })
    .pipe(gulp.dest(env.folder.src + '/fonts/'));
};
