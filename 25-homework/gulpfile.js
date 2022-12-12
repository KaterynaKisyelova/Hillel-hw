const { src, dest, series, parallel, watch } = require("gulp");
const concat = require("gulp-concat");
const clean = require("gulp-clean");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();
const { paths } = require("./gulp/const.js");
const babel = require("gulp-babel");

function cleanDist() {
  return src(paths.dist, { read: false, allowEmpty: true }).pipe(clean());
}

function copyJsBatch() {
  return src(paths.srcJs)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat("index.js"))
    .pipe(sourcemaps.write("./"))
    .pipe(dest(paths.dist));
}

function copyVendorJsBatch() {
  return src(paths.jquery).pipe(concat("vendor.js")).pipe(dest(paths.dist));
}

function copyCssBatch() {
  return src(paths.srcCssAllFiles)
    .pipe(cleanCSS())
    .pipe(concat("style.css"))
    .pipe(dest(paths.dist));
}

function copyHtml() {
  return src(paths.srcHtml).pipe(dest(paths.dist));
}

function serve(done) {
  browserSync.init({
    server: {
      baseDir: paths.dist,
    },
  });

  watch(paths.srcHtml, series(copyHtml, reloadBrowser));
  watch(paths.srcJsAllFiles, series(copyJsBatch, reloadBrowser));
  watch(paths.srcCssAllFiles, series(copyCssBatch, reloadBrowser));

  done();
}

function reloadBrowser(done) {
  browserSync.reload();
  done();
}

function build() {
  return series(
    cleanDist,
    parallel(copyJsBatch, copyVendorJsBatch, copyCssBatch, copyHtml)
  );
}

exports.build = build();
exports.serve = series(build(), serve);
