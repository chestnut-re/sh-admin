
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { merge } = require('webpack-merge')

const webpackConfigBase = require('./webpack.base.config')

const webpackConfigDev = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: [path.join(__dirname, '../src', 'index.tsx')],
  },
  output: {
    filename: 'static/js/bundle.js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
  },
  devServer: {
    host: '0.0.0.0',
    // contentBase: path.join(__dirname, '../build'),
    // compress: true,
    port: 5002,
    hot: true,
    historyApiFallback: true, // router history 模式下需要
    proxy: {
      // '/api': { target: 'http://devapi.mountainseas.cn/', secure: false, changeOrigin: true },
      '/api': { target: 'http://testapi.mountainseas.cn/', secure: false, changeOrigin: true },
      // '/api/users': { target: 'http://192.168.10.60:19001', secure: false, changeOrigin: true },
      // '/api': { target: 'http://192.168.10.60:39210', secure: false, changeOrigin: true },
    },
  },
}

const baseConfig = webpackConfigBase('development')

module.exports = merge(baseConfig, webpackConfigDev)
