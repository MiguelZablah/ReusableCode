const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
var stripJsComments = require('gulp-strip-comments');
const stripCssComments = require('gulp-strip-css-comments');

// Likes and Rating
gulp.task('likeAndRatingBuildJS', function() {
    gulp.src('src/likesAndRating/js/*.js')
        .pipe(concat('likesAndRating.js'))
        .pipe(stripJsComments())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(minify())
        .pipe(gulp.dest('dist/likesandrating/'));
});
gulp.task('likeAndRatingBuildCSS', function() {
    gulp.src('src/likesAndRating/css/*.css')
        .pipe(concat('likesAndRating.css'))
        .pipe(stripCssComments())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/likesandrating/'));
});

// Cookies
gulp.task('cookiesBuild', function() {
    gulp.src('src/cookies/*.js')
        .pipe(concat('cookies.js'))
        .pipe(stripJsComments())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(minify())
        .pipe(gulp.dest('dist/cookies/'));
});

// Local Storage
gulp.task('localStorageBuild', function() {
    gulp.src('src/localStorage/*.js')
        .pipe(concat('localStorage.js'))
        .pipe(stripJsComments())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(minify())
        .pipe(gulp.dest('dist/localStorage/'));
});

// Video Player for download confirm an category use
gulp.task('videoPlayerBuildJS', function() {
    gulp.src('src/videoPlayer/*.js')
        .pipe(concat('videoPlayer.js'))
        .pipe(stripJsComments())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(minify())
        .pipe(gulp.dest('dist/videoPlayer/'));
});

// All video Player PlugIns
gulp.task('videoPlayerPlugInsBuildJS', function() {
    gulp.src('src/videoPlayerPlugIns/js/*.js')
        .pipe(concat('videoPlayerPlugIns.js'))
        .pipe(stripJsComments())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(minify())
        .pipe(gulp.dest('dist/videoPlayerPlugIns/'));
});
gulp.task('videoPlayerPlugInsBuildCSS', function() {
    gulp.src('src/videoPlayerPlugIns/css/*.css')
        .pipe(concat('videoPlayerPlugIns.css'))
        .pipe(stripCssComments())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/videoPlayerPlugIns/'));
});

gulp.task('default', [
    'likeAndRatingBuildJS', 
    'likeAndRatingBuildCSS', 
    'cookiesBuild', 
    'localStorageBuild',
    'videoPlayerBuildJS',
    'videoPlayerPlugInsBuildJS',
    'videoPlayerPlugInsBuildCSS'
]);