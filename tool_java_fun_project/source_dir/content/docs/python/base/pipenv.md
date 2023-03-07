---
title: "python pipenv 包管理"
date: 2023-03-07
draft: false
weight: 9
---

> pipenv 是Kenneth Reitz大神的作品，提供Python的各个版本间的管理，各种包管理。个人觉得是virtualenv pip等工具的合体

## 安装pipenv

+ 本操作系统为windows10

```dos
pip install --user pipenv　
# 安装失败 => 升级一下默认安装的pip版本，因为默认会安装最新版的pipenv，pip的版本过低会导致安装失败.pip更新命令
python -m pip install --upgrade pip
更新完pip后，再次执行pipenv的安装命令
pip install --user pipenv
```

+ 失败的话  多半是你没能连接上世界真正网络 (自己找个梯子吧)



## pipenv的简单使用

### 创建虚拟环境

+ (1)打开cmd窗口，首先切换到目标项目目录，输入以下命令：

```dos
 # python 2环境
　pipenv --two

python 3环境
 pipenv --three
```

+ （2）查看相关信息
+ 　　　　　　1） 查看项目位置：pipenv --where
+ 　　　　　　2）查看虚拟环境位置：pipenv --venv
+ 　　　　　　3）查看解释器信息：pipenv --py

![][img2]
![][img2_]

## 激活虚拟环境

（1）语法
　　　　　　pipenv shell

　　　　（2）界面效果　

　　　　　　　 激活前界面如下：

![][img3]
![][img3_]

激活后界面如下：

![][img4]
![][img4_]

（3）作用效果
　　　　　　激活了当前项目所在的虚拟环境。


## 在激活状态下，pipenv的简单操作

+  在cmd中执行test.py代码，首先切换到test.py所在文件目录，再输入python test.py代码执行文件，如下图：

![][img5]
![][img5_]

+  安装包

（1）语法
　　　　　　　　pipenv install [三方库名]

　　　　　　　　例如： pipenv install requests

　　　　　　（2）界面效果

![][img6]
![][img6_]


（3）作用效果
　　　　　　　　1）检测当前项目对应的虚拟环境是否存在，不存在则创建
　　　　　　　　2）在虚拟环境中安装指定的三方库
　　　　　　　　3）在项目目录下，通过Pipfile和Pipfile.lock记录当下已经安装

　　　　　　注意:不要使用pip install。虽然在虚拟环境中安装对应的包，但是不会更新Pipfile和Pipefile.lock



## 查看包的依赖结构

命令：pipenv graph

　　　　　　执行界面结果：

## 卸载包

pipenv uninstall 包名

　　　　　　界面效果如下：

![][img7]
![][img7_]

##  退出虚拟环境

　语法：
　　　　　　exit












[img2]:../.././imgs/python3/caxm7ptkkz/微信截图_20230307143135.png
[img2_]:../../../imgs/python3/caxm7ptkkz/微信截图_20230307143135.png
[img3]:../.././imgs/python3/caxm7ptkkz/微信截图_20230307143243.png
[img3_]:../../../imgs/python3/caxm7ptkkz/微信截图_20230307143243.png
[img4]:../.././imgs/python3/caxm7ptkkz/微信截图_20230307143300.png
[img4_]:../../../imgs/python3/caxm7ptkkz/微信截图_20230307143300.png

[img5]:../.././imgs/python3/caxm7ptkkz/微信截图_20230307143423.png
[img5_]:../../../imgs/python3/caxm7ptkkz/微信截图_20230307143423.png
[img6]:../.././imgs/python3/caxm7ptkkz/微信截图_20230307143523.png
[img6_]:../../../imgs/python3/caxm7ptkkz/微信截图_20230307143523.png
[img7]:../.././imgs/python3/caxm7ptkkz/微信截图_20230307143551.png
[img7_]:../../../imgs/python3/caxm7ptkkz/微信截图_20230307143551.png