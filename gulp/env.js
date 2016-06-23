var exports = {
  // We will load automatically our Gulp modules from the task folder.
  loadTask: function(task) {
    return require(this.folder.tasks + '/' + task);
  }
};

// -----------------------------------------------------------------------------
// Our folder for development and deploy.
// -----------------------------------------------------------------------------
exports.folder = {
  dev: './dev',
  src: './src',
  dist: './dist',
  tasks: './tasks'
};

// -----------------------------------------------------------------------------
// Setting for CSS autoprefixer
// -----------------------------------------------------------------------------
exports.compatibility = [
  '> 1%', 'last 3 versions', 'Firefox ESR', 'Opera 12.1'
];

// -----------------------------------------------------------------------------
// You can choose what to watch. Change thi option for optimize your workflow
// if you are working only on typescript and jade you can write something
// like: '/**/*.+(scss|jade)' or selecting specified folder in 'src'
// -----------------------------------------------------------------------------
exports.watch = [
  exports.folder.src + '/**/*'
];

// -----------------------------------------------------------------------------
// Jade precompiler options
// -----------------------------------------------------------------------------

exports.jade = {
  pretty: true
};

// -----------------------------------------------------------------------------
// Sass options and custom functions
// -----------------------------------------------------------------------------
exports.sass = {
  imagePath: '../images',
  sourceMap: true,
  includePaths: [
    exports.folder.src + '/app_components',
    './node_modules/'
  ],
  functions: {
    'image-url($url)': function(url) {
      var imagePath = "../images/";
      var newUrl = require('node-sass')
        .types.String(
          "url('" + imagePath + url.getValue() + "')  /*ImageEmbed:skip*/"
        );
      return newUrl;
    }
  }
};

// -----------------------------------------------------------------------------
// Exported object
// -----------------------------------------------------------------------------
module.exports = exports;
