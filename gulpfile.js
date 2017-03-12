var gulp = require('gulp');
// 获取gulp-htmlmin 模块
var htmlmin = require('gulp-htmlmin');
// 获取gulp-less 模块
var less = require('gulp-less');
var path = require('path');
// 获取gulp-cssnano 模块
var cssnano = require('gulp-cssnano');
// 获取gulp-uglify 模块
var uglify = require('gulp-uglify');
// 获取 gulp-imagemin 模块
var imagemin = require('gulp-imagemin')
// 获取 browser-sync 模块
var browserSync = require('browser-sync').create();

 // 压缩html
gulp.task('minify', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({    //必须每个添加这个
      stream: true
    }))
});

// less编译成css然后压缩
gulp.task('styles', function () {
    gulp.src('src/styles/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({    //必须每个添加这个
          stream: true
        }))

});

// 压缩JS
gulp.task('uglifyjs', function () {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({    //必须每个添加这个
          stream: true
        }))
})

// 压缩图片任务
// 在命令行输入 gulp images 启动此任务
gulp.task('images', function () {
    // 1. 找到图片
    gulp.src('src/images/*.*')
    // 2. 压缩图片
        .pipe(imagemin({
            progressive: true
        }))
    // 3. 另存图片
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({    //必须每个添加这个
          stream: true
        }))
});


// 在命令行使用 gulp auto 启动此任务
gulp.task('serve', function () {
     browserSync.init({
        server: "./dist/"
    })
    // 监听文件修改，当文件被修改则执行 images 任务
    gulp.watch('src/*.html', ['minify'])    //监听html
    gulp.watch('src/styles/*.less', ['styles'])        //监听style
    gulp.watch('src/js/**/*.js', ['uglifyjs'])  //监听js
    gulp.watch('src/images/*.*', ['images'])   //监听img
});

gulp.task('default', ['minify','styles','uglifyjs','images', 'serve']);