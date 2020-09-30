const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');


base_config = {
  mode: 'development', // For debugging
  entry: './src/index.tsx',
  devtool: 'inline-source-map', // For debugging
  module: {
    rules: [
      {
        enforce: 'pre',
        loader: 'tslint-loader',
        test: /\.tsx?$/,
        exclude: [
          /node_modules/,
        ],
        options: {
          emitErrors: true
        }
      },
      {
        loader: 'ts-loader',
        test: /\.tsx?$/,
        exclude: [
          /node_modules/,
        ],
        options: {
          configFile: 'tsconfig.json'
        }
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          }
        ]
      },
      {
        test: /\.less?$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "@node": path.resolve(__dirname, "node_modules"),
      "@components": path.resolve(__dirname, "src"),
      "@bundle": path.resolve(__dirname, "dist"),
    }
  },
  output: {
    filename: 'static/js/bundle.js',
    path: path.resolve(__dirname, 'bundle')
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    })
  ],
  serve: {
      content: path.resolve(__dirname, 'bundle'),
      reload: true,
      port: 5000,
  }
}


module.exports = [
  base_config,
];