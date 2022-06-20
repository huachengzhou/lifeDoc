
---
title: "mysql触发器"
date: 2020-01-17T15:26:15Z
draft: false
weight: 36
---

## SQL触发器简介

> SQL触发器是存储在数据库目录中的一组SQL语句。只要与表关联的事件发生，例如插入，更新或删除，就会执行或触发SQL触发器

### SQL触发器的优点

+ SQL触发器提供了另一种检查数据完整性的方法。
+ SQL触发器可以捕获数据库层中业务逻辑中的错误。
+ SQL触发器提供了另一种运行计划任务的方法。通过使用SQL触发器，您不必等待运行计划任务，因为在对表中的数据进行更改之前或之后会自动调用触发器。
+ SQL触发器对于审计表中数据的更改非常有用。

### SQL触发器的缺点

+ SQL触发器只能提供扩展验证，并且不能替换所有验证。必须在应用程序层中完成一些简单的验证。例如，您可以使用JavaScript在客户端验证用户的输入，或者使用服务器端脚本语言（如JSP，PHP，ASP.NET，Perl）在服务器端验证用户的输入。
+ 从客户端应用程序调用和执行SQL触发器是不可见的，因此很难弄清楚数据库层中发生了什么。
+ SQL触发器可能会增加数据库服务器的开销

### MySQL 触发器的创建

#### MySQL触发语法

```mysql
CREATE TRIGGER trigger_name trigger_time trigger_event
 ON table_name
 FOR EACH ROW
 BEGIN
 ...
 END; 
```

+ 触发器名称约定 [trigger time]_[table name]_[trigger event]，例如before_employees_update
+ 触发激活时间可以是BEFORE或AFTER
+ 触发事件可以是INSERT，UPDATE或者DELETE事件导致触发器被调用
+ 触发器必须与特定表关联。如果没有表触发器将不存在，因此您必须在ON关键字后指定表名
+ 将SQL语句放在BEGIN和END阻止之间

+ 例子1

```mysql
-- create table
CREATE TABLE employees_audit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employeeNumber INT NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    changedat DATETIME DEFAULT NULL,
    action VARCHAR(50) DEFAULT NULL
); 


```

