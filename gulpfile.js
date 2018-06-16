var fs = require('fs'),
	gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
	cleanCSS = require('clean-css'),
    plumber = require('gulp-plumber'),
	cssmin = require('gulp-cssmin');

function swallow(err) {
	console.log(err);
	this.emit('end');
}

var paths = {
	"src": "./src/main.scss",
	"dest": "./dest",
	"watch": "./src/**/*.scss"
}

gulp.task('styles', function(){
	return gulp.src(paths.src)
		.pipe(plumber({ errorHandler: swallow}))
		.pipe(sass({
			style: 'expanded',
			includePaths : [paths.src]
		}))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'ios 6', 'android 4'))
		.pipe(rename('envelope.css'))
		.pipe(gulp.dest(paths.dest))
		.pipe(cssmin({
			keepSpecialComments: 0
		}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.dest));
});

gulp.task('watch', function() {
	gulp.watch(paths.watch, ['styles']);
})
