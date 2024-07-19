const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    index: './src/scripts/index.js',
    style: './src/scripts/style.js',
    aos: './src/scripts/aos.js',
    lazysizes: './src/scripts/lazysizes.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js',
    assetModuleFilename: '[name][ext]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          globOptions: {
            ignore: [
              '**/src/public/images/**/*',
            ],
          },
          to: path.resolve(__dirname, 'public/'),
        },
      ],
    }),
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
      systemvars: true,
      safe: true,
    }),
  ],
};
