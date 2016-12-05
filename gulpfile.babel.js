'use strict';

import babel from 'gulp-babel';
import flatten from 'gulp-flatten';
import gulp from 'gulp';
import del from 'del';
import lec from 'gulp-line-ending-corrector';
import rename from 'gulp-rename';
import requirejs from 'requirejs';
import sass from 'gulp-sass';
import trimlines from 'gulp-trimlines';

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

gulp.task('js', ['js-core', 'js-libs', 'js-plugins']);

gulp.task('js-core', ['clean'], () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(babel({'presets': ['es2015']}))
        .pipe(lec())
        .pipe(trimlines({'leading': false}))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('js-libs', ['js-core'], () => {
    return gulp.src([
        './src/bower/jquery/dist/jquery.min.js',
        './src/bower/moment/min/moment.min.js',
        './src/bower/tether/dist/js/tether.min.js',
        './src/bower/bootstrap/dist/js/bootstrap.min.js'
    ])
        .pipe(flatten())
        .pipe(lec())
        .pipe(trimlines({'leading': false}))
        .pipe(gulp.dest('./dist/js/libs'))
});

gulp.task('js-plugins', ['js-core'], () => {
    return gulp.src([
        './src/bower/chart.js/dist/Chart.min.js',
        './src/bower/notifyjs/dist/notify.js'
    ])
        .pipe(flatten())
        .pipe(lec())
        .pipe(trimlines({'leading': false}))
        .pipe(gulp.dest('./dist/js/plugins'))
});

gulp.task('rjs', ['js-core', 'js-libs', 'js-plugins'], () => {
    const rjsModulePaths = {
        'bootstrap': './libs/bootstrap.min',
        'chartjs': './plugins/Chart.min',
        'jquery': './libs/jquery.min',
        'moment': './libs/moment.min',
        'notifyjs': './plugins/notify',
        'tether': './libs/tether.min'
    };
    const rjsConfig = {
        'baseUrl': './dist/js',
        'paths': rjsModulePaths,
        'include': [
            'ictus-core',
            'ictus-jquery'
        ].concat(Object.keys(rjsModulePaths)),
        //'optimize': 'uglify',
        'optimize': 'none',
        'out': './dist/js/ictus.js'
    };

    requirejs.optimize(rjsConfig);
});

gulp.task('templates', ['clean'], () => {
    return gulp.src([
        './src/templates/**/*',
        '!./src/templates/handlebars/render-helper.js'
    ])
        .pipe(gulp.dest('./dist/templates'));
});

gulp.task('default', ['clean', 'css', 'js', 'rjs', 'templates']);
