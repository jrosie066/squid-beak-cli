const path = require('path');
const common = require('../webpack.common.config');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions/register', '@storybook/addon-links'],
  webpackFinal: (config) => {
    config.resolve.extensions.push('.ts', '.tsx')
    const wp = {
      ...config,
      module: {
        ...config.module,
        rules: common().module.rules
      },
    };
    console.log(wp.module.rules);
    return {
      ...config,
      module: {
        ...config.module,
        rules: common().module.rules
      },
    }
  }
};
