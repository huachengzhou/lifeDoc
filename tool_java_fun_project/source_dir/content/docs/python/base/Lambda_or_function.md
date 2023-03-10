---
title: "python 函数"
date: 2021-04-15
draft: false
weight: 2
---


## function

> 函数是一种仅在调用时运行的代码块

+ 创建函数

在 Python 中，使用 def 关键字定义函数

```python
def fun1():
    print("这是一个函数")

def fun2 ():
    pass


fun2()
fun1()
```


+ 默认参数值


```python
def funX(a = 'zkdsh'):
    print(a)


funX()
```


+ 返回值

```python
def addFun(x,y):
    return x + y


print(f"addFun 调用 {addFun(2,3)}")
```

## Lambda

lambda 函数是一种小的匿名函数。

lambda 函数可接受任意数量的参数，但只能有一个表达式


+ 语法

```
lambda arguments : expression
```


+ 简单尝试

``` python
import random
import math

fun1 = lambda a, b: print(a + b)

fun1(random.randrange(1, 100), random.randrange(1, 100))


def fun (x = 0,y = 0):
    return lambda :  math.pow(x,2)+math.pow(y,2)


# 函数
value1 = fun(3,4)

print(value1)


# 再次调用函数
print(value1())


print(math.pow(3,2)+math.pow(4,2))
# 开平方
print(math.pow(math.pow(3,2)+math.pow(4,2),0.5))
# 开平方
print(math.sqrt(math.pow(3,2)+math.pow(4,2)))
```

+ lambad 妙用

```python
def myfunc(n):
  return lambda a : a * n

mytripler = myfunc(3)


print(mytripler(11))
```


