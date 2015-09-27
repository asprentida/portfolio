var gulp = require("gulp"),
  jade = require("gulp-jade"),
  sass = require("gulp-sass"),
  prettify = require("gulp-prettify"),
  browserSync = require("browser-sync"),
  reload = browserSync.reload;


gulp.task('jade', function() {
  gulp.src('app/templates/pages/*.jade')
    .pipe(jade())
    .on('error', log)
    .pipe(prettify({indent_size: 4}))
    .pipe(gulp.dest('app/'))
});

gulp.task('sass', function () {
  return gulp.src('app/scss/*.scss')
    .pipe(sass())
    .on('error', log)
    .pipe(gulp.dest('app/css'))
    .pipe(reload({stream: true}))
});

// Локальный сервер

gulp.task('serv', ['sass', 'jade'], function() {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: 'app'
    }
  })
});

gulp.task('watch', function(){
  gulp.watch('app/templates/**/*.jade', ['jade']);
  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('app/*.html').on('change', reload);
});

// Задача по умолчанию
gulp.task('default', ['serv', 'jade', 'sass', 'watch']);




// Вывод ошибок
var log = function (error) {
  console.log([
    '',
    "----------ERROR MESSAGE START---------",
    ("[" + error.name + " in " + error.plugin + "]"),
    error.message,
    "----------ERROR MESSAGE END----------",
    ''
  ].join('\n'));
  this.end();
}