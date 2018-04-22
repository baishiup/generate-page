const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');
const utils = require('./utils');
const config = require('./config');
const projectDirAll = fs.readdirSync(path.resolve(__dirname, '../src/project'));

let entry = {};
let plugins = [];

// map entry and htmlWebpackPlugin
if (utils.isAppoint) {
  utils.proList().map(projectName => {
    entry[projectName] = `../src/project/${projectName}/index.js`;
    plugins.push(
      new htmlWebpackPlugin({
        filename: `index.html`,
        template: `../src/project/${projectName}/index.html`,
        chunks: [`${projectName}`]
      })
    );
  });
} else {
  projectDirAll.map(projectName => {
    entry[projectName] = `../src/project/${projectName}/index.js`;
    plugins.push(
      new htmlWebpackPlugin({
        filename: `${projectName}/index.html`,
        template: `../src/project/${projectName}/index.html`,
        chunks: [`${projectName}`]
      })
    );
  });
}

// add guide
if (!utils.isAppoint && utils.isDev) {
  entry.guide = '../guide/index.js';
  plugins.push(
    new htmlWebpackPlugin({
      filename: `index.html`,
      template: `../guide/index.html`,
      chunks: [`guide`],
      title: 'test'
    })
  );
}

const baseConfig = {
  context: path.resolve(__dirname, './'),
  entry,
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: config.build.publicPath
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../guide')
        ]
      },
      {
        test: require.resolve('zepto'),
        loader: 'exports-loader?window.Zepto!script-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpg?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  }
};

module.exports = baseConfig;
