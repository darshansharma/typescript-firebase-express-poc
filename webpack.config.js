const path = require('path')
// const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
// const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: 'development',
    entry: './src/client/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist',
    },
    // target: 'node',
    // node: {
    //     __dirname: false,
    //     __filename: false,
    //   },
    // externals: [nodeExternals()],
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
              },
              {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
              },
              { 
                test: /\.html$/,
                use: [{loader: "html-loader"}]
              },
              {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
              }
        ]
    },
    resolve: {
          extensions: [".ts", ".js"]
    },
    devServer: {
      contentBase: './src/',
      watchContentBase: true,
      hot: true
    }
}