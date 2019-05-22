// import dependencies
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// assemble webpack config
module.exports = (env, argv) => {
  const isDevMode = argv.mode === 'development';
  const config = {};

  // DEV mode Webpack config
  if (isDevMode) {
    config.devtool = 'source-map';
    config.devServer = {
      contentBase: path.join(__dirname, '_dist/'),
      compress: true,
      port: 9002,
      stats: 'errors-only',
      hot: true,
    };
  }

  // PROD mode Webpack config
  if (!isDevMode) {
    // tree shaking
    config.optimization = {
      usedExports: true,
    };
  }

  // COMMON webpack configuration
  // entry
  config.mode = argv.mode;
  config.entry = { app: './_src/js/app.js' };

  // output
  config.output = {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, '_dist'),
  };

  // loaders
  config.module = {
    rules: [
      // scss
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: path.resolve(__dirname, '_dist/'),
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              url: true,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              outputStyle: 'expanded',
            },
          },
        ],
      },

      // JS
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },

      //  html
      // {
      //   test: /\.(html)$/,
      //   include: path.resolve(__dirname, '_src/'),
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]',
      //       outputPath: '/',
      //     },
      //   },
      // },

      // pug
      {
        test: /\.pug$/,
        include: path.resolve(__dirname, '_src/'),
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'link:href'],
            },
          },
          'pug-html-loader',
        ],
      },

      // images
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        // include: path.resolve(__dirname, '_src/'),
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
          },
        },
      },

      // fonts
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        // include: path.resolve(__dirname, '_src/'),
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        },
      },
    ],
  };

  // plugins
  config.plugins = [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new ManifestPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['_dist'], { root: path.resolve(__dirname, ''), verbose: true }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '_src/fonts'),
        to: path.resolve(__dirname, '_dist/fonts'),
      },
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new ImageminPlugin({
      optipng: { optimizationLevel: 7 },
      gifsicle: { optimizationLevel: 3 },
      pngquant: { quality: '65-90', speed: 4 },
      svgo: { removeUnknownsAndDefaults: false, cleanupIDs: false },
      plugins: [imageminMozjpeg({ quality: 75 })],
      // disable: (config.enabled.watcher), // Disable during development
    }),
    new HtmlWebpackPlugin({
      template: './_src/templates/index.pug',
      filename: 'index.html',
      hash: true,
      svgoConfig: {
        // inline-svg-plugin
        removeTitle: false,
        removeViewBox: true,
      },
    }),
    new HtmlWebpackInlineSVGPlugin(),
  ];

  let consoleMessage = '';
  consoleMessage += '\x1b[1;37;42m\n'; // ESC[bold;textcolor;bgcolor m=close devhints.io/ansi
  consoleMessage += '     * * * * * * * * * * *\n';
  consoleMessage += `   * * RUNNING: ${process.env.npm_lifecycle_event} * *\n`;
  consoleMessage += '   * * ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ * *\n';
  consoleMessage += ' * * watch > dev mode from disk * *\n';
  consoleMessage += ' * * build:dev > dev mode from disk * *\n';
  consoleMessage += ' * * build:prod > prod mode from disk * *\n';
  consoleMessage += ' * * start > dev mode from memory * *\n';
  consoleMessage += '   * * * * * * * * * * * * * * * *';
  consoleMessage += '\x1b[0m';
  console.log(consoleMessage);

  return config;
};
