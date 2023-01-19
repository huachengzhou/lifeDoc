---
title : 'mysql > install'
date : '2021-02-15'
draft : false
tags : ["mysql"]
categories : ["databases","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---



## mysql安装

> 这里我们不再采用exe的安装的方式,我们使用压缩包的方式安装

+ 地址 https://downloads.mysql.com/archives/community/


+ 将页面拉到最下面选择选择操作系统后，选择要下载的版本点击 Downloads

+ 我选择安装的版本为8.0.13。如果不想要最新的版本也可以进Archives页面选择其他版本

+ 选择压缩包的版本哦


### 一:配置环境变量

+ 因为下载的mysql数据库包的格式是zip的，下载完成后直接解压就可以用，但解压后需要进行配置。

+ 首先进行环境变量的配置：右击计算机->属性->高级系统设置->环境变量，选择双击Path，在最后面添加你的mysql bin文件夹的路径 

+ 我的目录是：D:\databases\mysql-8.0.13-winx64

![环境变量mysql](img/环境变量mysql.png)

+ 必须设置这个才行,因为后面我们要在控制台运行命令,假如你不设置这个环境变量那么在控制台根本识别不了,exe安装会自动在环境中设置,而压缩包没有设置

###  二:在 D:\databases\mysql-8.0.13-winx64 目录下新建一个my.ini的文件

```
[mysqld]
# skip-grant-tables 暂时注释了 容易引起 mysql服务启动后立马关闭 这个错误
# 设置3306端口
port=3306

# 自定义设置mysql的安装目录，即解压mysql压缩包的目录
# 切记此处一定要用双斜杠\\，单斜杠这里会出错。
basedir=D:\\databases\\mysql-8.0.13-winx64

# 自定义设置mysql数据库的数据存放目录
datadir=D:\\databases\\mysql-8.0.13-winx64\\data

# 允许最大连接数
max_connections=200

# 允许连接失败的次数，这是为了防止有人从该主机试图攻击数据库系统
max_connect_errors=10

# 服务端使用的字符集默认为UTF8
character-set-server=utf8mb4


# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB

# 默认使用“mysql_native_password”插件认证
default_authentication_plugin=mysql_native_password

[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8mb4

[client]
# 设置mysql客户端连接服务端时默认使用的端口和默认字符集
port=3306
default-character-set=utf8mb4
```

### 三:windows下运行控制台程序

+ 进入 C:\Windows\System32 中搜索 

![搜索 CMD](img/findCMD.png)

+ 右键用管理员权限执行

### 四:初始化mysql

+ mysqld --initialize --console，等待一会出现几行代码，root@localhost：后面的是随机生成的数据库初始密码，将初始密码记下来后面会用到。
+ 没记住初始密码的话，删掉初始化的 data目录，再执行一遍初始化命令又会重新生成

```
D:\databases\mysql-8.0.13-winx64\bin>mysqld --initialize --console
2020-04-06T07:51:43.421098Z 0 [System] [MY-013169] [Server] D:\databases\mysql-8.0.13-winx64\bin\mysqld.exe (mysqld 8.0.13) initializing of server in progress as process 21400
2020-04-06T07:52:04.903297Z 5 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: gMmik3IyFW!D
2020-04-06T07:52:19.868074Z 0 [System] [MY-013170] [Server] D:\databases\mysql-8.0.13-winx64\bin\mysqld.exe (mysqld 8.0.13) initializing of server has completed
```

### 五:mysql执行核心插件服务

```
D:\databases\mysql-8.0.13-winx64\bin>mysqld --install
Service successfully installed.
```

### 六:启动服务

```
net start mysql，启动服务,假如要关闭则是net stop mysql

D:\databases\mysql-8.0.13-winx64\bin>net start mysql
MySQL 服务正在启动 ...
MySQL 服务已经启动成功。

```


### 七:登录

```
# gMmik3IyFW!D   上面这个就是随即临时密码
D:\databases\mysql-8.0.13-winx64\bin>mysql -u root -p
Enter password: ************
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.13

Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

# 显示为这样就表示登录成功了

```


### 八:修改密码

```
mysql> alter user root@localhost identified by '123456';
Query OK, 0 rows affected (0.20 sec)
```













