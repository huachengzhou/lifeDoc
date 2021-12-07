---
title: "webpack loader"
date: 2021-06-17
draft: false
weight: 8
---

## first css-loader

+ 文件目录

```shell
▸\t1
▸  \t1\dist
▸    \t1\dist\index.js
▸  \t1\node_modules
▸    \t1\node_modules\.bin
//省略
▸      \t1\node_modules\yocto-queue\readme.md
▸  \t1\package-lock.json
▸  \t1\package.json
▸  \t1\src
▸    \t1\src\index.css
▸    \t1\src\index.js
▸  \t1\webpack.config.js
```

+ webpack.config.js content

```js
module.exports = {
    entry: {
        index :"./src/index.js"
    },
    mode :'development' ,
    module :{
        rules:[
            {test :/.css$/ ,use : "css-loader"}
        ]
    }
}
```

+ package.json content

```json
{
  "name": "t1",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^5.2.6",
    "webpack": "^5.44.0",
    "webpack-cli": "^4.7.2"
  }
}
```

+ 命令

```dos
D:\IdeaProjects\cycle\study\webpack\demo07\t1>npm init -y
Wrote to D:\IdeaProjects\cycle\study\webpack\demo07\t1\package.json:

{
  "name": "t1",
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



D:\IdeaProjects\cycle\study\webpack\demo07\t1>npm add -D webpack webpack-cli
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN t1@1.0.0 No description
npm WARN t1@1.0.0 No repository field.

+ webpack-cli@4.7.2
+ webpack@5.44.0
added 121 packages from 155 contributors in 12.283s

16 packages are looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo07\t1>npm run build

> t1@1.0.0 build D:\IdeaProjects\cycle\study\webpack\demo07\t1
> webpack

assets by status 159 bytes [cached] 1 asset
./src/index.js 55 bytes [built] [code generated]

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value.
Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

ERROR in ./src/index.js 1:0-20
Module not found: Error: Can't resolve 'index.css' in 'D:\IdeaProjects\cycle\study\webpack\demo07\t1\src'
Did you mean './index.css'?
Requests that should resolve in the current directory need to start with './'.
Requests that start with a name are treated as module requests and resolve within module directories (node_modules).
If changing the source code is not an option there is also a resolve options called 'preferRelative' which tries to resolve these kind of requests in the current directory too.
resolve 'index.css' in 'D:\IdeaProjects\cycle\study\webpack\demo07\t1\src'
  Parsed request is a module
  using description file: D:\IdeaProjects\cycle\study\webpack\demo07\t1\package.json (relative path: ./src)
    Field 'browser' doesn't contain a valid alias configuration
    resolve as module
      D:\IdeaProjects\cycle\study\webpack\demo07\t1\src\node_modules doesn't exist or is not a directory
      looking for modules in D:\IdeaProjects\cycle\study\webpack\demo07\t1\node_modules
        single file module
          using description file: D:\IdeaProjects\cycle\study\webpack\demo07\t1\package.json (relative path: ./node_modules/index.css)
            no extension
              Field 'browser' doesn't contain a valid alias configuration
              D:\IdeaProjects\cycle\study\webpack\demo07\t1\node_modules\index.css doesn't exist
            .js
              Field 'browser' doesn't contain a valid alias configuration
              D:\IdeaProjects\cycle\study\webpack\demo07\t1\node_modules\index.css.js doesn't exist
            .json
              Field 'browser' doesn't contain a valid alias configuration
              D:\IdeaProjects\cycle\study\webpack\demo07\t1\node_modules\index.css.json doesn't exist
            .wasm
              Field 'browser' doesn't contain a valid alias configuration
              D:\IdeaProjects\cycle\study\webpack\demo07\t1\node_modules\index.css.wasm doesn't exist
        D:\IdeaProjects\cycle\study\webpack\demo07\t1\node_modules\index.css doesn't exist
      D:\IdeaProjects\cycle\study\webpack\demo07\node_modules doesn't exist or is not a directory
      D:\IdeaProjects\cycle\study\webpack\node_modules doesn't exist or is not a directory
      D:\IdeaProjects\cycle\study\node_modules doesn't exist or is not a directory
      D:\IdeaProjects\cycle\node_modules doesn't exist or is not a directory
      D:\IdeaProjects\node_modules doesn't exist or is not a directory
      D:\node_modules doesn't exist or is not a directory

webpack 5.44.0 compiled with 1 error and 1 warning in 189 ms
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! t1@1.0.0 build: `webpack`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the t1@1.0.0 build script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\dell\AppData\Roaming\npm-cache\_logs\2021-07-10T09_07_28_227Z-debug.log

D:\IdeaProjects\cycle\study\webpack\demo07\t1>npm run build

> t1@1.0.0 build D:\IdeaProjects\cycle\study\webpack\demo07\t1
> webpack

asset index.js 2.19 KiB [emitted] (name: index)
runtime modules 274 bytes 1 module
./src/index.js 55 bytes [built] [code generated]

ERROR in ./src/index.js 1:0-20
Module not found: Error: Can't resolve 'index.css' in 'D:\IdeaProjects\cycle\study\webpack\demo07\t1\src'
Did you mean './index.css'?
Requests that should resolve in the current directory need to start with './'.
Requests that start with a name are treated as module requests and resolve within module directories (node_modules).
If changing the source code is not an option there is also a resolve options called 'preferRelative' which tries to resolve these kind of requests in the current directory too.
resolve 'index.css' in 'D:\IdeaProjects\cycle\study\webpack\demo07\t1\src'
  Parsed request is a module
  using description file: D:\IdeaProjects\cycle\study\webpack\demo07\t1\package.json (relative path: ./src)
    Field 'browser' doesn't contain a valid alias configuration
    resolve as module
      D:\IdeaProjects\cycle\study\webpack\demo07\t1\src\node_modules doesn't exist or is not a directory
      looking for modules in D:\IdeaProjects\cycle\study\webpack\demo07\t1\node_modules
        single file module
          using description file: D:\IdeaProjects\cycle\study\webpack\demo07\t1\package.json (relative path: ./node_modules/index.css)
            no extension
              Field 'browser' doesn't contain a valid alias configuration
              D:\IdeaProjects\cycle\study\webpack\demo07\t1\node_modules\index.css doesn't exist
            .js
              Field 'browser' doesn't contain a valid alias configuration
              D:\IdeaProjects\cycle\study\webpack\demo07\t1\node_modules\index.css.js doesn't exist
            .json
              Field 'browser' doesn't contain a valid alias configuration
              D:\IdeaProjects\cycle\study\webpack\demo07\t1\node_modules\index.css.json doesn't exist
            .wasm
              Field 'browser' doesn't contain a valid alias configuration
              D:\IdeaProjects\cycle\study\webpack\demo07\t1\node_modules\index.css.wasm doesn't exist
        D:\IdeaProjects\cycle\study\webpack\demo07\t1\node_modules\index.css doesn't exist
      D:\IdeaProjects\cycle\study\webpack\demo07\node_modules doesn't exist or is not a directory
      D:\IdeaProjects\cycle\study\webpack\node_modules doesn't exist or is not a directory
      D:\IdeaProjects\cycle\study\node_modules doesn't exist or is not a directory
      D:\IdeaProjects\cycle\node_modules doesn't exist or is not a directory
      D:\IdeaProjects\node_modules doesn't exist or is not a directory
      D:\node_modules doesn't exist or is not a directory

webpack 5.44.0 compiled with 1 error in 84 ms
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! t1@1.0.0 build: `webpack`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the t1@1.0.0 build script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\dell\AppData\Roaming\npm-cache\_logs\2021-07-10T09_08_41_846Z-debug.log

D:\IdeaProjects\cycle\study\webpack\demo07\t1>npm add -D css-loader
npm WARN t1@1.0.0 No description
npm WARN t1@1.0.0 No repository field.

+ css-loader@5.2.6
added 21 packages from 55 contributors in 8.209s

18 packages are looking for funding
  run `npm fund` for details
```

