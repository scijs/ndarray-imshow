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

### `require("ndarray-imshow")(array)`
Displays an ndarray as an image.

* `array` is an ndarray

# Credits
(c) 2014 Mikola Lysenko. MIT License