const
    path = require('path'),
    webpack = require('webpack');

module.exports = {
  "mode": "production",
  "entry": "./src/element-f.js",
  "output": {
    path: path.join(__dirname, "./dist"),
    filename: "umd.min.js",
    libraryTarget: "umd",
    library: "ElementF"
  }
}