---
title: "python 模块介绍"
date: 2021-04-15
draft: false
weight: 3
---

# 模块介绍

## time模块

## datetime模块

## random 模块

## os 模块

## sys 模块

## json 和 pickle 模块

## hashlib和hmac 模块

## logging 模块

## numpy 模块

## pandas 模块

## matplotlib 模块

## re 模块

## typing 模块

## collections 模块

## pathlib 模块

pathlib 是 Python 内置库，Python 文档给它的定义是 Object-oriented filesystem paths（面向对象的文件系统路径）。pathlib 提供表示文件系统路径的类，其语义适用于不同的操作系统。路径类在纯路径之间划分，纯路径提供纯粹的计算操作而没有 I / O，以及具体路径，它继承纯路径但也提供 I / O 操作。

对于这繁琐而又冗余的话，听起来一定让人不习惯。那就对了，因为这是使用谷歌翻译直译过来的，说到这我怎么感觉我要回去偷偷补个英语，但是注意了，接下来大白话的语述并不影响你去了解并使用他。

**os 和 pathlib.Path 的区别**

相对于 os 模块的 path 方法，Python3 标准库 pathlib 模块的 Path 对路径的操作会更简单。

+ 获取当前文件路径
```python
# python语言实现
# /Users/mac/test.py
import os
print(os.getcwd())  # '/Users/mac'
```

```python
# 在 pathlib 模块中，通过 Path.cwd() 方法可以直接获取当前文件路径
# python语言实现
# /Users/mac/test.py
import pathlib
print(pathlib.Path.cwd())  # PosixPath('/Users/mac')
```

+ 获取上层/上层目录

```python
# python语言实现

# /Users/mac/test.py
import os
print(os.path.dirname(os.getcwd()))
```

+ 路径拼接
如果你要在他父目录中拼接路径，通过 os 模块你可能需要写这么一长串代码

```python
print(os.path.join(os.path.dirname(os.getcwd()), '路径拼接', '真麻烦'))  # D:\pythonProjects\t2\路径拼接\真麻烦
```

当你使用 pathlib 的时候，我们一起来感受他的便捷之处吧！

```python
# python语言实现

# /Users/mac/test.py
import os
import  pathlib

paths = ('路径拼接', '真麻烦')
print(pathlib.Path.cwd().parent.joinpath(*paths))  # /Users/路径拼接/真麻烦

```

## shutil 模块

## xml 模块

## subprocess 模块

## configparser模块

## Python 常用模块小结

[参考1](https://blog.csdn.net/m0_67155975/article/details/123189181)

[参考2](https://zhuanlan.zhihu.com/p/475661402)

[python常用第三方库、框架、工具 ](https://www.cnblogs.com/xfeiyun/p/16669105.html)
