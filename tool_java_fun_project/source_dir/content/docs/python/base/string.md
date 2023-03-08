---
title: "python string"
date: 2021-04-15
draft: false
weight: 7
---

## 字符串用法

| 方法 | 描述 |
| --- | --- |
| capitalize() | 把首字符转换为大写。 |
| casefold() | 把字符串转换为小写。 |
| center() | 返回居中的字符串。 |
| count() | 返回指定值在字符串中出现的次数。 |
| encode() | 返回字符串的编码版本。 |
| endswith() | 如果字符串以指定值结尾，则返回 true。 |
| expandtabs() | 设置字符串的 tab 尺寸。 |
| find() | 在字符串中搜索指定的值并返回它被找到的位置。 |
| format() | 格式化字符串中的指定值。 |
| format_map() | 格式化字符串中的指定值。 |
| index() | 在字符串中搜索指定的值并返回它被找到的位置。 |
| isalnum() | 如果字符串中的所有字符都是字母数字，则返回 True。 |
| isalpha() | 如果字符串中的所有字符都在字母表中，则返回 True。 |
| isdecimal() | 如果字符串中的所有字符都是小数，则返回 True。 |
| isdigit() | 如果字符串中的所有字符都是数字，则返回 True。 |
| isidentifier() | 如果字符串是标识符，则返回 True。 |
| islower() | 如果字符串中的所有字符都是小写，则返回 True。 |
| isnumeric() | 如果字符串中的所有字符都是数，则返回 True。 |
| isprintable() | 如果字符串中的所有字符都是可打印的，则返回 True。 |
| isspace() | 如果字符串中的所有字符都是空白字符，则返回 True。 |
| istitle() | 如果字符串遵循标题规则，则返回 True。 |
| isupper() | 如果字符串中的所有字符都是大写，则返回 True。 |
| join() | 把可迭代对象的元素连接到字符串的末尾。 |
| ljust() | 返回字符串的左对齐版本。 |
| lower() | 把字符串转换为小写。 |
| lstrip() | 返回字符串的左修剪版本。 |
| maketrans() | 返回在转换中使用的转换表。 |
| partition() | 返回元组，其中的字符串被分为三部分。 |
| replace() | 返回字符串，其中指定的值被替换为指定的值。 |
| rfind() | 在字符串中搜索指定的值，并返回它被找到的最后位置。 |
| rindex() | 在字符串中搜索指定的值，并返回它被找到的最后位置。 |
| rjust() | 返回字符串的右对齐版本。 |
| rpartition() | 返回元组，其中字符串分为三部分。 |
| rsplit() | 在指定的分隔符处拆分字符串，并返回列表。 |
| rstrip() | 返回字符串的右边修剪版本。 |
| split() | 在指定的分隔符处拆分字符串，并返回列表。 |
| splitlines() | 在换行符处拆分字符串并返回列表。 |
| startswith() | 如果以指定值开头的字符串，则返回 true。 |
| strip() | 返回字符串的剪裁版本。 |
| swapcase() | 切换大小写，小写成为大写，反之亦然。 |
| title() | 把每个单词的首字符转换为大写。 |
| translate() | 返回被转换的字符串。 |
| upper() | 把字符串转换为大写。 |
| zfill() | 在字符串的开头填充指定数量的 0 值。 |


```python
str1 = "a,b"

print(str1.split(","))
list_a = ['c','biancheng','net']

print('.'.join(list_a))

print(f"''.join : {'-'.join(['2','3'])}")




```


+ 切片 string[start:stop:step]

+ start 起始值: 子字符串的开始位置的索引
+ stop 结束值: 子字符串的结束位置的索引，注意不包括stop出的字符
+ step 步长: 一个数字，指定切片的长度，默认值为 1


```python
str2 = "hello world"

print(f"获取最后一个字符: {str2[-1]}")
print(f"获取字符串的最后n个字符: {str2[-4:]}")
print(f"获取字符串的最前n个字符: {str2[0:5]}")
print(f"获取字符串的步长为2字符: {str2[::2]}")


```
