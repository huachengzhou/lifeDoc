---
title: "webpack 其他 loader "
date: 2021-06-17
draft: false
weight: 13
---

#### url-loader file-loader

+ package.json

```json
{
  "name": "demo10",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "dev": "webpack-dev-server"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^3.0.0",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.3.2",
    "less": "^4.1.1",
    "less-loader": "^10.0.1",
    "style-loader": "^3.1.0",
    "url-loader": "^2.2.0",
    "webpack": "^5.45.1",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.2"
  }
}
```

+ webpack.config.js

```js
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
```

+ 目录

```dos
▸\demo10
▸  \demo10\dist
▸    \demo10\dist\beautifulGirl.ee61b496.jpg
▸    \demo10\dist\big.95b47a61.jpg
▸    \demo10\dist\index.html
▸    \demo10\dist\index.js
▸    \demo10\dist\small.af5d0583.jpg

▸  \demo10\package.json
▸  \demo10\src
▸    \demo10\src\css
▸      \demo10\src\css\normal.css
▸      \demo10\src\css\special.less
▸    \demo10\src\img
▸      \demo10\src\img\beautifulGirl.jpg
▸      \demo10\src\img\big.jpg
▸      \demo10\src\img\small.jpg
▸    \demo10\src\js
▸      \demo10\src\js\utils.js
▸    \demo10\src\main.js
▸  \demo10\webpack.config.js
```

+ 命令

