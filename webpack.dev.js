const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
  ],
});
