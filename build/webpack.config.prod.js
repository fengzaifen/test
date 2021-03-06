const { merge } = require('webpack-merge')
const path = require('path')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyjsWebapckPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  entry: {
    app: path.join(__dirname, '../src/index.js'),
    vendor: ['vue', 'vuex', 'vue-router']
  },

  output: {
    filename: 'js/[name].[chunkhash:8].js'
  },

  module: {
    rules: [{
      test: /\.(sc|sa)ss$/,
      use: [
        'style-loader',
        {
          loader: MiniCSSExtractPlugin.loader,
          options: {
            publicPath: '../'
          }
        },
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'sass-loader'
      ]
    }]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCSSExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: 'css/[id].[hash:8].css'
    })
  ],

  optimization: {
    minimizer: [
      new UglifyjsWebapckPlugin(),
      new OptimizeCSSAssetsPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  }
})
