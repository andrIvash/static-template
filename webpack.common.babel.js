
import CleanWebpackPlugin from 'clean-webpack-plugin';
import webpack from 'webpack';
import path from 'path';


const devMode = process.env.NODE_ENV !== 'production';
console.log('devMode', devMode);

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: ['./app.js'],
  },
  output: {
    filename: 'assets/scripts/[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        // styles: {
        //   name: 'styles',
        //   test: /\.s?css$/,
        //   chunks: 'all',
        //   minChunks: 1,
        //   reuseExistingChunk: true,
        //   enforce: true,
        // },
      }
    }
  },
  resolve: {
    extensions: ['jsx', '.js', '.json'],
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader'],
      },
      {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: '../../',
                name: 'assets/images/[name].[ext]',
              }
            }
          ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ],
  },
};
