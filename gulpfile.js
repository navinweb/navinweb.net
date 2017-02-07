var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		bourbon        = require('node-bourbon'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify");

gulp.task('scripts', function() {
	return gulp.src([
		'resources/assets/libs/jquery/dist/jquery.min.js',
		'resources/assets/js/common.js',
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('public/js'))
});

gulp.task('sass', function() {
	return gulp.src('resources/assets/sass/**/*.sass')
	.pipe(sass({
		includePaths: bourbon.includePaths
	}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS())
	.pipe(gulp.dest('public/css'))
});

gulp.task('watch', ['sass', 'scripts'], function() {
	gulp.watch('resources/assets/sass/**/*.sass', ['sass']);
	gulp.watch(['resources/assets/libs/**/*.js', 'resources/assets/js/common.js'], ['scripts']);
});

gulp.task('imagemin', function() {
	return gulp.src('resources/assets/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('public/img'));
});

gulp.task('build', ['imagemin', 'sass', 'scripts'], function() {

	var buildFonts = gulp.src([
		'resources/assets/fonts/**/*',
		]).pipe(gulp.dest('public/fonts'));

});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      '',
		user:      '',
		password:  '',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'public/**',
	'public/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path'));

});

gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
