/**
 * Created by zhangkai on 17/7/14.
 */
"use strict";

/*
 *  1. less的 编译 压缩 合并
 *  2. js 的 压缩 合并 混淆
 *  3. img复制
 *  4. html压缩
 *
 * */

var gulp = require("gulp");

//编译less文件
var less = require("gulp-less");
//压缩css
var cssnano = require("gulp-cssnano");
//合并
var concat = require("gulp-concat");
//js压缩
var uglify = require("gulp-uglify");
//html移动并压缩
var htmlmin = require("gulp-htmlmin");
//开始自动同步服务器
var browserSync = require("browser-sync");

//less 编译 合并 压缩
gulp.task("style", function () {
    gulp.src(["src/style/*.less", "!src/style/_*.less"])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest("dist/styles"))
        .pipe(browserSync.reload({
            stream: true
        }))
})

//js 合并压缩和混淆
gulp.task("script", function () {
    gulp.src("src/scripts/*.js")
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/scripts"))
        .pipe(browserSync.reload({
            stream: true
        }))
})

//图片复制
gulp.task("image", function () {
    gulp.src("src/images/*.*")
        .pipe(gulp.dest("dist/images"))
        .pipe(browserSync.reload({
            stream: true
        }))
})

//移动html并压缩
gulp.task("htmlmin", function () {
    gulp.src("src/*.html")
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.reload({
            stream: true
        }))
})

//自动同步服务器
gulp.task("server", function () {
    browserSync({
        server: {
            baseDir: ["dist"]
        }
    }, function (err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });

    gulp.watch("src/style/*.less", ["style"]);
    gulp.watch("src/scripts/*.js", ["script"]);
    gulp.watch("src/images/*.*", ["image"]);
    gulp.watch("src/*.html", ["htmlmin"]);
})