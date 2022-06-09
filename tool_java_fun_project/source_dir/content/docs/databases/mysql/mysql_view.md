
---
title: "mysql视图"
date: 2020-01-17T15:26:15Z
draft: false
weight: 35
---

## 数据库视图简介

> 数据库视图是一个虚拟表或逻辑表，它被定义为带有INNER的SQL SELECT查询。因为数据库视图类似于由行和列组成的数据库表，所以您可以针对它查询数据。大多数数据库管理系统（包括MySQL）允许您通过数据库视图更新基础表中的数据，并具有一些先决条件

## 数据库视图的优点

+ 数据库视图允许您简化复杂查询：数据库视图由与许多基础表关联的SQL语句定义。您可以使用数据库视图向最终用户和外部应用程序隐藏基础表的复杂性。通过数据库视图，您只需使用简单的SQL语句而不是具有许多连接的复杂语句。

+ 数据库视图有助于限制对特定用户的数据访问。您可能不希望所有用户都可以查询敏感数据的子集。您可以使用数据库视图仅将非敏感数据公开给特定用户组。

+ 数据库视图提供额外的安全层。安全性是任何关系数据库管理系统的重要组成部分。数据库视图为数据库管理系统提供了额外的保护。数据库视图允许您创建只读视图以向特定用户公开只读数据。用户只能以只读视图检索数据，但无法更新数据。

+ 数据库视图启用计算列。数据库表不应有计算列，但数据库视图应。假设orderDetails您在表中有quantityOrder（订购产品的数量）和priceEach（每个产品的价格）列。但是，orderDetails  表没有用于存储订单的每个行项目的总销售额的计算列。如果有，数据库模式将不是一个好的设计。在这种情况下，您可以创建一个名为的计算列total ，它是quantityOrder和priceEach计算结果的乘积。从数据库视图查询数据时，将动态计算计算列的数据。

+ 数据库视图可实现向后兼容性。假设您有一个中央数据库，许多应用程序正在使用它。有一天，您决定重新设计数据库以适应新的业务需求。您删除了一些表并创建新表，并且您不希望更改影响其他应用程序。在此方案中，您可以使用与要删除的旧表相同的模式创建数据库视图

## 数据库视图的缺点

+ 性能：从数据库视图查询数据可能会很慢，尤其是在基于其他视图创建视图时。
+ 表依赖项：您基于数据库的基础表创建视图。每当您更改与其关联的视图的这些表的结构时，您也必须更改视图。

### 创建视图

```mysql
CREATE 
   [ALGORITHM = {MERGE  | TEMPTABLE | UNDEFINED}]
VIEW view_name [(column_list)]
AS
select-statement; 
```

#### 视图的处理算法

+ MERGE

> 使用MERGE算法，MySQL首先将输入查询与SELECT定义视图的语句组合成单个查询。然后MySQL执行组合查询以返回结果集。 如果SELECT语句包含聚合函数，例如  MIN，MAX，SUM，COUNT，AVG 或DISTINCT，GROUP BY，HAVING，LIMIT，UNION，UNION ALL，子查询，则不允许使用MERGE算法。如果SELECT语句引用无表，则也不允许MERGE算法。如果不允许MERGE算法，MySQL将算法更改为UNDEFINED。请注意，将视图定义中的输入查询和查询组合到一个查询中称为视图分辨率

+ TEMPTABLE

> 使用TEMPTABLE算法，MySQL首先根据定义视图的SELECT语句创建临时表，然后对临时表执行输入查询。因为MySQL必须创建一个临时表来存储结果集并将数据从基表移动到临时表，所以TEMPTABLE  算法的效率低于MERGE算法。此外，使用TEMPTABLE  算法的视图不可更新。

+ UNDEFINED

> 在未指定显式算法的情况下创建视图时，这是默认UNDEFINED算法。UNDEFINED算法允许MySQL选择使用  MERGE或TEMPTABLE  算法。MySQL更喜欢MERGE  算法在TEMPTABLE 算法中，因为  MERGE算法效率更高

