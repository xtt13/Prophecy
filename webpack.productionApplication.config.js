/*eslint-disable */
var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
});

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/main.js')
    ],
    vendor: ['pixi', 'p2', 'phaser', 'webfontloader']

  },
  output: {
    path: path.resolve(__dirname, '../ProphecyDesktopApplication/dist'),
    publicPath: 'dist/',
    filename: 'bundle.js'
  },
  plugins: [
    definePlugin,
    new CleanWebpackPlugin(['../ProphecyDesktopApplication/dist/']),
    new CleanWebpackPlugin(['../ProphecyDesktopApplication/assets/']),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
      drop_console: true,
      output: {
        comments: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'assets/**/*'),
        to: path.resolve(__dirname, '../ProphecyDesktopApplication')
      }
    ]),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'/* chunkName= */, filename: 'vendor.bundle.js'/* filename= */}),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './../ProphecyDesktopApplication/template/index.html',
      chunks: ['vendor', 'app'],
      chunksSortMode: 'manual',
      
      hash: true
    })
  ],
  module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
      { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
      { test: /p2\.js/, use: ['expose-loader?p2'] }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    }
  }
};
