
---
title: "mysql新查询"
date: 2020-01-17T15:26:15Z
draft: false
weight: 34
---

## 一:创建计算字段

```mysql
-- 将 fruits.f_name 和 suppliers.s_city创建为了一个新字段连在一起来计算查询
select fruits.f_name as name ,suppliers.s_city as city from suppliers left join fruits on fruits.s_id = suppliers.s_id where 1=1 and  CONCAT(fruits.f_name,'-',suppliers.s_city) = 'apple-Tianjin' ;

-- 员工的部门和名称组合为新字段
select CONCAT_WS('-',dept.d_name,employee.e_name) as name from employee left join dept on dept.d_no = employee.dept_no 
```

## 二:聚集函数

+ 什么是聚合函数

> 聚合函数作用于一组数据，并对一组数据返回一个值

+ 例子一

```mysql
-- 计算表中数量,最小值,最大值,平均值,平均值,累加值
select count(*) as count_value ,MIN(f_price) as min_value,MAX(f_price) as max_value,AVG(f_price) as avg_value ,SUM(f_price) as sum_value from fruits
```

+ 例子二

```mysql

```


## 三:创建联结

## 四:分组查询、过滤

## 五:全文搜索

## 六:行转列&列转行

## 七:重要函数单独说明

###  count 函数

+ 问题：用count(*)，count(1)，count(不存在NULL的列名)谁好呢?

> 其实，对于MyISAM引擎的表是没有区别的(O(1))。这种引擎内部有一计数器在维护着行数。
Innodb引擎的表用count(*),count(1)直接读行数，复杂度是O(n)，因为innodb真的要去数一遍。但好于具体的count(列名)。

+ 问题：能不能使用count(列名)替换count(*)?

> 不要使用 count(列名)来替代 count(*) ， count(*) 是 SQL92 定义的标准统计行数的语法，跟数 据库无关，跟 NULL 和非 NULL 无关。

> count(*)会统计值为 NULL 的行，而 count(列名)不会统计此列为 NULL 值的行。