```mysql
create view temp_date_view as 
select count(age) as count_vlue,max(age) as max_value,min(age) as min_value,avg(age) as avg_value from temp_date where 1=1;

-- 如果使用SHOW TABLE命令查看数据库中的所有表，我们还会看到temp_date_view视图显示在列表中
show tables;

select * from temp_date_view;

-- 要知道哪个对象是视图或表，请使用以下SHOW FULL TABLES命令
SHOW FULL TABLES ;
```

+ 基于另一个视图创建视图

```mysql
-- 第一个视图
create view temp_date_view_source as  select id,age,birthday from temp_date ;

select * from temp_date_view_source;

-- 第二个视图

create view temp_date_view_source_new as select id,age,birthday from temp_date_view_source where 1=1 and age > 50 ;
select * from  temp_date_view_source_new;

```


### 可更新视图

> 在MySQL中，视图不仅可查询，还可以更新。这意味着您可以使用INSERT或  UPDATE语句通过可更新视图插入或更新基表的行。此外，您可以使用DELETE语句通过视图删除基础表的行。

#### 要创建可更新视图，定义视图的SELECT语句不得包含以下任何元素

+ 聚合函数  ，如MIN，MAX，SUM，AVG和  COUNT。
+ DISTINCT
+ GROUP BY子句。
+ HAVING子句。
+ UNION或UNION ALL子句。
+ 左连接或外连接。
+ 子查询 中的SELECT子句或在引用表WHERE语句出现在FROM子句中。
+ 引用FROM子句中的不可更新视图
+ 仅引用文字值
+ 对基表的任何列的多次引用
+ 使用TEMPTABLE算法创建视图，则无法更新视图
+ 有时可以使用内部联接基于多个表创建可更新视图

```mysql
CREATE TABLE `tb_office_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `office_code` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `tb_office_info`(`id`, `office_code`, `phone`, `city`) VALUES (1, '1', '+1 650 219 4782', 'San Francisco ');
INSERT INTO `tb_office_info`(`id`, `office_code`, `phone`, `city`) VALUES (2, '2', '+1 215 837 0825', 'Boston ');
INSERT INTO `tb_office_info`(`id`, `office_code`, `phone`, `city`) VALUES (3, '3', '+1 212 555 3000', 'NYC');
INSERT INTO `tb_office_info`(`id`, `office_code`, `phone`, `city`) VALUES (4, '4', '+33 14 723 4404', 'Paris');
INSERT INTO `tb_office_info`(`id`, `office_code`, `phone`, `city`) VALUES (5, '5', '+86 33 224 5000', 'Beijing   ');
INSERT INTO `tb_office_info`(`id`, `office_code`, `phone`, `city`) VALUES (6, '6', ' +61 2 9264 2451', 'Sydney');
INSERT INTO `tb_office_info`(`id`, `office_code`, `phone`, `city`) VALUES (7, '7', '+44 20 7877 2041', 'London');

create view tb_office_info_view as select office_code as officeCode,phone,city from tb_office_info ;

select * from tb_office_info_view;
-- 验证 更新
UPDATE tb_office_info SET   phone = '+33 14 723 5555' WHERE office_code = 4;

select * from tb_office_info_view;

-- 删除一行记录

delete from tb_office_info where office_code = 7;

select * from tb_office_info_view;
-- 视图记录同样更新了

```


### 显示视图定义

+ SHOW CREATE VIEW [database_name].[view_ name]; 

```mysql
SHOW CREATE VIEW test3.temp_date_view_source; 
```

### 修改视图

+ MySQL提供了两个语句，允许您修改现有视图：**ALTER VIEW**和 **CREATE OR REPLACE VIEW**

```mysql
alter view temp_date_view_source_new as  select id,age,birthday from temp_date_view_source where 1=1 and age > 30 ;

create or replace view temp_date_view_source_new as  select id,age,birthday from temp_date_view_source where 1=1 and age > 20;
```

### 删除视图

+ DROP VIEW [IF EXISTS] [database_name].[view_name] 

```mysql

-- 先创建一个我们要删除的视图

create view temp_date_view_source_new_x as select id,age,birthday from temp_date_view_source where 1=1 and age > 2;

