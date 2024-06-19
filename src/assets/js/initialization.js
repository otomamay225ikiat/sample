/**
 * 変数
 *****************************************************/
const html = document.querySelector("html");
const body = document.querySelector("body");
const header = document.querySelector(".l-header");
const footer = document.querySelector(".l-footer");

import { slider } from "./slider.js";
import { accordion } from "./accordion.js";

/**
 * 処理
 *****************************************************/
window.onload = function () {};
window.addEventListener("load", function () {
  slider();
  accordion();
});
document.addEventListener("DOMContentLoaded", function () {});
document.addEventListener("scroll", function () {});
window.addEventListener("resize", function () {});
