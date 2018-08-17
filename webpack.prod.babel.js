
import path from 'path';
import glob from 'glob';
import React from 'react';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { renderToStaticMarkup } from 'react-dom/server';
import merge from 'webpack-merge';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import common from './webpack.common.babel.js';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// babel hook
// require('css-modules-require-hook')({
//     generateScopedName: '[name]__[local]___[hash:base64:5]',
// });
// require('babel-core/register')({
//   presets: ['es2015', 'react']
// });
require.extensions['.scss'] = () => {
  return;
};
require.extensions['.css'] = () => {
  return;
};

// find main pages
const pagesPath = `${__dirname}/src/pages`;
const pages = glob.sync(`${pagesPath}/**/index.js`).map((pagePath) => {
  const parsedPagePath = path.parse(pagePath);
  return {
    scriptname: `${path.relative(pagesPath, parsedPagePath.dir)}`,
    pathname: `/${path.relative(pagesPath, parsedPagePath.dir)}`,
    component: require(pagePath).default,
  };
});

const generatedPages = pages.map(page => {
      const pageMarkup = `${renderToStaticMarkup(<page.component />)}`;
      return new HtmlWebpackPlugin({
        filename: page.pathname === '/' ? `index.html` : `.${page.pathname}/index.html`,
        inject: false,
        template: require('html-webpack-template'),
        appMountId: 'app',
        //baseHref: 'http://example.com/awesome',
        //devServer: 'http://localhost:3001',
        // googleAnalytics: {
        //   trackingId: 'UA-XXXX-XX',
        //   pageViewOnLoad: true
        // },
        appMountHtmlSnippet: pageMarkup,
        meta: [
          {
            name: 'description',
            content: 'A better default template for html-webpack-plugin.'
          }
        ],
        mobile: true,
        lang: 'en-US',
        links: [
          'https://fonts.googleapis.com/css?family=Roboto',
          {
            href: '/apple-touch-icon.png',
            rel: 'apple-touch-icon',
            sizes: '180x180'
          },
          {
            href: '/favicon-32x32.png',
            rel: 'icon',
            sizes: '32x32',
            type: 'image/png'
          }
        ],
        //inlineManifestWebpackName: 'webpackManifest',
        //scripts: [
          // 'http://example.com/somescript.js',
          // {
          //   src: '/myModule.js',
          //   type: 'module'
          // }
        //],
        title: 'My App',
        window: {
          env: {
            apiHost: 'http://myapi.com/api/v1'
          }
        },
        chunks: [page.pathname === '/' ? `app` : `${page.scriptname}`, 'common', 'vendors', 'runtime'],
      })
    });

const cssProdLoader = {
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    //'css-loader',
    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
    'postcss-loader'
  ],
} 

common.module.rules.push(cssProdLoader);

module.exports = merge(common, {
  mode: 'production',
  entry: {
    app: ['./pages/index.js'],
    blog: ['./pages/blog/index.js'],
  },
  devtool: 'source-map',
  node: {
    fs: 'empty'
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/styles/[name].[hash].css',
      chunkFilename: 'assets/styles/[id].[hash].css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    ...generatedPages
  ]
});
