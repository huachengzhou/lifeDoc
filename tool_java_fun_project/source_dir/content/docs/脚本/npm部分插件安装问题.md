---
title: "npm部分插件安装问题 "
date: 2021-06-17
draft: false
weight: 10
---



+ less版本过高的解决办法


```node
解决方法：
卸载安装的高版本的less-loader  ，   【npm uninstall less-loader】，
安装指定低版本的less-loader   【npm install less-loader@4.1.0 --save】
```

+ webpack Cannot read property 'tap' of undefined ?

```node
解决：
这个报错是webpack依赖重复引入导致的，由于已经有依赖中引入的webpack，然后有自己引入的webpack。

下面是生产的依赖，将
“webpack”: “^4.0.0-beta.3”,
“webpack-dev-server”: “2.7.1”,
“webpack-manifest-plugin”: “1.2.1”,
删掉，移除node_modules。重新npm install 。再启动项目，就搞定了
```

+ 使用webpack打包报ERROR in TypeError: Cannot read property ‘tap‘ of undefined

```node
降低版本 webpack
假如降为4.44.2  则
npm install webpack@4.44.2 -g   全局
npm install webpack@4.44.2 -D  局部
```

+ less-loader模块  TypeError: this.getOptions is not a function

```node
原因： less-loader安装的版本过高
解决方案： 1.npm uninstall less-loader
2.npm install less-loader@6.0.0
```

+ less-loader模块  Module not found: Error: Can't resolve 'less-loader'报错解决

```node
npm install less less-loader --save-dev
```

+ webpack打包css报错：UnhandledPromiseRejectionWarning: TypeError: this.getResolve is not a function

```node
出错原因：

css-loader 和 style-loader 版本过高

解决办法：在package.json文件中降低 css-loader 和 style-loader 版本
```

+ extract-text-webpack-plugin 打包css报错的解决

```node
降低webpack版本
```

+ 如

+ webpack.config.js

```js
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.css$/,
          //loader: ['style-loader','css-loader']
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000*4,
            name: '[name].[ext]?[hash]'
          }
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("styles.css"),
    ]
};
```


+ package.json

```json
{
  "devDependencies": {
    "css-loader": "^0.28.7",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "file-loader": "^1.1.4",
    "style-loader": "^0.23.1",
    "url-loader": "^0.5.8",
    "webpack": "^4.12.0"
  }
}
```