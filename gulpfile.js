const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
var stripJsComments = require('gulp-strip-comments');
const stripCssComments = require('gulp-strip-css-comments');

// Likes and Rating
gulp.task('likeAndRatingBuildJS', function() {
	return gulp
		.src('src/likesAndRating/js/*.js')
		.pipe(concat('likesAndRating.js'))
		.pipe(stripJsComments())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(minify())
		.pipe(gulp.dest('dist/likesandrating/'));
});
gulp.task('likeAndRatingBuildCSS', function() {
	return gulp
		.src('src/likesAndRating/css/*.css')
		.pipe(concat('likesAndRating.css'))
		.pipe(stripCssComments())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('dist/likesandrating/'));
});

// Cookies
gulp.task('cookiesBuild', function() {
	return gulp
		.src('src/cookies/*.js')
		.pipe(concat('cookies.js'))
		.pipe(stripJsComments())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(minify())
		.pipe(gulp.dest('dist/cookies/'));
});

// Local Storage
gulp.task('localStorageBuild', function() {
	return gulp
		.src('src/localStorage/*.js')
		.pipe(concat('localStorage.js'))
		.pipe(stripJsComments())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(minify())
		.pipe(gulp.dest('dist/localStorage/'));
});

// Video Player for download confirm an category use
gulp.task('videoPlayerBuildJS', function() {
	return gulp
		.src('src/videoPlayer/*.js')
		.pipe(concat('videoPlayer.js'))
		.pipe(stripJsComments())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(minify())
		.pipe(gulp.dest('dist/videoPlayer/'));
});

// All video Player PlugIns
gulp.task('videoPlayerPlugInsBuildJS', function() {
	return gulp
		.src('src/videoPlayerPlugIns/js/*.js')
		.pipe(concat('videoPlayerPlugIns.js'))
		.pipe(stripJsComments())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(minify())
		.pipe(gulp.dest('dist/videoPlayerPlugIns/'));
});
gulp.task('videoPlayerPlugInsBuildCSS', function() {
	return gulp
		.src('src/videoPlayerPlugIns/css/*.css')
		.pipe(concat('videoPlayerPlugIns.css'))
		.pipe(stripCssComments())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('dist/videoPlayerPlugIns/'));
});

// Search Bar with plugIn
gulp.task('searchBarBuildJS', function() {
	return gulp
		.src('src/SearchBar/*.js')
		.pipe(concat('searchBar.js'))
		.pipe(stripJsComments())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(minify())
		.pipe(gulp.dest('dist/searchBar/'));
});

// bootPage with no bootstrap
gulp.task('bootpagBuildJS', function() {
	return gulp
		.src('src/pager/js/bootpag.js')
		.pipe(concat('bootpag.js'))
		.pipe(stripJsComments())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(minify())
		.pipe(gulp.dest('dist/pager/'));
});

// bootPage bootstrap4
gulp.task('bootpagB4BuildJS', function() {
	return gulp
		.src('src/pager/js/bootpagB4.js')
		.pipe(concat('bootpagB4.js'))
		.pipe(stripJsComments())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(minify())
		.pipe(gulp.dest('dist/pager/'));
});

// Build Pager Css no minify
gulp.task('pagerBuildCss', function() {
	return gulp
		.src('src/pager/css/*.css')
		.pipe(stripCssComments())
		.pipe(gulp.dest('dist/pager/'));
});

// Pager for bootpag and bootpagB4
gulp.task('pagerBuildJS', function() {
	return gulp
		.src('src/pager/js/pager.js')
		.pipe(concat('pager.js'))
		.pipe(stripJsComments())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(minify())
		.pipe(gulp.dest('dist/pager/'));
});

// Proximus language changer
gulp.task('proximusBuildJS', function() {
	return gulp
		.src('src/proximus/*.js')
		.pipe(concat('proximus.js'))
		.pipe(stripJsComments())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(minify())
		.pipe(gulp.dest('dist/proximus/'));
});

// Proximus language changer
gulp.task('TriviaBuildJS', function() {
	return gulp
		.src('src/Trivia/*.js')
		.pipe(concat('Trivia.js'))
		.pipe(stripJsComments())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(minify())
		.pipe(gulp.dest('dist/Trivia/'));
});

gulp.task('default', gulp.series([
	'likeAndRatingBuildJS',
	'likeAndRatingBuildCSS',
	'cookiesBuild',
	'localStorageBuild',
	'videoPlayerBuildJS',
	'videoPlayerPlugInsBuildJS',
	'videoPlayerPlugInsBuildCSS',
	'searchBarBuildJS',
	'bootpagBuildJS',
	'bootpagB4BuildJS',
	'pagerBuildCss',
	'pagerBuildJS',
	'proximusBuildJS',
	'TriviaBuildJS'
], done => done()));
