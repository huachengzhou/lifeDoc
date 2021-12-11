const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: {
        index: "./src/index.js"
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /.css$/,
                use: ["style-loader", "css-loader"]
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
    ]
}