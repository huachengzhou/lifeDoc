---
title: "webpack simple"
date: 2021-06-17
draft: false
weight: 6
---

## webpack

### 一:卸载

+ 全局卸载

```shell
D:\IdeaProjects\cycle\docs\webc\web\webpack-study\one>npm uninstall webpack webpack-cli -g
removed 73 packages in 0.726s
```

+ 本地卸载

```shell
D:\IdeaProjects\cycle\docs\webc\web\webpack-study\one>npm uninstall webpack webpack-cli -D
npm WARN saveError ENOENT: no such file or directory, open 'D:\IdeaProjects\package.json'
npm WARN enoent ENOENT: no such file or directory, open 'D:\IdeaProjects\package.json'
npm WARN IdeaProjects No description
npm WARN IdeaProjects No repository field.
npm WARN IdeaProjects No README data
npm WARN IdeaProjects No license field.

up to date in 0.791s

16 packages are looking for funding
  run `npm fund` for details
D:\IdeaProjects\cycle\docs\webc\web\webpack-study\one>
```


### 二:安装

+ 1:webpack依赖node环境。
+ 2:node环境依赖众多包，所以需要npm，npm（node packages manager）node包管理工具
+ 3:nvm是node管理工具可以自由切换node环境版本

> 在终端执行webpack命令，使用的是全局安装(在某个地方看到)

+ 1: 全局安装webpack simple (低版本)


```shell
npm install webpack -g
//指定版本安装
npm install webpack@3.6.0 -g
```

+ 2: 全局安装webpack  (高版本)

```shell
npm install webpack webpack-cli -g
//或指定版本，类似这样：
npm install webpack@4.16.5  webpack-cli -g
```

+ 3:本地安装 ?
```shell
npm install webpack webpack-cli --save-dev
//或者
npm install webpack webpack-cli -D
//或者指定版本
npm install webpack@4.16.5 webpack-cli -D
```

### 三:使用

+ 1:简单使用

+ 1、初始化

```shell
D:\IdeaProjects\cycle\docs\webc\web\webpack-study\one>npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.
See `npm help init` for definitive documentation on these fields
and exactly what they do.
Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.
Press ^C at any time to quit.
package name: (one)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to D:\IdeaProjects\cycle\docs\webc\web\webpack-study\one\package.json:
{
  "name": "one",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
Is this OK? (yes) yes
D:\IdeaProjects\cycle\docs\webc\web\webpack-study\one>

包初始化之后 就会生成package.json
```

#### dependencies和devDependencies的区别

+ devDependencies：开发环境使用
+ dependencies：生产环境使用

> 举例说明

```shell
webpack，gulp等打包工具，这些都是我们开发阶段使用的，代码提交线上时，不需要这些工具，所以我们将它放入devDependencies即可，但是像jquery这类插件库，是我们生产环境所使用的，所以如要放入dependencies，如果未将jquery安装到dependencies，那么项目就可能报错，无法运行，所以类似这种项目必须依赖的插件库，我们则必须打入dependencies中，这下子都明白了吧。
```

#### 简单版本 (webpack使用高版本5.42.0)

+ 生成必要的文件

```shell
Microsoft Windows [版本 10.0.19043.1052]
(c) Microsoft Corporation。保留所有权利。

D:\IdeaProjects\cycle\study\webpack>mkdir demo01  创建文件夹

D:\IdeaProjects\cycle\study\webpack>cd demo01 进入文件夹

D:\IdeaProjects\cycle\study\webpack\demo01>npm install -g webpack webpack-cli 安装全局webpack
D:\CS\node\node-v14.17.2-win-x64\webpack -> D:\CS\node\node-v14.17.2-win-x64\node_modules\webpack\bin\webpack.js
D:\CS\node\node-v14.17.2-win-x64\webpack-cli -> D:\CS\node\node-v14.17.2-win-x64\node_modules\webpack-cli\bin\cli.js
+ webpack@5.42.0
+ webpack-cli@4.7.2
updated 2 packages in 4.11s

D:\IdeaProjects\cycle\study\webpack\demo01>echo index.js   windows错误创建文件  必须 echo > file.suffix
index.js

D:\IdeaProjects\cycle\study\webpack\demo01>echo > index.js  windows正确创建方法

D:\IdeaProjects\cycle\study\webpack\demo01>webpack index.js   webpack打包编译(实际上这是低版本至少是低于4.0.0的目前我安装的是非常高的版本)
assets by status 0 bytes [cached] 1 asset

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value.
Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

ERROR in main
Module not found: Error: Can't resolve 'index.js' in 'D:\IdeaProjects\cycle\study\webpack\demo01'
Did you mean './index.js'?
Requests that should resolve in the current directory need to start with './'.
Requests that start with a name are treated as module requests and resolve within module directories (node_modules).
If changing the source code is not an option there is also a resolve options called 'preferRelative' which tries to resolve these kind of requests in the current directory too.
resolve 'index.js' in 'D:\IdeaProjects\cycle\study\webpack\demo01'
  Parsed request is a module
  No description file found in D:\IdeaProjects\cycle\study\webpack\demo01 or above
  resolve as module
    D:\IdeaProjects\cycle\study\webpack\demo01\node_modules doesn't exist or is not a directory
    D:\IdeaProjects\cycle\study\webpack\node_modules doesn't exist or is not a directory
    D:\IdeaProjects\cycle\study\node_modules doesn't exist or is not a directory
    D:\IdeaProjects\cycle\node_modules doesn't exist or is not a directory
    D:\IdeaProjects\node_modules doesn't exist or is not a directory
    D:\node_modules doesn't exist or is not a directory

webpack 5.42.0 compiled with 1 error and 1 warning in 147 ms
```

