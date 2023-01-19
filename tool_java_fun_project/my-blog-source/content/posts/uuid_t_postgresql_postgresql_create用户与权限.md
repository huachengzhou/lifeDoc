---
title : 'postgresql > create用户与权限'
date : '2021-02-15'
draft : false
tags : ["postgresql"]
categories : ["databases","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---


## 权限
> 系统权限 role和user都是用户,只不过role属性不能登录当然也可以指定
> 超级权限 不做权限检查(实际中是很危险的)
```
Pg权限分为两部分，一部分是“系统权限”或者数据库用户的属性，可以授予role或user（两者区别在于login权限）；
一部分为数据库对象上的操作权限。对超级用户不做权限检查，其它走acl。
对于数据库对象，开始只有所有者和超级用户可以做任何操作，其它走acl。
在pg里，对acl模型做了简化，组和角色都是role，用户和角色的区别是角色没有login权限。
```

### 超级权限
+ 创建超级用户(create user alice with superuser password '123456';)系统不会做权限操作校验,仅仅是不能够创建用户与删除用户

### 系统权限
* (create role blake password '123456';)(create user bob password '123456';)(create database testdb;)
* (grant all on database testdb to bob;grant all on database testdb to blake;)
* 测试如下 用户bob可以登录而blake不能登录直接抛出了FATL:role blake is not 'permitted to log in'
* ( drop database testdb;drop role blake;drop user bob;)

* (create user bob password '123456';)(alter user bob set default_transaction_read_only=on;grant all on database testdb to bob;grant select on all tables in schema public to bob; )
* (revoke all on database testdb from bob;revoke select on all tables in schema public from bob;)删除前撤销(drop user bob)

* (grant DELETE,UPDATE,SELECT,INSERT on all tables in schema public to bob;)

## 查询
+ 查询系统中用户的权限(SELECT * FROM pg_roles;)
+ 显示用户和用户的用户属性(\du)
+ 查看全部可设置的管理权限(\h)

## 删除
+ (drop user bob) (drop role bob)要注意在删除前必须把权限先删除,还有一种笨办法就是把数据库先备份然后在删除这时就可以删除用户了

## 系统登录
+ (sudo su postgres -c psql template1)(psql -U alice -d testdb -h localhost -W)参数含义: -U指定用户 -d要连接的数据库 -h要连接的主机 -W提示输入密码。

## 修改系统密码
+ (sudo  passwd -d postgres)
```
sudo su postgres -c psql template1
会出现 postgres=#
输入postgres=# \password
输入２次密码
然后输入(退出)
postgres=# \q
```

