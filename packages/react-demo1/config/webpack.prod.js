process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config');
const webpackbar = require('webpackbar');
const paths = require('./paths');

const config = commonConfig(process.env.NODE_ENV);

module.exports = merge(config, {
  mode: config.mode,
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    path: paths.appBuild,
    // publicPath: paths.publicUrlOrPath,
  },
  stats: {
    children: false, // 不输出子模块的打包信息
  },
  plugins: [
    new webpackbar(), // 打包时美化进度条
  ],
});