drop view if exists temp_date_view_source_new_x;
```

### WITH CHECK OPTION确保视图一致性

> 有时，您创建一个视图以仅显示表的部分数据。但是，简单视图是可更新的，因此可以更新通过视图不可见的数据。此更新使视图不一致。要确保视图的一致性，请WITH CHECK OPTION在创建或修改视图时使用子句

> **WITH CHECK OPTION**子句是**CREATE VIEW**声明的可选部分。**WITH CHECK OPTION**子句阻止您  更新或插入通过视图不可见的行。换句话说，每当您通过视图更新或插入基表的一行时，MySQL都会确保插入或更新操作符合视图的定义。

+ 准备数据

```mysql
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employeeNumber` varchar(100) DEFAULT NULL COMMENT '员工编号',
  `lastName` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `extension` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `officeCode` varchar(255) DEFAULT NULL,
  `reportsTo` varchar(255) DEFAULT NULL,
  `jobTitle` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1002, 'Murphy', 'Diane', 'x5800', 'dmurphy@yiibai.com', '1', NULL, 'President');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1056, 'Patterson', 'Mary', 'x4611', 'mpatterso@yiibai.com', '1', 1002, 'VP Sales');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1076, 'Firrelli', 'Jeff', 'x9273', 'jfirrelli@yiibai.com', '1', 1002, 'VP Marketing');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1088, 'Patterson', 'William', 'x4871', 'wpatterson@yiibai.com', '6', 1056, 'Sales Manager (APAC)');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1102, 'Bondur', 'Gerard', 'x5408', 'gbondur@gmail.com', '4', 1056, 'Sale Manager (EMEA)');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1143, 'Bow', 'Anthony', 'x5428', 'abow@gmail.com', '1', 1056, 'Sales Manager (NA)');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1165, 'Jennings', 'Leslie', 'x3291', 'ljennings@yiibai.com', '1', 1143, 'Sales Rep');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1166, 'Thompson', 'Leslie', 'x4065', 'lthompson@yiibai.com', '1', 1143, 'Sales Rep');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1188, 'Firrelli', 'Julie', 'x2173', 'jfirrelli@yiibai.com', '2', 1143, 'Sales Rep');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1216, 'Patterson', 'Steve', 'x4334', 'spatterson@yiibai.com', '2', 1143, 'Sales Rep');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1286, 'Tseng', 'Foon Yue', 'x2248', 'ftseng@yiibai.com', '3', 1143, 'Sales Rep');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1323, 'Vanauf', 'George', 'x4102', 'gvanauf@yiibai.com', '3', 1143, 'Sales Rep');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1337, 'Bondur', 'Loui', 'x6493', 'lbondur@yiibai.com', '4', 1102, 'Sales Rep');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1370, 'Hernandez', 'Gerard', 'x2028', 'ghernande@gmail.com', '4', 1102, 'Sales Rep');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1401, 'Castillo', 'Pamela', 'x2759', 'pcastillo@gmail.com', '4', 1102, 'Sales Rep');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1501, 'Bott', 'Larry', 'x2311', 'lbott@yiibai.com', '7', 1102, 'Sales Rep');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1504, 'Jones', 'Barry', 'x102', 'bjones@gmail.com', '7', 1102, 'Sales Rep');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1611, 'Fixter', 'Andy', 'x101', 'afixter@yiibai.com', '6', 1088, 'Sales Rep');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1612, 'Marsh', 'Peter', 'x102', 'pmarsh@yiibai.com', '6', 1088, 'Sales Rep');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1619, 'King', 'Tom', 'x103', 'tking@gmail.com', '6', 1088, 'Sales Rep');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1621, 'Nishi', 'Mami', 'x101', 'mnishi@gmail.com', '5', 1056, 'Sales Rep');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1625, 'Kato', 'Yoshimi', 'x102', 'ykato@gmail.com', '5', 1621, 'Sales Rep');
INSERT INTO `employees`(`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES (1702, 'Gerard', 'Martin', 'x2312', 'mgerard@gmail.com', '4', 1102, 'Sales Rep');

