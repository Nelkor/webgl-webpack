const { HotModuleReplacementPlugin } = require('webpack')
const merge = require('webpack-merge')

const baseConfig = require('./config.base')

const devConfig = {
  mode: 'development',
  entry: './src/main.js',
  plugins: [
    new HotModuleReplacementPlugin,
  ],
  devServer: {
    hot: true,
    port: 5565,
  },
  devtool: 'inline-source-map',
}

module.exports = merge(baseConfig, devConfig)
