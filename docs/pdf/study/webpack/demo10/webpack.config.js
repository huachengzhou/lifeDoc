const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        "index": "./src/main.js"
    },
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'dist'),
        // publicPath: 'dist/' ,
        assetModuleFilename: 'images/[hash][ext][query]' ,
        // filename: '[name].js',
    },
    module : {
        rules: [
            {
                test: /.css$/,
                use: ["style-loader", "css-loader"] ,
            },
            {
                test: /.less$/,
                use: ["style-loader", "css-loader","less-loader"] ,
            },
            {
                test: /\.(png|jpg|gif)$/,//匹配png/jpg/gif格式图片
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,//图片小于8KB时候将图片转成base64字符串，大于8KB需要使用file-loader
                            name: '[name].[hash:8].[ext]'//img表示文件父目录，[name]表示文件名,[hash:8]表示将hash截取8位[ext]表示后缀
                        }
                    }
                ]
            }
        ]
    } ,
    plugins: [
        new HtmlWebpackPlugin({
            title : "hot module replacement"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot:true
    }
}