## second css-loader

+ 文件目录

```dos
▸\t2
▸  \t2\dist
▸    \t2\dist\index.js
▸  \t2\node_modules
▸    \t2\node_modules\.bin
▸      \t2\node_modules\.bin\acorn
//省略
▸    \t2\node_modules\yocto-queue
▸      \t2\node_modules\yocto-queue\index.d.ts
▸      \t2\node_modules\yocto-queue\index.js
▸      \t2\node_modules\yocto-queue\license
▸      \t2\node_modules\yocto-queue\package.json
▸      \t2\node_modules\yocto-queue\readme.md
▸  \t2\package-lock.json
▸  \t2\package.json
▸  \t2\src
▸    \t2\src\index.css
▸    \t2\src\index.js
▸  \t2\webpack.config.js
```

+ webpack.config.js content

```js
const  path = require("path") ;

module.exports = {
    entry: {
        index :"./src/index.js"
    },
    mode :'development' ,
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    module :{
        rules:[
            {test : /.css$/ , use : "css-loader"}
        ]
    }
}
```

+ package.json content

```json
{
  "name": "t2",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^5.2.6",
    "webpack": "^5.44.0",
    "webpack-cli": "^4.7.2"
  }
}

```

+ 命令

```dos
D:\IdeaProjects\cycle\study\webpack\demo07\t2>npm init -y
Wrote to D:\IdeaProjects\cycle\study\webpack\demo07\t2\package.json:

{
  "name": "t2",
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



D:\IdeaProjects\cycle\study\webpack\demo07\t2>npm add -D webpack webpack-cli
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN t2@1.0.0 No description
npm WARN t2@1.0.0 No repository field.

+ webpack@5.44.0
+ webpack-cli@4.7.2
added 121 packages from 155 contributors in 10.062s

16 packages are looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo07\t2>npm add -D css-loader
npm WARN t2@1.0.0 No description
npm WARN t2@1.0.0 No repository field.

+ css-loader@5.2.6
added 21 packages from 55 contributors in 3.292s

18 packages are looking for funding
  run `npm fund` for details
D:\IdeaProjects\cycle\study\webpack\demo07\t2>npm run build

> t2@1.0.0 build D:\IdeaProjects\cycle\study\webpack\demo07\t2
> webpack

asset index.js 7.23 KiB [emitted] (name: index)
runtime modules 937 bytes 4 modules
cacheable modules 1.95 KiB
  ./src/index.js 57 bytes [built] [code generated]
  ./src/index.css 333 bytes [built] [code generated]
  ./node_modules/css-loader/dist/runtime/api.js 1.57 KiB [built] [code generated]
webpack 5.44.0 compiled successfully in 311 ms

D:\IdeaProjects\cycle\study\webpack\demo07\t2>node dist/index.js
hello index.js

D:\IdeaProjects\cycle\study\webpack\demo07\t2>
```

