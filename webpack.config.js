var path = require("path");
var config = module.exports = {};

config.context = __dirname;

config.devtool = "#source-map";

config.entry = { app: "./web/static/js/app.js" };

config.output =
  { path: path.join(__dirname, "priv/static/js")
  , filename: "[name].js"
  , chunkFilename: "[id].js"
  , sourceMapFilename: "[name].map.js"
  };

config.module =
  { loaders:
    [ { exclude: /node_modules/
      , loader: "babel-loader"
      }
    , { test: /\.scss/
      , loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      }
    ]
  };

config.resolve =
  // So we can do `require('./utils')` instead of `require('./utils.js')`
  { extensions: ["", ".js"]
  , modulesDirectories: ["web_modules", "node_modules", "deps"]
  };
