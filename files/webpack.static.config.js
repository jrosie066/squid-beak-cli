const { resolve } = require('path');

const config = () => {
  return {
    context: resolve(process.env.INIT_CWD, 'dist'),
    entry: ['./'],
    devServer: {
      contentBase: resolve(process.env.INIT_CWD, 'dist'),
      port: 8000,
      historyApiFallback: true,
      open: true,
      openPage: '',
      publicPath: './'
    }
  };
};

module.exports = (env) => config(env);