var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

//当前项目使用的插件
var clean = require('gulp-clean'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev');

var output = './dist/'


var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

//本项目使用的task


//清理 dest目录
gulp.task('clean-dest', function(){
  return gulp.src('./dest')
    .pipe(clean({force: true}));
});

//合并css， js
gulp.task('usemin', function(){
  return gulp.src('./www/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat', rev()],
      js: [rev()]
    }))
    .pipe(gulp.dest('./dest/'));
});

//移动文件到dest目录
gulp.task('move-to-dest', function(){
  return gulp.src([
    './www/img/**/*',
    './www/lib/**/*',
    './www/templates/**/*'
  ], {base: './www'})
    .pipe(gulp.dest('./dest/'));
});



gulp.task('release',['clean-dest'], function(){
  gulp.start('usemin', 'move-to-dest');
});






