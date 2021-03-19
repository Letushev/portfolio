const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.html/i,
        loader: 'html-loader',
        options: {
          sources: {
            list: [
              '...',
              {
                tag: 'img',
                attribute: 'data-src',
                type: 'src',
              }
            ]
          }
        }
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.s?css$/i,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    { browsers: 'last 2 versions' }
                  ]
                ]
              }
            }
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif|pdf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'files/[hash][ext][query]'
        }
      },
    ],
  },
  plugins: [
    new HTMLPlugin({ template: './src/index.html' }),
    new MiniCSSExtractPlugin({ filename: '[name].[contenthash].css' }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, 'src', 'sitemap.xml') 
        },
        { 
          from: path.resolve(__dirname, 'src', 'files'),
          to: 'files/'
        }
      ]
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      '...',
      new CSSMinimizerPlugin()
    ]
  },
  devServer: { contentBase: './dist' },
};
