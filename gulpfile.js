var gulp = require('gulp');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var babel = require('gulp-babel');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var path = require('path');
var paths = {
    source:'src/**/*.js'
  , html:'src/**/*.html'
  , dist: 'dist'
  , sourceRoot: path.join(__dirname, 'src'),
}

gulp.task('build-client', function () {
  return gulp.src(paths.source)
    .pipe(plumber())
    .pipe(changed(paths.dist, {extension: '.js'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(babel())
    .pipe(sourcemaps.write('.', { includeContent: true, sourceRoot: paths.sourceRoot}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.dist, {extension: '.html'}))
    .pipe(gulp.dest(paths.dist));
});


gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-client', 'build-html'],
    callback
  );
});

gulp.task('clean', function() {
 return gulp.src([paths.dist])
    .pipe(vinylPaths(del));
});


gulp.task('default', ['build']);

