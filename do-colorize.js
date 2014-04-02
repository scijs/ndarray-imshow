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
        var lo = ("min" in options) ? +options.min : ops.infimum(gimg)
        ops.subseq(gimg, lo)
        var hi = ("max" in options) ? +options.max : ops.supremum(gimg)
        ops.mulseq(gimg, 255.0 / (hi - lo))
      }
      cb(gimg)
      pool.freeFloat32(gbuf)
    } else {
      if(("min" in options) || ("max" in options)) {
        var gbuf = pool.mallocFloat32(img.size)
        var gimg = ndarray(gbuf, img.shape)
        var lo = ("min" in options) ? +options.min : ops.infimum(img)
        ops.subeq(gimg, img, lo)
        var hi = ("max" in options) ? +options.max : ops.supremum(img)
        ops.mulseq(gimg, 255.0 / (hi - lo))
        cb(gimg)
        pool.freeFloat32(gbuf)
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