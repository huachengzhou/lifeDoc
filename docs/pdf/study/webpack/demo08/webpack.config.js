const ConsoleLogOnBuildWebpackPlugin = require("./src/console_log_on_build_webpack_plugin.js");

module.exports = {
    entry: {
        index: "./src/index.js"
    },
    mode: 'development',
    plugins: [
        new ConsoleLogOnBuildWebpackPlugin()
    ]
};


