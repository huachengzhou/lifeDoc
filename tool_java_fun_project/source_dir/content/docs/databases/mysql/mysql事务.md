
---
title: "mysql事务"
date: 2020-01-17T15:26:15Z
draft: false
weight: 10
---




### 什么是事务

* 一系列有序的数据库操作：
  * 要么全部成功
  * 要么全部回退到操作前的状态
  * 中间状态对其他连接不可见
* 事务的基本操作：
| 基本操作 | 说明 |
| :------------- | :------------- |
| start transaction | 开始事务 |
| commit | 提交(全部完成) |
| rollback | 回滚(回到初始状态) |

+ 创建一个临时表

```mysql
CREATE TABLE `t_transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `num` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

```


+ 例子事务使用

```mysql
-- 开启一个事务
start TRANSACTION ;
-- 或者使用(非标准sql)
begin ;
insert into t_transaction( `name` ,`num`) values('abc',ROUND(RAND()*100));
-- 事务结束，插入成功
COMMIT ;

```

+ 例子 事务 回滚

```mysql

START TRANSACTION ;

BEGIN ;

insert into t_transaction( `name` ,`num`) values('kk',ROUND(RAND()*100));
ROLLBACK ;
-- 不会插入一条数据

```

+ 事务回滚点

```mysql

START TRANSACTION ;

BEGIN ;
insert into t_transaction( `name` ,`num`) values('s1x',ROUND(RAND()*100));
-- 设置回滚点1
savepoint a_point_1;
insert into t_transaction( `name` ,`num`) values('s1',ROUND(RAND()*100));
-- 回滚到指定点
ROLLBACK  to a_point_1;
commit ;

```

### 自动提交

* autocommit可以在session级别设置
* 每个DML操作都自动提交
* DDL永远都是自动提交，无法通过rollback回滚

### 事务的四个基本属性(ACID)

* 原子性(Atomicity)
* 一致性(Consistency)
* 隔离性(Isolation)
* 持久性(Durability)

### 事务的原子性

* 包含在事务中的操作要么全部被执行，要么都不执行
* 中途数据库或应用发生异常，未提交的事务都应该被回滚

### 事务的一致性

* 数据的正确性，合理性，完整性
* 数据一致性应该符合应用需要规则：
  * 余额不能是负数
  * 交易对象必须先有账号
  * 用户账号不能重复
* 事务的结果需要满足数据的一致性约束

### 事物的持久性

* 提交完成的事务对数据库的影响必须是永久性的
  * 数据库异常不会丢失事务更新
  * 通常认为成功写入磁盘的数据即为持久化成功

### 事务的持久化的实现

* 数据文件持久化
  * 随机同步刷新(慢)
* 事务日志持久化与实例恢复
  * 顺序同步刷新(快) -> 事务日志
  * 随机异步刷新 -> 磁盘
  * 事务日志 -> 磁盘(实例恢复)

### 事务的隔离性

* 数据库事务在提交完成前，中间的任何数据变化对其他的事务都是不可见的。

### 数据库隔离现象

| 隔离现象 | 描述 |
| :------------- | :------------- |
| 脏读(Dirty Read) | 事务B读到事务A尚未提交的数据变更 |
| 不可重复读(NonRepeatable Read) | 事务B读取前后两次读取一条记录之间该记录被事务A修改并提交，于是事务B读到了不一样的结果 |
| 幻读(Phantom Read) | 事务B按条件匹配到了若干行记录并修改。但是由于修改过程中事务A新插入了符合条件记录，导致B更新完成后发现仍有符合条件却未被更新的记录。 |

### 数据库隔离等级

| 隔离等级 | 脏读 | 不可重复读 | 幻读 |
| :------------- | :------------- | :------------- | :------------- |
| 未提交读 | 可能 | 可能 | 可能 |
| 已提交读 | 不可能 | 可能 | 可能 |
| 可重复读 | 不可能 | 不可能 | 可能 |
| 可串行化读 | 不可能 | 不可能 | 不可能 |

### MySQL的事务隔离级别

* InnoDB默认标记为可重复读
* InnoDB并不是标准定义上的课重复读
* InnoDB默认在可重复读的基础上避免幻读

### MySQL事务隔离级别设置

* 可在global/session/下个事务，级别分别进行设置
* 建议使用Read committed(同Oracle)
* 或者建议使用默认的Repeatable read

```sql
set tx_isolation = ''
-- 设置隔离级别
```

### 事务与并发写

* 某个正在更新的记录再提交或回滚前不能被其他事务同时更新

### 事务回滚的实现

* 回滚段(rollback segment)与数据前像












