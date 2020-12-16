const path = require('path');

module.exports = {
  "mode": "production",
  "entry": "./src/element-f.js",
  "output": {
    path: path.join(__dirname, "./dist"),
    filename: "umd.min.js",
    libraryTarget: "umd",
    libraryExport: "default",
    library: "ElementF"
  }
}