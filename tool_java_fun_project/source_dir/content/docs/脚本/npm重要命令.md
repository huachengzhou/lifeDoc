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