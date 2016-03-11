var gulp = require('gulp');

var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');

var minificationSuffix = '.min';
var jsPath = ['app/**/*.js'];
var jsTestPath = ['app/**/*Test.js'];
var jsAppPath = [jsPath[0], '!' + jsTestPath[0]];
var sassPath = ['app/*.scss'];
var defaultTasks = ['lint', 'lint-test', 'scripts', 'sass'];

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
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(rename({suffix: minificationSuffix}))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('sass', function() {
    return sass(sassPath, {
            style: 'compressed',
            sourcemap: true
        })
        .pipe(rename({suffix: minificationSuffix}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function() {
    gulp.watch(jsPath.concat(sassPath), defaultTasks);
});

gulp.task('default', defaultTasks.concat(['watch']));
