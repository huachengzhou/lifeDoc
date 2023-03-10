---
title: "Python JSON"
date: 2021-04-15
draft: false
weight: 17
---

JSON 是用于存储和交换数据的语法。

JSON 是用 JavaScript 对象表示法（JavaScript object notation）编写的文本

### 解析 JSON - 把 JSON 转换为 Python


```python
import json

# 一些 JSON:
x = '{ "name":"Bill", "age":63, "city":"Seatle"}'

# 解析 x:

y = json.loads(x)

print(f"json 类型 {type(y)}")
print(y)

```

### 把 Python 转换为 JSON

```python
import  json

dict2 = {'name':'李世民','age':18}

json1 = json.dumps(dict2)

print(json1)
```