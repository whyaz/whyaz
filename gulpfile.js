/**
 * gulp            - Run a local server that handles live reloading of project files
 */

var gulp        = require('gulp');
var gutil       = require('gulp-util');
var jade        = require('gulp-jade');
var stylus      = require('gulp-stylus');
var livereload  = require('gulp-livereload');
var express     = require("express");
var tinylr      = require('tiny-lr');
var express     = require('express');
var app         = express();
var path        = require('path');
var del         = require('del');

gulp.task('jade', function() {

  return gulp.src('src/views/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(livereload());

});

gulp.task('clean', function (cb) {
  del(['dist'], cb);
});

gulp.task('copy', function() {

  gulp.src('src/css/**/*.css')
    .pipe(gulp.dest('dist/public/css'))
    .pipe(livereload());

});

gulp.task('stylus', function() {

  gulp.src('src/styl/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest('dist/public/css'))
    .pipe(livereload());

});

gulp.task('express', function() {

  app.use(express.static(path.resolve('./dist')));
  app.listen(8080);
  gutil.log('Listening on port: 8080');

});

gulp.task('watch', function () {

  livereload.listen();

  gulp.watch('src/css/**/*.css',['copy']);
  gulp.watch('src/styl/**/*.styl',['stylus']);
  gulp.watch('src/views/**/*.jade',['jade']);

  // Reload the server when our dist directory changes
  gulp.watch('dist/**').on('change', livereload.changed);

});

// Default Task
gulp.task('default', ['clean'], function() {

  // This will ensure clean is finished prior to starting subsequent tasks
  gulp.start('copy', 'jade', 'stylus', 'express', 'watch');

});