
---
title: "Win10一台电脑安装多个版本的Mysql"
date: 2020-01-17T15:26:15Z
draft: false
weight: 6
---

## mysql安装

> 这里我们不再采用exe的安装的方式,我们使用压缩包的方式安装

+ 地址 https://downloads.mysql.com/archives/community/


+ 将页面拉到最下面选择选择操作系统后，选择要下载的版本点击 Downloads

+ 我选择安装的版本为8.0.22。如果不想要最新的版本也可以进Archives页面选择其他版本

+ 选择压缩包的版本哦


### 一:配置环境变量

+ 因为下载的mysql数据库包的格式是zip的，下载完成后直接解压就可以用，但解压后需要进行配置。

+ 首先进行环境变量的配置：右击计算机->属性->高级系统设置->环境变量，选择双击Path，在最后面添加你的mysql bin文件夹的路径 

+ 我的目录是：D:\CS\databases\mysql-8.0.22-winx64
![][img1]
![][img1_]

+ 必须设置这个才行,因为后面我们要在控制台运行命令,假如你不设置这个环境变量那么在控制台根本识别不了,exe安装会自动在环境中设置,而压缩包没有设置

###  二:在D:\CS\databases\mysql-8.0.22-winx64 目录下新建一个my.ini的文件

```shell
[mysqld]
# skip-grant-tables 暂时注释了 容易引起 mysql服务启动后立马关闭 这个错误
# 设置3307端口
port=3307

# 自定义设置mysql的安装目录，即解压mysql压缩包的目录
# 切记此处一定要用双斜杠\\，单斜杠这里会出错。
basedir=D:\\CS\\databases\\mysql-8.0.22-winx64

# 自定义设置mysql数据库的数据存放目录
datadir=D:\\CS\\databases\\mysql-8.0.22-winx64\\data

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
port=3307
default-character-set=utf8mb4
```

### 三:windows下运行控制台程序

+ 进入 C:\Windows\System32 中搜索 

![][img2]
![][img2_]

+ 右键用管理员权限执行

### 四:mysql执行核心插件服务

```dos
D:\CS\databases\mysql-8.0.22-winx64\bin>mysqld install MySQL8022 --default-file="D:\CS\databases\mysql-8.0.22-winx64\my.ini"
Service successfully installed.
```

+ 提示Service successfully installed.说明服务安装成功，在计算机管理服务里可以看到新增一个MySQL8022的服务，接着输入mysqld --initialize，回车后没有任何提示，但是在文件夹下新增了一个data文件夹，说明初始化成功

+ MySQL8022是新增mysql的名称，启动或关闭服务的时候用到

### 五:初始化mysql

```dos
mysqld --initialize
```

### 六:修改注册表

+ 注册表路径：HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services 找到MySQL8022
+ MySQL8022 source value: D:\CS\databases\mysql-8.0.22-winx64\bin\mysqld --default-file=D:\CS\databases\mysql-8.0.22-winx64\my.ini MySQL8022
+ 修改为 D:\CS\databases\mysql-8.0.22-winx64\bin\mysqld.exe MySQL8022

### 七:启动修改密码
+ 首先找到临时密码 由于安装多个mysql无法执行mysqld --initialize --console 实际是mysqld --initialize 所以控制台无法看到密码

+ 临时密码可以去data文件夹下，一个后缀为err的文件中找到root@localhost:后面的就是
+ 如图:
![][img3]
![][img3_]


+ 启动 并且修改密码
![][img4]
![][img4_]



[参考1](https://outofmemory.cn/zaji/8701486.html)
[参考2](https://www.codenong.com/cs106307531/)





[img1]:../.././imgs/mysql/install/微信截图_20220407140526.png
[img1_]:../../../imgs/mysql/install/微信截图_20220407140526.png
[img2]:../.././imgs/mysql/install/微信截图_20220408104220.png
[img2_]:../../../imgs/mysql/install/微信截图_20220408104220.png
[img3]:../.././imgs/mysql/install/微信截图_20220408105109.png
[img3_]:../../../imgs/mysql/install/微信截图_20220408105109.png
[img4]:../.././imgs/mysql/install/微信截图_20220408105152.png
[img4_]:../../../imgs/mysql/install/微信截图_20220408105152.png
