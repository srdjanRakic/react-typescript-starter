const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const commonPaths = require('./paths');
const { name: libraryName } = require('../package.json');

module.exports = {
  entry: commonPaths.entryPath,
  output: {
    path: commonPaths.outputPath,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    libraryExport: 'default',
  },
  target: 'web',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts|js)x?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          emitWarning: process.env.NODE_ENV !== 'production',
        },
      },
      {
        test: /\.(js|ts)x?$/,
        include: commonPaths.root,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(jpe?g|png|gif|ico|svg)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx', '.json'],
    symlinks: false,
    cacheWithContext: false,
    alias: {
      'lodash-es': 'lodash',
      'lodash.debounce': 'lodash/debounce',
      'lodash.assign': 'lodash/assign',
      'lodash.curry': 'lodash/curry',
    },
  },
  stats: 'errors-warnings',
  plugins: [
    new webpack.ProgressPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new HardSourceWebpackPlugin(),
  ],
};