+ 高版本采用低版本显然的报错了

+ 找解决办法 网上找到解决方案是必须要配置开发模式还是生产模式,要求指定

+ 生成 package.json 并设置相应内容 这里 package.json 不要手动设置  直接node js 的包初始化命令即可生成 npm init

```shell
D:\IdeaProjects\cycle\study\webpack\demo01>npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (demo01)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to D:\IdeaProjects\cycle\study\webpack\demo01\package.json:

{
  "name": "demo01",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes)
// end   设置内容
{
  "name": "demo01",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1" ,
    "dev": "webpack --mode development",
    "build": "webpack --mode production"
  },
  "author": "",
  "license": "ISC"
}

```

+ 完毕再次执行 webpack index.js  不要意思又报错了

```shell
D:\IdeaProjects\cycle\study\webpack\demo01>webpack index.js
[Browserslist] Could not parse D:\IdeaProjects\cycle\study\webpack\demo01\package.json. Ignoring it.
[webpack-cli] SyntaxError: Unexpected token / in JSON at position 204
while determining default 'output.uniqueName' from 'name' in D:\IdeaProjects\cycle\study\webpack\demo01\package.json
    at JSON.parse (<anonymous>)
    at D:\CS\node\node-v14.17.2-win-x64\node_modules\webpack\lib\config\defaults.js:599:29
    at F (D:\CS\node\node-v14.17.2-win-x64\node_modules\webpack\lib\config\defaults.js:71:15)
    at applyOutputDefaults (D:\CS\node\node-v14.17.2-win-x64\node_modules\webpack\lib\config\defaults.js:594:2)
    at applyWebpackOptionsDefaults (D:\CS\node\node-v14.17.2-win-x64\node_modules\webpack\lib\config\defaults.js:182:2)
    at createCompiler (D:\CS\node\node-v14.17.2-win-x64\node_modules\webpack\lib\webpack.js:78:2)
    at create (D:\CS\node\node-v14.17.2-win-x64\node_modules\webpack\lib\webpack.js:127:16)
    at webpack (D:\CS\node\node-v14.17.2-win-x64\node_modules\webpack\lib\webpack.js:135:47)
    at WebpackCLI.f [as webpack] (D:\CS\node\node-v14.17.2-win-x64\node_modules\webpack\lib\index.js:55:16)
    at WebpackCLI.createCompiler (D:\CS\node\node-v14.17.2-win-x64\node_modules\webpack-cli\lib\webpack-cli.js:2053:29)
```

+ 实际上是高版本的情况下是必须要配置webpack.config.js

+ 因此我们来配置webpack.config.js

```shell
D:\IdeaProjects\cycle\study\webpack\demo01>echo > webpack.config.js
webconfig.js 内容
const path = require('path')
module.exports = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
    },
    mode: 'development' // 设置mode
}
```

+ 执行打包编译  这里需要注意的是高版本不允许 webpack index.js 的方式了  直接是webpack 执行后自动找此命令下的配置然后输出编译文件

```shell
D:\IdeaProjects\cycle\study\webpack\demo01>webpack
asset my-first-webpack.bundle.js 1.19 KiB [emitted] (name: main)
./main.js 40 bytes [built] [code generated]
webpack 5.42.0 compiled successfully in 69 ms
```

