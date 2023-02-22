---
title: "python 文件"
date: 2021-04-15
draft: false
weight: 3
---


## 文件

+ open()

open() 函数用于创建或打开指定文件，该函数的常用语法格式如下：

```
file = open(file_name [, mode='r' [ , buffering=-1 [ , encoding = None ]]])
```

此格式中，用 [] 括起来的部分为可选参数，即可以使用也可以省略。其中，各个参数所代表的含义如下：

+ file：表示要创建的文件对象。
+ file_name：要创建或打开文件的文件名称，该名称要用引号（单引号或双引号都可以）括起来。需要注意的是，如果要打开的文件和当前执行的代码文件位于同一目录，则直接写文件名即可；否则，此参数需要指定打开文件所在的完整路径。
+ mode：可选参数，用于指定文件的打开模式。可选的打开模式如表 1 所示。如果不写，则默认以只读（r）模式打开文件。
+ buffering：可选参数，用于指定对文件做读写操作时，是否使用缓冲区（本节后续会详细介绍）。
+ encoding：手动设定打开文件时所使用的编码格式，不同平台的 ecoding 参数值也不同，以 Windows 为例，其默认为 cp936（实际上就是 GBK 编码）。

+ open 函数支持的文件打开模式

| 模式 | 意义 | 注意事项 |
| --- | --- | --- |
| r | 只读模式打开文件，读文件内容的指针会放在文件的开头。 | 操作的文件必须存在。 |
| rb | 以二进制格式、采用只读模式打开文件，读文件内容的指针位于文件的开头，一般用于非文本文件，如图片文件、音频文件等。 |
| r+ | 打开文件后，既可以从头读取文件内容，也可以从开头向文件中写入新的内容，写入的新内容会覆盖文件中等长度的原有内容。 |
| rb+ | 以二进制格式、采用读写模式打开文件，读写文件的指针会放在文件的开头，通常针对非文本文件（如音频文件）。 |
| w | 以只写模式打开文件，若该文件存在，打开时会清空文件中原有的内容。 | 若文件存在，会清空其原有内容（覆盖文件）；反之，则创建新文件。 |
| wb | 以二进制格式、只写模式打开文件，一般用于非文本文件（如音频文件） |
| w+ | 打开文件后，会对原有内容进行清空，并对该文件有读写权限。 |
| wb+ | 以二进制格式、读写模式打开文件，一般用于非文本文件 |
| a | 以追加模式打开一个文件，对文件只有写入权限，如果文件已经存在，文件指针将放在文件的末尾（即新写入内容会位于已有内容之后）；反之，则会创建新文件。 |   |
| ab | 以二进制格式打开文件，并采用追加模式，对文件只有写权限。如果该文件已存在，文件指针位于文件末尾（新写入文件会位于已有内容之后）；反之，则创建新文件。 |   |
| a+ | 以读写模式打开文件；如果文件存在，文件指针放在文件的末尾（新写入文件会位于已有内容之后）；反之，则创建新文件。 |   |
| ab+ | 以二进制模式打开文件，并采用追加模式，对文件具有读写权限，如果文件存在，则文件指针位于文件的末尾（新写入文件会位于已有内容之后）；反之，则创建新文件。 |   |


+ File对象的属性

| 属性 | 描述 |
| --- | --- |
| file.closed | 返回true如果文件已被关闭，否则返回false。 |
| file.mode | 返回被打开文件的访问模式。 |
| file.name | 返回文件的名称。 |
| file.softspace | 如果用print输出后，必须跟一个空格符，则返回false。否则返回true。 |


+ 如下实例：

```python
def fileF4(dir):
    f1 = open(dir, "r+", encoding="UTF-8")
    print("文件名: ", f1.name)
    print("是否已关闭: ", f1.closed)
    print("访问模式: ", f1.mode)
fileF4("D:\\pythonProjects\\t2\\readme.md")
```

+ open() 使用的一些例子

