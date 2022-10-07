
const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require('html-webpack-plugin');
//获取uglifyjs-webpack-plugin对象
// const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin') ;


module.exports = {
    "index" : "./src/index.js" ,
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
            // {
            //     test: /.vue$/,//正则匹配.vue文件
            //     use: {
            //         loader: 'vue-loader'
            //     }
            // },
            // {
            //     test: /\.js$/,
            //     //排除node模块的js和bower的js
            //     exclude: /(node_modules|bower_components)/,
            //     use: {
            //         loader: 'babel-loader'
            //     }
            // },

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
    // resolve: {
    //     // alias:别名
    //     alias: {
    //         //指定vue使用vue.esm.js
    //         'vue$':'vue/dist/vue.esm.js'
    //     }
    // },
    plugins: [
        // new webpack.BannerPlugin('最终解释权归zch所有'),
        // new HtmlWebpackPlugin({
        //     title : "hot module replacement",
        //     template: 'index.html'
        // }),
        // new webpack.HotModuleReplacementPlugin(),
        // new uglifyjsWebpackPlugin(),

        // new webpack.LoaderOptionsPlugin({
        //     options: {
        //         postcss: function () {
        //             return [precss, autoprefixer];
        //         },
        //         devServer: {
        //             contentBase: path.join(__dirname, 'dist'),
        //             compress: true,
        //             port: 9000,
        //             hot:true
        //         }
        //     }
        // })

    ]
};