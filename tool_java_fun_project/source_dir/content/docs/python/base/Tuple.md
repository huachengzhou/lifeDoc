---
title: "python 元组"
date: 2023-03-06
draft: false
weight: 7
---


## 元组

+ 元组（Tuple）

> 元组是有序且不可更改的集合。在 Python 中，元组是用圆括号编写的


```python
import  time
tupleX = (time.time(),time.time_ns())
print(tupleX)
```

+ 访问元组项目


```python
tupleIndex = (2, 3, 'a', 'c')
print(f"倒数第一项:{tupleIndex[-1]}")
print(f"倒数第二项:{tupleIndex[-2]}")
print(f"第一项:{tupleIndex[0]}")
```

+ 关于索引范围 -1就说倒数第一项 -2就是倒数第二项   0就第一项

+ 检查项目是否存在

```python
betweenTuple = ('a','k','4','7')
print(f"a属于元组:{'a' in betweenTuple}")
print(f"b不属于元组:{'a' in betweenTuple}")
```

+ 元组长度

```python
betweenTuple = ('a','k','4','7')
print(f"a属于元组:{'a' in betweenTuple}")
print(f"b不属于元组:{'a' in betweenTuple}")
print(f"元组长度:{len(betweenTuple)}")
```