---
title: "python set"
date: 2021-04-15
draft: false
weight: 3
---

## 集合（Set）

> 集合是无序和无索引的集合。在 Python 中，集合用花括号编写

> 无法通过引用索引来访问 set 中的项目，因为 set 是无序的，项目没有索引

> 集合一旦创建，无法更改项目，但是可以添加新项目

```python
import random
import time
import datetime

set1 = {random.random() * 100, time.time_ns(), datetime.datetime.year, datetime.datetime.month, datetime.datetime.day}


print(f"set1:{set1}")

for x in set1:
    print(x)


# print(set1[0])
# del set1[0]
```

### 添加 / 添加多个

> 集合不能空 否则add会出问题的

```python
import datetime
import random

nowDate = datetime.datetime.now()

set2 = {nowDate.year, nowDate.month, nowDate.day}

print(set2)
set2.add("kk")
print(set2)

set3 = {random.random() * 100, "vvv"}
set2.update(set3)

print(set2)

```




### pop-随机删除

> 随机删除一个元素，并且返回删除的结果。pop不能指定参数，也就是不能指定想要删除的元素


```python
import datetime
import random

nowDate = datetime.datetime.now()

setX = {"0"}

# 集合不能空 否则add会出问题的
setX.add("hh")

setX.add(random.random())
setX.add(random.randrange(int(random.random() * 100), int(random.random() * 100)+100))
setX.add(random.randrange(int(random.random() * 99), int(random.random() * 100)+100))
setX.add(random.randrange(int(random.random() * 98), int(random.random() * 100)+100))
setX.add(random.randrange(int(random.random() * 97), int(random.random() * 100)+100))
setX.add(random.randrange(int(random.random() * 96), int(random.random() * 100)+100))
setX.add(random.randrange(int(random.random() * 95), int(random.random() * 100)+100))

print(setX)
print(setX.pop())


print(setX)

```

### remove-指定删除

> 删除的元素必须在集合中。如果不存在，则会报错

```python
import datetime
import random


setX = {"0","a"}


for xx in range(1, 300, 5):
    setX.add(random.randrange(int(random.random() * xx), int(random.random() * xx+100)+100))

setX.add("v")

print(setX)

setX.remove("v")

print(setX)
```


### discard-指定删除

> 指定删除某个元素，如果元素不存在，也不会报错


```python
set1 = {'c', 'html', 'java', 'javascript', 'python'}
print(set1)
set1.discard("1")

print(set1)
```


### clear-清空集合

```python
set1 = {'c', 'html', 'java', 'javascript', 'python'}
print(set1)
set1.discard("1")

print(set1)

set1.clear()
print(set1)

```


[参考](https://zhuanlan.zhihu.com/p/404175485)
