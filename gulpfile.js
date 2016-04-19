var gulp       = require('gulp');
var gutil      = require('gulp-util');
var source     = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify   = require('watchify');
var reactify   = require('reactify');
var sass       = require('gulp-sass');


gulp.task('bower', function() {
  return gulp.src(['./bower_components/*'])
    .pipe(gulp.dest('./dist/vendors'));
});

gulp.task('styles', function() {
  return gulp.src(['./src/sass/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('default', ['styles'], function() {
  var bundler = watchify(browserify({
    entries: ['./src/js/app.jsx'],
    transform: [reactify],
    extensions: ['.jsx'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));

  function build(file) {
    if (file) gutil.log('Recompiling ' + file);

    return bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('main.js'))
      .pipe(gulp.dest('./build/js'));
  }

  build();
  bundler.on('update', build);
});
