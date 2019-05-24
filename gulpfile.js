/**
 * @description: gulp配置文件
 * @author: guang.shi <https://blog.csdn.net/guang_s> 
 * @date: 2019-05-07 16:42:38 
 */
'use strict';

var gulp = require('gulp');
var less = require('gulp-less');	        // less编译
var concat = require('gulp-concat');        // 合并文件
var clean = require('gulp-clean');          // 清空文件夹
var browserSync = require('browser-sync').create();	    // 用来打开一个浏览器

var style_path = ['src/{custom,reset,layout,common}.less']

// 合并less文件
gulp.task('less', function(){
    return gulp.src(style_path)
        .pipe(concat('base.less'))
        .pipe(gulp.dest('dist/'))
});

// css用例文件
gulp.task('css', function(){
    return gulp.src('example/main.less')
        .pipe(less())                   // 编译less
        .on('error', function(err) {    // 解决编译出错，监听被阻断的问题
            console.log('\x1B[31m%s\x1B[0m', '\nLess Error: ' + err.message + '\n')
            this.end();
        })
        .pipe(concat('main.css'))
        .pipe(gulp.dest('example/dist'))
});

// 清空dist文件夹
gulp.task('clean', function(){
	return gulp.src(['dist/*', 'example/dist/*'])
		.pipe(clean());
});

// 启本地服务，并打开浏览器
gulp.task('browser', function(){
	browserSync.init({
        server: 'example'    // 访问目录，自动指向该目录下的 index.html 文件
    });
});

// 监听文件变化
gulp.task('watch', function () {
    gulp.watch('example/index.html').on('change', browserSync.reload);
    gulp.watch('{example,src}/*.less', ['css']).on('change', browserSync.reload);
});

// 开发环境
gulp.task('dev', ['clean'], function() {
    gulp.start(['css', 'browser', 'watch']);
});

// 生产环境
gulp.task('build', ['clean'], function() {
    gulp.start(['less']);
});
