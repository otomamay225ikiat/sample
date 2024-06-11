// @ts-check

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

const { series } = require("gulp");
const { watch } = require("gulp");

function clean(cb) {
  cb();
}

function build() {
  return gulp
    .src("src/assets/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/assets/css"));
}

function scss() {
  return gulp
    .src("src/assets/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/assets/css"));
}

exports.default = function () {
  watch("src/assets/scss/**/*.scss", scss);
};

exports.build = build;
