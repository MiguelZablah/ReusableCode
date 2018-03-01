const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');

gulp.task('likeAndRatingBuildJS', function() {
    gulp.src('src/likesAndRating/js/*.js')
        .pipe(concat('likesAndRating.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(minify())
        .pipe(gulp.dest('dist/likesandrating/'));
});

gulp.task('likeAndRatingBuildCSS', function() {
    gulp.src('src/likesAndRating/css/*.css')
        .pipe(concat('likesAndRating.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/likesandrating/'));
});

gulp.task('cookiesBuild', function() {
    gulp.src('src/cookies/*.js')
        .pipe(concat('cookies.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(minify())
        .pipe(gulp.dest('dist/cookies/'));
});

gulp.task('localStorageBuild', function() {
    gulp.src('src/localStorage/*.js')
        .pipe(concat('localStorage.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(minify())
        .pipe(gulp.dest('dist/localStorage'));
});

gulp.task('default', ['likeAndRatingBuildJS', 'likeAndRatingBuildCSS', 'cookiesBuild', 'localStorageBuild']);