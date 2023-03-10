---
title: "python 字典"
date: 2021-04-15
draft: false
weight: 4
---


## 字典（Dictionary）

> 字典有点像一个json对象 且不是json数组对象


+ 简单举例

```python
dic1 = {'a': 'dsgs'}

print(dic1)
print(dic1.get("a"))

```


### 创建并打印字典

```python


import  random

dicX = {}

for x in range(1,10):
    dicX[str(x)] = random.randrange(int("10") , int("10"+str(x)))

print(dicX)
```


### 检查键是否存在


```python
import random

dic1 = {'x':random.randrange(1,3000),'y':random.randrange(1,3000)}

print(dic1)

print(f"x in dic1 :{'x' in dic1}")
```


### 访问字典

```python
dic20 = {'a':'zxc'} 
print(dic20['a'])
print(dic20.get("a"))
```

### 更改值

```python
set2 = {"x":1,'y':2000}

print(set2)

set2['x'] = 2

print(set2)
```

### values()



```python
import random


dicX = {}

for x in range(1,10):
    dicX[str(x)] = random.randrange(int("10") , int("10"+str(x)))

print(dicX)

print(dicX.values())


for x in dicX.values():
    print(x)]
```



### 删除项目

```python
thisdict =	{
  "brand": "Porsche",
  "model": "911",
  "year": 1963
}
thisdict.pop("model")
print(thisdict)
```


### del 关键字删除具有指定键名的项目

```python
thisdict =	{
  "brand": "Porsche",
  "model": "911",
  "year": 1963
}
del thisdict["model"]
print(thisdict)
```


### del 关键字也可以完全删除字典

```python
thisdict =	{
  "brand": "Porsche",
  "model": "911",
  "year": 1963
}
del thisdict

print(thisdict) #this 会导致错误，因为 "thisdict" 不再存在。
```


### clear() 关键字清空字典

```python
thisdict =	{
  "brand": "Porsche",
  "model": "911",
  "year": 1963
}
thisdict.clear()
print(thisdict)
```


### copy() 方法来复制字典

```python

thisdict =	{
  "brand": "Porsche",
  "model": "911",
  "year": 1963
}
mydict = thisdict.copy()
print(mydict)

```




### 嵌套字典

```python
child1 = {
    "name": "Phoebe Adele",
    "year": 2002
}
child2 = {
    "name": "Jennifer Katharine",
    "year": 1996
}
child3 = {
    "name": "Rory John",
    "year": 1999
}

myfamily = {
    "child1": child1,
    "child2": child2,
    "child3": child3
}

print(myfamily)

```


