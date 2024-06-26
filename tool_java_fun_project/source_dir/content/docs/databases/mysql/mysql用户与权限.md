
---
title: "mysql用户与权限"
date: 2020-01-17T15:26:15Z
draft: false
weight: 29
---


> mysql.version=5.7 (必须注意版本)
## 创建用户
+ ( CREATE USER 'bob'@'%' IDENTIFIED BY '07fa533360d9'; ) 创建bob用户 密码:07fa533360d9
+ ( CREATE USER "test"@"localhost" IDENTIFIED BY '123456' )创建test用户　密码123456
+ ( CREATE USER "test"@"192.168.87.26" IDENTIFIED BY '123456' )创建test用户　密码123456
> 参数说明:'%'表示所有情况都能访问;'localhost'表示本机才能访问;'192.168.87.26' 某个具体 ip 才能访问

## 授权命令 (GRANT privileges ON databasename.tablename TO 'username'@'host' )
GRANT SELECT,INSERT privileges on spring.* to 'alice'@'localhost' identified by '123456'
> 参数说明:databasename表示数据库名字;tablename数据库表的名字;username用户名;host表示链接地址如本机localhost,远程任意%,具体ip192.168.87.26

## 授权syncUser用户拥有shard-jdbc-master数据库的所有权限
```
create database testDB;

# 授予用户在本地服务器对该数据库的全部权限
# 只能是127.0.0.1才看得到 这里 127.0.0.1 可以换成如localhost
grant all privileges on `shard-jdbc-master`.* to 'syncUser'@'127.0.0.1' ;   


# 授予用户通过外网IP对于该数据库的全部权限
grant all privileges on `shard-jdbc-master`.* to 'syncUser'@'%' ;

```


## 授权syncUser用户拥有shard-jdbc-slave数据库的所有权限
```sql
grant select on `shard-jdbc-slave`.* to 'syncUser'@'localhost';  /*给予查询权限*/

grant insert on `shard-jdbc-slave`.* to 'syncUser'@'localhost'; /*添加插入权限*/

grant delete on `shard-jdbc-slave`.* to 'syncUser'@'localhost'; /*添加删除权限*/

grant update on `shard-jdbc-slave`.* to 'syncUser'@'localhost'; /*添加权限*/

flush privileges; /*刷新权限*/
```

## 指定部分权限给用户
```
grant select,update on testDB.* to "blake"@"localhost" identified by '123456';
GRANT SELECT, INSERT ON spring.user TO 'alice'@'localhost'; 
```
## 撤销权限
```
REVOKE privilege ON databasename.tablename FROM 'username'@'host'; #撤销
REVOKE grant option ON databasename.tablename FROM 'username'@'host'; #收回
```

## 修改用户密码
```
update mysql.user set authentication_string=password('123456') where User='blake' and Host='localhost';
```
> 关于修改密码也可以这样
> 1:select password('1234'); 得到string 如1234==>*A4B6157319038724E3560894F7F932C8886EBFCF
```
update mysql.user set authentication_string="*A4B6157319038724E3560894F7F932C8886EBFCF" where User='bob' and Host='localhost';
```
> 关于远程访问修改
```
UPDATE user SET Host='%' WHERE User='alice' AND Host='localhost' LIMIT 1;

UPDATE user SET Host='192.168.87.26' WHERE User='alice' AND Host='%' LIMIT 1;

```

## 删除用户bob
```
delete from user WHERE User='bob'
```

## 刷新系统权限表
```
flush privileges; 
```

## 查看权限
```
show grants for 'blake'@'localhost';
```

