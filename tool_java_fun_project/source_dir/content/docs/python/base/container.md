---
title: "Python 容器问题"
date: 2021-04-15
draft: false
weight: 19
---


## 容器



### 各个容器相互转换

+ 字典数据容器转为其他几种容器时

```python
my_dict = {'key1': 1, 'key2': 2, 'key3': 3}  # 先写一组字典类型的数据

print(str(my_dict))  # 字典转字符串是保留了value  字典仅仅在转为字符串的时候是保留了value值

print(list(my_dict))  # 字典转列表没有保留value

print(tuple(my_dict))  # 字典转元组没有保留value

print(set(my_dict))  # 字典转集合没有保留value

# 结果

"""
{'key1': 1, 'key2': 2, 'key3': 3}
['key1', 'key2', 'key3']
('key1', 'key2', 'key3')
{'key2', 'key1', 'key3'}
"""
```



+ 元组转换为集合





### 容器通用用法


