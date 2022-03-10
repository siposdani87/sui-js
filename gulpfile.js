const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const sass = require('gulp-sass')(require('sass'));
const closureCompiler = require('google-closure-compiler');
const insert = require('gulp-insert');
const readdirSync = require('readdirsync2');
const browserSync = require('browser-sync').create();
const modRewrite = require('connect-modrewrite');
const sourcemaps = require('gulp-sourcemaps');

const scriptSrc = ['node_modules/google-closure-library/closure/goog/base.js', 'dist/**/*.js'];
const stylesSrc = 'styles/**/*.scss';

const endLine = '';

const closureOptions = {
  compilation_level: 'ADVANCED',
  language_in: 'ECMASCRIPT_NEXT',
  language_out: 'ECMASCRIPT_2015',
  module_resolution: 'NODE',
  warning_level: 'VERBOSE',
  externs: readdirSync('node_modules/sui-externs', {ignoreName: ['package.json', 'README.md', 'index.js', '.eslintrc.json', '.git', '.gitignore', '.vscode', 'node_modules', 'yarn.lock', 'package-lock.json']}),
  formatting: 'SINGLE_QUOTES',
  summary_detail_level: 3,
  jscomp_error: '*',
  jscomp_warning: '*',
  jscomp_off: ['strictMissingProperties'],
  hide_warnings_for: ['test/', 'base.js'],
  generate_exports: true,
  define: 'releaseMode=true',
  // entry_point: './dist/index.js',
  // js_module_root: 'SUI',
};

const sassOptions = {
  outputStyle: 'compressed',
};

gulp.task('compile:styles:minify', gulp.series(function() {
  return gulp.src('styles/**/sui.min.scss').pipe(sourcemaps.init()).pipe(sass(sassOptions).on('error', sass.logError)).pipe(sourcemaps.write('/')).pipe(gulp.dest('dist'));
}));

gulp.task('compile:styles:simple', gulp.series(function() {
  return gulp.src('styles/**/sui.scss').pipe(sourcemaps.init()).pipe(sass(Object.assign(sassOptions, {
    outputStyle: 'expanded',
  })).on('error', sass.logError)).pipe(sourcemaps.write('/')).pipe(gulp.dest('dist'));
}));

gulp.task('compile:scripts:minify', gulp.series(function() {
  return gulp.src(scriptSrc).pipe(closureCompiler.gulp({
    requireStreamInput: true,
  })(Object.assign(closureOptions, {
    output_manifest: 'dist/sui.min.js.mf',
    // create_source_map: 'dist/sui.min.js.map',
    js_output_file: 'sui.min.js',
  }))).pipe(insert.append(endLine)).pipe(sourcemaps.write('/')).pipe(gulp.dest('dist'));
}));

gulp.task('compile:scripts:debug', gulp.series(function() {
  return gulp.src(scriptSrc).pipe(closureCompiler.gulp({
    requireStreamInput: true,
  })(Object.assign(closureOptions, {
    compilation_level: 'WHITESPACE_ONLY',
    // dependency_mode: 'SORT_ONLY',
    debug: false,
    define: 'releaseMode=false',
    output_manifest: 'dist/sui.debug.js.mf',
    // create_source_map: 'dist/sui.debug.js.map',
    js_output_file: 'sui.debug.js',
  }))).pipe(insert.append(endLine)).pipe(sourcemaps.write('/')).pipe(gulp.dest('dist'));
}));

gulp.task('compile:scripts:simple', gulp.series(function() {
  return gulp.src(scriptSrc).pipe(closureCompiler.gulp({
    requireStreamInput: true,
  })(Object.assign(closureOptions, {
    compilation_level: 'SIMPLE',
    define: 'releaseMode=false',
    output_manifest: 'dist/sui.js.mf',
    // create_source_map: 'dist/sui.js.map',
    js_output_file: 'sui.js',
  }))).pipe(insert.append(endLine)).pipe(sourcemaps.write('/')).pipe(gulp.dest('dist'));
}));

gulp.task('watcher', gulp.series(function(done) {
  gulp.watch(stylesSrc, gulp.series('compile:styles:minify', function(cb) {
    browserSync.reload();
    cb();
  }));
  gulp.watch(scriptSrc, gulp.series('compile:scripts:debug', function(cb) {
    browserSync.reload();
    cb();
  }));
  done();
}));

gulp.task('jsdoc', gulp.series(function(done) {
  const config = require('./jsdoc.json');
  gulp.src(['README.md', 'dist/**/*.js', '!sui.min*'], {read: false}).pipe(jsdoc(config, done));
}));

gulp.task('compile:styles', gulp.series('compile:styles:minify', 'compile:styles:simple', function(done) {
  done();
}));

gulp.task('compile:scripts', gulp.series('compile:scripts:minify', function(done) {
  done();
}));

gulp.task('default', gulp.series('compile:styles', 'compile:scripts', 'jsdoc', function(done) {
  done();
}));

gulp.task('serve', gulp.series('watcher', function(done) {
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

  gulp.watch(stylesSrc).on('change', browserSync.reload);
  gulp.watch(scriptSrc).on('change', browserSync.reload);
  gulp.watch('index.html').on('change', browserSync.reload);
  done();
}));
