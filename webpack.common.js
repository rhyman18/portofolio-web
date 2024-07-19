const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: {
    index: {
      import: './src/scripts/index.js',
      dependOn: 'shared',
    },
    style: {
      import: './src/scripts/style.js',
      dependOn: 'shared',
    },
    aos: './src/scripts/aos.js',
    lazysizes: './src/scripts/lazysizes.js',
    shared: ['./src/scripts/global/globalElement.js', 'flowbite'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[contenthash].bundle.js',
    assetModuleFilename: '[name].[contenthash][ext]',
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
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
      inject: 'body',
      scriptLoading: 'blocking',
      preconnect: [
        'https://ka-f.fontawesome.com',
        'https://fonts.gstatic.com',
      ],
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
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].bundle.css',
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
