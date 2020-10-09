const { merge } = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const ip = require('ip').address();
module.exports = merge(baseConfig, {
  devtool: '#cheap-module-eval-source-map',

  devServer: {
    port: 3000,// 设置端口号为8088
    host: ip || "localhost",
    overlay: {
      errors: true
    },
    historyApiFallback: true, //不跳转
    hot: true,//热加载
    progress: true
  },

  module: {
    rules: [
      {
        test: /\.(sc|sa)ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  optimization: {
    noEmitOnErrors: false
  }
})
