/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var path = require('path');
var webpack = require('webpack');
var url = require('url');

module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: [
    path.join(__dirname, 'index')
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'react-transitionable-component.js'
  },
  resolve: {
    extensions: ['', '.js'],
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'index')
        ]
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        include: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'index')
        ],
        loader: 'babel',
        query: require('./babel.prod')
      }
    ]
  },
  eslint: {
    // TODO: consider separate config for production,
    // e.g. to enable no-console and no-debugger only in prod.
    configFile: path.join(__dirname, 'eslint.js'),
    useEslintrc: false
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
};
