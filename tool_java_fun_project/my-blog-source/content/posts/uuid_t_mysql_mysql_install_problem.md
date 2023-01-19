---
title : 'mysql > install > problem'
date : '2021-02-15'
draft : false
tags : ["mysql"]
categories : ["databases","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---



## windows下 Mysql安装的一些问题解决方法

### 1: The service already exists

+ 在mysql安装的时候要执行 mysqld --install  这个命令,假如你已经安装完之后觉得不对，但是mysql服务已经生成(windows注册服务已经有mysql了),你不删除此服务为报一个错误

+ The service already exists

+ 决绝方法就是 删除mysql相关的服务

+ 首先查询下是否存在mysql服务

```
sc query mysql

SERVICE_NAME: mysql
        TYPE               : 10  WIN32_OWN_PROCESS
        STATE              : 4  RUNNING
                                (STOPPABLE, PAUSABLE, ACCEPTS_SHUTDOWN)
        WIN32_EXIT_CODE    : 0  (0x0)
        SERVICE_EXIT_CODE  : 0  (0x0)
        CHECKPOINT         : 0x0
        WAIT_HINT          : 0x0
        # 这种情况就是mysql 没有删除干净
```

+ 删除该mysql

```
sc delete mysql
```


+ Please consider using UTF8MB4 in order to be unambiguous.

```
utf 的别名是 UTF8MB4
这里在my.ini 的文件中最好是设置 default-character-set=utf8mb4 
```


+ windows系统下Mysql服务启动后立即关闭问题-排查及解决方法

```
查看 my.ini 中 多了这个 skip-grant-tables ,这个的原意思是跳过检查,但是在不同版本有些命令是不能使用的
然后就是目前我暂时发现我自己使用的这个版本出了这个问题,在不同版本下最好是仔细查看配置和日志才是解决之道
```





























