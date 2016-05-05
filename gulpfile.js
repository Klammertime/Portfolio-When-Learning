'use strict';
var gulp = require('gulp'),
  rename = require('gulp-rename'),
     del = require('del'),
imagemin = require('gulp-imagemin'),
imageResize = require('gulp-image-resize'),
pngquant = require('imagemin-pngquant'),
imageminJpegRecompress = require('imagemin-jpeg-recompress');

var options = {
  dist: './dist/'
};

/* Want these image widths: 600px, 960px, 1440px, 1800px, 3600px
  highest average original size for all */

gulp.task('resize600', function () {
  return gulp.src('img_original/*')
    .pipe(imageResize({
      width : 600,
      upscale : false,
      imageMagick: true
    }))
    .pipe(rename({suffix: '_600'}))
    .pipe(gulp.dest('img'));
});

// // After images resized need to be optimized or compressed using an algorithm that decides
// // what data to keep and what it can throw away while still maintaining visual integrity.
// // Plus need to get rid of extra metadata added during imageResize.
// gulp.task('optimize', ['resize600'], function () {
//   return gulp.src('img/*')
//     .pipe(imagemin({
//       use:[imageminJpegRecompress({
//         loops:4,
//         min: 60,
//         max: 95,
//         quality:'high'
//       })]
//     }))
//     .pipe(gulp.dest('img'));
// });

// gulp.task('watchFiles', function(){
//   gulp.watch('img_original/*', ['resize3600', 'resize1800','resize1440','resize960']);
// });

// creating clean task to delete files in dist
gulp.task('clean', function(){
  del(['dist', 'img']);
});

gulp.task("build", ['resize600'], function(){
  return gulp.src([
    "img/**"], { base: "./"})
      .pipe(gulp.dest("dist"));
});

gulp.task('serve');

// we make build task a depend. of default task so
// can just run gulp
gulp.task("default", ["clean"], function(){
  gulp.start('build')
});

// creating a default task so when we
// type 'gulp' in terminal it knows
// which task to run
// default, special task in gulp
// when you don't give it a task name
// instead of callback fcn as next argument
// you give it an array of dependencies next

