// @ts-check

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

const { series } = require("gulp");

function clean(cb) {
  cb();
}

function build(cb) {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css"));
}

exports.build = build;
exports.default = series(clean, build);
