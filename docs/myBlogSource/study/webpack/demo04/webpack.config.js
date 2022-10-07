const path = require('path');
const htmlLoad = require('html-loader');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle2.js'
    },
    plugins: [
        new HtmlWebpackPlugin({}),
    ],
    mode: 'development' // 设置mode
}