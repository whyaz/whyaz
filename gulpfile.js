/**
 * gulp            - Run a local server that handles live reloading of project files
 */

var gulp         = require('gulp');
var dest         = require('gulp-dest');
var gutil        = require('gulp-util');
var jade         = require('gulp-jade');
var stylus       = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS    = require('gulp-minify-css');
var livereload   = require('gulp-livereload');
var ghPages      = require('gulp-gh-pages');
var remoteSrc    = require("gulp-remote-src");
var tinylr       = require('tiny-lr');
var express      = require('express');
var app          = express();
var path         = require('path');
var del          = require('del');
var url          = require('url');

function copy() {

  return gulp.src(['src/**/*.*', 'src/**/CNAME', '!src/templates/**/*.*', '!src/views/**/*.*', '!src/styl/**/*.*'])
    .pipe(gulp.dest('dist/'));

}

function jadeBuild() {

  return gulp.src(['src/views/**/*.jade'])
    .pipe(jade({
      pretty: true,
      data: {
        contributors: require('././dist/contributors.json')
      }
    }))
    .pipe(gulp.dest('dist/'));

}

function stylusBuild() {

  return gulp.src('src/styl/main.styl')
    .pipe(stylus())
    .pipe(autoprefixer({browsers: ['last 2 versions', 'ie 8'],flexbox:true,cascade: false}))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/public/css'));

}

gulp.task('contributors', function(cb) {
  remoteSrc(['contributors'], {
    base: 'https://api.github.com/repos/meltmedia/whyaz/',
    requestOptions: {
      headers: {
        'User-Agent': 'why.az'
      }
    }
  }).pipe(dest('./dist', {ext: '.json'}))
    .pipe(gulp.dest('.')).on('end', cb)
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
gulp.task('default', ['clean', 'contributors'], function() {

  // This will ensure clean is finished prior to starting subsequent tasks
  gulp.start('copy', 'jade', 'stylus', 'express', 'watch');

});

gulp.task('build', ['clean', 'contributors'], function() {
  gulp.start('copy', 'jade', 'stylus');
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});