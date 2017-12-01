const path = require('path');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const entrySetting = require('./entry');
// console.log('process', __filename, '\n', __dirname, process.cwd(),
// path.resolve(process.cwd(), 'public')
// , path.resolve(process.cwd(), 'src'));
// path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。
// process.cwd() 表示當前的工作路徑
// path.join() 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。
module.exports = {
  entry: entrySetting,
  output: {
    path: path.join(__dirname, '../public'),
    filename: './js/[name].js',
    publicPath: '/public',
  },
  // watch: true,
  devServer: {
    contentBase: path.join(process.cwd(), '/public'),
    compress: true,
    port: 4000,
  },
  context: path.resolve(process.cwd(), 'src'),
  // context 是 webpack 编译时的基础目录，入口起点（entry）会相对于此目录查找。
  resolve: {
    extensions: ['.js', 'json'],
    alias: {
      JQ: path.resolve(__dirname, 'js/libs/jquery.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_moudles/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: extractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader', { loader: 'postcss-loader' }, {
              loader: 'less-loader',
            },
          ],
        }),
      },
      {
        test: /\.css$/,
        use: extractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
          }, {
            loader: 'postcss-loader',
          }],
        }),
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|svg|)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[sha512:hash:base64:7].[ext]',
              // hashes: '[sha512:hash:base64:7]',
              outputPath: '/images/',
            },
          }],
      },
    ],
  },
  plugins: [
    new extractTextWebpackPlugin('css/[name].css'),
  ],
};
