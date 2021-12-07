---
title: "node js - npm "
date: 2021-06-17
draft: false
weight: 2
---

> npm 是 Node 的模块管理器，功能极其强大。它是 Node 获得成功的重要原因之一

+ 假如是nodejs 高版本  那么不需要再安装npm了因为node js已经包含了npm

## 一、从 npm install 说起

+  npm install 命令用来安装模块到**node_modules**目录。

```shell
$ npm install <packageName>
```

+  安装之前，**npm install**会先检查，**node_modules**目录之中是否已经存在指定模块。如果存在，就不再重新安装了，即使远程仓库已经有了一个新版本，也是如此。

+  如果你希望，一个模块不管是否安装过，**npm** 都要强制重新安装，可以使用-f 或 --force 参数。

```shell
$ npm install <packageName> --force
```

## 二、npm update

+ 如果想更新已安装模块，就要用到**npm update**命令。

```shell
$ npm update <packageName>
```

+ 它会先到远程仓库查询最新版本，然后查询本地版本。如果本地版本不存在，或者远程版本较新，就会安装。

## 三、registry

+ **npm update**命令怎么知道每个模块的最新版本呢？

+ 答案是 npm 模块仓库提供了一个查询服务，叫做 **registry** 。以 **npmjs.org** 为例，它的查询服务网址是 **https://registry.npmjs.org/** 。

+ 这个网址后面跟上模块名，就会得到一个 JSON 对象，里面是该模块所有版本的信息。比如，访问 https://registry.npmjs.org/react，就会看到 react 模块所有版本的信息。

+ 它跟下面命令的效果是一样的。

```shell
$ npm view react

# npm view 的别名
$ npm info react
$ npm show react
$ npm v react
```

## 四、缓存目录

+ npm install或npm update命令，从 registry 下载压缩包之后，都存放在本地的缓存目录。

+ 这个缓存目录，在 Linux 或 Mac 默认是用户主目录下的.npm目录，在 Windows 默认是%AppData%/npm-cache。通过配置命令，可以查看这个目录的具体位置。

```shell

$ npm config get cache
$HOME/.npm
```

+ 你最好浏览一下这个目录。

```shell


$ ls ~/.npm 
# 或者
$ npm cache ls
```

+ 你会看到里面存放着大量的模块，储存结构是{cache}/{name}/{version}。


```shell

$ npm cache ls react
~/.npm/react/react/0.14.6/
~/.npm/react/react/0.14.6/package.tgz
~/.npm/react/react/0.14.6/package/
~/.npm/react/react/0.14.6/package/package.json
```

+ **.npm**目录保存着大量文件，清空它的命令如下。

```shell
$ rm -rf ~/.npm/*
# 或者
$ npm cache clean
```

## 五、模块的安装过程

+ 总结一下，Node模块的安装过程是这样的。

```
1:发出npm install命令
2:npm 向 registry 查询模块压缩包的网址
3:下载压缩包，存放在~/.npm目录
4:解压压缩包到当前项目的node_modules目录
```

> 注意，一个模块安装以后，本地其实保存了两份。一份是~/.npm目录下的压缩包，另一份是node_modules目录下解压后的代码。
  但是，运行npm install的时候，只会检查node_modules目录，而不会检查~/.npm目录。也就是说，如果一个模块在～/.npm下有压缩包，但是没有安装在node_modules目录中，npm 依然会从远程仓库下载一次新的压缩包。
  这种行为固然可以保证总是取得最新的代码，但有时并不是我们想要的。最大的问题是，它会极大地影响安装速度。即使某个模块的压缩包就在缓存目录中，也要去远程仓库下载，这怎么可能不慢呢？
  另外，有些场合没有网络（比如飞机上），但是你想安装的模块，明明就在缓存目录之中，这时也无法安装。