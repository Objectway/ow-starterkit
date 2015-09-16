var env = require('../env.js');
var gulp = require('gulp');

var del = require('del');
var sequence = require('run-sequence');
var util = require('gulp-util');
var watch = require('gulp-watch');

var re = /(?:\.([^.]+))?$/;
function watchFunc(vinyl) {
  var extension = re.exec(vinyl.relative)[0];
  var fileOriginal = vinyl.relative.replace(extension, '');
  var fileCompiled = env.folder.dev + '/' + fileOriginal;

  switch (extension) {

    // VIEWS
    case '.jade' :
      if(vinyl.event == 'unlink') {
        del(fileCompiled + '.html')
        util.log(util.colors.yellow(fileCompiled + '.html DELETED'));
      }
      sequence('view');
      break;

    // STYLES
    case '.scss' :
    case '.sass' :
      if(vinyl.event == 'unlink') {
        del(fileCompiled + '.css')
        del(fileCompiled + '.css.map')
        util.log(util.colors.yellow(fileCompiled + '.css and .map DELETED'));
      }
      sequence('style');
      break;

    //SCRIPTS
    case '.ts' :
      if(vinyl.event == 'unlink') {
        del(fileCompiled + '.js')
        del(fileCompiled + '.js.map')
        util.log(util.colors.yellow(fileCompiled + '.js and .map DELETED'));
      }
      sequence('script');
      break;

    // ASSETS
    case '.js':
    case '.css':
    case '.gif':
    case '.ico':
    case '.jpg':
    case '.png':
    case '.svg':
    case '.txt':
    case '.html':
    case '.json':
    case '.woff':
      if(vinyl.event == 'unlink') {
        del(env.folder.dev + '/' + vinyl.relative)
        util.log(util.colors.yellow(
          env.folder.dev + '/' + vinyl.relative + 'DELETED'
        ));
      }
      sequence('copy');
      break;

    // WTF?
    default:
      util.log(util.colors.red("you changed something strange. REBUILD?"));
      // sequence('clean', 'copyAssets', 'compile');
  };
}

// Todo: test this one
module.exports = function () {
  watch(env.watch, function(vinyl){
    watchFunc(vinyl);
  });
};
