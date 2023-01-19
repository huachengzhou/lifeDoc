---
title : 'mysql > data'
date : '2021-02-15'
draft : false
tags : ["mysql"]
categories : ["databases","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---









+ 数据准备

数据准备

```
drop datbase ch10;
create database ch10;
use ch10;
CREATE TABLE fruits
(
f_id    char(10)     	NOT NULL,
s_id    INT        	NOT NULL,
f_name  char(255)  	NOT NULL,
f_price decimal(8,2)  	NOT NULL,
PRIMARY KEY(f_id) 
);

INSERT INTO fruits (f_id, s_id, f_name, f_price)
     VALUES('a1', 101,'apple',5.2),
     ('b1',101,'blackberry', 10.2),
     ('bs1',102,'orange', 11.2),
     ('bs2',105,'melon',8.2),
     ('t1',102,'banana', 10.3),
     ('t2',102,'grape', 5.3),
     ('o2',103,'coconut', 9.2),
     ('c0',101,'cherry', 3.2),
     ('a2',103, 'apricot',2.2),
     ('l2',104,'lemon', 6.4),
     ('b2',104,'berry', 7.6),
     ('m1',106,'mango', 15.6),
     ('m2',105,'xbabay', 2.6),
     ('t4',107,'xbababa', 3.6),
     ('m3',105,'xxtt', 11.6),
     ('b5',107,'xxxx', 3.6);
	 
CREATE TABLE customers
(
  c_id      int       NOT NULL AUTO_INCREMENT,
  c_name    char(50)  NOT NULL,
  c_address char(50)  NULL,
  c_city    char(50)  NULL,
  c_zip     char(10)  NULL,
  c_contact char(50)  NULL,
  c_email   char(255) NULL,
  PRIMARY KEY (c_id)
);

INSERT INTO customers(c_id, c_name, c_address, c_city, 
c_zip,  c_contact, c_email) 
VALUES(10001, 'RedHook', '200 Street ', 'Tianjin', 
 '300000',  'LiMing', 'LMing@163.com'),
(10002, 'Stars', '333 Fromage Lane',
 'Dalian', '116000',  'Zhangbo','Jerry@hotmail.com'),
(10003, 'Netbhood', '1 Sunny Place', 'Qingdao',  '266000',
 'LuoCong', NULL),
(10004, 'JOTO', '829 Riverside Drive', 'Haikou', 
 '570000',  'YangShan', 'sam@hotmail.com');
 
CREATE TABLE orderitems
(
  o_num      int          NOT NULL,
  o_item     int          NOT NULL,
  f_id       char(10)     NOT NULL,
  quantity   int          NOT NULL,
  item_price decimal(8,2) NOT NULL,
  PRIMARY KEY (o_num,o_item)
) ;
INSERT INTO orderitems(o_num, o_item, f_id, quantity, item_price)
VALUES(30001, 1, 'a1', 10, 5.2),
(30001, 2, 'b2', 3, 7.6),
(30001, 3, 'bs1', 5, 11.2),
(30001, 4, 'bs2', 15, 9.2),
(30002, 1, 'b3', 2, 20.0),
(30003, 1, 'c0', 100, 10),
(30004, 1, 'o2', 50, 2.50),
(30005, 1, 'c0', 5, 10),
(30005, 2, 'b1', 10, 8.99),
(30005, 3, 'a2', 10, 2.2),
(30005, 4, 'm1', 5, 14.99);

CREATE TABLE suppliers
(
  s_id      int      NOT NULL AUTO_INCREMENT,
  s_name    char(50) NOT NULL,
  s_city    char(50) NULL,
  s_zip     char(10) NULL,
  s_call    CHAR(50) NOT NULL,
  PRIMARY KEY (s_id)
) ;

INSERT INTO suppliers(s_id, s_name,s_city,  s_zip, s_call)
VALUES(101,'FastFruit Inc.','Tianjin','300000','48075'),
(102,'LT Supplies','Chongqing','400000','44333'),
(103,'ACME','Shanghai','200000','90046'),
(104,'FNK Inc.','Zhongshan','528437','11111'),
(105,'Good Set','Taiyuang','030000', '22222'),
(106,'Just Eat Ours','Beijing','010', '45678'),
(107,'DK Inc.','Zhengzhou','450000', '33332');

CREATE TABLE orders
(
  o_num  int      NOT NULL AUTO_INCREMENT,
  o_date datetime NOT NULL,
  c_id   int      NOT NULL,
  PRIMARY KEY (o_num)
) ;
INSERT INTO orders(o_num, o_date, c_id)
VALUES(30001, '2008-09-01', 10001),
(30002, '2008-09-12', 10003),
(30003, '2008-09-30', 10004),
(30004, '2008-10-03', 10005),
(30005, '2008-10-08', 10001);

CREATE TABLE dept
(
d_no         INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
d_name       VARCHAR(50),
d_location     VARCHAR(100)
);
# 由于employee表dept_no依赖于父表dept的主键d_no，因此需要先创建dept表，然后创建employee表。
CREATE TABLE employee
(
e_no        INT NOT NULL PRIMARY KEY,
e_name      VARCHAR(100) NOT NULL,
e_gender    CHAR(2) NOT NULL,
dept_no    INT NOT NULL,
e_job       VARCHAR(100) NOT NULL,
e_salary   SMALLINT NOT NULL,
hireDate   DATE,
CONSTRAINT dno_fk FOREIGN KEY(dept_no)
REFERENCES dept(d_no)
);

INSERT INTO dept 
VALUES (10, 'ACCOUNTING', 'ShangHai'),
(20, 'RESEARCH ', 'BeiJing '),
(30, 'SALES ', 'ShenZhen '),
(40, 'OPERATIONS ', 'FuJian ');

INSERT INTO employee 
VALUES (1001, 'SMITH', 'm',20, 'CLERK',800,'2005-11-12'),
(1002, 'ALLEN', 'f',30, 'SALESMAN', 1600,'2003-05-12'),
(1003, 'WARD', 'f',30, 'SALESMAN', 1250,'2003-05-12'),
(1004, 'JONES', 'm',20, 'MANAGER', 2975,'1998-05-18'),
(1005, 'MARTIN', 'm',30, 'SALESMAN', 1250,'2001-06-12'), 
(1006, 'BLAKE', 'f',30, 'MANAGER', 2850,'1997-02-15'),
(1007, 'CLARK', 'm',10, 'MANAGER', 2450,'2002-09-12'),
(1008, 'SCOTT', 'm',20, 'ANALYST', 3000,'2003-05-12'),
(1009, 'KING', 'f',10, 'PRESIDENT', 5000,'1995-01-01'),
(1010, 'TURNER', 'f',30, 'SALESMAN', 1500,'1997-10-12'),
(1011, 'ADAMS', 'm',20, 'CLERK', 1100,'1999-10-05'),
(1012, 'JAMES', 'm',30, 'CLERK', 950,'2008-06-15');
```




































