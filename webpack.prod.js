const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin(
          {
            minimizer: {
              implementation: ImageMinimizerPlugin.imageminMinify,
              options: {
                plugins: [
                  ['gifsicle', {interlaced: true}],
                  ['mozjpeg', {progressive: true}],
                  ['optipng', {optimizationLevel: 5}],
                  [
                    'svgo',
                    {
                      plugins: [
                        {
                          name: 'preset-default',
                          params: {
                            overrides: {
                              removeViewBox: false,
                              addAttributesToSVGElement: {
                                params: {
                                  attributes: [
                                    {xmlns: 'http://www.w3.org/2000/svg'},
                                  ],
                                },
                              },
                            },
                          },
                        },
                      ],
                    },
                  ],
                ],
              },
            },
          },
      ),
    ],
  },
  plugins: [
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
      runtimeCaching: [
        {
          urlPattern: new RegExp(`^${process.env.BASE_API_URL}`),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'aribudiman-site',
            cacheableResponse: {
              statuses: [200],
            },
          },
        },
      ],
    }),
    new CompressionPlugin({
      test: /\.(js|css|html|svg)$/,
      filename: '[path][base].gz',
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
  ],
});
