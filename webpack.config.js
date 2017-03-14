'use strict';

const webpack = require('webpack');

const {
  name,
  repository,
  version,
} = require('./package');

module.exports = function(env) {
  return {

    context: __dirname,

    target: 'web',

    entry: './index.js',

    output: {
      path: __dirname,
      filename: '[name].js',
      library: [
        name
          .replace(/-[a-z]/g,
            (s) => s.slice(1).toUpperCase()
          )
          .replace(/^./,
            (s) => s.toUpperCase()
          ),
      ],
      libraryTarget: 'umd',
    },

    node: {
      Buffer: false,
      process: false,
    },

    resolve: {
      extensions: [
        '.js',
      ],
    },

    plugins: [
      new webpack.NoEmitOnErrorsPlugin,
      new webpack.optimize.AggressiveMergingPlugin,
      new webpack.BannerPlugin({
        banner: [
          '@license Copyright(c) 2017 sasa+1',
          'Released under the MIT license.',
        ].join('\n'),
        entryOnly: true,
        raw: false,
      }),
    ],

  };
};
