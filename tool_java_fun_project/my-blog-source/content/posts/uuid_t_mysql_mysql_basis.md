---
title : 'mysql > basis'
date : '2021-02-15'
draft : false
tags : ["mysql"]
categories : ["databases","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---





+ 停止命令：net stop mysql
+ 启动命令：net start mysql

+ 登陆 mysql -u 用户名 -p

+ 查看数据库版本: mysql --version：用于在未登录情况下，查看本机mysql版本,select version();：登录情况下，查看链接的库版本


+ 显示所有数据库：show databases;


+ 进入指定的库：use 库名;

+ 显示当前库中所有的表：show tables;

+ 查看其他库中所有的表：show tables from 库名;

+ 查看表的创建语句：show create table 表名;

+ 查看表结构：desc 表名;


#### SQL的语言分类

```
DQL（Data Query Language）：数据查询语言
select 相关语句

DML（Data Manipulate Language）：数据操作语言
insert 、update、delete 语句

DDL（Data Define Languge）：数据定义语言
create、drop、alter 语句

TCL（Transaction Control Language）：事务控制语言
set autocommit=0、start transaction、savepoint、commit、rollback
```

#### mysql语法规范
```
不区分大小写，但建议关键字大写，表名、列名小写

每条命令最好用英文分号结尾

每条命令根据需要，可以进行缩进或换行

注释

单行注释：#注释文字

单行注释：-- 注释文字  ，注意， 这里需要加空格

多行注释：/* 注释文字  */
```





### MySQL删除数据库中的所有表

```
SELECT CONCAT('drop table ',table_name,';') FROM information_schema.`TABLES` WHERE table_schema='数据库名';
# 然后复制结果 然后重新执行

```






