```python
import os
import random
import time

dir1 = "D:\\pythonProjects\\t2\\打包编辑器安装.md"


def fileF1(dir):
    f1 = open(dir, "r", encoding="UTF-8")

    # 读取
    # file 表示已打开的文件对象；size 作为一个可选参数，用于指定一次最多可读取的字符（字节）个数，如果省略，则默认一次性读取所有内容
    # print(f1.read())
    print(f1.read(20))

    # 关闭文件
    f1.close()


def fileF2(dir):
    f1 = open(dir, "r+", encoding="UTF-8")
    # file 为打开的文件对象；size 为可选参数，用于指定读取每一行时，一次最多读取的字符（字节）数
    print(f1.readline())
    print(f1.readline(1))
    print(f1.readline(2))
    print(f1.readline(5))

    # 关闭文件
    f1.close()


def fileF3(dir):
    f1 = open(dir, "r+", encoding="UTF-8")
    # readlines() 函数用于读取文件中的所有行，它和调用不指定 size 参数的 read() 函数类似，只不过该函数返回是一个字符串列表，其中每个元素为文件中的一行内容。
    lines = f1.readlines()
    for str in lines:
        print(str)
    f1.close()


def fileF4(dir):
    f1 = open(dir, "r+", encoding="UTF-8")
    print("文件名: ", f1.name)
    print("是否已关闭: ", f1.closed)
    print("访问模式: ", f1.mode)


def fileF5():
    # write()方法可将任何字符串写入一个打开的文件。需要重点注意的是，Python字符串可以是二进制数据，而不是仅仅是文字。
    # write()方法不会在字符串的结尾添加换行符('\n')：
    # 语法 fileObject.write(string)

    num1 = int(time.time())
    num2 = int(random.random() * 100 * random.random()) * int(random.random() * 100) + int(random.random() * 100 * random.random())
    str2 = os.path.abspath(os.path.join(os.getcwd(), os.pardir)) + "\\file" + "\\" + str(num1) + ".txt"
    fo = open(str2, "w")
    fo.write(str(num2 + time.time()))
    fo.flush()
    fo.close()

def fileF6():
    strList = []
    for x in range(0,100):
        strList.append(str(time.time() * time.time()) + '\n' )
    str2 = os.path.abspath(os.path.join(os.getcwd(), os.pardir)) + "\\file" + "\\" + str(float(time.time())) + "_writelines.txt"
    fo = open(str2, "w")
    # 写入函数只有 write() 和 writelines() 函数，而没有名为 writeline 的函数
    fo.writelines(strList)

    fo.flush()
    fo.close()

# fileF1(dir1)

# fileF2(dir1)

# fileF3(dir1)

# fileF4(dir1)

# fileF5()

fileF6()
```

## OS

+ os.path 模块