+ Java生成目录结构

```shell
 @Test
    public void printFileDir() {
        String path = "D:\\IdeaProjects\\cycle\\study\\webpack\\demo01";
//        String path = "D:\\IdeaProjects\\lifeDoc\\book\\public";
        File file = new File(path);
        print(file, 0, file.getParent());
    }

    private void print(File file, int index, final String parent) {
        StringBuilder stringBuilder = new StringBuilder();
        String str = "▸";
        if (file.isFile()) {
            stringBuilder.append(str).append(StringUtils.repeat(" ", index)).append(StringUtils.remove(file.getPath(), parent));
            System.out.println(stringBuilder.toString());
        } else {
            stringBuilder.append(str).append(StringUtils.repeat(" ", index)).append(StringUtils.remove(file.getPath(),parent));
            System.out.println(stringBuilder.toString());
            for (File f : file.listFiles()) {
                int newIndex = index + 2;
                print(f, newIndex, parent);
            }
        }
    }
```

+ 文件结构

```shell
▸\demo01
▸  \demo01\dist
▸    \demo01\dist\my-first-webpack.bundle.js
▸  \demo01\index.js
▸  \demo01\package.json
▸  \demo01\webpack.config.js
```

#### 简单版本局部情况 (webpack使用高版本5.42.0)

+ 生成必要的文件

> npm init -y 初始化的时候不会提示输入yes

```shell
Microsoft Windows [版本 10.0.19043.1052]

D:\IdeaProjects\cycle\study\webpack>mkdir demo02

D:\IdeaProjects\cycle\study\webpack>cd demo02

D:\IdeaProjects\cycle\study\webpack\demo02>echo document.writeln('hello blake') > index.js

D:\IdeaProjects\cycle\study\webpack\demo02>npm init -y
Wrote to D:\IdeaProjects\cycle\study\webpack\demo02\package.json:

{
  "name": "demo02",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}



D:\IdeaProjects\cycle\study\webpack\demo02>echo > webpack.config.js
```

+ 局部安装说明

> 局部安装必须在package.json中 scripts > "build": "webpack"

+ 命令 npm add -D webpack webpack-cli

```shell
D:\IdeaProjects\cycle\study\webpack\demo02>npm -D webpack webpack-cli
Usage: npm <command>
where <command> is one of:
    access, adduser, audit, bin, bugs, c, cache, ci, cit,
    clean-install, clean-install-test, completion, config,
    create, ddp, dedupe, deprecate, dist-tag, docs, doctor,
    edit, explore, fund, get, help, help-search, hook, i, init,
    install, install-ci-test, install-test, it, link, list, ln,
    login, logout, ls, org, outdated, owner, pack, ping, prefix,
    profile, prune, publish, rb, rebuild, repo, restart, root,
    run, run-script, s, se, search, set, shrinkwrap, star,
    stars, start, stop, t, team, test, token, tst, un,
    uninstall, unpublish, unstar, up, update, v, version, view,
    whoami
    
npm <command> -h  quick help on <command>
npm -l            display full usage info
npm help <term>   search for help on <term>
npm help npm      involved overview

Specify configs in the ini-formatted file:
    C:\Users\dell\.npmrc
or on the command line via: npm <command> --key value
Config info can be viewed via: npm help config

npm@6.14.13 D:\CS\node\node-v14.17.2-win-x64\node_modules\npm

Did you mean this?
    pack

D:\IdeaProjects\cycle\study\webpack\demo02>npm add -D webpack webpack-cli
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN demo02@1.0.0 No description
npm WARN demo02@1.0.0 No repository field.

+ webpack-cli@4.7.2
+ webpack@5.42.0
added 121 packages from 155 contributors in 7.307s

16 packages are looking for funding
  run `npm fund` for details
```

+ 编译打包 


```shell
D:\IdeaProjects\cycle\study\webpack\demo02>webpack
asset bundle.js 1.19 KiB [emitted] (name: main)
./index.js 34 bytes [built] [code generated]
webpack 5.42.0 compiled successfully in 69 ms
D:\IdeaProjects\cycle\study\webpack\demo02>
```

+ 文件目录

