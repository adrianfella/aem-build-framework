const requireDir = require('require-dir');
const gulp = require('gulp');
const runSequence = require('run-sequence');

requireDir('./tasks', { recurse: true });
require('events').EventEmitter.defaultMaxListeners = 0;

gulp.task('build:dev', function (callback) {

    runSequence(
        'clean:dev',
        [
            'hb',
            'sass:dev',
            'copy:js:dev',
            'copy:data:dev',
            'copy:layouts:dev',
            'image:dev'
        ],
        callback
    );
});

gulp.task('serve', function (callback) {

    runSequence(
        [
            'watch:hb',
            'watch:js',
            'watch:layouts',
            'watch:image',
            'watch:sass'
        ],
        'build:dev',
        'connect',
        'livereload:init',
        'livereload',
        'connect:open',
        callback
    );
});

gulp.task('build', function (callback) {

    runSequence(
        'clean:dist',
        [
            'hb:dist',
            'sass:dist',
            'copy:js:dist',
            'copy:data:dist',
            'image:dist'
        ],
        'uglify:resources:dist',
        callback
    );
});