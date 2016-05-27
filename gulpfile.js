'use strict';

let gulp = require('gulp');
let gulpLoadPlugin = require('gulp-load-plugins');
let $ = gulpLoadPlugin({
  rename: {
    'gulp-scss-lint': 'scssLint'
  }
});
let config = {
  style: {
    src: "./src/scss/**/*.scss",
    prefix: {
      browsers: ['last 2 versions'],
      cascade: false
    },
    map: {
      includeContent: false,
      sourceRoot: '.'
    },
    lint: {
      'config': '.scss-lint.yml'
    }
  }
};

gulp.task('style', () => {
  return gulp.src(config.style.src)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.autoprefixer(config.style.prefix))
    .pipe($.sourcemaps.write('.', config.style.map))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('docs/css'));
});

gulp.task('minify:style', () => {
  return gulp.src(config.style.src)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.autoprefixer(config.style.prefix))
    .pipe($.cssnano())
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.sourcemaps.write('.', config.style.map))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('docs/css'));
});

gulp.task('lint:style', () => {
  return gulp.src(config.style.src)
    .pipe($.scssLint(config.style.lint));
});

gulp.task('watch', () => {
  $.watch(config.style.src, () => {
    gulp.start(['style']);
  });
});

gulp.task('default', ['watch']);
