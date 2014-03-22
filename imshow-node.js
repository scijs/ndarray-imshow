"use strict"

module.exports = imshow

var open = require("open")
var tmp = require("temporary")
var savePixels = require("save-pixels")
var fs = require("fs")
var colorize = require("./do-colorize.js")

function imshow(img, options) {
  colorize(img, options, function(array) {
    var pngStream = savePixels(array, "png")
    var file = new tmp.File()
    var path = file.path + ".png"
    var outStream = fs.createWriteStream(path)
    pngStream.pipe(outStream).on("finish", function() {
      open(path)
    })
  })
}