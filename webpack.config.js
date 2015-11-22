var path = require("path");
var config = module.exports = {};

function join(dest) { return path.resolve(__dirname, dest); }
function web(dest) { return join("web/static/" + dest); }

var sassOpts =
  [ "?includePaths[]="
  , join("node_modules")
  , "&includePaths[]="
  , join("bower_components")
  , "&includePaths[]="
  , join("node_modules/bourbon/app/assets/stylesheets")
  ].join("");

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
    [ { exclude: /node_modules/, loader: "babel-loader" }
    , { test: /\.css$/, loader: "style!css" }
    // , { test: /\.png$/, loader: "url-loader?limit=100000" }
    // , { test: /\.jpg$/, loader: "file-loader" }
    , { test: /\.scss$/
      , loaders:
        ["style"
        , "css?sourceMap"
        , "sass?sourceMap" + sassOpts
        ]
      }
    ]
  };

config.resolve =
  // So we can do `require('./utils')` instead of `require('./utils.js')`
  { extensions: ["", ".js", ".scss", ".css", ".jsx"]
  , modulesDirectories:
    ["web_modules"
    , "node_modules"
    , "deps"
    , "web/static/"
    ]
  };
