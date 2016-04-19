var gulp       = require('gulp');
var gutil      = require('gulp-util');
var source     = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify   = require('watchify');
var reactify   = require('reactify');
var sass       = require('gulp-sass');
var tap        = require('gulp-tap');
var pathinfo   = require('pathinfo');


gulp.task('bower', function() {
  return gulp.src(['./bower_components/*/dist/**/*'])
    .pipe(gulp.dest('./dist/vendors'));
});

gulp.task('sass', function() {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
  gulp.watch(['./src/sass/**/*.scss'], ['sass']);
  gulp.watch(['./src/*.html'], ['html']);
});

gulp.task('html', function() {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['sass', 'bower', 'html', 'watch'], function() {
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
      .pipe(gulp.dest('./dist/js'));
  }

  build();
  bundler.on('update', build);
});
