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


# 写文件

fileName1 = str(random.randrange(100, 100000) + random.randrange(100, 100000) + random.randrange(100, 100000))

paths = ('file', fileName1 + '.txt')

# 判断文件夹是否存在
if pathLib.Path(pathLib.Path.cwd().joinpath('file')).exists():
    pass
else:
    #不存在则建立文件夹
    pathLib.Path.mkdir(pathLib.Path(pathLib.Path.cwd().joinpath('file')))

file1 = pathLib.Path.open(pathLib.Path.cwd().joinpath(*paths), mode="w", encoding="UTF-8")

strList = []
for x in range(1, 100, 2):
    strX = str(time.time() * time.time() * x)
    mn = hashlib.md5(strX.encode(encoding='utf-8'))
    strList.append(mn.hexdigest() + '\n')

print(strList)
file1.writelines(strList)
file1.close()

```

### 写文件 (复杂)

```python
import pathlib as pathLib
import random
import time
import hashlib

# 判断文件夹是否存在
if pathLib.Path(pathLib.Path.cwd().joinpath('file')).exists():
    pass
else:
    # 不存在则建立文件夹
    pathLib.Path.mkdir(pathLib.Path(pathLib.Path.cwd().joinpath('file')))

for dir in ['a', 'b']:
    if pathLib.Path(pathLib.Path.cwd().joinpath(*('file', dir))).exists():
        pass
    else:
        # 不存在则建立文件夹
        pathLib.Path.mkdir(pathLib.Path(pathLib.Path.cwd().joinpath(*('file', dir))))
    pass
    # 写文件

    fileName1 = str(random.randrange(100, 100000) + random.randrange(100, 100000) + random.randrange(100, 100000))

    paths = ('file', dir, fileName1 + '.txt')

    file1 = pathLib.Path.open(pathLib.Path.cwd().joinpath(*paths), mode="w", encoding="UTF-8")

    strList = []
    for x in range(1, 100, 2):
        strX = str(time.time() * time.time() * x)
        mn = hashlib.md5(strX.encode(encoding='utf-8'))
        strList.append(mn.hexdigest() + '\n')

    print(strList)
    file1.writelines(strList)
    file1.close()

print("所有写入完毕!")

```


+ 获取文件列表

```python
import pathlib as pathLib

paths = ('file')

#读取所有文件夹下的文件
fileList = pathLib.Path.iterdir(pathLib.Path.cwd().joinpath(paths))

def ergodicFile(f):
    if f.is_dir():
        print(f"文件夹:{f.absolute()}")
        for ff in f.iterdir():
            ergodicFile(ff)
    else:
        print(f.name)
        print(f.absolute())

for f in fileList:
    ergodicFile(f)
```

### 文件夹压缩 zip

```python
import zipfile as zipUtils
import pathlib as pathLib
import random

# 判断文件夹是否存在
if pathLib.Path(pathLib.Path.cwd().joinpath('file_zip')).exists():
    pass
else:
    #不存在则建立文件夹
    pathLib.Path.mkdir(pathLib.Path(pathLib.Path.cwd().joinpath('file_zip')))

# 压缩文件路径
zip_file_path = pathLib.Path.cwd().joinpath(("file_zip"), str(random.randrange(1, 100000)) + "srmdir_all.zip")

print(zip_file_path)
zipFile = zipUtils.ZipFile(zip_file_path, 'w', zipUtils.ZIP_DEFLATED)

fileList = pathLib.Path.iterdir(pathLib.Path.cwd().joinpath(('file')))

for f in fileList:
    if f.is_file():
      pass
    # 目标地址path  源地址path
    zipFile.write(f.absolute(), f.name)
    pass

zipFile.close()
```
### 文件夹复杂压缩 zip

```python

import zipfile as zipUtils
import pathlib as pathLib
import random
import os as osUtils

# 压缩文件
zip_file_path = pathLib.Path(pathLib.Path.cwd().joinpath('file_zip'))

# 压缩文件路径
sourceFileDir = pathLib.Path(pathLib.Path.cwd().joinpath(('file')))

# 判断文件夹是否存在
if zip_file_path.exists():
    pass
else:
    # 不存在则建立文件夹
    pathLib.Path.mkdir(zip_file_path)

zip_file_path = pathLib.Path.joinpath(zip_file_path, str(random.randrange(1, 100000)) + "srmdir_all.zip")
print(zip_file_path)
print(sourceFileDir)
zipFile = zipUtils.ZipFile(zip_file_path, 'w', zipUtils.ZIP_DEFLATED)