```


+ 语法

```mysql
CREATE OR REPLACE VIEW view_name 
AS
  select_statement
  WITH CHECK OPTION;
```

+ 先创建一个普通视图

```mysql
create view vps as 
 SELECT 
        employeeNumber,
        lastname,
        firstname,
        jobtitle,
        extension,
        email,
        officeCode,
        reportsTo
    FROM
        employees
    WHERE
        jobTitle LIKE '%VP%'; 

select * from vps;
-- result
+----------------+-----------+-----------+--------------+-----------+----------------------+------------+-----------+
| employeeNumber | lastname  | firstname | jobtitle     | extension | email                | officeCode | reportsTo |
+----------------+-----------+-----------+--------------+-----------+----------------------+------------+-----------+
|           1056 | Patterson | Mary      | VP Sales     | x4611     | mpatterso@yiibai.com | 1          |      1002 |
|           1076 | Firrelli  | Jeff      | VP Marketing | x9273     | jfirrelli@yiibai.com | 1          |      1002 |
+----------------+-----------+-----------+--------------+-----------+----------------------+------------+-----------+
2 rows in set (0.00 sec)
-- 因为它vps 是一个简单的视图因此它是可更新的
-- 然后，我们插入一行到employees通过vps视图
INSERT INTO vps(employeeNumber,firstname,lastname,jobtitle,extension,email,officeCode,reportsTo) values(1703,'Lily','Bush','IT Manager','x9111','lilybush@classicmodelcars.com',1,1002);

-- 注意：新创建的员工在vps视图中不可见，因为她的职位是IT Manager，而不是VP 
-- 这就是问题所在
-- 这可能不是我们想要的，因为我们只通过vps视图公开VP员工，而不是其他员工
-- 要确保视图的一致性，以便用户只能显示或更新通过视图可见的数据，请WITH CHECK OPTION在创建或修改视图时使用
```

+ 修改视图

```mysql
create or replace view vps as
 SELECT 
        employeeNumber,
        lastname,
        firstname,
        jobtitle,
        extension,
        email,
        officeCode,
        reportsTo
    FROM
        employees
    WHERE
        jobTitle LIKE '%VP%' 
with check option ;
```

+ 通过视图在employees表中插入一行vps

```mysql
INSERT INTO vps(employeeNumber,firstname,lastname,jobtitle,extension,email,officeCode,reportsTo)
VALUES(1704,'John','Smith','IT Staff','x9112','johnsmith@classicmodelcars.com',1,1703); 

INSERT INTO vps(employeeNumber,firstname,lastname,jobtitle,extension,email,officeCode,reportsTo)
VALUES(1704,'John','Smith','IT Staff','x9112','johnsmith@classicmodelcars.com',1,1703)
> 1369 - CHECK OPTION failed 'test3.vps'
> 时间: 0s

-- 已经起到了限制作用
```

+ 通过视图插入一个职位名称SVP Marketing在employees表中的员工，vps看看MySQL是否允许我们这样做

```mysql
INSERT INTO vps(employeeNumber,firstname,lastname,jobtitle,extension,email,officeCode,reportsTo)
VALUES(1704,'John','Smith','SVP Marketing','x9112','johnsmith@classicmodelcars.com',1,1076);

> Affected rows: 1
> 时间: 0.15s

select * from vps;
+----------------+-----------+-----------+---------------+-----------+--------------------------------+------------+-----------+
| employeeNumber | lastname  | firstname | jobtitle      | extension | email                          | officeCode | reportsTo |
+----------------+-----------+-----------+---------------+-----------+--------------------------------+------------+-----------+
|           1056 | Patterson | Mary      | VP Sales      | x4611     | mpatterso@yiibai.com           | 1          |      1002 |
|           1076 | Firrelli  | Jeff      | VP Marketing  | x9273     | jfirrelli@yiibai.com           | 1          |      1002 |
|           1704 | Smith     | John      | SVP Marketing | x9112     | johnsmith@classicmodelcars.com | 1          |      1076 |
+----------------+-----------+-----------+---------------+-----------+--------------------------------+------------+-----------+
3 rows in set (0.00 sec)

-- 已经插入进去了
```