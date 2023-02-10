---
title: "python 基础学习"
date: 2021-04-15
draft: false
weight: 1
---







# python 学习笔记

+ 学习之前注意python版本区别,因为目前很多都是3.x版本了

+ 本学习笔记基于3.x+



## Python基础


### 输入和输出



#### 输出

+ Python print() 函数

```python
print(*objects, sep=' ', end='\n', file=sys.stdout, flush=False)
# objects -- 复数，表示可以一次输出多个对象。输出多个对象时，需要用 , 分隔
# sep -- 用来间隔多个对象，默认值是一个空格
# end -- 用来设定以什么结尾。默认值是换行符 \n，我们可以换成其他字符串
# file -- 要写入的文件对象
# flush -- 输出是否被缓存通常决定于 file，但如果 flush 关键字参数为 True，流会被强制刷新
# 返回值 无

```


+ 用print()在括号中加上字符串，就可以向屏幕上输出指定的文字


```python
print('hello world')
```

+ print()函数也可以接受多个字符串，用逗号“,”隔开，就可以连成一串输出

```python
print('漫','步','人','生')
```

+ print()也可以打印整数，或者计算结果

```python
print(12) 

print(12 + 20)
```

+ 设置间隔符

```python
print("美丽","人生",sep="-")
# 美丽-人生
```

+ 多行内容

```python


str = '''
ab
cd
'''

```


#### 输入

+ 用户从电脑输入一些字符 Python提供了一个input()，可以让用户输入字符串，并存放到一个变量里

```python
print("请输入你的名字!")
myName =input() 
print("你的名字是",myName,"!",sep="",end="")

#请输入你的名字!
#张三
#你的名字是张三!
```


### 数据类型和变量

+ 任何编程语言都需要处理数据，比如数字、字符串、字符等，我们可以直接使用数据，也可以将数据保存到变量中，方便以后使用
+ 变量（Variable）可以看成一个小箱子，专门用来“盛装”程序中的数据。每个变量都拥有独一无二的名字，通过变量的名字就能找到变量中的数据

+ 在编程语言中，将数据放入变量的过程叫做赋值（Assignment）。Python 使用等号=作为赋值运算符，具体格式为：

```python
name = 'value'
# name 表示变量名；value 表示值，也就是要存储的数据
```

+ 变量是标识符的一种，它的名字不能随便起，要遵守 Python 标识符命名规范，还要避免和 Python 内置函数以及 Python 保留字重名

```python
pi = 3.14
name = "blake" 
n = 20
n = 'dsdh'

```

+ 变量类型检测

```python
print(type('string'))
print(type(3.1415))
print(type(100))
print(type(''))

# <class 'str'>
# <class 'float'>
# <class 'int'>
# <class 'str'>

```


#### 基本类型

+ 布尔类型、整型、浮点型、字符串、列表、元组、集合、字典

```python
# 数值
digital_value = 0

# 字符串
str_value = "" 

# 列表
list_value = []

# 字典
ditc_value = {}

# 元组
tuple_value = ()

# Python中关于空类型的判断使用的内建函数any(),
```


```python
# 列表 也是数组 奇怪吧
list_value = [2,3,5]

print('length',len(list_value))


# 字典
ditc_value = {'a':'2'}

print("ditc_value",ditc_value)


# 元组 相当于常量
tuple_value = (2,'b')

print('tuple_value',tuple_value)
```


#### Python 运算符

```python
import random

# 简单运算符
a = 10 - 1
b = 11 * (2 + 5)
c = random.random() / 20
d = 20 % 4
# 这里是12的2次方
e = 12 ** 2
# 这里是9除以2 向下取整
f = 9 // 2

y1 = random.random() >= random.random()
y2 = random.random() == random.random()
y3 = random.random() <= random.random()

y4 = 2
y4 -= 1

y5 = 2
y5 += 1


print('a', '=', a)
print('b', '=', b)
print('c', '=', c)
print('d', '=', d)
print('e', '=', e)
print('f', '=', f)


print('y1', '=', y1)
print('y2', '=', y2)
print('y3', '=', y3)
print('y4', '=', y4)
print('y5', '=', y5)



```

#### 条件语句

```python
import random
# python 压根就不支持 switch
# python三元运算符  也是没有的
a1 = random.random()
a2 = random.random()

if (a1 >= a2):
    print("a1大于a2", a1, " ", a2)
    print("结束")

b1 = 12 + random.random()
b2 = 12 + random.random()

if (b1 == b2):
    print("b1==b2")
    print("比较结束")
elif (b1 < b2):
    print("b1<b2")
    print("比较结束")
else:
    print("不符合")
    print("比较结束")

```

#### 循环语句

