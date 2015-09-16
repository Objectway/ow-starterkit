var env = require('../env.js');
var gulp = require('gulp');

var argv = require('yargs').argv;
var autoprefixer = require('autoprefixer');
var changed = require('gulp-changed');
var cssPrefix = require('gulp-css-prefix');
var debug = require('gulp-debug');
var gulpif = require('gulp-if');
var mqpacker = require('css-mqpacker');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var util = require('gulp-util');



module.exports = function() {
  // Via yargs we will set if we are in distribution mode,
  // we will change directory, code output and we'll not generate sourcemaps
  env.sass.outputStyle = argv.dist ? 'compressed' : 'nested';
  var destination = argv.dist ? env.folder.dist : env.folder.dev;

  return gulp.src([
      env.folder.src + '/**/*.+(scss|sass)',
    ])
    .pipe(sourcemaps.init())


    // The sass options are in ../env.js
    .pipe(sass(env.sass))

    .on('error', function (err) {
      util.log(util.colors.yellow(err.message));
      this.emit('end');
    })

    // via ../env.js we'll prepend our css with a specified class
    .pipe(gulpif(
      env.namespaceCSS,
      cssPrefix({'parentClass': env.namespaceCSS})
    ))

    .pipe(
      postcss([
        autoprefixer({
          browsers: env.compatibility,
          cascade: true
        }),
        mqpacker({
          sort: true
        })
      ])
    )

    .pipe(gulpif(!argv.dist, sourcemaps.write('/')))

    // We will write only the changed files
    .pipe(changed(destination + '/', {hasChanged: changed.compareSha1Digest}))
    .pipe(gulp.dest(destination + '/'))

    .pipe(debug({title: 'Styles compiled: '}));
};
