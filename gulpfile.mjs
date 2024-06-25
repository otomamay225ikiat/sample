// @ts-check

import gulp from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

import { createGulpEsbuild } from "gulp-esbuild";
const gulpEsbuild = createGulpEsbuild({
  incremental: true,
});

import { deleteSync } from "del";

import imagemin, { gifsicle, mozjpeg, optipng, svgo } from "gulp-imagemin";

import { watch } from "gulp";

import browserSync from "browser-sync";

import pug from "gulp-pug";

function clean(cb) {
  cb();
}

function pugDevelop() {
  return gulp
    .src(["src/**/*.pug", "!src/**/_*.pug"])
    .pipe(
      pug({
        basedir: "src",
        doctype: "html",
      }),
    )
    .pipe(gulp.dest("dist/"));
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

function pugBuild() {
  return gulp
    .src(["src/**/*.pug", "!src/**/_*.pug"])
    .pipe(
      pug({
        basedir: "src",
        doctype: "html",
      }),
    )
    .pipe(gulp.dest("dist/"));
}

function scssBuild() {
  return gulp
    .src("src/assets/scss/**/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
      }).on("error", sass.logError),
    )
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

function jsBuild() {
  return gulp
    .src("src/assets/js/all.js")
    .pipe(
      gulpEsbuild({
        outfile: "bundle.js",
        bundle: true,
        minify: true,
      }),
    )
    .pipe(gulp.dest("dist/assets/js"));
}

function distDelete(cb) {
  deleteSync(["dist/**/*"]);
  cb();
}

function browsersync(done) {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
  done();
}

function watcher() {
  watch("src/**/*.pug", pugDevelop);
  watch("src/assets/scss/**/*.scss", scssDevelop);
  watch("src/assets/img/**/*.*", imgDevelop);
  watch("src/assets/js/**/*.js", jsDevelop);
}

function develop(done) {
  gulp.series(
    distDelete,
    gulp.parallel(
      pugDevelop,
      scssDevelop,
      imgDevelop,
      jsDevelop,
      browsersync,
      watcher,
    ),
  )(done);
}

function build(done) {
  gulp.series(
    distDelete,
    gulp.parallel(pugBuild, scssBuild, imgBuild, jsBuild),
  )(done);
}

export default develop;

export { build };
