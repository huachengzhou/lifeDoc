---
title: "python pyinstaller "
date: 2023-03-02
draft: false
weight: 1
---


# pyinstaller 


## 安装

+ 安装

```cmd
pip install pyinstaller
```

+ 验证安装


```cmd
C:\Users\noatn>pyinstaller -v
5.8.0
```

+ 更新PyInstaller

```cmd
pip install --upgrade pyinstaller
```

+ 下载PyInstaller开发版本
> 如果你认为当前发行版本无法满足你的要求，或者你发现了bug的话，可以尝试用一下最新的开发版本

```cmd
pip install https://github.com/pyinstaller/pyinstaller/tarball/develop
```


## 打包



### 打包为单文件

> 平时我们见到很多便携的单文件程序，假如我们写了一个小脚本，寥寥数行代码，打包成一个文件夹显然不合适，这就可使用Pyinstaller打包成一个**exe**

```cmd
# 将 xx.py 打包为 xx.exe
pyinstaller -F xx.py
```
### 打包为单文件 并且去掉命令行界面

```cmd
# 将 xx.py 打包为 xx.exe
pyinstaller -F -w xx.py
```

### 打包资源文件夹

```cmd
# 将 xx.py 打包
pyinstaller xx.py
```


> 打包的时候，程序同路径下会生成一个同名的.spec文件，这个文件是打包的 “中间文件”，我们可以通过修改这个文件来添加我们需要添加资源的文件


#### Spec文件分析

.spec文件中主要包含4部分：Analysis、PYZ、EXE、COLLECT


+ Analysis：主要是分析py文件的依赖信息
+ PYZ：是一个.pyz的压缩包，包含程序运行需要的依赖
+ EXE：是根据上述两项内容而生成的
+ COLLECT：主要是输出信息

+ Analysis部分截取示例

```
# -*- mode: python ; coding: utf-8 -*-
a = Analysis(['gui.py'],
             pathex=['D:\\gui'],
             binaries=[],
             datas=[('D:\\gui\\config.ini','.'),('D:\\gui\\清洗规则.xlsx','.')],
             hiddenimports=['pandas'],
             hookspath=[],
             hooksconfig={},
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
```

#### 参数详解


想要添加资源文件，重点是修改datas的内容，我这里是修改过的，一般是空的：datas = [] datas里边的元素是以元组的形式来存储的，有这么一个映射关系：

```
datas = [('源文件路径','目标路径')]
```

如果有多个，就多放几个元素，内容不限，如果目标路径是打包后的根目录，那就写.

修改好之后，运行这条命令即可：

```cmd
pyinstaller -D xx.spec
```

程序写好了，但是文件夹形式不方便分发，也显得比较low:stuck_out_tongue_winking_eye:，那我们就需要打包成安装程序:soon


## 去掉命令行窗口

> 根据之前的命令打包的好的程序，可以运行，但是会带一个命令框，黑乎乎的，对于命令行程序还好，但假如是GUI，那体验就太糟糕了:expressionless

```cmd
# 添加 -w 参数可以隐藏命令行窗口
pyinstaller -w xxx.py
```

## 给程序增加图标

> 程序打包好了，黑框也去掉了，但是程序看起来像是快捷方式丢失一样，很不美观，我们需要给程序增加一个漂亮的面具:sunglasses

```cmd
# 添加 -i 参数，后加 图标路径
pyinstaller -i x:\xx\xx.ico xx.py
```

## PyInstaller 支持的常用选项

| -h，--help | 查看该模块的帮助信息 |
| --- | --- |
| -F，-onefile | 产生单个的可执行文件 |
| -D，--onedir | 产生一个目录（包含多个文件）作为可执行程序 |
| -a，--ascii | 不包含 Unicode 字符集支持 |
| -d，--debug | 产生 debug 版本的可执行文件 |
| -w，--windowed，--noconsolc | 指定程序运行时不显示命令行窗口（仅对 Windows 有效） |
| -c，--nowindowed，--console | 指定使用命令行窗口运行程序（仅对 Windows 有效） |
| -o DIR，--out=DIR | 指定 spec 文件的生成目录。如果没有指定，则默认使用当前目录来生成 spec 文件 |
| -p DIR，--path=DIR | 设置 Python 导入模块的路径（和设置 PYTHONPATH 环境变量的作用相似）。也可使用路径分隔符（Windows 使用分号，Linux 使用冒号）来分隔多个路径 |
| -n NAME，--name=NAME | 指定项目（产生的 spec）名字。如果省略该选项，那么第一个脚本的主文件名将作为 spec 的名字 |



