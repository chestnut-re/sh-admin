/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const AntdDayjsWebpackPlugin =require('antd-dayjs-webpack-plugin');
const imageInlineSizeLimit = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || '10000')

module.exports = function (webpackEnv) {
  // const isEnvDevelopment = process.env.NODE_ENV === 'development'
  const isEnvProduction = process.env.NODE_ENV === 'production'

  return {
    target: 'web',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        process: 'process/browser',
        '@': path.join(__dirname, '../src'),
      },
    },
    module: {
      rules: [
        {
          // "oneOf" will traverse all following loaders until one will
          // match the requirements. When no loader matches it will fall
          // back to the "file" loader at the end of the loader list.
          oneOf: [
            {
              test: [/\.avif$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: imageInlineSizeLimit,
                mimetype: 'image/avif',
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: imageInlineSizeLimit,
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            {
              test: /\.(ts|js)x?$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader?cacheDirectory=true',
              },
            },
            {
              test: /\.css$/,
              include: /\.module\.css$/,
              use: [
                {
                  loader: isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                  options: isEnvProduction
                    ? {
                        publicPath: '../../',
                      }
                    : {},
                },
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    modules: true,
                  },
                },
              ],
            },
            {
              test: /\.css$/,
              exclude: /\.module\.css$/,
              use: [
                {
                  loader: isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                  options: isEnvProduction
                    ? {
                        publicPath: '../../',
                      }
                    : {},
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
              test: /\.less$/,
              use: [
                {
                  loader: isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                  options: isEnvProduction
                    ? {
                        publicPath: '../../',
                      }
                    : {},
                },
                {
                  loader: 'css-loader',
                  options: {
                    // sourceMap: true,
                    // modules: true,
                    // localIdentName: "[local]___[hash:base64:5]",
                  },
                },
                {
                  loader: 'postcss-loader',
                },
                {
                  loader: 'less-loader',
                },
              ],
            },
            {
              loader: require.resolve('file-loader'),
              // Exclude `js` files to keep "css" loader working as it injects
              // its runtime that would otherwise be processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../public', 'index.html'),
        favicon: 'public/favicon.ico',
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
      new copyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, '../public'),
            to: './',
            filter: async (resourcePath) => {
              console.log(resourcePath)
              const isIndexHtml = resourcePath.endsWith('/public/index.html')
              if (isIndexHtml) {
                return false
              }
              return true
            },
          },
        ],
      }),
      new AntdDayjsWebpackPlugin()
    ],
  }
}
