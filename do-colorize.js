"use strict"

module.exports = doColorize

var ndarray = require("ndarray")
var pool = require("typedarray-pool")
var colorize = require("apply-colormap")
var luminance = require("luminance")
var ops = require("ndarray-ops")

function doColorize(img, options, cb) {
  options = options || {}
  var gray = !!(options.grayscale || 
                options.greyscale || 
                options.luminance || 
                options.gray ||
                options.grey ||
                options.colormap === "gray")
  if(img.dimension === 3) {
    if(gray) {
      //Convert to grayscale
      var gbuf = pool.mallocFloat32(img.size)
      var gimg = ndarray(gbuf, [img.shape[0], img.shape[1]])
      luminance(gimg, img)
      if(("min" in options) || ("max" in options)) {
        ops.subseq(gimg, +options.min)
        ops.mulseq(gimg, 255.0 * (options.max - options.min))
      }
      cb(gimg)
      pool.freeFloat32(gbuf)
    } else {
      if(("min" in options) || ("max" in options)) {
        ops.subseq(gimg, +options.min)
        ops.mulseq(gimg, 255.0 * (options.max - options.min))
      } else {
        cb(img)
      }
    }
  } else if(img.dimension === 2) {
    var buf = pool.mallocUint8(img.size * 3)
    var opts = { "outBuffer": buf }
    if("min" in options) {
      opts.min = +options.min
    }
    if("max" in options) {
      opts.max = +options.max
    }
    if("colormap" in options) {
      opts.colormap = options.colormap
    }
    if(gray) {
      opts.colormap = "gray"
    }
    var result = colorize(img, opts)
    cb(result)
    pool.freeUint8(buf)
  } else {
    throw new Error("invalid image dimensions")
  }
}