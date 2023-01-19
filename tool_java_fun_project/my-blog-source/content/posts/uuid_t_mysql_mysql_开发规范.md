---
title : 'mysql > 开发规范'
date : '2021-02-15'
draft : false
tags : ["mysql"]
categories : ["databases","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---


# 数据库设计的规范
+ 数据库表和字段都大写
+ 表都要加业务后缀，例如_C客户表 _B基础表 _P权限表
+ 必须有主键，主键是表名去掉业务后缀，加_ID，大多表的主键使用UUID
+ 字段多个单词时，全大写，用下划线隔开
+ 类型INT/LONG/DOUBLE/TIMESTAMP/CHAR/VARCHAR2 尽量化在这几个类型中，这样数据库设计相当简单
+ 排序号定死名称ORDER_NO
+ 权限两个字段CREATE_BY创建人，CREATE_DEPT创建部门
+ 记录创建时间CREATE_TIME

