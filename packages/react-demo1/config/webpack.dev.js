process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
const commonConfig = require('./webpack.config');
const config = commonConfig(process.env.NODE_ENV);
const paths = require('./paths');
const { merge } = require('webpack-merge');

module.exports = merge(config, {
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: paths.appBuild, // 从build里提供bundle
    },
    host: 'localhost',
    port: '8001',
    historyApiFallback: true,
    hot: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://192.168.124.21:3000/',
        changeOrigin: true,
      },
    ],
  },
});