def zipFileFun(sourceFileDir, zipFile):
    for dirpath, dirnames, filenames in osUtils.walk(sourceFileDir):
        # 这一句很重要，不replace的话，就从根目录开始复制
        fpath = dirpath.replace(str(sourceFileDir), '')
        # 这句话理解我也点郁闷，实现当前文件夹以及包含的所有文件的压缩
        fpath = fpath and fpath + osUtils.sep or ''
        for filename in filenames:
            zipFile.write(osUtils.path.join(dirpath, filename), fpath + filename)
            print('压缩成功', osUtils.path.join(dirpath, filename), fpath + filename)


zipFileFun(sourceFileDir, zipFile)

zipFile.close()

print("复杂压缩结束!")

```


 ### 文件夹解压 zip

```python
import zipfile as zipUtils
import pathlib as pathLib
import random
import os as osUtils


# 解压文件路径
extracta_file_path = pathLib.Path(pathLib.Path.cwd().joinpath('extracta'))

# 压缩文件路径
sourceFileDir = pathLib.Path(pathLib.Path.cwd().joinpath(*('file_zip','69134srmdir_all.zip')))

# 判断文件夹是否存在
if extracta_file_path.exists():
    pass
else:
    # 不存在则建立文件夹
    pathLib.Path.mkdir(extracta_file_path)


zip_file = zipUtils.ZipFile(sourceFileDir)
# 解压

zip_extract = zip_file.extractall(extracta_file_path)
zip_file.close()
```


### 简单属性

```python
import pathlib as pathLib
import os as osUtils

fileDir = pathLib.Path.cwd().joinpath(('DemoOther.py'))

print(f"返回电脑用户的目录: {fileDir.home()}")
print(f"返回文件当前所在目录: {fileDir.cwd()}")
print(f"返回文件: {fileDir.parts}")
print(f"返回根目录: {fileDir.anchor}")
print(f"返回根目录: {fileDir.root}")
print(f"返回父级目录: {fileDir.parent}")
print(f"返回所有上级目录的列表: {fileDir.parents}")
print(f"后缀: {fileDir.suffix}")
print(f"返回文件后缀列表: {fileDir.suffixes}")
print(f"获得文件属性: {fileDir.stat()}")
print(f"返回文件名+文件后缀: {fileDir.name}")
print(f"返回文件名: {fileDir.stem}")
print(f"获得文件路径: {str(fileDir)}")
print(f"获得文件路径base: {str(fileDir).replace(osUtils.sep + fileDir.name, '')}")

```

###  pathlib和os常用操作对比


| pathlib操作 | os及os.path操作 | 功能描述 |
| --- | --- | --- |
| Path.resolve() | os.path.abspath() | 获得绝对路径 |
| Path.chmod() | os.chmod() | 修改文件权限和时间戳 |
| Path.mkdir() | os.mkdir() | 创建目录 |
| Path.rename() | os.rename() | 文件或文件夹重命名，如果路径不同，会移动并重新命名 |
| Path.replace() | os.replace() | 文件或文件夹重命名，如果路径不同，会移动并重新命名，如果存在，则破坏现有目标。 |
| Path.rmdir() | os.rmdir() | 删除目录 |
| Path.unlink() | os.remove() | 删除一个文件 |
| Path.unlink() | os.unlink() | 删除一个文件 |
| Path.cwd() | os.getcwd() | 获得当前工作目录 |
| Path.exists() | os.path.exists() | 判断是否存在文件或目录name |
| Path.home() | os.path.expanduser() | 返回电脑的用户目录 |
| Path.is_dir() | os.path.isdir() | 检验给出的路径是一个文件 |
| Path.is_file() | os.path.isfile() | 检验给出的路径是一个目录 |
| Path.is_symlink() | os.path.islink() | 检验给出的路径是一个符号链接 |
| Path.stat() | os.stat() | 获得文件属性 |
| PurePath.is_absolute() | os.path.isabs() | 判断是否为绝对路径 |
| PurePath.joinpath() | os.path.join() | 连接目录与文件名或目录 |
| PurePath.name | os.path.basename() | 返回文件名 |
| PurePath.parent | os.path.dirname() | 返回文件路径 |
| Path.samefile() | os.path.samefile() | 判断两个路径是否相同 |
| PurePath.suffix | os.path.splitext() | 分离文件名和扩展名 |


