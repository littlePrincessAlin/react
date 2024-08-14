process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
const commonConfig = require('./webpack.config');
const config = commonConfig(process.env.NODE_ENV);
const paths = require('./paths');

module.exports = merge(config, {
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: paths.appBuild,
    },
    contentBase: '',
    host: 'dev.lilin.com',
    port: '8001',
    inline: true,
    historyApiFallback: true,
    hot: true,
    proxy: {},
  },
});
