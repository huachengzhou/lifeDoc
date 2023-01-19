---
title : 'idea导入项目出现Unable > to > import > maven > project > See > logs > for > details提示'
date : '2021-02-15'
draft : false
tags : ["maven"]
categories : ["problem","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---
















> idea导入项目出现Unable to import maven project: See logs for details提示
# 第一种解决办法
+ 删除项目根目录下.idea文件夹
+ 关闭idea工具，重新打开选择File->New->Project from the existing source ,选择刚才的项目根目，下一步：




+ 一直点next，最后点击主工程的pom.xml 完成！

# 第二种
+ 打开idea 的日志文件如果发现【Error】com.google.inject.CreationException: Unable to create injector
+ 那么自定义配置Maven3.6.2报错 或者更高版本maven
+ 原因：Maven3.6.2的版本兼容问题。
+ 解决方法：重新下载较低版本Maven3.6.1及以下版本可以顺利解决。

+ 用maven无论是新建项目还是导入没有下载到本地仓库的jar。出现了Unable to import maven project

+ 打开cmd，ping localhost，显示一般故障
+ 在左边控制栏，关闭防火墙，再开启防火墙 再次ping localhost，成功

+ 对了  假如出现文件权限问题 那么更改maven的本地仓库地址



---
title : 'idea导入项目出现Unable > to > import > maven > project > See > logs > for > details提示'
date : '2021-02-15'
draft : false
tags : ["maven"]
categories : ["problem","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---
















> idea导入项目出现Unable to import maven project: See logs for details提示
# 第一种解决办法
+ 删除项目根目录下.idea文件夹
+ 关闭idea工具，重新打开选择File->New->Project from the existing source ,选择刚才的项目根目，下一步：




+ 一直点next，最后点击主工程的pom.xml 完成！

# 第二种
+ 打开idea 的日志文件如果发现【Error】com.google.inject.CreationException: Unable to create injector
+ 那么自定义配置Maven3.6.2报错 或者更高版本maven
+ 原因：Maven3.6.2的版本兼容问题。
+ 解决方法：重新下载较低版本Maven3.6.1及以下版本可以顺利解决。

+ 用maven无论是新建项目还是导入没有下载到本地仓库的jar。出现了Unable to import maven project

+ 打开cmd，ping localhost，显示一般故障
+ 在左边控制栏，关闭防火墙，再开启防火墙 再次ping localhost，成功

+ 对了  假如出现文件权限问题 那么更改maven的本地仓库地址



