var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
// var CompressionPlugin = require("compression-webpack-plugin");
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var exec = require('script-loader');

//var PrettierPlugin = require("prettier-webpack-plugin");

// require('script-loader!../src/plugins/particle-storm.min.js');

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');

var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
});

module.exports = { 
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/main.js')
    ],
    vendor: ['pixi', 'p2', 'phaser']
  },
  devtool: 'cheap-source-map',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: 'bundle.js'
  },
  watch: true,
  plugins: [
    definePlugin,
    // new PrettierPlugin({
    //   tabWidth: 2,
    //   printWidth: 120,
    //   useTabs: true,
    //   singleQuote: true,
    //   bracketSpacing: true,
    //   semi: true,
    //   encoding: 'utf-8',
    //   extensions: [ ".js"]
    // }),
    new webpack.optimize.CommonsChunkPlugin({ 
      name: 'vendor', 
      filename: 'vendor.bundle.js'
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './src/index.html',
      chunks: ['vendor', 'app'],
      chunksSortMode: 'manual',
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: false,
        html5: false,
        minifyCSS: false,
        minifyJS: false,
        minifyURLs: false,
        removeComments: false,
        removeEmptyAttributes: false
      },
      hash: false
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/ept.webmanifest'),
        to: path.resolve(__dirname, 'dist')
      }
    ]),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, 'src/sw.js'),
    //     to: path.resolve(__dirname, '/')
    //   }
    // ]),
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      files: [{
        match: ['./assets/maps/*.json', './assets/tilesets/*.png'],
        fn: function (event, file) {
            this.reload()
        }
      }],
      // files: ['./assets/maps/*.json'],
      server: {
        baseDir: ['./', './build']
      }
    })
    // new CompressionPlugin({
    //   asset: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),
    // new UglifyJsPlugin(),
    // new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
      { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
      { test: /p2\.js/, use: ['expose-loader?p2'] },
      {
        test: /\.exec\.js$/,
        use: [ 'script-loader' ]
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  externals: {
    // 'particle-storm': 'particle-storm.min' 
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    }
  }
};
