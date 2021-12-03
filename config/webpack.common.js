const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/index.tsx'),
  },
  // 指定target为 web
  target: 'web',
  module: {
    rules: [
      // 解析图片 ，字体
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/[hash][ext][query]',
        },
        // 只解析src目录
        include: path.resolve(__dirname, '../src'),
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Build',
      template: 'public/index.html',
    }),
  ],
};
