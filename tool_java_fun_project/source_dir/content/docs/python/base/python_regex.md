---
title: "Python RegEx"
date: 2021-04-15
draft: false
weight: 16
---

RegEx 或正则表达式是形成搜索模式的字符序列。

RegEx 可用于检查字符串是否包含指定的搜索模式

## RegEx 模块

导入 re 模块后，就可以开始使用正则表达式了



### RegEx 函数


re 模块提供了一组函数，允许我们检索字符串以进行匹配：

| 函数 | 描述 |
| --- | --- |
| findall | 返回包含所有匹配项的列表 |
| search | 如果字符串中的任意位置存在匹配，则返回 Match 对象 |
| split | 返回在每次匹配时拆分字符串的列表 |
| sub | 用字符串替换一个或多个匹配项 |

### 元字符

元字符是具有特殊含义的字符：

| 字符 | 描述 | 示例 | TIY |
| --- | --- | --- | --- |
| [] | 一组字符 | "[a-m]" | 试一试 |
| \\ | 示意特殊序列（也可用于转义特殊字符） | "\\d" | 试一试 |
| . | 任何字符（换行符除外） | "he..o" | 试一试 |
| ^ | 起始于 | "^hello" | 试一试 |
| $ | 结束于 | "world$" | 试一试 |
| * | 零次或多次出现 | "aix*" | 试一试 |
| + | 一次或多次出现 | "aix+" | 试一试 |
| {} | 确切地指定的出现次数 | "al{2}" | 试一试 |
| \| | 两者任一 | "falls|stays" | 试一试 |
| () | 捕获和分组 |  |  |


### 特殊序列

特殊序列指的是 **\\** 后跟下表中的某个字符，拥有特殊含义：

| 字符 | 描述 | 示例 | TIY |
| --- | --- | --- | --- |
| \\A | 如果指定的字符位于字符串的开头，则返回匹配项 | "\\AThe" | 试一试 |
| \\b | 返回指定字符位于单词的开头或末尾的匹配项 | r"\\bain"  r"ain\\b" | 试一试 |
| \\B | 返回指定字符存在的匹配项，但不在单词的开头（或结尾处） | r"\\Bain"  r"ain\\B" | 试一试  试一试 |
| \\d | 返回字符串包含数字的匹配项（数字 0-9） | "\\d" | 试一试 |
| \\D | 返回字符串不包含数字的匹配项 | "\\D" | 试一试 |
| \\s | 返回字符串包含空白字符的匹配项 | "\\s" | 试一试 |
| \\S | 返回字符串不包含空白字符的匹配项 | "\\S" | 试一试 |
| \\w | 返回一个匹配项，其中字符串包含任何单词字符  （从 a 到 Z 的字符，从 0 到 9 的数字和下划线 _ 字符） | "\\w" | 试一试 |
| \\W | 返回一个匹配项，其中字符串不包含任何单词字符 | "\\W" | 试一试 |
| \\Z | 如果指定的字符位于字符串的末尾，则返回匹配项 | "Spain\\Z" | 试一试 |


### 集合（Set）

集合（Set）是一对方括号 [] 内的一组字符，具有特殊含义：

| 集合 | 描述 | 试一试 |
| --- | --- | --- |
| [arn] | 返回一个匹配项，其中存在指定字符（a，r 或 n）之一 | 试一试 |
| [a-n] | 返回字母顺序 a 和 n 之间的任意小写字符匹配项 | 试一试 |
| [^arn] | 返回除 a、r 和 n 之外的任意字符的匹配项 | 试一试 |
| [0123] | 返回存在任何指定数字（0、1、2 或 3）的匹配项 | 试一试 |
| [0-9] | 返回 0 与 9 之间任意数字的匹配 | 试一试 |
| [0-5][0-9] | 返回介于 0 到 9 之间的任何数字的匹配项 | 试一试 |
| [a-zA-Z] | 返回字母顺序 a 和 z 之间的任何字符的匹配，小写或大写 | 试一试 |
| [+] | 在集合中，+、*、.、|、()、$、{} 没有特殊含义，因此 [+] 表示：返回字符串中任何 + 字符的匹配项 | 试一试 |





## 例子 模块


+ search() 函数 （仅仅是第一个查到的）

search() 函数搜索字符串中的匹配项，如果存在匹配则返回 Match 对象。

如果有多个匹配，则仅返回首个匹配项

search()会全文扫描，匹配整个字符串，直到找到第一个符合的，就返回第一个符合的

```python
import  re as reUtils


txt1 = "China is a great country"
result1 = reUtils.search("^China.*country$",txt1)

print(result1.group())
print(result1.span())
print(result1.end())
print(result1.start())
print(len(txt1))

```

+ match函数 (必须从第一个开始)

re.match从字符串的起始位置匹配一个模式（从头开始匹配），如果不是起始位置匹配成功的话，match()返回none。

函数语法：

| 参数 | 描述 |
| --- | --- |
| pattern | 匹配的正则表达式 |
| string | 要匹配的字符串 |
| flags | 标志位，用于控制正则表达式的匹配方式，如：是否区分大小写、多行匹配等。 |

```python
import  re as regexUtils

print(regexUtils.match('www','www.runoob.com').span()) #在起始位置匹配
print(regexUtils.match('www','www.runoob.com').group())
print(regexUtils.match('com','www.runoob.com')) #不在起始位置匹配

```

