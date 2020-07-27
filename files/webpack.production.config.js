const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzePlugin } = require('webpack-bundle-analyzer');
const { resolve } = require('path');

const common = require('./webpack.common.config');
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const date = Date.now()
const buildHash = process.env.BUILD_HASH || date;
const config = () => {
  return {
    bail: true,
    mode: 'production',
    // devtool: shouldUseSourceMap ? 'source-map' : false,
    devtool: false,
    entry: [
      './index.tsx'
    ],
    module: {
      ...common().module || {},
    },
    output: {
      filename: `js/[name].${buildHash}.js`,
      chunkFilename: `js/[name].${buildHash}.chunk.js`,
      path: resolve(process.env.INIT_CWD, 'dist'),
      publicPath: '',
    },
    optimization: {
      ...common().optimization || {},
      splitChunks: {
        chunks: 'all',
        minSize: 300000,
        maxSize: 600000,
      },
    },
    performance: {
      maxAssetSize: 1000000,
      maxEntrypointSize: 1000000,
      hints: 'warning',
    },
    plugins: [
      ...common().plugins || [],
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        template: resolve(__dirname, 'src/build/index.html'),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
    ]
  };
};

const getAnalyzerPlugin = () => {
  return new BundleAnalyzePlugin({
    generateStatsFile: true,
    analyzerMode: 'static',
    defaultSizes: 'gzip',
    statsOptions: {
      entrypoints: true,
      modules: true,
      performance: true,
      children: true,
      chunks: true,
      chunkGroups: true,
      chunkModules: true,
      chunkOrigins: true,
      depth: true,
      env: true,
      reasons: true,
      usedExports: true,
      providedExports: true,
      optimizationBailout: true,
      errorDetails: true,
      publicPath: true,
      exlude: true,
      maxModules: 'Infinity'
    }
  });
};

module.exports = () => {
  const conf = config();
  // if (analyze) {
  //   conf.plugins.push(getAnalyzerPlugin());
  // }
  return {
    ...common(),
    ...conf
  };
}