+ index.css || index.js content

```html
//css content
.main {
    color: #0d6efd;
}
//js content
import "./index.css" ;
console.log("hello index.js") ;

```

## second - 2 css-loader

+ webpack.config.js content

```js
module.exports = {
    entry: {
        index :"./src/index.js"
    },
    mode :'development' ,
    module :{
        rules:[
            {test : /.css$/ , use : "css-loader"}
        ]
    }
}
```

+ 其他和 second 内容一致

## first ["style-loader", "css-loader"]


+ 文件目录

```dos
▸\t3
▸  \t3\dist
▸    \t3\dist\index.js
▸  \t3\node_modules
▸    \t3\node_modules\.bin
▸      \t3\node_modules\.bin\acorn
//省略
▸      \t3\node_modules\yocto-queue\index.js
▸      \t3\node_modules\yocto-queue\license
▸      \t3\node_modules\yocto-queue\package.json
▸      \t3\node_modules\yocto-queue\readme.md
▸  \t3\package-lock.json
▸  \t3\package.json
▸  \t3\src
▸    \t3\src\index.css
▸    \t3\src\index.js
▸  \t3\webpack.config.js
```

+ webpack.config.js content

```js
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
```

+ package.json content

```json
{
  "name": "t4",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^5.2.6",
    "html-webpack-plugin": "^5.3.2",
    "style-loader": "^3.0.0",
    "webpack": "^5.44.0",
    "webpack-cli": "^4.7.2"
  }
}

```

+ index.css || index.js || indexTemplate.html

