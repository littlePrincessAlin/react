// 配置公共配置
const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const postcssNormalize = require('postcss-normalize');

module.exports = function (webpackEnv) {
  console.log('当前环境', webpackEnv);
  console.log('paths.pages', paths.pages);
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  const cssRegex = /\.css$/;
  const cssModuleRegex = /\.module\.css$/i;
  const sassRegex = /\.(scss|sass)$/;
  const sassModuleRegex = /\.module\.(scss|sass)$/i;
  // Source maps are resource heavy and can cause out of memory issue for large source files.
  const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      // 开发模式最后一步是style-loader
      isEnvDevelopment && require.resolve('style-loader'),
      // 正式模式最后一步是MiniCssExtractPlugin.loader, 打成单独的css
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: {
          filename: 'css/[name].[contenthash:8].css', // 输出的文件名字
          chunkFilename: 'css/[name].[contenthash:8].chunk.css',
        },
        // options: paths.publicUrlOrPath.startsWith('.')
        //   ? { publicPath: '../' }
        //   : {},
      },
      {
        loader: require.resolve('css-loader'),
        options: {
          ...cssOptions,
          modules: {
            auto: true, // 自动启用 CSS 模块或者 ICSS
            localIdentName: '[path][name]__[local]--[hash:base64:5]', // 允许配置生成的本地标识符，css后缀
            getLocalIdent: getCSSModuleLocalIdent,
            // sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment, // 6.x版本没有它取决于 compiler.devtool 值
          },
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              require('postcss-preset-env')({
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              }),
              postcssNormalize(),
            ],
            sourceMap: isEnvDevelopment,
          },
        },
      },
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push(
        // {
        //   loader: require.resolve('resolve-url-loader'),
        //   options: {
        //     sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
        //     root: paths.appSrc,
        //   },
        // },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
          },
        },
      );
    }
    return loaders;
  };
  return {
    mode: webpackEnv,
    entry: paths.appIndexJsx,
    output: {
      path: paths.appBuild,
      filename: 'js/[name].[chunkhash].bundle.js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.tsx', '.ts'], // 省略扩展
      alias: {
        // 省略地址前缀写法components即可
        components: paths.components,
        pages: paths.pages,
        utils: paths.utils,
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          // MiniCssExtractPlugin.loader,// loader取代style.loader,作用，提取js中的css文件
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.less$/,
          sideEffects: true,
          use: [
            isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发模式打到html head中，线上单独打包
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true, // 禁止js执行
                },
              },
            },
          ],
        },
        // webpack5: 不用搞file-loader url-loader 用type定义
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024, // 小于 8kb 的文件，将会视为 inline 模块类型，否则会被视为 resource 模块类型。
            },
          },
          generator: {
            filename: 'images/[base]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[base]',
          },
        },
        {
          test: /\.(js|mjs|jsx|tsx)$/,
          include: paths.appSrc,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                rootMode: 'root',
              },
            },
          ],
        },
        // "postcss" loader applies autoprefixer to our CSS.
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader turns CSS into JS modules that inject <style> tags.
        // In production, we use MiniCSSExtractPlugin to extract that CSS
        // to a file, but in development "style" loader enables hot editing
        // of CSS.
        // By default we support CSS Modules with the extension .module.css
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: getStyleLoaders({
            importLoaders: 1,
          }),
          // Don't consider CSS imports dead code even if the
          // containing package claims to have no side effects.
          // Remove this when webpack adds a warning or an error for this.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true, // 将文件标记为无副作用, true就是有副作用
        },
        // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
        // using the extension .module.css
        {
          test: cssModuleRegex,
          use: getStyleLoaders({
            importLoaders: 1,
          }),
        },
        // Opt-in support for SASS (using .scss or .sass extensions).
        // By default we support SASS Modules with the
        // extensions .module.scss or .module.sass
        {
          test: sassRegex,
          exclude: sassModuleRegex,
          use: getStyleLoaders(
            {
              importLoaders: 3,
            },
            'sass-loader',
          ),
          // Don't consider CSS imports dead code even if the
          // containing package claims to have no side effects.
          // Remove this when webpack adds a warning or an error for this.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true,
        },
        // Adds support for CSS Modules, but using SASS
        // using the extension .module.scss or .module.sass
        {
          test: sassModuleRegex,
          use: getStyleLoaders(
            {
              importLoaders: 3,
            },
            'sass-loader',
          ),
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css', // 输出的文件名字
        chunkFilename: 'css/[name].[contenthash:8].chunk.css',
      }), // 抽离css
      // 如果不想在 watch 触发增量构建后删除 index.html 文件
      // ，可以在 CleanWebpackPlugin 中配置 cleanStaleWebpackAssets 选项 来实现
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: paths.appHtml,
        hash: false, // 防止缓存，在引入的文件后面加hash (PWA就是要缓存，这里设置为false)
        inject: 'body', // 是否将js放在body的末尾
      }),
    ],
  };
};
