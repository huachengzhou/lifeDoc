---
title: "python datetime"
date: 2021-04-15
draft: false
weight: 14
---


## datetime

### 构造函数

+  创建日期对象


```python
import datetime
import time

time1 = datetime.datetime(year=2008,month=4,day=12)
time2 = datetime.datetime(2027,6,23)

print(time1)
print(time2)
```


### 日期对象格式化为可读字符串

+ 格式化参考

| 指令 | 描述 | 实例 | TIY |
| --- | --- | --- | --- |
| %a | Weekday，短版本 | Wed | 试一试 |
| %A | Weekday，完整版本 | Wednesday | 试一试 |
| %w | Weekday，数字 0-6，0 为周日 | 3 | 试一试 |
| %d | 日，数字 01-31 | 31 | 试一试 |
| %b | 月名称，短版本 | Dec | 试一试 |
| %B | 月名称，完整版本 | December | 试一试 |
| %m | 月，数字01-12 | 12 | 试一试 |
| %y | 年，短版本，无世纪 | 18 | 试一试 |
| %Y | 年，完整版本 | 2018 | 试一试 |
| %H | 小时，00-23 | 17 | 试一试 |
| %I | 小时，00-12 | 05 | 试一试 |
| %p | AM/PM | PM | 试一试 |
| %M | 分，00-59 | 41 | 试一试 |
| %S | 秒，00-59 | 08 | 试一试 |
| %f | 微妙，000000-999999 | 548513 | 试一试 |
| %z | UTC 偏移 | +0100 | 试一试 |
| %Z | 时区 | CST | 试一试 |
| %j | 天数，001-366 | 365 | 试一试 |
| %U | 周数，每周的第一天是周日，00-53 | 52 | 试一试 |
| %W | 周数，每周的第一天是周一，00-53 | 52 | 试一试 |
| %c | 日期和时间的本地版本 | Mon Dec 31 17:41:00 2018 | 试一试 |
| %x | 日期的本地版本 | 12/31/18 | 试一试 |
| %X | 时间的本地版本 | 17:41:00 | 试一试 |
| %% | A % character | % | 试一试 |

+ 例子

```python
import datetime

x = datetime.datetime(2019, 10, 1)


print(x.strftime("%y"))
print(x.strftime("%Y"))
print(x.strftime("%m"))
print(x.strftime("%d"))

def formateDate(date):
    lista = []
    lista.append(date.strftime("%Y"))
    lista.append(date.strftime("%m"))
    lista.append(date.strftime("%d"))
    return "-".join(lista)


print(formateDate(x))
```

+ strptime

```python
import datetime

str1 = '2022-06-11 11:03'
str2 = '2022-06-11'

# 字符串 匹配格式必须一致 否则会报错
time1 = datetime.datetime.strptime(str2,"%Y-%m-%d")
time2 = datetime.datetime.strptime(str1,"%Y-%m-%d %H:%M")

print(time1)
print(time2)
```



+ 使用正则表达式 将字符串转为日期


### 日期加减比较



+ 日期加减 使用 timedelta实现

```python

import datetime

# timedelta 就只有这几个参数  要是年和月换成天或者周就是 python3.6
# def __new__(cls, days=0, seconds=0, microseconds=0,
#                 milliseconds=0, minutes=0, hours=0, weeks=0)

date1 = datetime.datetime(2019, 10, 1)
print(date1)

# 增加天
# datetime.timedelta
date1 = date1 + datetime.timedelta(days=1)

print(date1)

# 增加小时
date1 = date1 + datetime.timedelta(hours=1)
print(date1)

# 增加分钟
date1 = date1 + datetime.timedelta(minutes=2)
print(date1)

# 减少分钟
date1 = date1 + datetime.timedelta(minutes=-1)
print(date1)

# 增加秒
date1 = date1 + datetime.timedelta(seconds=20)
print(date1)

# 增加毫秒
date1 = date1 + datetime.timedelta(milliseconds=10)
print(date1)

# 增加周
date1 = date1 + datetime.timedelta(weeks=1)
print(date1)

# 增加一年
# 闰年366天 , 平年365天 公历年份是整百数的，必须是400的倍数才是世界闰年（如2000是世纪闰年，1900不是世纪闰年
if (date1.year + 1) % 400 == 0:
    date1 = date1 + datetime.timedelta(days=366)
    print("闰年")
else:
    print("平年")
    date1 = date1 + datetime.timedelta(days=365)

print(date1)


# 计算给定月份的总天数
def computeMonthDay(monthMin, monthMax, year):
    tempDay = 0
    day2Month = 0
    if year % 400 == 0:
        day2Month = 29
    else:
        day2Month = 28
    day31List = [1, 3, 5, 7, 8, 10, 12]
    day30List = [4, 6, 9, 11]
    for x in range(monthMin + 1, monthMax + 1):
        print(f"x:{x}")
        if x == 2:
            tempDay += day2Month
        elif x in day31List:
            tempDay += 31
        elif x in day30List:
            tempDay += 30
    return tempDay


# 在当前日期任意增加几月 但是没有超过12
month1 = 12
if month1 + date1.month <= 12:
    date1 = date1 + datetime.timedelta(days=computeMonthDay(date1.month, date1.month + month1, date1.year))
else:
    month2 = 12 - month1
    date1 = date1 + datetime.timedelta(days=computeMonthDay(date1.month, date1.month + month2, date1.year))
    date1 = date1 + datetime.timedelta(days=computeMonthDay(0, month1 - month2, date1.year))

print(date1)

# 任意月份
# month2 输入的任意月份
month2 = 31
# month2X 实际添加的月份
month2X = 0
# 实际添加的年份
year1 = 0
if month2 >= 12:
    year1 = int(month2 / 12)
    month2X = month2 - year1 * 12
else:
    year1 = 0
    month2X = month2 - year1 * 12


print(f"year:{year1} ; month2X:{month2X}")

if year1 > 0:
    for x in range(0,year1):
        if (date1.year + 1) % 400 == 0:
            date1 = date1 + datetime.timedelta(days=366)
        else:
            date1 = date1 + datetime.timedelta(days=365)
else:
    if month2X + date1.month <= 12:
        date1 = date1 + datetime.timedelta(days=computeMonthDay(date1.month, date1.month + month2X, date1.year))
    else:
        month2 = 12 - month2X
        date1 = date1 + datetime.timedelta(days=computeMonthDay(date1.month, date1.month + month2, date1.year))
        date1 = date1 + datetime.timedelta(days=computeMonthDay(0, month2X - month2, date1.year))

# 结束

print(date1)
```

+ 日期比较

```python

import datetime
first_date = datetime.date(2022, 2, 22)
second_date = datetime.date(2022, 3, 1)

print(first_date < second_date)
```