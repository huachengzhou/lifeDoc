---
title: "Python 容器问题"
date: 2021-04-15
draft: false
weight: 21
---


## 容器






+ 元组转换为集合


### 强制转换成字符串

+  **str()**

+ 将列表（list）转为字符串

```python
var1 = [1, 2, 3, 4]
var2 = str(var1)
print(type(var2))  # <class 'str'>
print(repr(var2))  # '[1, 2, 3, 4]'
```

+ 注：repr() 函数将对象转化为供解释器读取的形式，返回一个对象的字符串格式

```python
import random

str1 = str(random.randrange(1,2000))

print(str1)

print(repr(str1))

"""
230
'230'
"""
```


+ 将元组（tuple）转为字符串

```python
var1 = (1, 2, 3, 4)
var2 = str(var1)
print(type(var2))  # <class 'str'>
print(repr(var2))  # '(1, 2, 3, 4)'s
```


+ 将集合（set）转为字符串

```python
var1 = {1, 2, 3}
var2 = str(var1)
print(type(var2))  # <class 'str'>
print(repr(var2))  # '{1, 2, 3}'
```

+ 将字典（dict）转为字符串

```python
var1 = {"name": "tom", "age":18}
var2 = str(var1)
print(type(var2))  # <class 'str'>
print(repr(var2))  # "{'name': 'tom', 'age': 18}"
```

+ 将数字（number）转为字符串




```python
var1 = 100
var2 = str(var1)
print(type(var2))  # <class 'str'>
print(repr(var2))  # '100'
```


+ 将布尔（bool）转为字符串

```python
var1 = True
var2 = str(var1)
print(type(var2))  # <class 'str'>
print(repr(var2))  # 'True'
```


总结： **str()** 函数可以将所有的数据类型转为字符串，在当前的数据类型两边加上引号


### 强制转换成列表


*  **list()**

+ 将字符串（str）转为列表

```python
var1 = "Hello"
var2 = list(var1)
print(var2)  # ['H', 'e', 'l', 'l', 'o']
print(type(var2))  # <class 'list'>

```


+ 将元组（tuple）转为列表

```python
var1 = (2, 3, 4)
var2 = list(var1)
print(var2)  # [2, 3, 4]
print(type(var2))  # <class 'list'>

```

+ 将集合（set）转为列表

```python
var1 = {"a", "b", "c"}
var2 = list(var1)
print(var2)  # ['a', 'b', 'c']
print(type(var2))  # <class 'list'>

```

+ 将字典（dict）转为列表

```python
var1 = {"aa": 1, "bb": 2, "cc": 3}
var2 = list(var1)
# 将字典中的键（key）转为列表，不包括值（value）
print(var2)  # ['aa', 'bb', 'cc']
print(type(var2))  # <class 'list'>

```


### 强制转换成元组

* **tuple()**


+ 将字符串（str）转为元组

```python
var1 = "hello"
var2 = tuple(var1)
print(type(var2))  # <class 'tuple'>
print(repr(var2))  # ('h', 'e', 'l', 'l', 'o')
print(var2)  # ('h', 'e', 'l', 'l', 'o')

```


+ 将列表（list）转为元组

```python
var1 = ["a", "b", "c"]
var2 = tuple(var1)
print(type(var2))  # <class 'tuple'>
print(repr(var2))  # ('a', 'b', 'c')

```


+ 将集合（set）转为元组

```python
var1 = {1, 2, 3, 4}
var2 = tuple(var1)
print(type(var2))  # <class 'tuple'>
print(repr(var2))  # (1, 2, 3, 4)
```


+ 将字典（dict）转为元组

```python
var1 = {"a": 1, "b": 2, "c": 3}
var2 = tuple(var1)
print(type(var2))  # <class 'tuple'>
# 将字典中的键（key）转为元组，不包括值（value）
print(repr(var2))  # ('a', 'b', 'c')
```

### 强制转换成集合

+   **set()**

+ 将字符串（str）转为集合




```python
var1 = "你好啊，啊 "
var2 = set(var1)
print(type(var2))  # <class 'set'>
print(repr(var2))  # {'你', '，', '好', ' ', '啊'}
```


+ 将列表（list）转为集合