```shell
[TestNG] Running:
  C:\Users\dell\.IntelliJIdea2018.3\system\temp-testng-customsuite.xml
▸\demo02
▸  \demo02\dist
▸    \demo02\dist\bundle.js
▸  \demo02\index.html
▸  \demo02\index.js
▸  \demo02\node_modules
▸    \demo02\node_modules\.bin
▸      \demo02\node_modules\.bin\acorn
▸      \demo02\node_modules\.bin\acorn.cmd
▸      \demo02\node_modules\.bin\acorn.ps1
▸      \demo02\node_modules\.bin\browserslist
▸      \demo02\node_modules\.bin\browserslist.cmd
▸      \demo02\node_modules\.bin\browserslist.ps1
▸      \demo02\node_modules\.bin\envinfo
▸      \demo02\node_modules\.bin\envinfo.cmd
▸      \demo02\node_modules\.bin\envinfo.ps1
▸      \demo02\node_modules\.bin\  ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
        目录太多我删掉了差不多就是这样
▸      \demo02\node_modules\yocto-queue\index.d.ts ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
▸      \demo02\node_modules\yocto-queue\index.d.ts
▸      \demo02\node_modules\yocto-queue\index.js
▸      \demo02\node_modules\yocto-queue\license
▸      \demo02\node_modules\yocto-queue\package.json
▸      \demo02\node_modules\yocto-queue\readme.md
▸  \demo02\package-lock.json
▸  \demo02\package.json
▸  \demo02\webpack.config.js
===============================================
Default Suite
Total tests run: 1, Failures: 0, Skips: 0
===============================================
Process finished with exit code 0
```

#### 自定义版本(局部) (webpack使用高版本5.42.0)

+ 生成必要的文件

```shell
Microsoft Windows [版本 10.0.19043.1052]
(c) Microsoft Corporation。保留所有权利。
D:\IdeaProjects\cycle\study\webpack>mkdir demo03
D:\IdeaProjects\cycle\study\webpack>cd demo03
D:\IdeaProjects\cycle\study\webpack\demo03>npm init -y
Wrote to D:\IdeaProjects\cycle\study\webpack\demo03\package.json:

{
  "name": "demo03",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

D:\IdeaProjects\cycle\study\webpack\demo03>echo > index.html
D:\IdeaProjects\cycle\study\webpack\demo03>echo > main.js
D:\IdeaProjects\cycle\study\webpack\demo03>echo webpack.config.js
webpack.config.js
D:\IdeaProjects\cycle\study\webpack\demo03>echo > webpack.config.js
```

+ 安装之前查询版本webpack和webpack-cli版本不一致的否则会报错

