---
title: "node js - npm 重要命令 "
date: 2021-06-17
draft: false
weight: 9
---

### npm 包管理器查询网址

+ https://www.npmjs.com/   (和java的maven仓库差不多一个意思)


#### 全局安装

+ npm install less-loader@4.1.0

+ npm install less-loader@4.1.0 --save


#### 本地安装命令

+ npm install less-loader@3.0.0 --save-dev

+ npm add -D less-loader@3.0.0



> 上面两条等价

####  升级到最高版本  , 更新npm到最新版本

+ npm i npm@latest -d  
+ npm i npm@latest -g

#### 安装所有依赖 (package.json)

+ npm install request

#### 删除包问题

+ npm uninstall webpack webpack-cli -g  全局
+ npm uninstall webpack webpack-cli -d  局部

+ npm uninstall less-loader 不区分局部和全局 卸载


### npm源

+  查看初始npm源

```cmd
npm config get registry
```

+ 更换下载地址

npm config set registry https://registry.npm.taobao.org/
npm config set prefix "D:\lib\jsLib\node_global"

+ 更换镜像为淘宝镜


```cmd

npm config set cache "D:\lib\jsLib\node_cache"
```

+ 连起来

```cmd
C:\Users\noatn>npm config get registry
https://registry.npmjs.org/

C:\Users\noatn>npm config set registry https://registry.npm.taobao.org/

C:\Users\noatn>npm config get registry
https://registry.npm.taobao.org/
```



### npx包执行器

> NPX 是一个 Node 包执行器，该 Node 包可以是本地也可以是远程的。允许开发者在无需安装的情况下执行任意 Node 包


+ 例如 npx ts-node .\o1.ts

#### pnpm npx安装方式

+ npx pnpm install

#### pnpm 设置源

npx pnpm config set registry https://registry.npmmirror.com

#### pnpm 设置地址

+ npx pnpm config set store-dir   "D:\lib\jsLib\pnpm_lib"

#### yarn 设置地址

npx yarn config set cache-folder "D:\lib\jsLib\yarn_lib"

### npm命令设置全局下载安装工具包和缓存的目录

```cmd
C:\Users\noatn>npm config set prefix "D:\lib\jsLib\node_global"

C:\Users\noatn>npm config set cache "D:\lib\jsLib\node_cache"
```

