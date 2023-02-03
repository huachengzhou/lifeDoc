---
title: "mycat 学习与使用"
date: 2020-01-17T15:26:15Z
draft: false
weight: 4
---


## 一:MyCat是什么



一个彻底开源的，面向企业应用开发的大数据库集群

支持事务、ACID、可以替代MySQL的加强版数据库

一个可以视为MySQL集群的企业级数据库，用来替代昂贵的Oracle集群

一个融合内存缓存技术、NoSQL技术、HDFS大数据的新型SQL Server

结合传统数据库和新型分布式数据仓库的新一代企业级数据库产品

一个新颖的数据库中间件产品

**目前仅仅实现了mysql协议**



## 二:MyCat能做什么

+ 1:数据库读写分离

![][img22]
![][img22_]

+ 2:数据分片

![][img23]
![][img23_]

+ 3:多数据源整合

![][img24]
![][img24_]

## 三:MyCat原理

Mycat 的原理中最重要的一个动词是“拦截”，它拦截了用户发送过来的 SQL 语句，首先对 SQL语句做了一些特定的分析：如分片分析、路由分析、读写分离分析、缓存分析等，然后将此 SQL 发往后端的真实数据库，并将返回的结果做适当的处理，最终再返回给用户。


这种方式把数据库的分布式从代码中解耦出来，程序员察觉不出来后台使用 Mycat 还是MySQL。

![][img25]
![][img25_]

## 四:MyCat实战





[参考1](https://www.xwder.com/blog/article/19.html)
[参考2](https://xwder.com/blog/article/20.html)

[img22]:../.././imgs/java/mycat/1-20201228220135643.png
[img22_]:../../../imgs/java/mycat/1-20201228220135643.png
[img23]:../.././imgs/java/mycat/1-20201228220303266.png
[img23_]:../../../imgs/java/mycat/1-20201228220303266.png
[img24]:../.././imgs/java/mycat/1-20201228220530222.png
[img24_]:../../../imgs/java/mycat/1-20201228220530222.png

[img25]:../.././imgs/java/mycat/1-20201228220750004.png
[img25_]:../../../imgs/java/mycat/1-20201228220750004.png