```html
<! --
index.css

.main {
    color: #0d6efd;
}
-->


<! --
index.js
import "./index.css" ;

console.log("hello index.js") ;
-->


<! --
indexTemplate.html
<div class="main">
    hello world
</div>
-->

```

+ 命令

```dos
D:\IdeaProjects\cycle\study\webpack\demo07\t4>npm init -y
Wrote to D:\IdeaProjects\cycle\study\webpack\demo07\t4\package.json:

{
  "name": "t4",
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



D:\IdeaProjects\cycle\study\webpack\demo07\t4>npm add -D webpack webpack-cli
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN t4@1.0.0 No description
npm WARN t4@1.0.0 No repository field.

+ webpack@5.44.0
+ webpack-cli@4.7.2
added 121 packages from 155 contributors in 12.528s

16 packages are looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo07\t4>npm install -D --save-dev html-webpack-plugin
npm WARN t4@1.0.0 No description
npm WARN t4@1.0.0 No repository field.

+ html-webpack-plugin@5.3.2
added 33 packages from 19 contributors in 7.603s

26 packages are looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo07\t4>npm add -D style-loader
npm WARN t4@1.0.0 No description
npm WARN t4@1.0.0 No repository field.

+ style-loader@3.0.0
added 1 package from 1 contributor in 2.089s

27 packages are looking for funding
  run `npm fund` for details

D:\IdeaProjects\cycle\study\webpack\demo07\t4>npm add -D css-loader
npm WARN t4@1.0.0 No description
npm WARN t4@1.0.0 No repository field.

+ css-loader@5.2.6
added 21 packages from 55 contributors in 3.031s

29 packages are looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo07\t4>npm run build

> t4@1.0.0 build D:\IdeaProjects\cycle\study\webpack\demo07\t4
> webpack

asset index.js 17.8 KiB [emitted] (name: index)
asset index.html 94 bytes [compared for emit]
runtime modules 937 bytes 4 modules
cacheable modules 7.6 KiB
  modules by path ./node_modules/ 5.69 KiB
    ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js 2.19 KiB [built] [code generated]
    ./node_modules/style-loader/dist/runtime/styleDomAPI.js 1010 bytes [built] [code generated]
    ./node_modules/style-loader/dist/runtime/getTarget.js 709 bytes [built] [code generated]
    ./node_modules/style-loader/dist/runtime/insertStyleElement.js 261 bytes [built] [code generated]
    ./node_modules/css-loader/dist/runtime/api.js 1.57 KiB [built] [code generated]
  modules by path ./src/ 1.91 KiB
    ./src/index.js 57 bytes [built] [code generated]
    ./src/index.css 1.53 KiB [built] [code generated]
    ./node_modules/css-loader/dist/cjs.js!./src/index.css 333 bytes [built] [code generated]
webpack 5.44.0 compiled successfully in 371 ms

```

+ index.css  index.js indexTemplate.html 

```
.main {
    color: #0d6efd;
}

import "./index.css" ;
console.log("hello index.js") ;

<div class="main">
    hello world
</div>

```

+ run dist.index.html ==> 

```html
<body _c_t_common="1"><div data-v-7e2550d6="" class="odm_extension image_downloader_wrapper"><!----></div><div class="main">
    hello world
</div><div data-flash-app-container="true" id="flash_player_app_root"></div><div id="fatkun-drop-panel">
        <a id="fatkun-drop-panel-close-btn">×</a>
            <div id="fatkun-drop-panel-inner">
                <div class="fatkun-content">
                    <svg class="fatkun-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5892"><path d="M494.933333 782.933333c2.133333 2.133333 4.266667 4.266667 8.533334 6.4h8.533333c6.4 0 10.666667-2.133333 14.933333-6.4l2.133334-2.133333 275.2-275.2c8.533333-8.533333 8.533333-21.333333 0-29.866667-8.533333-8.533333-21.333333-8.533333-29.866667 0L533.333333 716.8V128c0-12.8-8.533333-21.333333-21.333333-21.333333s-21.333333 8.533333-21.333333 21.333333v588.8L249.6 475.733333c-8.533333-8.533333-21.333333-8.533333-29.866667 0-8.533333 8.533333-8.533333 21.333333 0 29.866667l275.2 277.333333zM853.333333 874.666667H172.8c-12.8 0-21.333333 8.533333-21.333333 21.333333s8.533333 21.333333 21.333333 21.333333H853.333333c12.8 0 21.333333-8.533333 21.333334-21.333333s-10.666667-21.333333-21.333334-21.333333z" p-id="5893"></path></svg>
                    <div class="fatkun-title">拖拽到此处</div>
                    <div class="fatkun-desc">图片将完成下载</div>
                </div>
            </div>
    </div><iframe id="redeviation-bs-sidebar" class="notranslate" aria-hidden="true" data-theme="default" data-pos="right"></iframe><div id="redeviation-bs-indicator" data-theme="default" class="redeviation-bs-fullHeight" style="height: 100%; top: 0%;"></div></body>
```

