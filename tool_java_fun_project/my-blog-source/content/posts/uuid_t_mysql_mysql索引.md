---
title : 'mysql索引'
date : '2021-02-15'
draft : false
tags : ["mysql"]
categories : ["databases","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---

### 索引

> 所有 MySQL 列类型都可以被索引，对相关列使用索引是提高 SELECT 操作性能的最佳途
  径.根据存储引擎可以定义每个表的最大索引数和最大索引长度， 每种存储引擎 （如 MyISAM、
  InnoDB、BDB、MEMORY 等）对每个表至少支持 16 个索引，总索引长度至少为 256 字节。
  大多数存储引擎有更高的限制。
  
> MyISAM 和 InnoDB 存储引擎的表默认创建的都是 BTREE 索引。MySQL 目前还不支持函
  数索引，但是支持前缀索引，即对索引字段的前 N 个字符创建索引。前缀索引的长度跟存
  储引擎相关，对于 MyISAM 存储引擎的表，索引的前缀长度可以达到 1000 字节长，而对于
  InnoDB 存储引擎的表，索引的前缀长度最长是 767 字节。请注意前缀的限制应以字节为单
  位进行测量，而 CREATE TABLE 语句中的前缀长度解释为字符数。
  
> MySQL 中还支持全文本（FULLTEXT）索引，该索引可以用于全文搜索。但是当前最新版
  本中（5.0）只有 MyISAM 存储引擎支持 FULLTEXT 索引，并且只限于 CHAR、 VARCHAR 和 TEXT
  列。索引总是对整个列进行的，不支持局部（前缀）索引
  
> 默认情况下，MEMORY 存储引擎使用 HASH 索引，但也支持 BTREE 索引


