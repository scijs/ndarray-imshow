"use strict"

module.exports = imshow

var consoleImg = require("console-image")
var savePixels = require("save-pixels")
var colorize = require("./do-colorize.js")

function imshow(array, options) {
  colorize(array, options, function(img) {
    consoleImg(savePixels(img, "canvas"))
  })
}