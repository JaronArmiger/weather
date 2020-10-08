const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
  	rules: [
      {
      	test: /\.js$/,
      	exclude: /node_modules/,
      	use: {
      	  loader: 'babel-loader',
      	  options: {
      	  	presets: ['@babel/preset-env'],
      	  }
      	}
      }
  	]
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
  watch: true,
  devtool: 'source-map',
  devServer: {
  	contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
}