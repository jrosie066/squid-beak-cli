const { resolve } = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ConfigWebpackPlugin = require('config-webpack');

const config = () => {
  return {
    context: resolve(__dirname, 'src'),
    output: {
      filename: 'bundle.js',
      path: resolve(__dirname, 'dist'),
      publicPath: '',
    },
    optimization: {
      usedExports: true, // tree-shaking
      splitChunks: {
        chunks: 'all',
      },
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            configFile: './.eslintrc',
          },
        },
        {
          test: /\.ts(x?)$/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'ts-loader'
            }
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                mimetype: 'image/png',
                name: 'images/[name].[ext]',
              },
            }
          ]
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.eot(\?v=\d+.\d+.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: '8192',
                mimetype: 'application/font-woff',
                name: 'fonts/[name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: '8192',
                mimetype: 'application/octet-stream',
                name: 'fonts/[name].[ext]'
              }
            }
          ]
        },
        // TODO: add font loaders
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                mimetype: 'image/svg+xml',
                name: 'fonts/[name].[ext]',
              },
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
      new ConfigWebpackPlugin(),
    ],
  };
};

module.exports = () => {
  return config();
};