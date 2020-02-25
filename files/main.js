const path = require('path');
module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'babel-loader',
        },
        {
          loader: require.resolve('ts-loader'),
        },
        {
          loader: require.resolve('react-docgen-typescript-loader'),
          options: {
            tsconfigPath: path.resolve(__dirname, "../tsconfig.json"),
          },
        },
      ],
    });
    config.module.rules.push({
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    });
    config.module.rules.push({
      test: /\.less$/,
      use: [
        {
          loader: 'style-loader' // creates style nodes from JS strings
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          } // translates CSS into CommonJS
        },
        {
          loader: 'postcss-loader' // add vendor prefixes
        },
        {
          loader: 'less-loader' // compiles Less to CSS
        }
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  }
};
