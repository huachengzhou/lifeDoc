---
title: "python 基础学习"
date: 2021-04-15
draft: false
weight: 1
---






# python 学习笔记

+ 学习之前注意python版本区别,因为目前很多都是3.x版本了

+ 本学习笔记基于3.x+



## Python基础


### 输入和输出



#### 输出

+ Python print() 函数

```python
print(*objects, sep=' ', end='\n', file=sys.stdout, flush=False)
# objects -- 复数，表示可以一次输出多个对象。输出多个对象时，需要用 , 分隔
# sep -- 用来间隔多个对象，默认值是一个空格
# end -- 用来设定以什么结尾。默认值是换行符 \n，我们可以换成其他字符串
# file -- 要写入的文件对象
# flush -- 输出是否被缓存通常决定于 file，但如果 flush 关键字参数为 True，流会被强制刷新
# 返回值 无

```


+ 用print()在括号中加上字符串，就可以向屏幕上输出指定的文字


```python
print('hello world')
```

+ print()函数也可以接受多个字符串，用逗号“,”隔开，就可以连成一串输出

```python
print('漫','步','人','生')
```

+ print()也可以打印整数，或者计算结果

```python
print(12) 

print(12 + 20)
```

+ 设置间隔符

```python
print("美丽","人生",sep="-")
# 美丽-人生
```

+ 多行内容

```python


str = '''
ab
cd
'''

```


#### 输入

+ 用户从电脑输入一些字符 Python提供了一个input()，可以让用户输入字符串，并存放到一个变量里

```python
print("请输入你的名字!")
myName =input() 
print("你的名字是",myName,"!",sep="",end="")

#请输入你的名字!
#张三
#你的名字是张三!
```


### 数据类型和变量

+ 任何编程语言都需要处理数据，比如数字、字符串、字符等，我们可以直接使用数据，也可以将数据保存到变量中，方便以后使用
+ 变量（Variable）可以看成一个小箱子，专门用来“盛装”程序中的数据。每个变量都拥有独一无二的名字，通过变量的名字就能找到变量中的数据

+ 在编程语言中，将数据放入变量的过程叫做赋值（Assignment）。Python 使用等号=作为赋值运算符，具体格式为：

```python
name = 'value'
# name 表示变量名；value 表示值，也就是要存储的数据
```

+ 变量是标识符的一种，它的名字不能随便起，要遵守 Python 标识符命名规范，还要避免和 Python 内置函数以及 Python 保留字重名

```python
pi = 3.14
name = "blake" 
n = 20
n = 'dsdh'

```

+ 变量类型检测

```python
print(type('string'))
print(type(3.1415))
print(type(100))
print(type(''))

# <class 'str'>
# <class 'float'>
# <class 'int'>
# <class 'str'>

```



