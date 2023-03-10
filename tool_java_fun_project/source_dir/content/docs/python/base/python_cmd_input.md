---
title: "Python 命令行输入"
date: 2021-04-15
draft: false
weight: 18
---

命令行输入
Python 允许命令行输入。

这意味着我们能够要求用户输入。

Python 3.6 中的方法与 Python 2.7 略有不同。

Python 3.6 使用 input() 方法。

Python 2.7 使用 raw_input() 方法

+ 例子

```python
# Python 3.6

print("请输入您的姓名")
name = input()
print("请输入您的年龄")
age = input()

print(f"您的姓名:{name} ; 您的年龄:{age}")


# 请输入您的姓名
# 张三
# 请输入您的年龄
# 25
# 您的姓名:张三 ; 您的年龄:25
```

