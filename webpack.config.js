const path = require('path')
const isDevEnvironment = process.env.NODE_ENV !== 'production'

const Dotenv = require('dotenv-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js'
  },
  devServer: {
    port: '9500',
    contentBase: ['./public'],
    open: true,
    hot: true
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
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: isDevEnvironment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevEnvironment ? '[id].css' : '[id].[hash].css'
    })
  ]
}
