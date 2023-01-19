---
title : 'mysql查询'
date : '2021-02-15'
draft : false
tags : ["mysql"]
categories : ["databases","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---


# mysql学习(下面所有都是针对mysql而言)

## sql排序语句
* 升序
+ (select f.* from fruits f WHERE s_id IN (101,102) order by f_name)==(select f.* from fruits f WHERE s_id IN (101,102) order by f_name asc)
* 对于sql的升序而言,当使用了order by之后如果不添加desc那么默认是升序 order by f_name 和 order by  f_name   ASC 效果一致
* 降序
+ (select f.* from fruits f WHERE s_id not IN (101,102) order by f_name DESC )
* order by之后加上DESC结果集就是降序
> 上面结合了 关键字in可以看到 in (101,102)和not in (101,102)

## 带between and 的范围查询
+ (select f.* from fruits f WHERE f.f_price between 2.00 and 14.00)查询价格在2.00元到14.00元之间的数据,这样也可以(select f.* from fruits f WHERE f.f_price>2.00 and f.f_price<12.67)

## 带like的字符串匹配查询 
+ (select f.* from fruits f WHERE f.f_name like '%g%')查询f_name包含g的记录 
+ (select f.* from fruits f WHERE f.f_name like 'b%')查询以b开头的记录,同理结尾的字符也是一样原理

## 查询null值
+ (select c.* from customers c WHERE c.c_email is null)查询email为null的数据

## 带and 的多条件查询 
+ (select f.* from fruits f WHERE f.s_id='101' and f.f_price>=5)

## 带or 的多条件查询 
+ (select f.* from fruits f WHERE f.s_id='101' or f.s_id='102')

## 查询结果不重复 
+ (select distinct f.* from fruits f)添加了过滤字段distinct

## 分组查询 
+ (select f.s_id,count(*) as total from fruits f group by f.s_id)
+ (select f.s_id,count(*) as total,group_concat(f.f_name) as g_name from fruits f group by f.s_id) 这里使用了一个函数group_concat
+ (select f.s_id,count(*) as total,group_concat(f.f_name) as g_name,sum(f.f_price) as price from fruits f group by f.s_id)
### HAVING
* [在 SQL 中增加 HAVING 子句原因是，WHERE 关键字无法与合计函数一起使用]
+ (select f.s_id,count(*) as total,group_concat(f.f_name) as g_name,sum(f.f_price) as price from fruits f group by f.s_id having sum(f.f_price)>20)

## 分页查询 
+ (select f.* from fruits f LIMIT 10,5) ||(3-1)*5,5

## 连接查询(多表)
* (select c.*,o.* from customers c,orders o where c.c_id=o.c_id)普通查询
* (select c.*,o.* from customers c inner join orders o on o.c_id=c.c_id)内连接查询,这里需要注意的是内连接查询的是公共部分,必须是两者都有相同的记录
* 外连接包括左外连接和右外连接
* (select c.*,o.* from customers c right join orders o on o.c_id=c.c_id)右连接是orders table和customers table的公共部分+orders表记录
* (select c.*,o.* from customers c left join orders o on o.c_id=c.c_id)左连接是orders table和customers table的公共部分+customers表记录
* (由于mysql不支持全连接full join,所以必须采用其它方法)//select * from orders full join customers on orders.c_id=customers.c_id

## 索引
```
create table myUser(
  id VARCHAR(255) NOT NULL PRIMARY KEY ,
  name VARCHAR(255),
  createTime TIMESTAMP,
  INDEX indexName (name(244))
)ENGINE=InnoDB DEFAULT CHARSET=utf8
```
* (show INDEX from myUser)查看所在表的索引
```
DROP TABLE IF EXISTS user_test;
CREATE TABLE user_test(
 id int AUTO_INCREMENT PRIMARY KEY,
 user_name varchar(30) NOT NULL,
 sex bit(1) NOT NULL DEFAULT b'1',
 city varchar(50) NOT NULL,
 age int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8
```
* 创建一个组合索引： ALTER TABLE user_test ADD INDEX idx_user(user_name , city , age)
匹配最左前缀是指优先匹配最左索引列，如：上面创建的索引可用于查询条件为：（user_name ）、（user_name, city）、（user_name , city , age）

注：满足最左前缀查询条件的顺序与索引列的顺序无关，如：（city, user_name）、（age, city, user_name）

