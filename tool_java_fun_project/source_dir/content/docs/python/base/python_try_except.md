---
title: "Python Try Except"
date: 2021-04-15
draft: false
weight: 15
---

try 块允许您测试代码块以查找错误。

except 块允许您处理错误。

finally 块允许您执行代码，无论 try 和 except 块的结果如何

### 异常处理

当我们调用 Python 并发生错误或异常时，通常会停止并生成错误消息。

可以使用 try 语句处理这些异常：

```python
try:
    print(x)
except:
    print("x没有定义")
```


### 多个异常

```python
try:
    print(x)
except NameError:
    print("参数 x 没有定义")
except:
    print("Something else went wrong")

```


### Else

如果没有引发错误，那么您可以使用 else 关键字来定义要执行的代码块：


```python
try:
    print("你好啊!")
except:
    print("抛出错误了")
else:
    print("继续执行")

```


### Finally

如果指定了 finally 块，则无论 try 块是否引发错误，都会执行 finally 块


```python

try:
    x1 = 2 / 0
except:
    print("异常 除数为0")
finally:
    print("不管抛出异常与否都会执行")
```


### 引发异常

抛出（引发）异常，请使用 **raise** 关键词

```python


def divFunction(x,y):
    if y == 0:
        raise Exception("除数不能为0")
    return x / y


print(f" 3 % 0: {divFunction(3,0)}")
```

