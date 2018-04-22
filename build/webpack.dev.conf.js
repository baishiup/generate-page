const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const config = require('./config');
const baseWebpackConfig = require('./webpack.base.conf');
const htmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils');

const devWebapckConfig = merge(baseWebpackConfig, {
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      }
    ]
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    host: config.dev.host,
    port: config.dev.port,
    open: config.dev.open,
    overlay: true,
    proxy: config.dev.proxy || {},
    watchOptions: {
      poll: config.dev.poll || false
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
});

module.exports = devWebapckConfig;
