var gulp = require('gulp');

var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var jsPath = 'app/**/*.js';
var jsTestPath = 'app/**/*Test.js';
var jsAppPath = [jsPath, '!' + jsTestPath];
var watchTasks = ['lint', 'lint-test', 'scripts'];

gulp.task('lint', function() {
    return gulp.src(jsAppPath)
        .pipe(eslint({
            "configFile": "eslint/browser.json"
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('lint-test', function() {
    return gulp.src(jsTestPath)
        .pipe(eslint({
            "configFile": "eslint/jasmine.json"
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('scripts', function() {
    return gulp.src(jsAppPath)
        .pipe(concat('all.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/'));
});

gulp.task('watch', function() {
    gulp.watch(jsPath, watchTasks);
});

gulp.task('default', watchTasks.concat(['watch']));
