const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const sass = require('gulp-sass');
const compilerPackage = require('google-closure-compiler');
const closureCompiler = compilerPackage.gulp({
  requireStreamInput: true,
});
const objectAssign = require('object-assign');
const insert = require('gulp-insert');
const readdirSync = require('readdirsync2');
const browserSync = require('browser-sync').create();
const modRewrite = require('connect-modrewrite');

// let files = ['javascripts/lib/*.js', 'javascripts/core/*.js', 'javascripts/module/*.js', 'javascripts/widget/*.js'];

const closureOptions = {
  compilation_level: 'ADVANCED_OPTIMIZATIONS', // SIMPLE_OPTIMIZATIONS, WHITESPACE_ONLY, ADVANCED_OPTIMIZATIONS
  language_in: 'ECMASCRIPT_2019',
  language_out: 'ECMASCRIPT5_STRICT',
  warning_level: 'VERBOSE',
  externs: readdirSync('node_modules/sui-externs', {ignoreName: ['package.json', 'README.md', 'index.js', '.eslintrc.json', '.git', '.gitignore', '.vscode', 'node_modules', 'yarn.lock', 'package-lock.json']}),
  formatting: 'SINGLE_QUOTES',
  summary_detail_level: 3,
  jscomp_error: '*',
  jscomp_warning: '*',
  generate_exports: true,
  define: 'SUI.debug=false',
};

const sassOptions = {
  outputStyle: 'compressed',
};

gulp.task('compile:styles', [], function() {
  return gulp.src('stylesheets/**/*.scss').pipe(sass(sassOptions).on('error', sass.logError)).pipe(gulp.dest('dist'));
});

gulp.task('compile:scripts', [], function() {
  return gulp.src(['javascripts/**/*.js']).pipe(closureCompiler(objectAssign(closureOptions, {
    output_manifest: 'dist/sui.min.mf',
    js_output_file: 'sui.min.js',
  }))).pipe(insert.append('export default window.SUI;')).pipe(gulp.dest('dist'));
});

gulp.task('compile:scripts:simple', [], function() {
  return gulp.src(['javascripts/**/*.js']).pipe(closureCompiler(objectAssign(closureOptions, {
    compilation_level: 'SIMPLE_OPTIMIZATIONS',
    define: 'SUI.debug=true',
    output_manifest: 'dist/sui.mf',
    js_output_file: 'sui.js',
  }))).pipe(gulp.dest('dist'));
});

gulp.task('watcher', ['compile:styles', 'compile:scripts:simple'], function() {
  gulp.watch('stylesheets/**/*.scss', ['compile:styles']);
  gulp.watch('javascripts/**/*.js', ['compile:scripts:simple']);
});

gulp.task('default', ['compile:styles', 'compile:scripts'], function() {

});

gulp.task('doc', [], function(cb) {
  gulp.src(['README.md', 'javascripts/**/*.js'], {read: false}).pipe(jsdoc(cb));
});

gulp.task('serve', ['watcher'], function() {
  browserSync.init({
    port: 4000,
    startPath: '/index.html',
    server: {
      baseDir: './',
      middleware: [
        modRewrite([
          '^[^\\.]*$ /index.html [L]',
        ]),
      ],
    },
    browser: 'default',
  });

  gulp.watch('stylesheets/**/*.scss').on('change', browserSync.reload);
  gulp.watch('javascripts/**/*.js').on('change', browserSync.reload);
  gulp.watch('index.html').on('change', browserSync.reload);
});
