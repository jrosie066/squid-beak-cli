const { resolve } = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
const common = require('./webpack.common.config');

const config = () => {
  return {
    mode: 'development',
    entry: [
      'react-hot-loader/patch',
      'webpack/hot/only-dev-server',
      './src/index.tsx',
    ],
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      hot: true,
      contentBase: resolve(__dirname, 'src/build'),
      historyApiFallback: true,
      open: true,
      openPage: '', // TODO: set to main page
      overlay: true,
      publicPath: '/',
    },
    module: {
      ...common().module || {},
    },
    optimization: {
      ...common().optimization || {},
    },
    plugins: [
      ...common().plugins || [],
      new HtmlWebpackPlugin({
        inject: true,
        template: resolve(__dirname, 'src/build/index.html'),
        title: 'title',
      }),
      new webpack.LoaderOptionsPlugin({
        test: /\.jsx?$/,
        options: {
          eslint: {
            configFile: resolve(__dirname, '.eslintrc'),
            cache: false,
          },
        },
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new CompressionPlugin(),
    ]
  }
};

module.exports = () => {
  return Object.assign({}, common(), config());
};