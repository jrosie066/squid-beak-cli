const { resolve } = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = () => {
  return {
    context: resolve(__dirname, ''), // TODO:
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
          loader: 'awesome-typescript-loader',
          exclude: /node_modules/,
        },
        // {
        //   test: /\.ts(x?)$/,
        //   use: [
        //     {
        //       loader: 'babel-loader',
        //     },
        //     {
        //       loader: 'ts-loader'
        //     }
        //   ],
        //   exclude: /node_modules/,
        // },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
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
      // new CopyWebpackPlugin([{ from: 'build', to: '' }]),
    ],
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
      "react": "React",
      "react-dom": "ReactDOM"
    }
  }
};

module.exports = () => {
  return config();
}