const gulp = require('gulp');
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const minifyImg = require('gulp-imagemin');
const minifyHTML = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();

function css() {
    return src('app/sass/**/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream())
}

function images() {
    return src('app/images/*')
        .pipe(minifyImg())
        .pipe(dest('dist/images'))
}

function html() {
    return src('app/index.html')
        .pipe(minifyHTML({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './dist/',
        }
    });
    gulp.watch('./app/sass/**/*.scss', css);
    gulp.watch('./app/images/*', images);
    gulp.watch('./app/index.html', html);
    gulp.watch('./*').on('change', browserSync.reload);
}

exports.default = watch;