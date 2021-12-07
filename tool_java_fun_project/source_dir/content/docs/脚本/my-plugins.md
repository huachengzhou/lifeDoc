---
title: "webpack 应用自己插件 "
date: 2021-06-17
draft: false
weight: 11
---

+ webpack.config.js

```js
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
```


+ package.json

```json
{
  "name": "demo08",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build" : "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.44.0",
    "webpack-cli": "^4.7.2"
  }
}
```

+ src console_log_on_build_webpack_plugin.js index.js

```js

// console_log_on_build_webpack_plugin.js
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.run.tap(pluginName, compilation => {
            console.log("webpack 构建过程开始！");
        });
    }
}
module.exports = ConsoleLogOnBuildWebpackPlugin;


//index.js
console.log("print "+ Math.random()) ;
```


+ 命令

```shell
D:\IdeaProjects\cycle\study\webpack\demo08>npm add -D webpack webpack-cli
npm WARN demo08@1.0.0 No description
npm WARN demo08@1.0.0 No repository field.

+ webpack-cli@4.7.2
+ webpack@5.45.1
added 121 packages from 155 contributors in 6.969s

16 packages are looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo08>npm run build

> demo08@1.0.0 build D:\IdeaProjects\cycle\study\webpack\demo08
> webpack

webpack 构建过程开始！
asset index.js 1.22 KiB [emitted] (name: index)
./src/index.js 38 bytes [built] [code generated]
webpack 5.45.1 compiled successfully in 75 ms

D:\IdeaProjects\cycle\study\webpack\demo08>node dist/index.js
print 0.9374784084603167

D:\IdeaProjects\cycle\study\webpack\demo08>

```