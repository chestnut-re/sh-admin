/*
 * @Description:
 * @LastEditTime: 2022-01-21 18:50:14
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const SentryCliPlugin = require('@sentry/webpack-plugin')

const { merge } = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')

const webpackProdConfig = {
  mode: 'production',
  devtool: 'hidden-source-map',
  entry: {
    app: ['@babel/polyfill', path.join(__dirname, '../src', 'index.tsx')],
  },
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: 'manifest',
    },
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: 'advanced',
        },
      }),
    ], // [new UglifyJsPlugin({...})]
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/,
        },
        styles: {
          name: 'styles',
          test: /\.(less|css)$/,
          chunks: 'all',
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
  output: {
    filename: 'static/js/[name].[contenthash:8].js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
  },
  plugins: [
    new SentryCliPlugin({
      release: 'travel-admin@1.0.0',
      // include: /\.map$/, //'.',
      include: path.join(__dirname,'../build/static/js/'), //需要上传到sentry服务器的资源目录,会自动匹配js 以及map文件
      ignoreFile: '.sentrycliignore',
      ignore: ['node_modules', 'webpack.config.js'],
      configFile: 'sentry.properties',
      urlPrefix: '~/static/js',
    }),
    new CleanWebpackPlugin(),
    new CompressionWebpackPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'), //匹配文件名
      threshold: 10240, //对10K以上的数据进行压缩
      minRatio: 0.8,
      deleteOriginalAssets: false, //是否删除源文件,删除的话不会有js文件，都是gz文件
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    // contentBase: path.join(__dirname, '../build'),
    // compress: true,
    port: 5002,
    hot: true,
    historyApiFallback: true, // router history 模式下需要
    proxy: {
      '/api': { target: 'https://prodapi.mountainseas.cn/', secure: false, changeOrigin: true },
    },
  },
}

const baseConfig = webpackConfigBase('production')

const resultConfig = merge(baseConfig, webpackProdConfig)

// console.log(resultConfig)

module.exports = resultConfig
