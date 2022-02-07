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
  },
}

const proxyMap = {
  test: {
    proxy: {
      '/api': { target: 'https://testapi.mountainseas.cn/', secure: false, changeOrigin: true },
    },
  },
  development: {
    proxy: {
      '/api': { target: 'https://devapi.mountainseas.cn/', secure: false, changeOrigin: true },
    },
  },
  production: {
    proxy: {
      '/api': { target: 'https://prodapi.mountainseas.cn/', secure: false, changeOrigin: true },
    },
  },
}

webpackConfigDev.devServer['proxy'] = proxyMap[process.env.BACKEND_ENV].proxy

const baseConfig = webpackConfigBase('development')

module.exports = merge(baseConfig, webpackConfigDev)
