
---
title: "mysql新查询"
date: 2020-01-17T15:26:15Z
draft: false
weight: 34
---

## 一:创建计算字段

```mysql
-- 将 fruits.f_name 和 suppliers.s_city创建为了一个新字段连在一起来计算查询
select fruits.f_name as name ,suppliers.s_city as city from suppliers left join fruits on fruits.s_id = suppliers.s_id where 1=1 and  CONCAT(fruits.f_name,'-',suppliers.s_city) = 'apple-Tianjin' ;

-- 员工的部门和名称组合为新字段
select CONCAT_WS('-',dept.d_name,employee.e_name) as name from employee left join dept on dept.d_no = employee.dept_no 
```

## 二:聚集函数

+ 什么是聚合函数

> 聚合函数作用于一组数据，并对一组数据返回一个值

+ 例子一

```mysql
-- 计算表中数量,最小值,最大值,平均值,平均值,累加值
select count(*) as count_value ,MIN(f_price) as min_value,MAX(f_price) as max_value,AVG(f_price) as avg_value ,SUM(f_price) as sum_value from fruits
```

+ 例子二

```mysql
SELECT c_name, sum(grade) as total_grade ,avg(grade) as avg_grade FROM score GROUP BY c_name
```


## 三:创建联结

### 使用表别名

> student 取名为 tb_stu

```mysql
select concat(tb_stu.department,'-',tb_stu.name) as name from student as tb_stu;
```

> 当在一次查询中 不止一次地引用相同的表

### 自联结

> 当你知道某个童鞋的分数是98你想查看和98分数相同科目的其他童鞋的分数

```mysql

-- 不适用联结查询的方法
select c_name ,grade from score where c_name = (select c_name from score where grade = 98 )

-- 使用联结的查询方法 (清晰很多)
select tb1.c_name ,tb1.grade from score tb1, score tb2 where 1=1 and  tb1.c_name = tb2.c_name  and tb2.grade = 98;


```



### 自然联结

> 当对多个表联结查询或者对一个表进行两次引用查询 这个时候有相同的列可能要出现  这个时候我们手动控制某些列出现某些列不出现

```mysql 

 -- fruits 中s_id和suppliers中s_id是相同的列名称

 select fruits.*,suppliers.s_name as s_name , suppliers.s_city as s_city from fruits ,suppliers where suppliers.s_id = fruits.s_id
```

### 外部联结

> 将一个表中的行与另一个表中的行关联，但有时候需要包含那些没有关联的行

```mysql
select customers.cust_id,orders.order_num from customers left outer join orders on customers.cust_id = orders.cust_id
```

### 使用带聚集函数的联结

## 四:分组查询、过滤

## 五:全文搜索

## 六:行转列&列转行


### 行转列

+ 数据准备

```mysql

-- 创建表

-- ----------------------------
-- Table structure for user_column_row
-- ----------------------------
DROP TABLE IF EXISTS `user_column_row`;
CREATE TABLE `user_column_row`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '姓名',
  `features` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '特征',
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '数值',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_column_row
-- ----------------------------
INSERT INTO `user_column_row` VALUES (2, '小明', '身高', '172.00');
INSERT INTO `user_column_row` VALUES (3, '小明', '体重', '48kg');
INSERT INTO `user_column_row` VALUES (4, '小明', '年龄', '23');
INSERT INTO `user_column_row` VALUES (5, '小红', '身高', '161.00');
INSERT INTO `user_column_row` VALUES (6, '小红', '体重', '40kg');
INSERT INTO `user_column_row` VALUES (7, '小红', '年龄', '19');
INSERT INTO `user_column_row` VALUES (8, '小花', '身高', '153.00');
INSERT INTO `user_column_row` VALUES (9, '小花', '体重', '42kg');
INSERT INTO `user_column_row` VALUES (10, '小花', '年龄', '17');
INSERT INTO `user_column_row` VALUES (11, '小明', '身高', '172.33');
INSERT INTO `user_column_row` VALUES (12, '小军', '身高', NULL);
INSERT INTO `user_column_row` VALUES (13, '小军', '体重', NULL);
INSERT INTO `user_column_row` VALUES (14, '小军', '年龄', NULL);
INSERT INTO `user_column_row` VALUES (15, '小胖', NULL, NULL);
INSERT INTO `user_column_row` VALUES (16, '小胖', NULL, NULL);
INSERT INTO `user_column_row` VALUES (17, '小胖', NULL, NULL);
```

+ 例子

+ 进行之前 先说一个语句 mysql case…when…then 这个经常用来处理行转列

+ CASE WHEN `features` = '体重' THEN `value` ELSE '0kg' END  表示 匹配到体重就使用value 假如匹配不到就使用0kg

