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

/* Want these image widths: 600px, 300px */

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

gulp.task('resize300', function () {
  return gulp.src('img_original/*')
    .pipe(imageResize({
      width : 300,
      upscale : false,
      imageMagick: true
    }))
    .pipe(rename({suffix: '_300'}))
    .pipe(gulp.dest('img'));
});

// creating clean task to delete files in dist
gulp.task('clean', function(){
  del(['dist', 'img']);
});

gulp.task("build", ['resize600', 'resize300'], function(){
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

