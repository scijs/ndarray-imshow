"use strict"

module.exports = imshow

var consoleImg = require("console-image")
var savePixels = require("save-pixels")

function imshow(array) {
  consoleImg(savePixels(array, "canvas"))
}