| 方法 | 说明 |
| --- | --- |
| os.getcwd()  | 返回当前工作目录 |
| os.path.abspath(path) | 返回 path 的绝对路径。 |
| os.path.basename(path) | 获取 path 路径的基本名称，即 path 末尾到最后一个斜杠的位置之间的字符串。 |
| os.path.commonprefix(list) | 返回 list（多个路径）中，所有 path 共有的最长的路径。 |
| os.path.dirname(path) | 返回 path 路径中的目录部分。 |
| os.path.exists(path) | 判断 path 对应的文件是否存在，如果存在，返回 True；反之，返回 False。和 lexists() 的区别在于，exists()会自动判断失效的文件链接（类似 Windows 系统中文件的快捷方式），而 lexists() 却不会。 |
| os.path.lexists(path) | 判断路径是否存在，如果存在，则返回 True；反之，返回 False。 |
| os.path.expanduser(path) | 把 path 中包含的 "~" 和 "~user" 转换成用户目录。 |
| os.path.expandvars(path) | 根据环境变量的值替换 path 中包含的 "$name" 和 "${name}"。 |
| os.path.getatime(path) | 返回 path 所指文件的最近访问时间（浮点型秒数）。 |
| os.path.getmtime(path) | 返回文件的最近修改时间（单位为秒）。 |
| os.path.getctime(path) | 返回文件的创建时间（单位为秒，自 1970 年 1 月 1 日起（又称 Unix 时间））。 |
| os.path.getsize(path) | 返回文件大小，如果文件不存在就返回错误。 |
| os.path.isabs(path) | 判断是否为绝对路径。 |
| os.path.isfile(path) | 判断路径是否为文件。 |
| os.path.isdir(path) | 判断路径是否为目录。 |
| os.path.islink(path) | 判断路径是否为链接文件（类似 Windows 系统中的快捷方式）。 |
| os.path.ismount(path) | 判断路径是否为挂载点。 |
| os.path.join(path1[, path2[, ...]]) | 把目录和文件名合成一个路径。 |
| os.path.normcase(path) | 转换 path 的大小写和斜杠。 |
| os.path.normpath(path) | 规范 path 字符串形式。 |
| os.path.realpath(path) | 返回 path 的真实路径。 |
| os.path.relpath(path[, start]) | 从 start 开始计算相对路径。 |
| os.path.samefile(path1, path2) | 判断目录或文件是否相同。 |
| os.path.sameopenfile(fp1, fp2) | 判断 fp1 和 fp2 是否指向同一文件。 |
| os.path.samestat(stat1, stat2) | 判断 stat1 和 stat2 是否指向同一个文件。 |
| os.path.split(path) | 把路径分割成 dirname 和 basename，返回一个元组。 |
| os.path.splitdrive(path) | 一般用在 windows 下，返回驱动器名和路径组成的元组。 |
| os.path.splitext(path) | 分割路径，返回路径名和文件扩展名的元组。 |
| os.path.splitunc(path) | 把路径分割为加载点与文件。 |
| os.path.walk(path, visit, arg) | 遍历path，进入每个目录都调用 visit 函数，visit 函数必须有 3 个参数(arg, dirname, names)，dirname 表示当前目录的目录名，names 代表当前目录下的所有文件名，args 则为 walk 的第三个参数。 |
| os.path.supports_unicode_filenames | 设置是否可以将任意 Unicode 字符串用作文件名。 |


```python


import  os

import  time

# 返回当前工作目录
print(os.getcwd())

# 返回 path 的绝对路径
print(os.path.abspath(os.getcwd()))

dir1x = os.getcwd() + "\\"+str(int(time.time()))

# 创建目录
os.mkdir(dir1x)
print(dir1x)

# os.chdir(dir1x)
# print("新目录",os.getcwd())


# 获取 path 路径的基本名称，即 path 末尾到最后一个斜杠的位置之间的字符串 如 readme.md
print(os.path.basename("D:\\pythonProjects\\t2\\readme.md"))

# 判断路径是否为文件
print(os.path.isfile("D:\\pythonProjects\\t2\\readme.md"))

# 判断路径是否为目录
print(os.path.isdir("D:\\pythonProjects\\t2"))
```

```python
import os

import time

import random

str2 = os.path.abspath(os.path.join(os.getcwd(), os.pardir)) + "\\file" + "\\" + "_writelines.txt"
strDir = os.path.abspath(os.path.join(os.getcwd(), os.pardir)) + "\\file" + "\\" + str(random.random())
str21 = os.path.abspath(os.path.join(os.getcwd(), os.pardir)) + "\\file" + "\\" + "_zzx.txt"
str3 = os.path.dirname(str2) + "\\_v0000.text"

os1 = open(str2, "w")
os2 = open(str21, "w")

strList = []
for x in range(0, 100):
    strList.append(str(time.time() * time.time()) + '\n')

os1.writelines(strList)
os1.flush()
os1.close()

os2.write(os.getcwd())
os2.flush()
os2.close()



print(str3)
print(str2)
# 重命名
os.rename(str2, str3)


print(str21)

# 删除文件
os.remove(str21)

os.mkdir(strDir)
print(strDir)

# 删除文件夹
os.rmdir(strDir)
```
