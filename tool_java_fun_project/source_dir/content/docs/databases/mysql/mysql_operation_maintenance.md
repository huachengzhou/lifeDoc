
---
title: "mysql运维"
date: 2020-01-17T15:26:15Z
draft: false
weight: 15
---

# 一: 备份

## 1: 备份内容

+ 数据 (数据文件或文本格式数据)

+ 操作日志(binlog)  (数据库变更日志)
 
## 2:冷备份与热备份

+ 冷备份 (关闭数据库服务，完整拷贝数据文件)
 
+ 热备份 (在不影响数据库读写服务的情况下备份数据库)

## 3:本地备份与远程备份
+ 本地备份 (在数据库服务器本地进行备份)

+ 远程备份 (远程连接数据库进行备份)

## 4:全量备份与增量备份
+ 全量备份 (备份完整的数据库)

+ 增量备份 (只备份上一次备份以来发生修改的数据)

## 5:备份周期

+ 考虑因素：
+ 数据库大小(决定备份时间)
+ 恢复速度要求(快速or慢速)
+ 备份方式(全量or增量)

## 6:常用工具及用法

+ mysqldump - 逻辑备份，热备
+ xtrabackup - 物理备份， 热备
+ Lvm/zfs snapshot - 物理备份
+ mydumper - 逻辑备份，热备
+ cp - 物理备份，冷备

### 常用工具及用法 - mysqldump

+ 逻辑备份

```mysql
-- 备份全部数据库的数据库结构
mysqldump -h localhost -p3307 -uroot  -p123456 -A -d >  D:\data\mysql_all.sql

-- 备份全部数据库的数据和结构
mysqldump -h localhost -p3307 -uroot  -p123456 -A >  D:\data\mysql_all_2.sql

-- 备份单个数据库的结构和数据
mysqldump -h localhost -p3307 -uroot  -p123456 --databases test3  >  D:\data\test3_all.sql

-- 备份单个数据库的结构(当你需要备份结构和数据同时的时候移除-d 参数即可)
mysqldump -h localhost -p3307 -uroot  -p123456 --databases test3 -d >  D:\data\test3_all_1.sql

-- 备份单个数据库的数据
mysqldump -h localhost -p3307 -uroot  -p123456 --databases test3 -t >  D:\data\test3_data_1.sql

-- 备份单个数据库的结构
mysqldump -h localhost -p3307 -uroot  -p123456  test3 -d >  D:\data\test3_jiegou.sql

-- 备份单个数据库的结构和数据
mysqldump -h localhost -p3307 -uroot  -p123456 --databases test3 > D:\data\test3.sql

-- 登录数据库
mysql -h localhost -p3307 -uroot  -p123456

```