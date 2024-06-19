// @ts-check

import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

import { createGulpEsbuild } from "gulp-esbuild";
const gulpEsbuild = createGulpEsbuild({
  incremental: true,
});

import parallel from "gulp";

import imagemin, { gifsicle, mozjpeg, optipng, svgo } from "gulp-imagemin";

import { watch } from "gulp";

function clean(cb) {
  cb();
}

function build() {
  return gulp.parallel([scssBuild, imgBuild, jsBuild]);
}

function scssDevelop() {
  return gulp
    .src("src/assets/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/assets/css"));
}

function imgDevelop() {
  return gulp
    .src("src/assets/img/*", { encoding: false })
    .pipe(gulp.dest("dist/assets/img"));
}

function jsDevelop() {
  return gulp
    .src("src/assets/js/all.js")
    .pipe(
      gulpEsbuild({
        outfile: "bundle.js",
        bundle: true,
      }),
    )
    .pipe(gulp.dest("dist/assets/js"));
}

function scssBuild() {
  return gulp
    .src("src/assets/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/assets/css"));
}

function imgBuild() {
  return gulp
    .src("src/assets/img/*", { encoding: false })
    .pipe(
      imagemin([
        gifsicle({ interlaced: true }),
        mozjpeg({ quality: 75, progressive: true }),
        optipng({ optimizationLevel: 5 }),
        svgo({
          plugins: [
            {
              name: "removeViewBox",
              active: true,
            },
            {
              name: "cleanupIDs",
              active: false,
            },
          ],
        }),
      ]),
    )
    .pipe(gulp.dest("dist/assets/img"));
}

function jsBuild(cb) {
  // body omitted
  cb();
}

function develop() {
  watch("src/assets/scss/**/*.scss", scssDevelop);
  watch("src/assets/img/**/*.*", imgDevelop);
  watch("src/assets/js/**/*.js", jsDevelop);
}

export default develop;

export { build };
