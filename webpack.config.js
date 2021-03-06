const webpack = require("webpack");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: __dirname + "/public/dist/",
    filename: "main.js",
    publicPath: "/dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  devtool: "source-map",
  devServer: {
    contentBase: "public/"
  }
};
