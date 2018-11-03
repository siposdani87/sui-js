const gulp = require('gulp');
const sass = require('gulp-sass');
const compilerPackage = require('google-closure-compiler');
const closureCompiler = compilerPackage.gulp({
  requireStreamInput: true,
});
const merge = require('merge-stream');
const objectAssign = require('object-assign');
const insert = require('gulp-insert');
const readdirSync = require('readdirsync2');

// let files = ['javascripts/lib/*.js', 'javascripts/core/*.js', 'javascripts/module/*.js', 'javascripts/widget/*.js'];

const closureOptions = {
  compilation_level: 'ADVANCED_OPTIMIZATIONS', // SIMPLE_OPTIMIZATIONS, WHITESPACE_ONLY, ADVANCED_OPTIMIZATIONS
  language_in: 'ECMASCRIPT_2017',
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
  const merged = merge();
  const stream = gulp.src(['javascripts/**/*.js']).pipe(closureCompiler(objectAssign(closureOptions, {
    // externs: [compilerPackage.compiler.CONTRIB_PATH + '/externs/empty.js'],
    output_manifest: 'dist/sui.min.mf',
    js_output_file: 'sui.min.js',
  }))).pipe(insert.append('export default window.SUI;')).pipe(gulp.dest('dist'));

  merged.add(stream);

  return merged;
});

gulp.task('watcher', ['compile:styles', 'compile:scripts'], function() {
  gulp.watch('stylesheets/**/*.scss', ['compile:styles']);
  gulp.watch('javascripts/**/*.js', ['compile:scripts']);
});

gulp.task('default', ['compile:styles', 'compile:scripts'], function() {

});
