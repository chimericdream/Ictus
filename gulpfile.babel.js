'use strict';

import babel from 'gulp-babel';
import concat from 'gulp-concat';
import gulp from 'gulp';
import del from 'del';
import rename from 'gulp-rename';
import sass from 'gulp-sass';

gulp.task('clean', () => {
    return del(['dist/**/*']);
});

gulp.task('css', ['clean'], () => {
    return gulp.src('./src/scss/complete.scss')
        .pipe(
            sass({
                'outputStyle': 'compressed'
            }).on('error', sass.logError)
        )
        .pipe(rename({
            'basename': 'ictus',
            'suffix': '.min'
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', ['clean'], () => {
    return gulp.src([
        './src/js/_all.min.top.js',
        './src/js/layout.js',
        './src/js/_all.min.bottom.js'
    ])
        .pipe(concat('ictus.min.js'))
        .pipe(babel({
            'presets': ['es2015']
        }))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('js-full', ['js'], () => {
    return gulp.src([
        './src/bower/jquery/dist/jquery.js',
        './src/bower/tether/dist/js/tether.js',
        './src/bower/bootstrap/dist/js/bootstrap.min.js',
        './dist/js/ictus.min.js'
    ])
        .pipe(concat('ictus.full.min.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('templates', ['clean'], () => {
    return gulp.src('./src/templates/**/*')
        .pipe(gulp.dest('./dist/templates'));
});

gulp.task('default', ['clean', 'css', 'js', 'js-full', 'templates']);
