var gulp = require('gulp');

var eslint = require('gulp-eslint');

gulp.task('lint', function() {
    return gulp.src(['app/**/*.js', '!app/**/*Test.js'])
        .pipe(eslint({
            "configFile": "eslint/browser.json"
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('lint-test', function() {
    return gulp.src(['app/**/*Test.js'])
        .pipe(eslint({
            "configFile": "eslint/jasmine.json"
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['lint', 'lint-test']);
});

gulp.task('default', ['lint', 'lint-test', 'watch']);
