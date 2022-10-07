const HtmlWebPackPlugin = require("html-webpack-plugin");

const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/index.js"
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback :"style-loader",
                    use : "css-loader"
                })
            },
            {
                test: /.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback : "style-loader" ,
                    use : ["css-loader", "less-loader"]
                })
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin(
            {
                /*你帮我应用这个模板*/
                template: "./src/indexTemplate.html"
            }
        ),
        new ExtractTextWebpackPlugin("styles.css")
    ]
}