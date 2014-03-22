ndarray-imshow
==============
Displays an ndarray as an image, either in the browser console or as a pop up when run from node.  This works both in node.js and the browser via browserify.

# Example

```javascript
var lena = require("lena")
var imshow = require("ndarray-imshow")

imshow(lena)
```

# Install

```
npm install ndarray-imshow
```

# API

### `require("ndarray-imshow")(array[, options])`
Displays an ndarray as an image. In node, this will open a window, while in the browser the image will be displayed in the debug console.

* `array` is an ndarray
* `options` is an object containing a set of optional arguments

    + `min` is the minimum bound on the intensity range for the image
    + `max` is the maximum bound on the intensity range for the image
    + `colormap` is a colormap, as defined by the [`colormap`](https://www.npmjs.org/package/colormap) package
    + `gray` is a flag which if set converts `rgb` images to grayscale first

# Credits
(c) 2014 Mikola Lysenko. MIT License