##  less-loader

+ 文件目录

```dos
▸\t6
▸  \t6\dist
▸    \t6\dist\index.html
▸    \t6\dist\index.js
▸  \t6\node_modules

//省略

▸    \t6\node_modules\yocto-queue
▸      \t6\node_modules\yocto-queue\index.d.ts
▸      \t6\node_modules\yocto-queue\index.js
▸      \t6\node_modules\yocto-queue\license
▸      \t6\node_modules\yocto-queue\package.json
▸      \t6\node_modules\yocto-queue\readme.md
▸  \t6\package-lock.json
▸  \t6\package.json
▸  \t6\src
▸    \t6\src\base.less
▸    \t6\src\index.css
▸    \t6\src\index.js
▸    \t6\src\index.less
▸    \t6\src\indexTemplate.html
▸  \t6\webpack.config.js
```

+ webpack.config.js content

```js
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
                use: ["style-loader", "css-loader"] ,
            },
            {
                test: /.less$/,
                use: ["style-loader", "css-loader","less-loader"] ,
            },
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
```

+ package.json content

```json
{
  "name": "t6",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1" ,
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^5.2.6",
    "html-webpack-plugin": "^5.3.2",
    "less": "^4.1.1",
    "less-loader": "^10.0.1",
    "style-loader": "^3.0.0",
    "webpack": "^5.44.0",
    "webpack-cli": "^4.7.2"
  }
}

```

+ 重要 html 相关

```html
//base.less
@primaryColor : lightcoral  ;

//index.less
@import "./base.less";

.main {
  background-color: @primaryColor
}

//index.js
import "./index.css" ;
import "./index.less" ;

console.log("hello index.js") ;

//index.css
.main {
    color: #0d6efd;
}

//indexTemplate.html
<div class="main">
    hello world
</div>



```

+ 命令

