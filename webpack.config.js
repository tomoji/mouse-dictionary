const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    "options/options": "./src/options/Main.jsx",
    content: "./src/content.js"
  },
  output: {
    path: __dirname + "/dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.jsx$/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["@babel/env", "@babel/react"] }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  optimization: isProd
    ? {
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: true,
              ecma: 6,
              mangle: true
            },
            sourceMap: false
          })
        ]
      }
    : {},
  plugins: [
    new CopyWebpackPlugin([
      { from: "static", to: "." },
      { from: __dirname + "/node_modules/milligram/dist/milligram.min.css", to: "options/" }
    ])
  ],
  devtool: isProd ? false : "cheap-module-source-map",

  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 3000000
  }
};
