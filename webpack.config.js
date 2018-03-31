'use strict';

const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractLESS = new ExtractTextPlugin('styles.css');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: {
    // scripts: "./src/index.js",
    app: "./src/index.js",
    bootstrap: "./src/js/bootstrap.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist",
    filename: "[name].bundle.js"
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: extractLESS.extract({
        fallback: 'style-loader', // Adds CSS to the DOM by injecting a `<style>` tag
        use: [{
          // Interprets `@import` and `url()` like `import/require()` and will resolve them
          loader: "css-loader"
        }, {
          // Loader for webpack to process CSS with PostCSS
          loader: 'postcss-loader',
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          // Loads a Less file and compiles it to CSS
          loader: "less-loader",
          options: {
            paths: [ path.resolve(__dirname, "node_modules/bootstrap-less") ]
          }
        }],
        publicPath: '/dist'
      })
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    }, {
      test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
      use: [{
        loader: "file-loader",
        options: {
          // name: '[path][name].[ext]',
          publicPath: './'
        }
      }]
    }]
  },
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    // contentBase: 'build/', // Relative directory for base of server
    // publicPath: '/',
    // inline: true,
    port: process.env.PORT || 3000,
    host: '192.168.158.8',
    stats: "errors-only",
  },
  plugins: debug ? [
    new HtmlWebpackPlugin({
      title: 'BORM',
      // minify: {
      //   collapseWhitespace: true
      // },
      filename: './../index.html',
      // hash: true,
      template: './src/index.html',
    }),
    extractLESS,
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery" // to big after build !!!
    })
    ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ]
};
