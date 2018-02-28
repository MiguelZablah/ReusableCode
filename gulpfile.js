const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const babel = require('gulp-babel');

gulp.task('build', function() {
    gulp.src('src/cookie-controller.js')
        .pipe(concat('cookies.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(minify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['build']);