---
title : 'mysql函数'
date : '2021-02-15'
draft : false
tags : ["mysql"]
categories : ["databases","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---

# 日期函数

+ 返回当前日期，只包含年月日 select curdate()

+ 返回当前时间，只包含时分秒 select curtime()

+ 返回当前的日期和时间，年月日时分秒全都包含 select now()

## 提取具体日期类型

+ year() yearweek() ,hour(),month()等等
* select year(now()) as '年',yearweek(now()) as '年,周',hour(now()) as '周',minute(now()) as '小时',month(now()) '月',monthname(now()) '月名字',dayofmonth(now()) as '当月多少日'

+ EXTRACT() 函数用于返回日期/时间的单独部分，比如年、月、日、小时、分钟等等。

* (select extract(year from now()),extract(month from now()),extract(day from now()),extract(hour from now()),extract(minute from now()))

## 日期格式

+ DATE_FORMAT(date,fmt)函数：按字符串 fmt 格式化日期 date 值 (select date_format(now(),'%Y-%m-%d'))

## 日期运算

+ date_add(date,interval number dateType) example (select date_add(now(),interval 2 year) as 'add 2 year date')
  (select date_add(now(),interval -2 hour) as 'add 2')也可以传入负数即回到过去某个时间
  
+ date_sub(date,interval number dateType) example (select date_sub(now(),interval 2 year))

+ datediff(date,date) 计算两个日期之间相差的天数 (select datediff(now(),date_add(now(),interval 2 month)) as '计算两个日期之间相差天数')

# 流程函数

+ if 函数
```
create table salary (userid int,salary decimal(9,2));
insert into salary values(1,1000),(2,2000), (3,3000),(4,4000),(5,5000), (1,null);
```
* (select if(s.salary>2000,'high','low'),s.salary from salary s)

+ IFNULL(value1,value2)函数：这个函数一般用来替换 NULL 值的，我们知道 NULL 值是不能参与数值运算的
* (select ifnull(s.salary,0),s.salary from salary s)当检测到值的时候用0代替


# 数值函数
+ ABS(x)函数：返回 x 的绝对值
* select abs(-56),abs(round(rand()*10))
+ cell(x)函数 返回大于 x 的最大整数值 相当于向上取
* SELECT ceil(0.6),ceiling(0.3),ceil(round(rand()))
+ floor()返回小于 x 的最大整数值 相当于向下取
* SELECT floor(0.6),floor(0.3),floor(round(rand()))
+ mod(x,y) 返回 x/y 的模
* SELECT mod(5,3)
+ rand() 返回 0 到 1 内的随机值
+ ROUND(x,y) 返回参数 x 的四舍五入的有 y 位小数的值 
* SELECT round(2.5,3)
+ sum()函数
* select sum(f.f_price) as '总价格' from fruits f

# 字符串函数
+ CANCAT(S1,S2,…Sn) 连接 S1,S2,…Sn 为一个字符串
* SELECT concat('hello','wrold'),concat(curdate(),' ',curtime())
+ INSERT(str,x,y,instr) 将字符串 str 从第 x 位置开始，y 个字符长的子串替换为字符串 instr(可以用作修改和删除以及增加)
* SELECT insert('Highlights of Premier Li''s news conference',11,0,'---') 在index=11 取0个字符串替换为xxx
+ REPEAT(str,x) 返回 str 重复 x 次的结果
* select REPEAT('Tech aims to help restless sleepers \n',3) 字符串重复3次
+ REPLACE(str,a,b)函数：用字符串 b 替换字符串 str 中所有出现的字符串 a。
* select replace('hello_world!','_',' ') 把下划线替换为空格
+ SUBSTRING(str,x,y)函数：返回从字符串 str 中的第 x 位置起 y 个字符长度的字串。此函数经常用来对给定字符串进行字串的提取(ps也可以用作随机字符串)
* select substring('Century-old folding fan store attracts foreign apprentice',12,8) 截取字符串函数
+ length() 获取字符串长度 select length(''+uuid_short()) as uuidShort , length(uuid()) 这里使用了mysql的uuid