```python
var1 = [1, 2, 3, 1, 4, 2]
var2 = set(var1)
print(type(var2))  # <class 'set'>
print(repr(var2))  # {1, 2, 3, 4}
```


+ 将元组转为（tuple）集合

```python
var1 = (1, 2, 3, 1)
var2 = set(var1)
print(type(var2))  # <class 'set'>
print(repr(var2))  # {1, 2, 3}

```

+ 将字典（dict）转为集合


```python
var1 = {"name": "tom", "age": 20}
var2 = set(var1)
print(type(var2))  # <class 'set'>
# 将字典中的键（key）转为集合，不包括值（value）
print(repr(var2))  # {'name', 'age'}

```


### 强制转换成字典

要求: 必须是等长的二级容器，并且里面的元素个数只能是2个


+  **dict()**


+ 外层是列表，里层是列表或者元组

```python
list1 = [["a", 2], ["b", 3]]
dict1 = dict(list1)
print(dict1)  # {'a': 2, 'b': 3}
print(type(dict1))  # <class 'dict'>

```


+ 外层是元组，里层是列表或元组

```python
tup1 = (("a", 2), ("b", 3))
dict1 = dict(tup1)
print(dict1)  # {'a': 2, 'b': 3}
print(type(dict1))  # <class 'dict'>

```


+ 外层是集合，里层是列表或元组

```python
set1 = {("a", 2), ("b", 3)}
dict1 = dict(set1)
print(dict1)  # {'a': 2, 'b': 3}
print(type(dict1))  # <class 'dict'>

```



  
## 总结


### 运算符

| 运算符 | 支持的容器类型 |
| --- | --- |
| +（合并） | 字符串、列表、元组 |
| *（复制） | 字符串、列表、元组 |
| in（元素是否存在） | 字符串、列表、元组、字典 |
| not in（元素是否不存在） | 字符串、列表、元组、字典 |



```python
str1 = 'aaa'
str2 = 'bbb'
tuple1 = (10, 20)
tuple2 = ('ccc', 'ddd')
list1 = [10, 20]
list2 = ['iii', 'jjj']
dict1 = {'name': 'YYQX'}
dict2 = {'age': 20}
print(str1 + str2)
print(tuple2 + tuple1)
print(list1 + list2)
print(str1 * 3)
print(tuple2 * 3)
print(list2 * 3)
print('a' in str1)
print('a' not in str1)
print('name' in dict1)
print('age' in dict2)

# 结果
"""
D:\CS\python_venv\my_venv\Scripts\python.exe D:\pythonProjects\moduleProject\container\Demo24.py 
aaabbb
('ccc', 'ddd', 10, 20)
[10, 20, 'iii', 'jjj']
aaaaaaaaa
('ccc', 'ddd', 'ccc', 'ddd', 'ccc', 'ddd')
['iii', 'jjj', 'iii', 'jjj', 'iii', 'jjj']
True
False
True
True

Process finished with exit code 0

"""
```


### 公共方法

| 函数 | 描述 |
| --- | --- |
| len() | 计算容器中元素个数 |
| del或del() | 删除 |
| max() | 返回容器中元素最大值 |
| min() | 返回容器中元素最小值 |
| range(start,end,step) | 生成从start到end的数字，步长为step，供for循环使用(range()生成的序列不包含end数字) |
| enumerate() | 函数用于将一个可遍历的数据对象（如列表、元组和字符串）组合为一个索引序列，同时列出数据和数据下标，一般用在for循环当中 |


```python
str1 = 'abcd'
list1 = [10, 20, 30, 40, 50]
tuple1 = (10, 20, 30, 40, 50)
set1 = {10, 20, 30, 40, 50}
dict1 = {'name': 'YYQX', 'age': 18}
print(len(str1))
print(len(list1))
print(len(tuple1))
print(len(set1))
print(len(dict1))


# 结果

"""
D:\CS\python_venv\my_venv\Scripts\python.exe D:\pythonProjects\moduleProject\container\Demo25.py 
4
5
5
5
2
"""

```


### 转换

1 tuple()
作用：将某个序列转换成元组


2 list()
作用：将某个序列转换成列表

3 set()
作用：将某个序列转换成集合


4 dict()
作用：将二值性数据快速转化为字典


5 str()

字符串与列表转化



























