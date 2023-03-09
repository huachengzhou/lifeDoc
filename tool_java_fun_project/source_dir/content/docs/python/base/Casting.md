---
title: "python 类型转换"
date: 2021-04-15
draft: false
weight: 5
---


## Casting

+ int() - 用整数字面量、浮点字面量构造整数（通过对数进行下舍入），或者用表示完整数字的字符串字面量
+ float() - 用整数字面量、浮点字面量，或字符串字面量构造浮点数（提供表示浮点数或整数的字符串）
+ str() - 用各种数据类型构造字符串，包括字符串，整数字面量和浮点字面量


```python
import random
import time

str1 = str(random.random() * 100)
print(f"str1 类型: {type(str1)}",str1)


int1 = int(random.random() * 100)
print(f"int1 类型: {type(int1)}",int1)

float1 = float(random.random() * 100)
print(f"float1 类型: {type(float1)}",float1)
```