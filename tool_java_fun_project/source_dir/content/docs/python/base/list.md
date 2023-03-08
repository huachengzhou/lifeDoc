---
title: "python list"
date: 2021-04-15
draft: false
weight: 13
---

> 所谓序列，指的是一块可存放多个值的连续内存空间，这些值按一定顺序排列，可通过每个值所在位置的编号（称为索引）访问它们


## 创建

```python
# 定义一个列表
aList = []
```


## 添加新的元素 append , insert ,extend

```python
# 定义一个列表
aList = []
aList.append("a")
aList.insert(len(aList),"insert")

print(aList)

list1 = ["a", "b" , "c"]
list2 = [1, 2, 3]

list1.extend(list2)
print(list1)
```

## 遍历列表

```python
aList = [2,4,5]
for x in aList:
    print(x)
```

## 索引问题

```python
# 第一项的索引为 0
# 末尾索引为 -1
# 倒数第二索引为 -2
针对 删除 del 和访问 ,以及insert都有效
```

## 检查元素是否存在

```python
aList = [2,4,5]
if 1 in aList:
    print('1存在')
else:
    print('1不存在')
```

## 删除元素

```python
aList = []
aList.append("a")
aList.insert(len(aList),"insert")

del aList[-1]

print(aList)

thislist = ["apple", "banana", "cherry"]
thislist.remove("banana")
print(thislist)
```


## 合并列表

```python
lista = [1,2]
listb = [3,4,2]

list3 = lista + listb
print(list3)
```

## 清空列表  clear

```python
lista = [3, 4]
print(lista)
lista.clear()
print(lista)

```

## 修改列表

```python
lista = [3, 4]
print(lista)
lista[-1] = 0
print(lista)
```

## 构造函数 list() 构造函数创建一个新列表 不会影响原来列表

```python
lista = [1, 2]
print(lista)
listc = list(lista)
print(listc)
```

## 复制列表 copy 不会影响原来列表

```python
lista = [3, 2]
print(lista)
listc = lista.copy()
print(listc)
```

## 颠倒列表的顺序  reverse


```python
lista = [3, 2]
print(lista)
lista.reverse()
print(lista)
```

## 返回具有指定值的元素数量  count

```python
lista = [3, 2,'b','b']
print(lista.count('b'))
```

## 返回指定值首次出现的位置  index

```python
lista = [3, 'a','b','b']
print(lista.index('a'))
```

## 删除指定位置的元素  pop

```python
fruits = ['apple', 'banana', 'cherry']

fruits.pop(1)

print(fruits)
```

## 删除具有指定值的项目  remove
```python
fruits = ['apple', 'banana', 'cherry']

fruits.remove('banana')

print(fruits)
```


## 切片

```
使用模式: [start:end:step]
    其中start表示切片开始的位置,默认是0
    end表示切片截止的位置(不包含),默认是列表长度
    step表示切片的步长,默认是1
    当start是0时,可以省略;当end是列表的长度时,可以省略.
    当step是1时,也可以省略,并且省略步长时可以同时省略最后一个冒号.
    此外,当step为负数时,表示反向切片,这时start值应该比end值大.
    注意:切片操作创建了一个新的列表.
```


```python
fruits = ['apple', 'banana', 'cherry', "西红柿tomato", "菠萝pineapple", "西瓜watermelon", "香蕉banana", "柚子shaddock（pomelo）",
          "橙子orange", "苹果apple", "柠檬lemon", "樱桃cherry", "桃子peach", "梨pear", "枣Chinese date（去核枣pitted date）",
          "椰子coconut", "草莓strawberry", "树莓raspberry", "蓝莓blueberry", "黑莓blackberry", "葡萄grape", "甘蔗sugar cane",
          "芒果mango", "木瓜pawpaw或者papaya", "杏子apricot", "油桃nectarine", "柿子persimmon", "石榴pomegranate", "榴莲jackfruit",
          "槟榔果areca nut", "西班牙产苦橙bitter orange", "猕猴桃kiwi fruit or Chinese gooseberry", "金橘cumquat", "蟠桃flat peach",
          "荔枝litchi", "青梅greengage", "山楂果haw", "水蜜桃honey peach", "香瓜、甜瓜musk melon", "李子plum", "杨梅waxberry red bayberry",
          "桂圆longan", "沙果crab apple", "杨桃starfruit", "枇杷loquat", "柑橘tangerine", "莲雾wax-apple", "番石榴 guava肉、蔬菜类"]

print(fruits.copy()[::])  # 返回包含原列表所有元素的新列表

print()
print(fruits.copy()[::-1])  # 返回原列表的一个逆序列表

print()
print(fruits.copy()[::2])  # 取列表下标偶数位元素

print()
print(fruits.copy()[1::2])  # 取列表下标奇数位元素

print(fruits.copy()[0:2])  # 取列表下标0-2的元素
print(fruits.copy()[-4:-1])  # 取列表下标倒数第四到倒数第一的元素



```
