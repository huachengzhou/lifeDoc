Microsoft Windows [版本 10.0.19043.1052]
(c) Microsoft Corporation。保留所有权利。

D:\IdeaProjects\cycle\study\webpack>mkdir demo06

D:\IdeaProjects\cycle\study\webpack>cd demo06

D:\IdeaProjects\cycle\study\webpack\demo06>mkdir src

D:\IdeaProjects\cycle\study\webpack\demo06>cd src

D:\IdeaProjects\cycle\study\webpack\demo06\src>echo console.log('index'); > index.js

D:\IdeaProjects\cycle\study\webpack\demo06\src>echo console.log('main'); > main.js

D:\IdeaProjects\cycle\study\webpack\demo06\src>cd ..

D:\IdeaProjects\cycle\study\webpack\demo06>dir
 驱动器 D 中的卷没有标签。
 卷的序列号是 60C3-1FDB

 D:\IdeaProjects\cycle\study\webpack\demo06 的目录

2021/07/06  22:23    <DIR>          .
2021/07/06  22:23    <DIR>          ..
2021/07/06  22:25    <DIR>          src
               0 个文件              0 字节
               3 个目录 455,382,831,104 可用字节

D:\IdeaProjects\cycle\study\webpack\demo06>touch webpack.config.js
'touch' 不是内部或外部命令，也不是可运行的程序
或批处理文件。

D:\IdeaProjects\cycle\study\webpack\demo06>cd > webpack.config.js

D:\IdeaProjects\cycle\study\webpack\demo06>cd  webpack.config.js
系统找不到指定的路径。

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



D:\IdeaProjects\cycle\study\webpack\demo06>npm add -D webpack webpack-cli
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN demo06@1.0.0 No description
npm WARN demo06@1.0.0 No repository field.

+ webpack@5.42.1
+ webpack-cli@4.7.2
added 121 packages from 155 contributors in 10.332s

16 packages are looking for funding
  run `npm fund` for details


D:\IdeaProjects\cycle\study\webpack\demo06>npm add -D webpack webpack-cli
+ webpack@5.42.1
+ webpack-cli@4.7.2
updated 2 packages in 4.494s

1 package is looking for funding
  run `npm fund` for details


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