```dos

D:\IdeaProjects\cycle\study\webpack\demo10>npm init -y
Wrote to D:\IdeaProjects\cycle\study\webpack\demo10\package.json:

{
  "name": "demo10",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}



D:\IdeaProjects\cycle\study\webpack\demo10>npm add -D webpack webpack-cli@3.3.12
npm WARN deprecated resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
npm WARN deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN webpack-cli@3.3.12 requires a peer of webpack@4.x.x but none is installed. You must install peer dependencies yourself.
npm WARN demo10@1.0.0 No description
npm WARN demo10@1.0.0 No repository field.

+ webpack@5.45.1
+ webpack-cli@3.3.12
added 259 packages from 205 contributors in 10.071s

11 packages are looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo10>npm add -D webpack webpack-cli
npm WARN deprecated resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
npm WARN deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
npm WARN webpack-cli@3.3.12 requires a peer of webpack@4.x.x but none is installed. You must install peer dependencies yourself.
npm WARN demo10@1.0.0 No description
npm WARN demo10@1.0.0 No repository field.

+ webpack-cli@3.3.12
+ webpack@5.45.1
updated 2 packages in 6.122s

1 package is looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo10>npm add -D css-loader style-loader less-loader
npm WARN webpack-cli@3.3.12 requires a peer of webpack@4.x.x but none is installed. You must install peer dependencies yourself.
npm WARN less-loader@10.0.1 requires a peer of less@^3.5.0 || ^4.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN demo10@1.0.0 No description
npm WARN demo10@1.0.0 No repository field.

+ less-loader@10.0.1
+ css-loader@6.1.0
+ style-loader@3.1.0
added 18 packages from 49 contributors in 2.728s

15 packages are looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo10>npm add -D file-loader
npm WARN less-loader@10.0.1 requires a peer of less@^3.5.0 || ^4.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN webpack-cli@3.3.12 requires a peer of webpack@4.x.x but none is installed. You must install peer dependencies yourself.
npm WARN demo10@1.0.0 No description
npm WARN demo10@1.0.0 No repository field.

+ file-loader@6.2.0
added 3 packages from 5 contributors in 2.354s

16 packages are looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo10>npm add -D html-webpack-plugin
npm WARN less-loader@10.0.1 requires a peer of less@^3.5.0 || ^4.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN webpack-cli@3.3.12 requires a peer of webpack@4.x.x but none is installed. You must install peer dependencies yourself.
npm WARN demo10@1.0.0 No description
npm WARN demo10@1.0.0 No repository field.

+ html-webpack-plugin@5.3.2
added 33 packages from 19 contributors in 3.392s

26 packages are looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo10>npm add -D webpack-dev-server
npm WARN deprecated chokidar@2.1.8: Chokidar 2 will break on node v14+. Upgrade to chokidar 3 with 15x less dependencies.
npm WARN deprecated fsevents@1.2.13: fsevents 1 will break on node v14+ and could be using insecure binaries. Upgrade to fsevents 2.
npm WARN deprecated querystring@0.2.0: The
npm WARN less-loader@10.0.1 requires a peer of less@^3.5.0 || ^4.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN webpack-cli@3.3.12 requires a peer of webpack@4.x.x but none is installed. You must install peer dependencies yourself.
npm WARN demo10@1.0.0 No description
npm WARN demo10@1.0.0 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

+ webpack-dev-server@3.11.2
added 204 packages from 137 contributors in 13.658s

38 packages are looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo10>npm i --save-dev
npm WARN less-loader@10.0.1 requires a peer of less@^3.5.0 || ^4.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN webpack-cli@3.3.12 requires a peer of webpack@4.x.x but none is installed. You must install peer dependencies yourself.
npm WARN demo10@1.0.0 No description
npm WARN demo10@1.0.0 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

up to date in 1.955s

38 packages are looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo10>npm add -D url-loader@2.2.0
npm WARN less-loader@10.0.1 requires a peer of less@^3.5.0 || ^4.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN webpack-cli@3.3.12 requires a peer of webpack@4.x.x but none is installed. You must install peer dependencies yourself.
npm WARN url-loader@2.2.0 requires a peer of webpack@^4.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN demo10@1.0.0 No description
npm WARN demo10@1.0.0 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

+ url-loader@2.2.0
added 3 packages from 3 contributors in 2.921s

39 packages are looking for funding
  run `npm fund` for details



D:\IdeaProjects\cycle\study\webpack\demo10>npm add -D less
npm WARN url-loader@2.2.0 requires a peer of webpack@^4.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN webpack-cli@3.3.12 requires a peer of webpack@4.x.x but none is installed. You must install peer dependencies yourself.
npm WARN demo10@1.0.0 No description
npm WARN demo10@1.0.0 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

+ less@4.1.1
added 11 packages from 13 contributors in 3.771s

39 packages are looking for funding
  run `npm fund` for details
//
D:\IdeaProjects\cycle\study\webpack\demo10>npm add -D css-loader@3.0.0
npm WARN url-loader@2.2.0 requires a peer of webpack@^4.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN webpack-cli@3.3.12 requires a peer of webpack@4.x.x but none is installed. You must install peer dependencies yourself.
npm WARN css-loader@3.0.0 requires a peer of webpack@^4.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN demo10@1.0.0 No description
npm WARN demo10@1.0.0 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

+ css-loader@3.0.0
added 13 packages from 10 contributors and removed 35 packages in 3.166s

38 packages are looking for funding
  run `npm fund` for details
  
D:\IdeaProjects\cycle\study\webpack\demo10>npm run build

> demo10@1.0.0 build D:\IdeaProjects\cycle\study\webpack\demo10
> webpack

assets by status 160 KiB [cached] 2 assets
assets by path . 82.9 KiB
  asset index.js 82.7 KiB [emitted] (name: index)
  asset index.html 243 bytes [compared for emit]
runtime modules 26.6 KiB 12 modules
cacheable modules 20.8 KiB
  modules by path ./src/ 12.6 KiB
    modules by path ./src/css/ 5.44 KiB
      modules by path ./src/css/*.css 2.85 KiB 2 modules
      modules by path ./src/css/*.less 2.59 KiB 2 modules
    modules by path ./src/img/*.jpg 6.43 KiB 3 modules
    ./src/main.js 517 bytes [built] [code generated]
    ./src/js/utils.js 257 bytes [built] [code generated]
  modules by path ./node_modules/ 8.13 KiB
    modules by path ./node_modules/style-loader/dist/runtime/*.js 5.02 KiB 6 modules
    modules by path ./node_modules/css-loader/dist/runtime/*.js 3.11 KiB
      ./node_modules/css-loader/dist/runtime/api.js 2.61 KiB [built] [code generated]
      ./node_modules/css-loader/dist/runtime/getUrl.js 511 bytes [built] [code generated]
webpack 5.45.1 compiled successfully in 437 ms
```

+ 重要文件内容

```
css/normal.css

body{
  /* background-color: red; */
   background: url("../img/small.jpg");
  /*background: url("../img/big.jpg");*/
}

body {background-image:url(../img/big.jpg);}

css/special.less

@fontSize:50px;//定义变量字体大小
@fontColor:orange;//定义变量字体颜色
body{
  font-size: @fontSize;
  color: @fontColor;
}

js/utils.js

export default function randomString(e) {
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n;
}

main.js

import img from './img/beautifulGirl.jpg';
import utils from './js/utils';

//依赖css文件
require('./css/normal.css');

//依赖less文件
require('./css/special.less');



// console.log("---" + utils.randomString(22) + "----");

const  el = document.createElement("div") ;

// el.innerText =  utils.randomString(20) ;
el.innerText =  "sdhsdhhds" ;

document.body.append(el)   ;

const  elimg = document.createElement("img") ;
document.body.append(elimg)   ;
elimg.setAttribute("src",img) ;


img/beautifulGirl.jpg big.jpg small.jpg
```