var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var paths = {
  scripts: {
    src: './src/*.js',
    dest: './dist',
  },
};

var bundleName = 'whenzel';

function scripts() {
  return browserify({
    extensions: ['.js'],
    entries: './src/main.js',
  })
    .transform('babelify', { presets: ['@babel/env'] })
    .on('error', function(msg) {
      console.error(msg);
    })
    .bundle()
    .pipe(source(bundleName + '.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(uglify())
    .pipe(rename(bundleName + '.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
}

var build = gulp.parallel(scripts);

exports.scripts = scripts;
exports.watch = watch;

exports.build = build;
exports.default = build;
