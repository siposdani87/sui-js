const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const closureCompiler = require('google-closure-compiler');
const readdirSync = require('readdirsync2');
const browserSync = require('browser-sync').create();
const modRewrite = require('connect-modrewrite');
const sourcemaps = require('gulp-sourcemaps');

const scriptSrc = ['node_modules/google-closure-library/closure/goog/base.js', 'dist/**/*.js', '!dist/sui*'];
const stylesSrc = 'styles/**/*.scss';

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
  // entry_point: './dist/index.js',
  // js_module_root: 'SUI',
};

const sassOptions = {
  outputStyle: 'compressed',
};

gulp.task('compile:styles', gulp.series(function() {
  return gulp.src('styles/**/sui.min.scss').pipe(sourcemaps.init()).pipe(sass(sassOptions).on('error', sass.logError)).pipe(sourcemaps.write('/')).pipe(gulp.dest('dist'));
}));

gulp.task('compile:scripts', gulp.series(function() {
  return gulp.src(scriptSrc).pipe(closureCompiler.gulp({
    requireStreamInput: true,
  })(Object.assign(closureOptions, {
    output_manifest: 'dist/sui.min.js.mf',
    // create_source_map: 'dist/sui.min.js.map',
    js_output_file: 'sui.min.js',
  }))).pipe(sourcemaps.write('/')).pipe(gulp.dest('dist'));
}));

gulp.task('watcher', gulp.series(function(done) {
  gulp.watch(stylesSrc, gulp.series('compile:styles', function(cb) {
    browserSync.reload();
    cb();
  }));
  gulp.watch(scriptSrc, gulp.series('compile:scripts', function(cb) {
    browserSync.reload();
    cb();
  }));
  done();
}));

gulp.task('default', gulp.series('compile:styles', 'compile:scripts', function(done) {
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