```dos
D:\IdeaProjects\cycle\study\webpack\demo07\t6>npm init -y
Wrote to D:\IdeaProjects\cycle\study\webpack\demo07\t6\package.json:

{
  "name": "t6",
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



D:\IdeaProjects\cycle\study\webpack\demo07\t6>npm add -D webpack webpack-cli
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN t6@1.0.0 No description
npm WARN t6@1.0.0 No repository field.

+ webpack-cli@4.7.2
+ webpack@5.44.0
added 121 packages from 155 contributors in 8.471s

16 packages are looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo07\t6>npm add -D style-loader
npm WARN t6@1.0.0 No description
npm WARN t6@1.0.0 No repository field.

+ style-loader@3.0.0
added 1 package from 1 contributor in 0.901s

17 packages are looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo07\t6>npm add -D css-loader
npm WARN t6@1.0.0 No description
npm WARN t6@1.0.0 No repository field.

+ css-loader@5.2.6
added 21 packages from 55 contributors in 1.83s

19 packages are looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo07\t6>npm add -D less-loader
npm WARN less-loader@10.0.1 requires a peer of less@^3.5.0 || ^4.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN t6@1.0.0 No description
npm WARN t6@1.0.0 No repository field.

+ less-loader@10.0.1
added 2 packages from 2 contributors in 1.144s

20 packages are looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo07\t6>npm add -D less
npm WARN t6@1.0.0 No description
npm WARN t6@1.0.0 No repository field.

+ less@4.1.1
added 18 packages from 18 contributors in 2.175s

20 packages are looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo07\t6>npm install -D --save-dev html-webpack-plugin
npm WARN t6@1.0.0 No description
npm WARN t6@1.0.0 No repository field.

+ html-webpack-plugin@5.3.2
added 38 packages from 19 contributors in 2.994s

30 packages are looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo07\t6>npm run build
npm ERR! missing script: build

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\dell\AppData\Roaming\npm-cache\_logs\2021-07-11T08_38_54_955Z-debug.log

D:\IdeaProjects\cycle\study\webpack\demo07\t6>npm run build

> t6@1.0.0 build D:\IdeaProjects\cycle\study\webpack\demo07\t6
> webpack

asset index.js 24.6 KiB [emitted] (name: index)
asset index.html 94 bytes [emitted]
runtime modules 937 bytes 4 modules
cacheable modules 9.27 KiB
  modules by path ./src/ 3.58 KiB
    modules by path ./src/*.css 1.85 KiB 2 modules
    modules by path ./src/*.less 1.65 KiB
      ./src/index.less 1.61 KiB [built] [code generated]
      ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/index.less 39 bytes [built] [code generated] [1 error]
    ./src/index.js 82 bytes [built] [code generated]
  modules by path ./node_modules/ 5.69 KiB
    ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js 2.19 KiB [built] [code generated]
    ./node_modules/style-loader/dist/runtime/styleDomAPI.js 1010 bytes [built] [code generated]
    ./node_modules/style-loader/dist/runtime/getTarget.js 709 bytes [built] [code generated]
    ./node_modules/style-loader/dist/runtime/insertStyleElement.js 261 bytes [built] [code generated]
    ./node_modules/css-loader/dist/runtime/api.js 1.57 KiB [built] [code generated]

ERROR in ./src/index.less (./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/index.less)
Module build failed (from ./node_modules/less-loader/dist/cjs.js):


@primary-color:lightcoral
            ^
@primary-color rule is missing block or ending semi-colon
      Error in D:\IdeaProjects\cycle\study\webpack\demo07\t6\src\base.less (line 1, column 14)
Error:

@primary-color:lightcoral
            ^
@primary-color rule is missing block or ending semi-colon
      Error in D:\IdeaProjects\cycle\study\webpack\demo07\t6\src\base.less (line 1, column 14)
    at Object.lessLoader (D:\IdeaProjects\cycle\study\webpack\demo07\t6\node_modules\less-loader\dist\index.js:54:14)
 @ ./src/index.less 6:6-140 45:17-24 49:0-110 49:0-110 50:22-29 50:33-47 50:50-64
 @ ./src/index.js 2:0-23
D:\IdeaProjects\cycle\study\webpack\demo07\t6>npm run build

> t6@1.0.0 build D:\IdeaProjects\cycle\study\webpack\demo07\t6
> webpack

asset index.js 24.4 KiB [emitted] (name: index)
asset index.html 94 bytes [compared for emit]
runtime modules 937 bytes 4 modules
cacheable modules 9.57 KiB
  modules by path ./src/ 3.88 KiB
    modules by path ./src/*.css 1.85 KiB 2 modules
    modules by path ./src/*.less 1.94 KiB
      ./src/index.less 1.61 KiB [built] [code generated]
      ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/index.less 343 bytes [built] [code generated]
    ./src/index.js 82 bytes [built] [code generated]
  modules by path ./node_modules/ 5.69 KiB
    ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js 2.19 KiB [built] [code generated]
    ./node_modules/style-loader/dist/runtime/styleDomAPI.js 1010 bytes [built] [code generated]
    ./node_modules/style-loader/dist/runtime/getTarget.js 709 bytes [built] [code generated]
    ./node_modules/style-loader/dist/runtime/insertStyleElement.js 261 bytes [built] [code generated]
    ./node_modules/css-loader/dist/runtime/api.js 1.57 KiB [built] [code generated]
webpack 5.44.0 compiled successfully in 425 ms

```


## extract-text-webpack-plugin 使用

```js
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
}
```

+ 该插件有三个参数意义分别如下

```
use:指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
fallback:编译后用什么loader来提取css文件
publicfile:用来覆盖项目路径,生成该css文件的文件路径
```

