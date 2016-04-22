var gulp       = require('gulp');
var gutil      = require('gulp-util');
var source     = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify   = require('watchify');
var reactify   = require('reactify');
var uglify     = require('gulp-uglify');
var sass       = require('gulp-sass');


gulp.task('bower', function() {
  return gulp.src(['./bower_components/*/dist/**/*'])
    .pipe(gulp.dest('./dist/vendors'));
});

gulp.task('sass', function() {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('html', function() {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'));
});


gulp.task('watch', function() {
  gulp.watch(['./src/sass/**/*.scss'], ['sass']);
  gulp.watch(['./src/*.html'], ['html']);
  gulp.watch(['./dist/js/main.js'], ['minify']);
});


gulp.task('minify', function() {
  return gulp.src('./dist/main.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/main.min.js'))
});

gulp.task('default', ['sass', 'bower', 'html', 'minify', 'watch'], function() {
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
      .external(['react', 'react-dom'])
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('main.js'))
      .pipe(gulp.dest('./dist/js'));
  }

  build();
  bundler.on('update', build);
});
