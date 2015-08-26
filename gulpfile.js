/**
 * gulp            - Run a local server that handles live reloading of project files
 */

var gulp        = require('gulp');
var gutil       = require('gulp-util');
var jade        = require('gulp-jade');
var stylus      = require('gulp-stylus');
var livereload  = require('gulp-livereload');
var ghPages     = require('gulp-gh-pages');
var remoteSrc   = require("gulp-remote-src");
var tinylr      = require('tiny-lr');
var express     = require('express');
var app         = express();
var path        = require('path');
var del         = require('del');
var bower       = require('main-bower-files');
var url         = require('url');

function copy() {

  return gulp.src(['src/**/*.*', '!src/templates/**/*.*', '!src/views/**/*.*', '!src/styl/**/*.*'])
    .pipe(gulp.dest('dist/'));

}

function jadeBuild() {

  return gulp.src(['src/views/**/*.jade'])
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'));

}

function stylusBuild() {

  return gulp.src('src/styl/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest('dist/public/css'));

}

gulp.task('contributors', function() {
  remoteSrc(['contributors'], {
    base: 'https://api.github.com/repos/meltmedia/whyaz/',
    requestOptions: {
      headers: {
        'User-Agent': 'why.az'
      }
    }
  }).pipe(gulp.dest('./dist/public'))
});

gulp.task('jade', function() {

  jadeBuild().pipe(livereload());

});

gulp.task('clean', function (cb) {
  del(['dist'], cb);
});

gulp.task('copy', function() {

  copy().pipe(livereload());

});

gulp.task('build', function() {

  copy();
  jadeBuild();
  stylusBuild();

});

gulp.task("bower", function(){
  return gulp.src(bower(), { base: './bower_components' })
    .pipe(gulp.dest('dist/lib'))
});

gulp.task('stylus', function() {

  stylusBuild().pipe(livereload());

});

gulp.task('express', function() {

  app.use(express.static(path.resolve('./dist')));
  app.listen(8080);
  gutil.log('Listening on port: 8080');

});

gulp.task('watch', function () {

  livereload.listen();

  gulp.watch(['src/**/*.*', '!src/**/*.styl', '!src/**/*.jade'], ['copy']);
  gulp.watch('src/**/*.styl',['stylus']);
  gulp.watch('src/**/*.jade',['jade']);

  // Reload the server when our dist directory changes
  gulp.watch('dist/**').on('change', livereload.changed);

});

// Default Task
gulp.task('default', ['clean'], function() {

  // This will ensure clean is finished prior to starting subsequent tasks
  gulp.start('contributors', 'bower', 'copy', 'jade', 'stylus', 'express', 'watch');

});

gulp.task('build', ['clean'], function() {
  gulp.start('contributors', 'bower', 'copy', 'jade', 'stylus');
});

gulp.task('deploy', ['build'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});