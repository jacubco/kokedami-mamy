const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');
const browserSync = require('browser-sync').create();

// JavaScript
const minify = require('gulp-minify');

// CSS
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

 
// TASKS

// Compile index.html into docs/index.html
gulp.task('nunjucks', () =>
  gulp.src('src/*.html')
    .pipe(nunjucks.compile({name: 'Sindre'}))
    .pipe(gulp.dest('docs')),
);

// Copy images to docs/img
gulp.task('copyImg', () =>
  gulp.src('src/img/**')
    .pipe(gulp.dest('docs/img')),
);

// Minify javaScript and copy to docs/js
gulp.task('copyJS', () =>
  gulp.src('src/js/*.js')
    .pipe(minify({
        ext:{
            min:'.min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '*.min.js']
    }))
    .pipe(gulp.dest('docs/js')),
);

// Autoprefix and minify css
gulp.task('css', (done) => {
  return gulp.src('docs/css/styles.css')
    .pipe(autoprefixer({
        // browsers: ['last 2 versions'],
        cascade: false
      }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('docs/css'));
    done()
});


// Start browserSync, watch for changes in siteRoot/** for injection or reload
const siteRoot = './docs'
gulp.task('browserSync', function() {
  browserSync.init({
    files: [siteRoot + '/**/**'],
    browser: "Google\ chrome",
    server: {
      baseDir: siteRoot
    },
  })
});


// WATCH TASKS

// Watch includes and apply nunjucks task on change
gulp.task('watchIncludes', () => {
  gulp.watch(['src/_includes/**'],
  gulp.series('nunjucks'))
});

// Watch img and copy to docs/img on change
gulp.task('watchImg', () => {
  gulp.watch('src/img/**',
  gulp.series('copyImg'))
});

// Watch js and copy to docs/js on change
gulp.task('watchJS', () => {
  gulp.watch('src/js/**',
  gulp.series('copyJS'))
});

// Watch css, autoprefix and minify and copy to docs/css on change
gulp.task('watchCSS', () => {
  gulp.watch('docs/css/styles.css',
  gulp.series('css'))
});

// Start all tasks as default
gulp.task('default', gulp.parallel(['nunjucks', 'copyImg','copyJS', 'css', 'browserSync', 'watchIncludes', 'watchImg', 'watchJS', 'watchCSS']));