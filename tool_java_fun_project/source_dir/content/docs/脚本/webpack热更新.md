---
title: "webpack 热更新 "
date: 2021-06-17
draft: false
weight: 12
---



+ package.json

```json
{
  "name": "demo09",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "dev": "webpack-dev-server"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "html-webpack-plugin": "^5.3.2",
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
        "index": "./src/index.js"
    },
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'dist')
    },
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

+ src/index.js

```js
function randomString(e) {
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n;
}
console.log("---" + randomString(22) + "----");
const  el = document.createElement("div") ;
el.innerText =  randomString(20) ;
document.body.append(el)   ;
```

+ 命令

```shell
D:\IdeaProjects\cycle\study\webpack\demo09>npm init -y
Wrote to D:\IdeaProjects\cycle\study\webpack\demo09\package.json:

{
  "name": "demo09",
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



D:\IdeaProjects\cycle\study\webpack\demo09>npm install --save-dev html-webpack-plugin
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN html-webpack-plugin@5.3.2 requires a peer of webpack@^5.20.0 but none is installed. You must install peer dependencies yourself.
npm WARN demo09@1.0.0 No description
npm WARN demo09@1.0.0 No repository field.

+ html-webpack-plugin@5.3.2
added 37 packages from 56 contributors in 4.007s

10 packages are looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo09>npm add -D webpack webpack-cli
npm WARN demo09@1.0.0 No description
npm WARN demo09@1.0.0 No repository field.

+ webpack@5.45.1
+ webpack-cli@4.7.2
added 117 packages from 155 contributors in 8.096s

26 packages are looking for funding
  run `npm fund` for details




D:\IdeaProjects\cycle\study\webpack\demo09>npm add -D webpack-dev-server
npm WARN deprecated chokidar@2.1.8: Chokidar 2 will break on node v14+. Upgrade to chokidar 3 with 15x less dependencies.
npm WARN deprecated fsevents@1.2.13: fsevents 1 will break on node v14+ and could be using insecure binaries. Upgrade to fsevents 2.
npm WARN deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
npm WARN deprecated resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
npm WARN deprecated querystring@0.2.0: The
npm WARN demo09@1.0.0 No description
npm WARN demo09@1.0.0 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

+ webpack-dev-server@3.11.2
added 366 packages from 222 contributors in 22.282s

38 packages are looking for funding
  run `npm fund` for details
  
D:\IdeaProjects\cycle\study\webpack\demo09>npm i --save-dev
npm WARN demo09@1.0.0 No description
npm WARN demo09@1.0.0 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

up to date in 1.964s

38 packages are looking for funding
  run `npm fund` for details

D:\IdeaProjects\cycle\study\webpack\demo09>webpack
asset index.js 40.2 KiB [emitted] (name: index)
asset index.html 243 bytes [emitted]
runtime modules 25.8 KiB 9 modules
./src/index.js 412 bytes [built] [code generated]
webpack 5.45.1 compiled successfully in 136 ms

D:\IdeaProjects\cycle\study\webpack\demo09>
```

> 到目前为止未出现任何问题

+ 执行运行开发服务器命令

```shell
D:\IdeaProjects\cycle\study\webpack\demo09>npm run dev

> demo09@1.0.0 dev D:\IdeaProjects\cycle\study\webpack\demo09
> webpack-dev-server

internal/modules/cjs/loader.js:905
  throw err;
  ^

Error: Cannot find module 'webpack-cli/bin/config-yargs'
Require stack:
- D:\IdeaProjects\cycle\study\webpack\demo09\node_modules\webpack-dev-server\bin\webpack-dev-server.js
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:902:15)
    at Function.Module._load (internal/modules/cjs/loader.js:746:27)
    at Module.require (internal/modules/cjs/loader.js:974:19)
    at require (internal/modules/cjs/helpers.js:92:18)
    at Object.<anonymous> (D:\IdeaProjects\cycle\study\webpack\demo09\node_modules\webpack-dev-server\bin\webpack-dev-server.js:65:1)
    at Module._compile (internal/modules/cjs/loader.js:1085:14)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
    at Module.load (internal/modules/cjs/loader.js:950:32)
    at Function.Module._load (internal/modules/cjs/loader.js:790:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:76:12) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    'D:\\IdeaProjects\\cycle\\study\\webpack\\demo09\\node_modules\\webpack-dev-server\\bin\\webpack-dev-server.js'
  ]
}
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! demo09@1.0.0 dev: `webpack-dev-server`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the demo09@1.0.0 dev script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\dell\AppData\Roaming\npm-cache\_logs\2021-07-18T08_20_36_958Z-debug.log
```

+ [找到解决办法就是降低webpack-cli版本](https://www.cnblogs.com/jeacy/p/13864454.html)

+ 接下来的命令

```shell
D:\IdeaProjects\cycle\study\webpack\demo09>npm uninstall webpack-cli
npm WARN demo09@1.0.0 No description
npm WARN demo09@1.0.0 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

removed 40 packages in 2.099s

33 packages are looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo09>npm install webpack-cli@3 -D
npm WARN webpack-cli@3.3.12 requires a peer of webpack@4.x.x but none is installed. You must install peer dependencies yourself.
npm WARN demo09@1.0.0 No description
npm WARN demo09@1.0.0 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

+ webpack-cli@3.3.12
added 42 packages from 27 contributors in 5.207s

33 packages are looking for funding
  run `npm fund` for details

```

+ 运行

```shell
D:\IdeaProjects\cycle\study\webpack\demo09>npm run dev

> demo09@1.0.0 dev D:\IdeaProjects\cycle\study\webpack\demo09
> webpack-dev-server

i ｢wds｣: Project is running at http://localhost:9000/
i ｢wds｣: webpack output is served from /
i ｢wds｣: Content not from webpack is served from D:\IdeaProjects\cycle\study\webpack\demo09\dist
i ｢wdm｣: asset index.js 407 KiB [emitted] (name: index)
asset index.html 243 bytes [emitted]
runtime modules 25.9 KiB 10 modules
cacheable modules 339 KiB
  modules by path ./node_modules/webpack-dev-server/client/ 20.9 KiB 10 modules
  modules by path ./node_modules/html-entities/lib/*.js 61 KiB 5 modules
  modules by path ./node_modules/webpack/hot/*.js 4.3 KiB 4 modules
  modules by path ./node_modules/url/ 37.4 KiB
    ./node_modules/url/url.js 22.8 KiB [built] [code generated]
    ./node_modules/url/node_modules/punycode/punycode.js 14.3 KiB [built] [code generated]
    ./node_modules/url/util.js 314 bytes [built] [code generated]
  modules by path ./node_modules/querystring/*.js 4.51 KiB
    ./node_modules/querystring/index.js 127 bytes [built] [code generated]
    ./node_modules/querystring/decode.js 2.34 KiB [built] [code generated]
    ./node_modules/querystring/encode.js 2.04 KiB [built] [code generated]
./node_modules/webpack/hot/ sync nonrecursive ^\.\/log$ 170 bytes [built] [code generated]
webpack 5.45.1 compiled successfully in 424 ms
i ｢wdm｣: Compiled successfully.

```


+ [链接http://localhost:9000/得到结果](http://localhost:9000/)

+ 结束 webpack-dev-server

```shell
ctrl + c
终止批处理操作吗(Y/N)? Y

D:\IdeaProjects\cycle\study\webpack\demo09>

```