```script
-- 第一次

SELECT
	tb_user.id,tb_user.NAME , 
	( CASE WHEN `features` = '体重' THEN `value` ELSE '0kg' END ) AS weight ,
	( CASE WHEN `features` = '身高' THEN `value` ELSE '0cm' END ) AS height,
	( CASE WHEN `features` = '年龄' THEN `value` ELSE  0    END ) AS age 
FROM user_column_row tb_user  GROUP BY tb_user.NAME;
-- 结果
id  name   weight  height age
2	小明	0kg	   172.00	0
5	小红	0kg	   161.00	0
8	小花	0kg	   153.00	0
12	小军	0kg		        0
15	小胖	0kg	   0cm	    0


-- 可以看到根本没有达到目的

-- 第二次

SELECT
	tb_user.id,tb_user.NAME , 
	( CASE WHEN `features` = '体重' THEN `value` ELSE '0kg' END ) AS weight ,
	( CASE WHEN `features` = '身高' THEN `value` ELSE '0cm' END ) AS height,
	max( CASE WHEN `features` = '年龄' THEN `value` ELSE  0    END ) AS age 
FROM user_column_row tb_user  GROUP BY tb_user.NAME;


-- 结果

2	小明	0kg	172.00	23
5	小红	0kg	161.00	19
8	小花	0kg	153.00	17
12	小军	0kg		0
15	小胖	0kg	0cm	0

-- 对年龄进行取最大倒是满足了 但是不是所有的行数据都是数字啊 所以还是不靠谱


-- 第三次

SELECT
	tb_user.id,tb_user.NAME ,
	group_concat(CASE WHEN `features` = '体重' THEN `value` ELSE '0kg' END) AS weight,
	group_concat(CASE WHEN `features` = '身高' THEN `value` ELSE '0cm' END) AS height,
	group_concat(CASE WHEN `features` = '年龄' THEN `value` ELSE ' 0 ' END) AS age 
FROM user_column_row tb_user  GROUP BY tb_user.NAME order by tb_user.id;

-- 结果

2	小明	0kg,48.0kg,0kg,0kg	 172.00,0cm,0cm,172.33	   0 , 0 ,23, 0 
5	小红	0kg,40.0kg,0kg	     161.00,0cm,0cm	           0 , 0 ,19
8	小花	0kg,42.0kg,0kg	     153.00,0cm,0cm	           0 , 0 ,17
12	小军	0kg,0kg	             0cm,0cm	               0 ,  0 
15	小胖	0kg,0kg,0kg	         0cm,0cm,0cm	           0 , 0 , 0 

-- 可以看到已经全部取出组合而来  虽然结果值很乱 但是这是最靠谱的 把结果处理下就行啦,比如可以考虑代码直接处理或者存储过程处理

```

### 列转行

+ 数据准备

```mysql

CREATE TABLE `user2` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '名称',
  `age` double(11,2) DEFAULT NULL COMMENT '年龄',
  `height` double(11,2) DEFAULT NULL COMMENT '身高',
  `weight` double(11,2) DEFAULT NULL COMMENT '体重',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ----------------------------
-- Table structure for user2
-- ----------------------------
DROP TABLE IF EXISTS `user2`;
CREATE TABLE `user2`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '名称',
  `age` double(11, 2) NULL DEFAULT NULL COMMENT '年龄',
  `height` double(11, 2) NULL DEFAULT NULL COMMENT '身高',
  `weight` double(11, 2) NULL DEFAULT NULL COMMENT '体重',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user2
-- ----------------------------
INSERT INTO `user2` VALUES (2, '小明', 22.00, 48.00, 178.40);
INSERT INTO `user2` VALUES (3, '小胖', 25.00, 50.00, 168.00);

```

+ 列转行关键点：

> union，使用'年龄' as 特征、'身高' as 特征、'体重' as 特征 来确定图5第3列的列名与每行数据该列的值，使用age as 数值、height as 数值、weight as 数值来确定图5第4列的列名与每行数据该列的值，3个select 查询出3张表格，再通过union连接成一张表格

+ union注意点

> 使用union连接表时需要注意表的字段一致，此处我们3个select 查询出3张表格字段是一致的

+ 例子

```mysql
select  id , name ,'年龄' as features,age as value  from user2  union 

select  id , name ,'体重' as features,weight as value  from user2 union

select  id , name ,'身高' as features,height as value  from user2 

-- 这里面有一个常设值 比如 '年龄' as features , '体重' as features  直接挂到列上的  除了这个就没有其它难点了
```


## 七:重要函数单独说明

###  count 函数

+ 问题：用count(*)，count(1)，count(不存在NULL的列名)谁好呢?

> 其实，对于MyISAM引擎的表是没有区别的(O(1))。这种引擎内部有一计数器在维护着行数。
Innodb引擎的表用count(*),count(1)直接读行数，复杂度是O(n)，因为innodb真的要去数一遍。但好于具体的count(列名)。

+ 问题：能不能使用count(列名)替换count(*)?

> 不要使用 count(列名)来替代 count(*) ， count(*) 是 SQL92 定义的标准统计行数的语法，跟数 据库无关，跟 NULL 和非 NULL 无关。

> count(*)会统计值为 NULL 的行，而 count(列名)不会统计此列为 NULL 值的行。

+ 解决MySQL5.7版本之后使用GROUP BY语句时报错

* 1、先使用SQL查询sql_mode 

```mysql
select @@global.sql_mode
```

* 2、重新设置sql_mode，删除ONLY_FULL_GROUP_BY 

```MYSQL
set @@global.sql_mode ='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION'
```





