'use strict';

var gulp    = require('gulp');

var clean   = require('gulp-clean');
var watc    = require('gulp-watch');
var exec    = require('child_process').exec;

var sass    = require('gulp-sass');
var autopfx = require('gulp-autoprefixer');

var uglify  = require('gulp-uglify');
var webpack = require('webpack-stream');

var SRC  = './assets/src/';
var DIST = './assets/dist/';


gulp.task('clean', function() {
	return gulp.src( DIST, { read: false } ).pipe(clean());
});


gulp.task('build-js', function() {
	gulp.src(SRC + 'main.js')
	  .pipe(webpack({
			output: {
			  filename: 'main.js',
      },
			module: {
				loaders: [{
					loader: 'babel'
				}],
			}
		}))
		.pipe(uglify())
		.pipe(gulp.dest(DIST));
});

gulp.task('build-style', function() {
	gulp.src(SRC + '**/*.scss')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(autopfx())
		.pipe(gulp.dest(DIST));
});

function fixPerms() {
	exec('find ' + DIST + ' -type d -exec chmod 755 {} \\;', function (err, stdout, stderr) {
		if (err) console.error(err);
	});

	exec('find ' + DIST + ' -type f -exec chmod 644 {} \\;', function (err, stdout, stderr) {
		if (err) console.error(err);
	});
}

gulp.task('set-perms', fixPerms);

gulp.task('build', ['build-js', 'build-style'], function() {
  fixPerms();
});

gulp.task('watch', function() {
	gulp.watch(SRC + '**/*.scss', ['build-style']);
	gulp.watch([SRC + '**/*.js', './react/**/*.js', './react/components/*.jsx'], ['build-js']);
});