+ 使用

+ webpack.config.js

```js
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
```


+ package.json  需要注意下面的依赖版本关系

```json
{
  "name": "t6",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^3.0.0",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "html-webpack-plugin": "^4.4.0",
    "less": "^4.1.1",
    "less-loader": "^3.0.0",
    "style-loader": "^2.0.0",
    "webpack": "^4.12.0",
    "webpack-cli": "^4.1.0"
  }
}
```

+ html

```html

+ base.less

@primaryColor : lightcoral  ;

+ indexTemplate.html

<div class="main">
    hello world
</div>

+ index.less

@import "./base.less";

.main {
  background-color: @primaryColor
}

+ index.css

.main {
    color: #0d6efd;
}

+ index.js

import "./index.css" ;
import "./index.less" ;

console.log("hello index.js") ;

```


+ 文件目录

```shell
▸\t6
▸  \t6\dist
▸    \t6\dist\index.html
▸    \t6\dist\index.js
▸    \t6\dist\styles.css
▸  \t6\node_modules
▸    \t6\node_modules\.bin
▸    \t6\node_modules\y18n
▸      \t6\node_modules\y18n\CHANGELOG.md
▸      \t6\node_modules\y18n\index.js
▸      \t6\node_modules\y18n\LICENSE
▸      \t6\node_modules\y18n\package.json
▸      \t6\node_modules\y18n\README.md

//省略

▸  \t6\package-lock.json
▸  \t6\package.json
▸  \t6\src
▸    \t6\src\base.less
▸    \t6\src\index.css
▸    \t6\src\index.js
▸    \t6\src\index.less
▸    \t6\src\indexTemplate.html
▸  \t6\webpack.config.js
▸  \t6\webpack.config2.js
▸  \t6\webpack.config3.js
```


+ 执行结果

```shell
D:\IdeaProjects\cycle\study\webpack\demo07\t6>webpack
[webpack-cli] Compilation finished
Hash: 74f8a85ddd5d6714bb8a
Version: webpack 4.12.0
Time: 347ms
Built at: 2021/07/13 下午10:00:45
     Asset       Size  Chunks             Chunk Names
  index.js   5.02 KiB   index  [emitted]  index
styles.css   73 bytes   index  [emitted]  index
index.html  129 bytes          [emitted]
Entrypoint index = index.js styles.css
[./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/lib/loader.js!./src/index.less] 183 bytes [built]
[./node_modules/css-loader/dist/cjs.js!./src/index.css] 173 bytes [built]
[./node_modules/css-loader/dist/runtime/api.js] 2.61 KiB [built]
[./node_modules/less-loader/lib/stringify.loader.js!./src/base.less] 39 bytes [built]
[./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js] 6.67 KiB [built]
[./src/index.css] 41 bytes [built]
[./src/index.js] 82 bytes {index} [built]
[./src/index.less] 41 bytes [built]
Child HtmlWebpackCompiler:
                          Asset      Size               Chunks  Chunk Names
    __child-HtmlWebpackPlugin_0  4.46 KiB  HtmlWebpackPlugin_0  HtmlWebpackPlugin_0
    Entrypoint HtmlWebpackPlugin_0 = __child-HtmlWebpackPlugin_0
    [./node_modules/html-webpack-plugin/lib/loader.js!./src/indexTemplate.html] 307 bytes {HtmlWebpackPlugin_0} [built]
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/dist/cjs.js!node_modules/less-loader/lib/loader.js!src/index.less:
    Entrypoint undefined = extract-text-webpack-plugin-output-filename
    [./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/lib/loader.js!./src/index.less] 183 bytes {0} [built]
    [./node_modules/css-loader/dist/runtime/api.js] 2.61 KiB {0} [built]
    [./node_modules/less-loader/lib/stringify.loader.js!./src/base.less] 39 bytes [built]
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/dist/cjs.js!src/index.css:
    Entrypoint undefined = extract-text-webpack-plugin-output-filename
    [./node_modules/css-loader/dist/cjs.js!./src/index.css] 173 bytes {0} [built]
    [./node_modules/css-loader/dist/runtime/api.js] 2.61 KiB {0} [built]

```



