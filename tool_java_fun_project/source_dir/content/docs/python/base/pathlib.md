---
title: "python pathlib"
date: 2021-04-15
draft: false
weight: 12
---

# pathlib

## 文件读写

### 读

```python
import pathlib as pathLib

paths = ('file', 'f.txt')

file1 = pathLib.Path.open(pathLib.Path.cwd().joinpath(*paths), mode="r+", encoding="UTF-8")
list1 = file1.readlines()
for x in list1:
    print(x)
file1.close()

```

### 写

```python
import pathlib as pathLib
import random
import time
import hashlib

fileName1 = str(random.randrange(100, 100000) + random.randrange(100, 100000) + random.randrange(100, 100000))

paths = ('file', fileName1 + '.txt')

file1 = pathLib.Path.open(pathLib.Path.cwd().joinpath(*paths), mode="w", encoding="UTF-8")

strList = []
for x in range(1, 100, 2):
    strX = str(time.time() * time.time() * x)
    mn = hashlib.md5(strX.encode(encoding='utf-8'))
    strList.append(mn.hexdigest() + '\n')

print(strList)
file1.writelines(strList)

```


+ 获取文件列表

```python
import pathlib as pathLib

paths = ('file')

#读取所有文件夹下的文件
fileList = pathLib.Path.iterdir(pathLib.Path.cwd().joinpath(paths))

for f in fileList:
    if f.is_file():
        print(f.read_text(encoding="utf-8"))
        print(f.name)
```
