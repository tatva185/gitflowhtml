var gulp = require('gulp');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var del = require('del');
//var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var stripCssComments = require('gulp-strip-css-comments');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sequence = require('gulp-watch-sequence');
var livereload = require('gulp-livereload');
//var argv    = require('yargs').argv;

var PATHS = {


  appCSS: [
  'src/scss/main.scss'
  ],

  jsApp: [
    // Other scripts
    'src/js/jquery.js',
    'src/js/tether.min.js',
    'src/js/bootstrap.min.js',
    'src/js/respond.min.js',
    'src/js/waypoints.js',
    'src/js/*.js',
    'src/js/other/*.js'

    ]
  }

  gulp.task('clean', function() {
    return del([
      'public/css/app.css'
      ]);
  });


  gulp.task('sass', function() {
    return gulp.src(PATHS.appCSS)
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(stripCssComments({preserve: false}))
    .pipe(gulp.dest('public/css'))
    .on('end', function() {
      livereload.changed('app.css');
    })
  });

  gulp.task('customJS',function() {
   return gulp.src(PATHS.jsApp)
   .pipe(concat('app.js'))    
   .pipe(gulp.dest('public/js/'));
 });


  gulp.task('livereload', function(){
    livereload.reload();
  });

  gulp.task('build', function(cb) {
  // runSequence('customCSS', 'customJS', 'stripcomments-app-css', 'minifyCss',  cb);
  runSequence('clean', ['sass', 'customJS'], cb);
});

  gulp.task('default', ['build'], function(){
   livereload.listen();
   gulp.watch(['src/js/**/*.js'], ['customJS']);
   gulp.watch(['src/scss/**/*.scss'], ['sass']);
   gulp.watch(['src/**'], ['livereload']);

 });