+ findall函数

找到re匹配的所有字符串，返回一个列表

```python
import  re as regexUtils
str1 = "2023年2月份，全国居民消费价格同比上涨1.0%。其中，城市上涨1.0%，农村上涨1.0%；食品价格上涨2.6%，非食品价格上涨0.6%；消费品价格上涨1.2%，服务价格上涨0.6%。1­­—2月平均，全国居民消费价格比上年同期上涨1.5%"
list1 = regexUtils.findall("\\d+",str1)
print(list1)
```

+ finditer函数 返回Match 列表  

参数和findall一样

```python
# coding=UTF-8
# 解决 SyntaxError: Non-UTF-8 code starting with '\xe7' in file
import  re as regexUtils


str1 = "2月份，食品烟酒类价格同比上涨2.1%，影响CPI（居民消费价格指数）上涨约0.59个百分点。食品中，鲜果价格上涨8.5%，影响CPI上涨约0.18个百分点；蛋类价格上涨7.8%，影响CPI上涨约0.05个百分点；粮食价格上涨2.7%，影响CPI上涨约0.05个百分点；畜肉类价格上涨1.9%，影响CPI上涨约0.06个百分点，其中猪肉价格上涨3.9%，影响CPI上涨约0.05个百分点；水产品价格下降1.5%，影响CPI下降约0.03个百分点。"


matches = regexUtils.finditer("\\d+",str1)

for x in matches:
    print(x.group())
```

+ compile函数

compile()为预加载正则表达式，用于编译正则表达式，生成一个Pattern对象，供match()和search()两个函数使用。
语法格式为：

```python
re.compile(pattern[,flags])
```

参数含义：

pattern：一个字符串形式的正则表达式
flags：可选，表示匹配模式，具体参数为如下：


| re.l | 忽略大小写 |
| --- | --- |
| re.L | 表示特殊字符集\\w,\\W,\\b,\\B,\\s,\\S，依赖于当前环境 |
| re.M | 多行模式 |
| re.S | 包含换行符在内的任意字符 |
| re.U | 表示特殊字符集\\w,\\W,\\b,\\B,\\d,\\D,\\s,\\S,依赖于Unicode字符属性数据库 |
| re.X | 为了增加可读性，忽略空格和#后面的注释 |

```text
1.指标解释
居民消费价格指数（Consumer Price Index，简称CPI）是度量居民生活消费品和服务价格水平随着时间变动的相对数，综合反映居民购买的生活消费品和服务价格水平的变动情况。
2.统计范围
居民消费价格统计调查涵盖全国城乡居民生活消费的食品烟酒、衣着、居住、生活用品及服务、交通通信、教育文化娱乐、医疗保健、其他用品及服务等8大类、268个基本分类的商品与服务价格。
3.调查方法
采用抽样调查方法抽选确定调查网点，按照“定人、定点、定时”的原则，直接派人到调查网点或从互联网采集原始价格。数据来源于全国31个省（区、市）约500个市县、近10万家价格调查点，包括商场（店）、超市、农贸市场、服务网点和互联网电商等。
4.数据说明
由于“四舍五入”原因，有时会出现合计数据与分类数据高值或低值相同的情况。
```

```python
# coding=UTF-8
# 解决 SyntaxError: Non-UTF-8 code starting with '\xe7' in file
import pathlib
import re as regexUtils


paths = ('file', 'Demo8.txt')

file1 = pathlib.Path.open(pathlib.Path.cwd().joinpath(*paths), encoding="UTF-8")

list1 = file1.readlines()

str1 = "".join(list1)


rule1 = "\\d+....."

compile1 = regexUtils.compile(rule1,regexUtils.X)

matches = compile1.finditer(str1)
# compile1.findall()
# compile1.match()
# compile1.search()
# compile1.split()
# compile1.sub()

for x in matches:
    print(x.group())


```


+ sub() 函数

> sub() 函数把匹配替换为选择的文本

```python
# coding=UTF-8
# 解决 SyntaxError: Non-UTF-8 code starting with '\xe7' in file
import pathlib
import re as regexUtils
import random

str1 = "China is a great country"
x = regexUtils.sub("\\s", str(random.randrange(1,1000)), str1)
y = regexUtils.sub("\\s", "<->", str1)

print(x)
print(y)
```

+ split() 函数

```python
# coding=UTF-8
# 解决 SyntaxError: Non-UTF-8 code starting with '\xe7' in file
import pathlib
import re as regexUtils


str1 = """
李杜诗篇万口传，至今已觉不新鲜。
出自清代：赵翼的《论诗五首》

满眼生机转化钧，天工人巧日争新。
预支五百年新意，到了千年又觉陈。

李杜诗篇万口传，至今已觉不新鲜。
江山代有才人出，各领风骚数百年。

只眼须凭自主张，纷纷艺苑漫雌黄。
矮人看戏何曾见，都是随人说短长。

少时学语苦难圆，只道工夫半未全。
到老始知非力取，三分人事七分天。

诗解穷人我未空，想因诗尚不曾工。
熊鱼自笑贪心甚，既要工诗又怕穷。
"""

list1 = regexUtils.split("\\W",str1)

# print(list1)

for ss in list1:
    print(ss)



```
