import path from 'path';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import common from './webpack.common.babel.js';

const cssDevLoader = {
  test: /\.(sa|sc|c)ss$/,
  use: [
    'style-loader',
    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
    'postcss-loader'
  ],
} 

common.module.rules.push(cssDevLoader);

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    // stats: 'errors-only',
    port: 3000,
    proxy: {
      '/data': 'http://localhost:9000',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      chunks: ['app', 'common', 'vendors', 'runtime'],
    }),
  ]
});