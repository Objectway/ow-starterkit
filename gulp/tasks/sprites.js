var env = require('../env.js');
var gulp = require('gulp');
var sprite = require('gulp.spritesmith');
var gulpif = require('gulp-if');

module.exports = function() {
  var sources = [
    env.folder.src + '/assets/images/**/*.png'
  ];

  return gulp.src(sources)
    .pipe(sprite({
      imgName: 'sprite.png',
      cssName: '_sprites.scss',
      algorithm: 'binary-tree',
      algorithmOpts: {
        sort: false
      },
      cssSpritesheetName: 'images',
      // Retina images
      retinaSrcFilter: env.folder.src + '/assets/images/**/*2x.png',
      retinaImgName: 'sprite_2x.png'
    }))
    .pipe(gulpif(
      '*.png',
      gulp.dest(env.folder.src + '/images/sprites/'),
      gulp.dest(env.folder.src + '/styles/4-base/partials')));
};
