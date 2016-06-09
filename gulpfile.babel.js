import gulp from 'gulp';
import babelify from 'babelify';
import connect from 'gulp-connect';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import notify from 'gulp-notify';
import notifier from 'node-notifier';
import plumber from 'gulp-plumber'
import through from 'through2';


var hasError = false;

gulp.task('babelify', () => {
    return browserify({
        entries: './js/app.jsx',
        extensions: ['.jsx'],
        debug: true
    })
    .transform(babelify)
    .bundle()
    .on('error', notify.onError("Build crashed"))
    .on('error', function(error) {
      console.log(error.message);
      console.log(error.loc);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public'))
    .on('end', function(var1, var2, var3) {
      if(hasError) {
        notifier.notify("Build succeded");
        hasError=false;
      }
    })
});

gulp.task('connect', () => {
  connect.server({
    root: 'public/',
    port: process.env.PORT || 8080,
    livereload: true
  });
});

gulp.task('testNot', () => {
  gulp.src("./js/*")
      .pipe(through(function () {
        this.emit("error", new Error("Something happend: Error message!"))
      }))
      .on("error", notify.onError(function (error) {
        console.log("ERRORR, returning")
        return "Message to the notifier: " + error.message;
      }));
})

gulp.task('reload-js', ['babelify'], () => {
    gulp.src('./js/app.jsx').pipe(connect.reload());
});
gulp.task('reload-html', () => {
    gulp.src('./public/index.html').pipe(connect.reload());
});
gulp.task('reload-css', () => {
    gulp.src('./css/*.css').pipe(connect.reload());
});

gulp.task('watch', () => {
    gulp.watch(['./js/**/*.jsx'], ['reload-js']);
    gulp.watch(['./public/index.html'], ['reload-html']);
    gulp.watch(['./css/*.css'], ['reload-css']);
})

gulp.task('serve', ['babelify', 'connect', 'watch']);
gulp.task('build', ['babelify']);
