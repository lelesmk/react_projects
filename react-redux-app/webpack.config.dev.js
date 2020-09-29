const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

// Export object that configures webpack to bundle our app
module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map", // shows original code when debugging in browser
  entry: "./src/index", // entry point for our app
  output: {
    // doesn't actually output a build file but a reference in memory point to the current directory
    path: path.resolve(__dirname, "build"),
    publicPath: "/", // public url when referenced in browser
    filename: "bundle.js", // reference in memory - no actual build file
  },
  devServer: {
    // you can setup to serve your app via Express, but webpack is chosen for simplicity
    stats: "minimal",
    overlay: true,
    historyApiFallback: true,
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:3001"),
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
    }),
  ],
  module: {
    rules: [
      // declare what file types to handle
      {
        test: /\.(js|jsx)$/, // process js and jsx
        exclude: /node_modules/, // ignore node_modules
        use: ["babel-loader", "eslint-loader"], // use babel to run files
      },
      {
        test: /(\.css)$/, // prcoess css files
        use: ["style-loader", "css-loader"], // use style-loader and css-loader to run files
      },
    ],
  },
};