```python
import random

for x in range(2, 10):
    print("x:", x)
    print(" ")

maxValue = 50

while (maxValue > 0):
    maxValue -= random.random()
    print("maxValue:", maxValue)
    print(" ")

minValue = 0

while (minValue < 100):
    minValue += random.random() * 10
    print("minValue:", minValue)
    print(" ")



for x in range(2,20):
    if(x % 2 == 0):
        print("偶数:",x)
    elif(x % 3 == 0):
        print("能被3整除:", x)
    else:
        print("临时变量:", x)



#
```

#### break 语句

```python


str1 = "人生五十年,如梦亦如幻。有生斯有死,壮士复何憾"

for x in str1:
    print("x:",x)
    if(x == ","):
        break




str2 = "Hubei couple opt for romantic, not lavish, wedding"

for y in str2:
    if(y == ' '):
        continue
    else:
        print(y)


#
```

#### pass 语句

Python pass 是空语句，是为了保持程序结构的完整性。

pass 不做任何事情，一般用做占位语句。

```python
import random

index = 0
for i in range(2, int(random.random() * 100), 3):
    if (i % 2 >= 3):
        pass
    print(i)


pass
```


#### 字符串

字符串是 Python 中最常用的数据类型。我们可以使用引号 ( ' 或 " ) 来创建字符串。

```python


str1 = 'The Most Beautiful Swiss Books China Tour will be on exhibit in Shanghai from February 10 to 13 at Shanghai Ming Contemporary Art Museum'


print(str1)
print(str1[0])
print(str1[1])
print(max(str1))
print(min(str1))
print(str1.upper())

```


#### 列表(List)


```python
import random

# 自己定义一个字符串函数
def randomString():
    arr = []
    str_value = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&'()*+,-./:;?@[\]^_`{|}~"
    len_value = len(str_value)
    for x in range(1,10):
        index = int(random.uniform(0,len_value))
        arr.append(str_value[index])
    return "-".join(arr)


arr1 = [int(random.random() * 10), int(random.random() * 10), int(random.random() * 10), int(random.random() * 10)]
print(arr1)

print(arr1[0])

print(arr1[1])

print("len",len(arr1))

arr1.reverse()
print(arr1)

arr1.sort()

print(arr1)

arr2 = []
arr3 = []

print(randomString())

for x in range(1,5):
    arr2.append(randomString())
    arr3.append(randomString())
    pass



print(arr2)
# 删除第一个元素
del arr2[0]
print(arr2)


arr2.insert(0,'a')
print(arr2)
arr2.pop(1)
print(arr2)
arr2.remove("a")
print(arr2)
```


####  函数

```python
# 打印一下
def printNew(temp):
    print(temp)
    pass


# 加法
def add(a, b):
    return a + b


# 减法
def sub(x, y):
    return x - y


# 除法
def div(x, y):
    return x / y


# 取模
def takingMold(m, n):
    return m % n


# 次方
def runPower(m, n):
    return m ** n


a = runPower(2, 3)

print(a)

```

### 重要函数

#### range

range()的三种创建方式：

第一种：只有一个参数（小括号中只给了一个数）即range(stop) 

第二种：range(start,stop) （给了两个参数，即小括号中给了两个数）

第三种：range(start,stop,step)：创建一个在[start,stop)之间，步长为step;

```python
arr0 = range(10)

for kk in arr0:
    print(kk)

print("--------------------------")

arr1 = range(2, 7)

for i in arr1:
    print(i)

print("..............................")

arr2 = range(20, 100, 10)
for k in arr2:
    print(k)

```

## 模块

> Python 模块(Module)，是一个 Python 文件，以 .py 结尾，包含了 Python 对象定义和Python语句

+ mathModule.py

```python
import random


# 随机整数
def randomInt():
    temp = int(random.random() * 1000)
    temp += int(random.uniform(0, 100))
    return temp


# 随机浮点数
def randomFloat():
    temp = 0
    temp += random.random() * 10
    temp *= random.random()
    return temp


# 获取单独一个asii 字符
def getOneChar():
    # 小写字母a-z：97-122
    arr1 = range(97, 122)
    # 大写字母A-Z：65-90
    arr2 = range(65, 90)
    # 数字0-9：48-57
    arr3 = range(48, 57)
    arr0 = []
    arr0.extend(arr1)
    arr0.extend(arr2)
    arr0.extend(arr3)
    index = int(random.uniform(0, len(arr0)))
    tempNumber = arr0[index]
    return chr(tempNumber)


# 获取随机字符串
def randomString(tempLen):
    temp = ""
    for x in range(1, tempLen):
        temp += getOneChar()
    return temp


```

```python
import mathModule
# 只有同级目录才能这样

print(mathModule.randomInt())
print(mathModule.randomFloat())
print(mathModule.getOneChar())
print(mathModule.randomString(92))
```

[参考1](https://www.runoob.com/python/python-numbers.html)
[参考2](http://c.biancheng.net/view/2171.html)
[参考3](https://www.liaoxuefeng.com/wiki/1016959663602400/1017106984190464)









