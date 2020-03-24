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
const sourcemaps = require('gulp-sourcemaps');
const change = require('gulp-change');
const rename = require('gulp-rename');

// let files = ['javascripts/lib/*.js', 'javascripts/core/*.js', 'javascripts/module/*.js', 'javascripts/widget/*.js'];

const closureOptions = {
  compilation_level: 'ADVANCED',
  language_in: 'ECMASCRIPT_NEXT',
  language_out: 'ECMASCRIPT5_STRICT',
  warning_level: 'VERBOSE',
  externs: readdirSync('node_modules/sui-externs', {ignoreName: ['package.json', 'README.md', 'index.js', '.eslintrc.json', '.git', '.gitignore', '.vscode', 'node_modules', 'yarn.lock', 'package-lock.json']}),
  formatting: 'SINGLE_QUOTES',
  summary_detail_level: 3,
  jscomp_error: '*',
  jscomp_warning: '*',
  jscomp_off: 'strictMissingProperties',
  generate_exports: true,
  define: 'SUI.production=true',
};

const sassOptions = {
  outputStyle: 'compressed',
};

gulp.task('compile:styles', function() {
  return gulp.src('stylesheets/**/*.scss').pipe(sourcemaps.init()).pipe(sass(sassOptions).on('error', sass.logError)).pipe(sourcemaps.write('/')).pipe(gulp.dest('dist'));
});

gulp.task('compile:scripts', function() {
  return gulp.src(['node_modules/google-closure-library/closure/goog/base.js', 'javascripts/**/*.js']).pipe(closureCompiler(objectAssign(closureOptions, {
    output_manifest: 'dist/sui.min.js.mf',
    // create_source_map: 'dist/sui.min.js.map',
    js_output_file: 'sui.min.js',
  }), {
    platform: ['java'],
  })).pipe(insert.append('export default window.SUI;')).pipe(sourcemaps.write('/')).pipe(gulp.dest('dist'));
});

gulp.task('compile:scripts:simple', function() {
  return gulp.src(['node_modules/google-closure-library/closure/goog/base.js', 'javascripts/**/*.js']).pipe(closureCompiler(objectAssign(closureOptions, {
    compilation_level: 'SIMPLE',
    define: 'SUI.production=false',
    output_manifest: 'dist/sui.js.mf',
    // create_source_map: 'dist/sui.js.map',
    js_output_file: 'sui.js',
  }), {
    platform: ['java'],
  })).pipe(sourcemaps.write('/')).pipe(gulp.dest('dist'));
});

gulp.task('create:rails', gulp.parallel('compile:styles', 'compile:scripts:simple', 'compile:scripts', function() {
  return gulp.src('dist/sui.js.mf')
      .pipe(change((content) => {
        return content.replace(/node_modules\//g, '//= require ').replace(/javascripts\//g, '//= require sui-js/javascripts/').replace(/\.js/g, '');
      }))
      .pipe(rename('rails.js'))
      .pipe(gulp.dest('.'));
}));

gulp.task('watcher', function(done) {
  gulp.watch('stylesheets/**/*.scss', gulp.series(['compile:styles']));
  gulp.watch('javascripts/**/*.js', gulp.series(['compile:scripts:simple']));
  done();
});

gulp.task('default', gulp.series('create:rails', function(done) {
  done();
}));

gulp.task('doc', function(done) {
  gulp.src(['README.md', 'javascripts/**/*.js'], {read: false}).pipe(jsdoc(done));
});

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

  gulp.watch('stylesheets/**/*.scss').on('change', browserSync.reload);
  gulp.watch('javascripts/**/*.js').on('change', browserSync.reload);
  gulp.watch('index.html').on('change', browserSync.reload);
  done();
}));
