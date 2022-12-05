const { src, dest, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const clean = require("gulp-clean");

function cleanDist() {
  return src("./dist", { read: false, allowEmpty: true }).pipe(clean());
}

function copyJsBatch() {
  return src(["./src/AlbumsApi.js", "./src/app.js"])
    .pipe(concat("index.js"))
    .pipe(dest("dist"));
}

function copyVendorJsBatch() {
  return src(["./node_modules/jquery/dist/jquery.min.js"])
    .pipe(concat("vendor.js"))
    .pipe(dest("dist"));
}

function copyCssBatch() {
  return src("./src/*.css").pipe(concat("style.css")).pipe(dest("dist"));
}

function copyHtml() {
  return src("./src/index.html").pipe(dest("dist"));
}

exports.default = series(
  cleanDist,
  parallel(copyJsBatch, copyVendorJsBatch, copyCssBatch, copyHtml)
);
