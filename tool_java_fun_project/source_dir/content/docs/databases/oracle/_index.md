---
title: "oracle"
date: 2021-01-17T15:26:15Z
draft: false
weight: 3
---

## oracle 学习笔记

+ 检查oracle 密码过期策略

```sql
SELECT * FROM dba_profiles WHERE profile='DEFAULT' AND resource_name='PASSWORD_LIFE_TIME';

```

+ 将密码有效期由默许的180天修改成“无穷制”，修改以后不需要重启动数据库，会立即生效

```sql
ALTER PROFILE DEFAULT LIMIT PASSWORD_LIFE_TIME UNLIMITED;

```


> 下面看下解决Oracle11g密码180天过期，账号锁住的问题

+ 1、查看用户的proifle是哪一个，通常为default：

```sql
SELECT username,PROFILE FROM dba_users;
```

+ 2、查看指定概要文件（如default）的密码有效期设置：

```sql
SELECT * FROM dba_profiles s WHERE s.profile='DEFAULT' AND resource_name='PASSWORD_LIFE_TIME';
```

+ 3、将密码有效期由默许的180天修改成“无穷制”：

```sql
ALTER PROFILE DEFAULT LIMIT PASSWORD_LIFE_TIME UNLIMITED;
```

+ 4、消除账号锁定


```sql
alter user sys account unlock;

```