+ 版本查询 [webpack版本地址](https://github.com/webpack/webpack/tags) [webpack-cli版本地址](https://www.npmjs.com/package/webpack-cli)

+ 安装命令 npm add  -D webpack@5.32.0 webpack-cli@4.0.0-alpha-5

```shell
D:\IdeaProjects\cycle\study\webpack\demo03>npm add  -D webpack@5.32.0 webpack-cli@5.32.0
npm ERR! code ETARGET
npm ERR! notarget No matching version found for webpack-cli@5.32.0.
npm ERR! notarget In most cases you or one of your dependencies are requesting
npm ERR! notarget a package version that doesn't exist.
npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\dell\AppData\Roaming\npm-cache\_logs\2021-07-04T04_40_27_844Z-debug.log
D:\IdeaProjects\cycle\study\webpack\demo03>npm add  -D webpack@5.32.0 webpack-cli@4.0.0-alpha-5
> ejs@2.7.4 postinstall D:\IdeaProjects\cycle\study\webpack\demo03\node_modules\ejs
> node ./postinstall.js
Thank you for installing EJS: built with the Jake JavaScript build tool (https://jakejs.com/)
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN webpack-cli@4.0.0-alpha-5 requires a peer of webpack@4.x.x but none is installed. You must install peer dependencies yourself.
npm WARN demo03@1.0.0 No description
npm WARN demo03@1.0.0 No repository field.

+ webpack@5.32.0
+ webpack-cli@4.0.0-alpha-5
added 365 packages from 245 contributors in 23.014s

19 packages are looking for funding
  run `npm fund` for details
```

+ 安装完成之后到package.json 中查看 devDependencies 即可查询到版本

```shell
{
  "name": "demo03",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.32.0",
    "webpack-cli": "^4.0.0-alpha-5"
  }
}
```

+ 打包编译

```shell
D:\IdeaProjects\cycle\study\webpack\demo03>webpack
asset bundle.js 1.2 KiB [emitted] (name: main)
./main.js 44 bytes [built] [code generated]
webpack 5.42.0 compiled successfully in 72 ms
D:\IdeaProjects\cycle\study\webpack\demo03>
```

+ 文件目录

```shell
▸\demo03
▸  \demo03\dist
▸    \demo03\dist\bundle.js
▸  \demo03\index.html
▸  \demo03\main.js
▸  \demo03\node_modules
▸    \demo03\node_modules\.bin
▸      \demo03\node_modules\.bin\acorn
▸      \demo03\node_modules\.bin\acorn.cmd
▸      \demo03\node_modules\.bin\acorn.ps1
▸      \demo03\node_modules\.bin\browserslist
▸      \demo03\node_modules\.bin\browserslist.cmd
▸      \demo03\node_modules\.bin\browserslist.ps1
▸      \demo03\node_modules\.bin\errno
▸      \demo03\node_modules\.bin\errno.cmd
▸      \demo03\node_modules\.bin\errno.ps1
▸      \demo03\node_modules\.bin\is-ci
..................省略node model dir index
▸    \demo03\node_modules\yocto-queue
▸      \demo03\node_modules\yocto-queue\index.d.ts
▸      \demo03\node_modules\yocto-queue\index.js
▸      \demo03\node_modules\yocto-queue\license
▸      \demo03\node_modules\yocto-queue\package.json
▸      \demo03\node_modules\yocto-queue\readme.md
▸  \demo03\package-lock.json
▸  \demo03\package.json
▸  \demo03\webpack.config.js
```

#### 使用html插件

+ 生成必要的文件

```shell
Microsoft Windows [版本 10.0.19043.1052]
(c) Microsoft Corporation。保留所有权利。
D:\IdeaProjects\cycle>cd study
D:\IdeaProjects\cycle\study>mkdir demo04
D:\IdeaProjects\cycle\study\webpack>cd demo04
D:\IdeaProjects\cycle\study\webpack\demo04>npm init -y
Wrote to D:\IdeaProjects\cycle\study\webpack\demo04\package.json:
{
  "name": "demo04",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

D:\IdeaProjects\cycle\study\webpack\demo04>echo > webpack.config.js
D:\IdeaProjects\cycle\study\webpack\demo04>md src

D:\IdeaProjects\cycle\study\webpack\demo04>cd src

D:\IdeaProjects\cycle\study\webpack\demo04\src>echo > index.js
D:\IdeaProjects\cycle\study\webpack\demo04\src>cd D:\IdeaProjects\cycle\study\webpack\demo04
```

+ 找到html-webpack-load

+ [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/#root)

+ HtmlWebpackPlugin


+ 如果您有多个webpack入口点，它们都将包含在生成的HTML中的&lt;script&gt;标记中
  

+ 插件命令

```
npm install --save-dev html-webpack-plugin
局部 npm install -D --save-dev html-webpack-plugin
```

+ 配置

```shell
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  plugins: [new HtmlWebpackPlugin()],
};
```

+ 生成包含以下内容的文件dist/index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>webpack App</title>
  </head>
  <body>
    <script src="index_bundle.js"></script>
  </body>
</html>
```

+ 安装命令 

```shell
D:\IdeaProjects\cycle\study\webpack\demo04>npm add -D webpack webpack-cli
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN demo04@1.0.0 No description
npm WARN demo04@1.0.0 No repository field.

+ webpack-cli@4.7.2
+ webpack@5.42.0
added 121 packages from 155 contributors in 13.022s

16 packages are looking for funding
  run `npm fund` for details
  
D:\IdeaProjects\cycle\study\webpack\demo04>npm install -D --save-dev html-webpack-plugin
npm WARN demo04@1.0.0 No description
npm WARN demo04@1.0.0 No repository field.

+ html-webpack-plugin@5.3.2
added 19 packages from 8 contributors in 4.707s

27 packages are looking for funding
  run `npm fund` for details
```

+ webpack.config.js 配置

```shell
const path = require('path');

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
```

+ 打包编译 npm run build(实际相当于执行了webpack命令)

```shell
D:\IdeaProjects\cycle\study\webpack\demo04>npm run build

> demo04@1.0.0 build D:\IdeaProjects\cycle\study\webpack\demo04
> webpack

asset bundle2.js 1.4 KiB [compared for emit] (name: main)
asset index.html 234 bytes [compared for emit]
./src/index.js 207 bytes [built] [code generated]
webpack 5.42.0 compiled successfully in 122 ms
```

+ 文件目录

```shell
▸\demo04
▸  \demo04\dist
▸    \demo04\dist\bundle2.js
▸    \demo04\dist\index.html
▸  \demo04\node_modules
▸    \demo04\node_modules\.bin
▸      \demo04\node_modules\.bin\acorn
▸      \demo04\node_modules\.bin\acorn.cmd
▸      \demo04\node_modules\.bin\acorn.ps1
▸      \demo04\node_modules\.bin\browserslist
▸    \demo04\node_modules\yocto-queue
||省略
▸      \demo04\node_modules\yocto-queue\index.d.ts
▸      \demo04\node_modules\yocto-queue\index.js
▸      \demo04\node_modules\yocto-queue\license
▸      \demo04\node_modules\yocto-queue\package.json
▸      \demo04\node_modules\yocto-queue\readme.md
▸  \demo04\package-lock.json
▸  \demo04\package.json
▸  \demo04\src
▸    \demo04\src\index.js
▸  \demo04\webpack.config.js

```

#### 多入口

+ 生成必要的文件

```shell
Microsoft Windows [版本 10.0.19043.1052]
(c) Microsoft Corporation。保留所有权利。

D:\IdeaProjects\cycle>cd study

D:\IdeaProjects\cycle\study>cd webpack

D:\IdeaProjects\cycle\study\webpack>mkdir demo05

D:\IdeaProjects\cycle\study\webpack>cd demo05

D:\IdeaProjects\cycle\study\webpack\demo05>mkdir src

D:\IdeaProjects\cycle\study\webpack\demo05>cd src

D:\IdeaProjects\cycle\study\webpack\demo05\src>echo -> main.js

D:\IdeaProjects\cycle\study\webpack\demo05\src>echo -> home.js

D:\IdeaProjects\cycle\study\webpack\demo05\src>echo -> register.js

D:\IdeaProjects\cycle\study\webpack\demo05\src>cd ..

D:\IdeaProjects\cycle\study\webpack\demo05>echo '' > webpack.config.js

D:\IdeaProjects\cycle\study\webpack\demo05>npm init -y
Wrote to D:\IdeaProjects\cycle\study\webpack\demo05\package.json:

{
  "name": "demo05",
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

D:\IdeaProjects\cycle\study\webpack\demo05> npm add -D webpack webpack-cli
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN demo05@1.0.0 No description
npm WARN demo05@1.0.0 No repository field.
+ webpack-cli@4.7.2
+ webpack@5.42.1
added 121 packages from 155 contributors in 9.549s
16 packages are looking for funding
  run `npm fund` for details
```

+ webpack.config.js 配置

```js
const path = require('path');
module.exports  = {
    entry: {
        home : "./src/home.js" ,
        main : "./src/main.js" ,
        register : "./src/register.js" ,
    },
    output :{
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development' // 设置mode
} ;
```

+ package.json 配置

```json
{
  "name": "demo05",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack --mode development",
    "build": "webpack --mode production"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.42.1",
    "webpack-cli": "^4.7.2"
  }
}

```

+ 执行以及校验js (这里使用nodejs直接在命令行执行js)

```shell
D:\IdeaProjects\cycle\study\webpack\demo05>npm run build
> demo05@1.0.0 build D:\IdeaProjects\cycle\study\webpack\demo05
> webpack --mode production

asset register.js 54 bytes [emitted] [minimized] (name: register)
asset home.js 50 bytes [emitted] [minimized] (name: home)
asset main.js 50 bytes [emitted] [minimized] (name: main)
./src/home.js 50 bytes [built] [code generated]
./src/main.js 50 bytes [built] [code generated]
./src/register.js 54 bytes [built] [code generated]
webpack 5.42.1 compiled successfully in 207 ms

D:\IdeaProjects\cycle\study\webpack\demo05>node dist/main.js
main 15

D:\IdeaProjects\cycle\study\webpack\demo05>node dist/home.js
home 20

D:\IdeaProjects\cycle\study\webpack\demo05>node dist/register.js
register 63
```

+ 附 main.js内容

```js
console.log("main",Math.round(Math.random()*100));
```

+ 文件目录

```dos
▸\demo05
▸  \demo05\dist
▸    \demo05\dist\home.js
▸    \demo05\dist\main.js
▸    \demo05\dist\register.js
▸  \demo05\node_modules
▸    \demo05\node_modules\.bin
▸      \demo05\node_modules\.bin\acorn
▸      \demo05\node_modules\.bin\acorn.cmd
▸      \demo05\node_modules\.bin\acorn.ps1
▸      \demo05\node_modules\.bin\browserslist
▸      \demo05\node_modules\.bin\browserslist.cmd
        ||省略
▸      \demo05\node_modules\wildcard\README.md
▸      \demo05\node_modules\wildcard\test
▸        \demo05\node_modules\wildcard\test\all.js
▸        \demo05\node_modules\wildcard\test\arrays.js
▸        \demo05\node_modules\wildcard\test\objects.js
▸        \demo05\node_modules\wildcard\test\strings.js
▸      \demo05\node_modules\wildcard\yarn.lock
▸    \demo05\node_modules\yocto-queue
▸      \demo05\node_modules\yocto-queue\index.d.ts
▸      \demo05\node_modules\yocto-queue\index.js
▸      \demo05\node_modules\yocto-queue\license
▸      \demo05\node_modules\yocto-queue\package.json
▸      \demo05\node_modules\yocto-queue\readme.md
▸  \demo05\package-lock.json
▸  \demo05\package.json
▸  \demo05\src
▸    \demo05\src\home.js
▸    \demo05\src\main.js
▸    \demo05\src\register.js
▸  \demo05\webpack.config.js
```

#### 多出口

+ 生成必要的文件

```shell
Microsoft Windows [版本 10.0.19043.1052]
(c) Microsoft Corporation。保留所有权利。
D:\IdeaProjects\cycle\study\webpack>mkdir demo06
D:\IdeaProjects\cycle\study\webpack>cd demo06
D:\IdeaProjects\cycle\study\webpack\demo06>mkdir src
D:\IdeaProjects\cycle\study\webpack\demo06>cd src
D:\IdeaProjects\cycle\study\webpack\demo06\src>echo console.log('index'); > index.js
D:\IdeaProjects\cycle\study\webpack\demo06\src>echo console.log('main'); > main.js
D:\IdeaProjects\cycle\study\webpack\demo06\src>cd ..
D:\IdeaProjects\cycle\study\webpack\demo06>cd >  webpack.config.js

D:\IdeaProjects\cycle\study\webpack\demo06>npm init -y
Wrote to D:\IdeaProjects\cycle\study\webpack\demo06\package.json:

{
  "name": "demo06",
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
```

+ 安装

```shell
D:\IdeaProjects\cycle\study\webpack\demo06>npm add -D webpack webpack-cli
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN demo06@1.0.0 No description
npm WARN demo06@1.0.0 No repository field.

+ webpack@5.42.1
+ webpack-cli@4.7.2
added 121 packages from 155 contributors in 10.332s

16 packages are looking for funding
  run `npm fund` for details
  报错了
  执行npm install时出现npm notice created a lockfile as package-lock.json. You should commit this file
  在package.json中增加private字段；
  将项目声明为私有项目："private": true,
  再重新运行，notice就没有了
```

+ 增加如下

```shell
{
  "name": "demo06",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "private": true,
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

+ 重新安装

```shell
D:\IdeaProjects\cycle\study\webpack\demo06>npm add -D webpack webpack-cli
+ webpack@5.42.1
+ webpack-cli@4.7.2
updated 2 packages in 4.494s
1 package is looking for funding
  run `npm fund` for details
```

+ 关于 webpack.config.js 配置

> 我是从下面一次注释运行的

```js
const path = require("path") ;
module.exports = {
    entry :{
        index :"./src/index.js" , //这样写  可以不要output
        main :"./src/main.js" ,
    },
    mode :"development" ,
    output :{
        // path:path.join(__dirname,"release")
        // path:path.join(__dirname,"output1"),
        path:path.join(__dirname,"output"),
        // filename:"[name].js"//如index.js
        // filename:"[name]_.js" //如index_.js
        // filename:"[name]_[hash].js" //如 index_42e300f860ec901c7866.js
        filename:"[name]_[hash:4].js" //如 index_42e3.js
    }
}
```

+ 执行命令

```shell
D:\IdeaProjects\cycle\study\webpack\demo06>npm run build

> demo06@1.0.0 build D:\IdeaProjects\cycle\study\webpack\demo06
> webpack

asset index.js 1.2 KiB [emitted] (name: index)
asset main.js 1.2 KiB [emitted] (name: main)
./src/index.js 24 bytes [built] [code generated]
./src/main.js 23 bytes [built] [code generated]
webpack 5.42.1 compiled successfully in 75 ms

D:\IdeaProjects\cycle\study\webpack\demo06>node src/index.js
index

D:\IdeaProjects\cycle\study\webpack\demo06>node src/main.js
main

D:\IdeaProjects\cycle\study\webpack\demo06>npm run build

> demo06@1.0.0 build D:\IdeaProjects\cycle\study\webpack\demo06
> webpack

asset index.js 1.2 KiB [emitted] (name: index)
asset main.js 1.2 KiB [emitted] (name: main)
./src/index.js 24 bytes [built] [code generated]
./src/main.js 23 bytes [built] [code generated]
webpack 5.42.1 compiled successfully in 77 ms

D:\IdeaProjects\cycle\study\webpack\demo06>npm run build

> demo06@1.0.0 build D:\IdeaProjects\cycle\study\webpack\demo06
> webpack

asset index.js 1.2 KiB [emitted] (name: index)
asset main.js 1.2 KiB [emitted] (name: main)
./src/index.js 24 bytes [built] [code generated]
./src/main.js 23 bytes [built] [code generated]
webpack 5.42.1 compiled successfully in 77 ms

D:\IdeaProjects\cycle\study\webpack\demo06>npm run build

> demo06@1.0.0 build D:\IdeaProjects\cycle\study\webpack\demo06
> webpack

asset index_.js 1.2 KiB [emitted] (name: index)
asset main_.js 1.2 KiB [emitted] (name: main)
./src/index.js 24 bytes [built] [code generated]
./src/main.js 23 bytes [built] [code generated]
webpack 5.42.1 compiled successfully in 80 ms

D:\IdeaProjects\cycle\study\webpack\demo06>npm run build

> demo06@1.0.0 build D:\IdeaProjects\cycle\study\webpack\demo06
> webpack

(node:8048) [DEP_WEBPACK_TEMPLATE_PATH_PLUGIN_REPLACE_PATH_VARIABLES_HASH] DeprecationWarning: [hash] is now [fullhash] (also consider using [chunkhash] or [contenthash], see documenta
tion for details)
(Use `node --trace-deprecation ...` to show where the warning was created)
asset index_42e300f860ec901c7866.js 1.2 KiB [emitted] [immutable] (name: index)
asset main_42e300f860ec901c7866.js 1.2 KiB [emitted] [immutable] (name: main)
./src/index.js 24 bytes [built] [code generated]
./src/main.js 23 bytes [built] [code generated]
webpack 5.42.1 compiled successfully in 81 ms

D:\IdeaProjects\cycle\study\webpack\demo06>npm run build

> demo06@1.0.0 build D:\IdeaProjects\cycle\study\webpack\demo06
> webpack

(node:15188) [DEP_WEBPACK_TEMPLATE_PATH_PLUGIN_REPLACE_PATH_VARIABLES_HASH] DeprecationWarning: [hash] is now [fullhash] (also consider using [chunkhash] or [contenthash], see document
ation for details)
(Use `node --trace-deprecation ...` to show where the warning was created)
asset index_42e3.js 1.2 KiB [emitted] [immutable] (name: index)
asset main_42e3.js 1.2 KiB [emitted] [immutable] (name: main)
./src/index.js 24 bytes [built] [code generated]
./src/main.js 23 bytes [built] [code generated]
webpack 5.42.1 compiled successfully in 76 ms

D:\IdeaProjects\cycle\study\webpack\demo06>
```

+ 文件结构

```shell
▸\demo06
▸  \demo06\dist
▸    \demo06\dist\index.js
▸    \demo06\dist\main.js
▸  \demo06\node_modules
▸    \demo06\node_modules\yocto-queue
//省略
▸      \demo06\node_modules\yocto-queue\index.d.ts
▸      \demo06\node_modules\yocto-queue\index.js
▸      \demo06\node_modules\yocto-queue\license
▸      \demo06\node_modules\yocto-queue\package.json
▸      \demo06\node_modules\yocto-queue\readme.md
▸  \demo06\output
▸    \demo06\output\index_42e3.js
▸    \demo06\output\index_42e300f860ec901c7866.js
▸    \demo06\output\main_42e3.js
▸    \demo06\output\main_42e300f860ec901c7866.js
▸  \demo06\output1
▸    \demo06\output1\index.js
▸    \demo06\output1\index_.js
▸    \demo06\output1\main.js
▸    \demo06\output1\main_.js
▸  \demo06\package-lock.json
▸  \demo06\package.json
▸  \demo06\readme.md
▸  \demo06\release
▸    \demo06\release\index.js
▸    \demo06\release\main.js
▸  \demo06\src
▸    \demo06\src\index.js
▸    \demo06\src\main.js
▸  \demo06\webpack.config.js
```

