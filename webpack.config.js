var path = require("path");

function join(dest) { return path.resolve(__dirname, dest); }

var config = module.exports = {
  context: __dirname,

  devtool: "#source-map",

  entry: {
    app: "./web/static/js/app.js"
  },

  output: {
    path: path.join(__dirname, "priv/static/js"),
    filename: "[name].js",
    chunkFilename: "[id].js",
    sourceMapFilename: "[name].map.js"
  },

  sassLoader: {
    includePaths: [
      join("node_modules"),
      join("web/static/css")
    ]
  },

  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: "babel-loader",
        presets: ["stage-1"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.+)?$/,
        loader: "url?limit=100000"
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.scss$/,
        loaders: [
          "style",
          "css?sourceMap",
          "sass?sourceMap"
        ]
      }
    ]
  },

  resolve: {
    extensions: ["", ".js", ".scss", ".css", ".jsx"],
    modulesDirectories: [
      "web_modules",
      "node_modules",
      "deps",
      "web/static/js",
      "web/static/"
    ]
  }
};
