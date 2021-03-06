'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var karma = require('karma');

var pathSrcHtml = [
  path.join(conf.paths.src, '/app/**/*.html')
];

var pathSrcJs = [
  path.join(conf.paths.src, '/app/**/!(*.spec).js')
];

function runTests (singleRun, done) {
  var reporters = ['progress'];
  var preprocessors = {};

   console.log('sdasdasdsadsadsadsadas!!!!!!!!!!!!!!!!!');
  
  pathSrcHtml.forEach(function(path) {
	  console.log(path);
	if(path.indexOf('node_modules') === -1)
    preprocessors[path] = ['ng-html2js'];
  });

  if (singleRun) {
    pathSrcJs.forEach(function(path) {
		console.log(path);
	  if(path.indexOf('node_modules') === -1)
      preprocessors[path] = ['coverage'];
    });
    reporters.push('coverage')
  }

  var localConfig = {
    configFile: path.join(__dirname, '/../../karma.conf.js'),
    singleRun: singleRun,
    autoWatch: !singleRun,
    reporters: reporters,
    preprocessors: preprocessors
  };

  var server = new karma.Server(localConfig, function(failCount) {
    done(failCount ? new Error("Failed " + failCount + " tests.") : null);
  })
  server.start();
}

gulp.task('test', ['scripts'], function(done) {
  runTests(true, done);
});

gulp.task('test:auto', ['watch'], function(done) {
  runTests(false, done);
});
