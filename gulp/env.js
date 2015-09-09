var src = './src';

module.exports =  {
  folder: {
    dev: './development',
    src: src,
    dist: './dist',
    tasks: './tasks'
  },
  namespaceCSS: 'toolkit',
  compatibility: ['> 1%', 'last 3 versions', 'Firefox ESR', 'Opera 12.1'],
  loadTask: function(task) {
    return require(this.folder.tasks + '/' + task);
  },
  sass: {
    imagePath: '../images',
    sourceMap: true,
    includePaths: [
      './node_modules/'
    ],
    functions: {
      'image-url($url)': function(url) {
        var imagePath = "../images/";
        var newUrl = new require('node-sass')
          .types.String(
            "url('" + imagePath + url.getValue() + "')  /*ImageEmbed:skip*/"
          );
        return newUrl;
      }
    }
  },
  jade: {
    pretty: true
  },
  watch: [
    src + '/**/*'
  ]
};
