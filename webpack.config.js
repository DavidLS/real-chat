// const path = require('path')
const isDevEnvironment = process.env.NODE_ENV !== 'production'

const Dotenv = require('dotenv-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { RetryChunkLoadPlugin } = require('webpack-retry-chunk-load-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './index.js',
  devServer: {
    port: '9500',
    contentBase: ['./public'],
    open: true,
    hot: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: [
          isDevEnvironment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: /\.module\.\w+$/i,
                localIdentName: '[hash:base64:5]___[local]'
              },
              sourceMap: isDevEnvironment
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: isDevEnvironment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevEnvironment ? '[id].css' : '[id].[hash].css'
    }),
    new RetryChunkLoadPlugin({
      maxRetries: 3
    }),
    // new HtmlWebpackPlugin({
    //   template: 'public/index.html'
    // }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/assets', to: 'assets' },
        { from: 'public/', to: '' },
        { from: '_redirects', to: '' }
      ]
    })
  ]
}
