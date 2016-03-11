var gulp = require('gulp');

var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var ngHtml2Js = require('gulp-ng-html2js');
var addStream = require('add-stream');
var minifyHtml = require("gulp-minify-html");

var minificationSuffix = '.min';
var jsPath = ['app/**/*.js'];
var jsTestPath = ['app/**/*Test.js'];
var jsAppPath = [jsPath[0], '!' + jsTestPath[0]];
var sassPath = ['app/*.scss'];
var angularTemplatesPath = ['app/**/*.html'];
var defaultTasks = ['lint', 'lint-test', 'scripts', 'sass', 'templates'];

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

gulp.task('templates', function() {
    return gulp.src(angularTemplatesPath)
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2Js({
            moduleName: 'templates',
            prefix: 'app/'
        }))
        .pipe(concat('templates.min.js'))
        .pipe(uglify())
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
