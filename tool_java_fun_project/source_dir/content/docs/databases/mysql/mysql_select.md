
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

## 二:函数

+ 聚集函数
+ 预定义函数-字符串函数
+ 预定义函数-时间处理函数
+ 预定义函数-数字处理函数
+ 算数、逻辑运算

### 1:聚集函数 (聚合函数可以理解成多对一)


+ 什么是聚合函数

> 聚合函数作用于一组数据，并对一组数据返回一个值

* 常用聚合函数：

| 函数 | 描述 |
| :------------- | :------------- |
| AVG() | 返回列的平均值 |
| COUNT(DISTINCT) | 返回列去重后的行数 |
| COUNT() | 返回列的行数 |
| MAX() | 返回列的最大值 |
| MIN() | 返回列的最小值 |
| SUM() | 返回列的总和 |
| GROUP_CONCAT() | 返回一组值的连接字符串(MySQL独有) |

+ 例子一

```mysql
-- 计算表中数量,最小值,最大值,平均值,平均值,累加值
select count(*) as count_value ,MIN(f_price) as min_value,MAX(f_price) as max_value,AVG(f_price) as avg_value ,SUM(f_price) as sum_value from fruits
```

+ 例子二

```mysql
SELECT c_name,GROUP_CONCAT(grade), sum(grade) as total_grade ,avg(grade) as avg_grade FROM score GROUP BY c_name
```

### 2:预定义函数-字符串函数


| 函数 | 描述 |
| :------------- | :------------- |
| LENGTH() | 返回列的字节数 |
| CHAR_LENGTH() | 返回列的字符数 |
| TRIM()/RTRIM()/LTRIM() | 去除两边空格/去除右边空格/去除左边空格 |
| SUBSTRING(str, pos, [len]) | 从pos位置截取字符串str，截取len长度 |
| LOCATE(substr, str, [pos]) | 返回substr在str字符串中的位置 |
| REPLACE(str, from_str, to_str) | 将str字符串中的from_str替换成to_str |
| LOWER(), UPPER() | 字符串转换为小写/大写 |

+ 例子

```mysql
SELECT
	`USER_NAME`,
	LENGTH( `USER_NAME` ) AS name_length,
	CHAR_LENGTH( USER_NAME ) AS string_length,
	LOWER( USER_NAME ) AS LOWER_NAME,
	UPPER( USER_NAME ) AS UPPER_NAME,
	REPLACE ( USER_NAME, '0', 'O' ) AS REPLACE_NAME,
	SUBSTRING( USER_NAME, '0', 5 ) AS SUBSTRING_NAME,
	TRIM( `USER_NAME` ) AS TRIM_NAME 
FROM
	`t_user` 
	LIMIT 2,40
```

### 3:预定义函数-数字处理函数

| 函数 | 描述 |
| :------------- | :------------- |
| ABS() | 返回数值的绝对值 |
| CEIL() | 对小数向上取整 CEIL(1.2)=2 |
| ROUND() | 四舍五入 |
| POW(num, n) | num的n次幂 POW(2, 2)=4 |
| FLOOR() | 对小数向下取整 CELL(1.2)=1 |
| MOD(N, M) | 取模(返回n除以m的余数)=N % M |
| RAND() | 取0~1之间的一个随机数 |

+ 例子一


```mysql
select ABS(-22.4) as ABS_VALUE,CEIL(1.4)as CEIL_VALUE,ROUND(1.49)as ROUND_VALUE,FLOOR(1.4) as FLOOR_VALUE,POW(2,3) AS POW_VALUE,RAND()*10 AS RAND_VALUE,MOD(8,3) AS MOD_VALUE ;
```

+ 例子二

```mysql
SELECT
	ABS( `f_price` ) AS ABS_VALUE,
	CEIL( `f_price` ) AS CEIL_VALUE,
	ROUND( `f_price` ) AS ROUND_VALUE,
	FLOOR( `f_price` ) AS FLOOR_VALUE,
	POW( `f_price`, 3 ) AS POW_VALUE,
	RAND( ) * `f_price` AS RAND_VALUE,
	MOD ( `f_price`, 3 ) AS MOD_VALUE 
FROM
	`fruits`;

```

### 4:预定义函数-时间处理函数

| 函数  | 描述 |
| :------------- | :------------- |
| CURDATE() | 当前日期 |
| CURTIME() | 当前时间 |
| NOW() | 显示当前时间日期(常用) |
| UNIX_TIMESTAMP() | 当前时间戳 |
| DATE_FORMAT(date, format) | 按指定格式显示时间 |
| DATE_ADD(date, INTERVAL unit) | 计算指定日期向后加一段时间的日期 |
| DATE_SUB(date, INTERVAL unit) | 计算指定日期向前减一段时间的日期 |

+ 例子1

```mysql

-- 使用临时日期函数来创建查询 基本全部用到了上面的函数

SELECT
	CURDATE( ) AS CURDATE,
	CURTIME( ) AS CURTIME,
	NOW( ) AS NOW,
	DATE_ADD( NOW( ), INTERVAL 1 MONTH ) AS DATE_ADD_ONE_MONTH,
	DATE_SUB( NOW( ), INTERVAL 1 MONTH ) AS DATE_SUB_ONE_MONTH,
	UNIX_TIMESTAMP( ) AS UNIX_TIMESTAMP,
	DATE_FORMAT( NOW( ), '%Y-%m-%d %H-%i-%S' ) AS DATE_FORMAT;
```

+ 例子2 这里我们结合实际来说

+ 需要准备数据 来查询  这里我们使用存储过程来创建特定的日期表

```mysql

-- 创建表

CREATE TABLE `temp_date` (
  `id` int NOT NULL AUTO_INCREMENT,
  `age` float(14,2) DEFAULT NULL COMMENT 'age',
  `name` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL COMMENT '生日',
  `gmt_created` datetime DEFAULT CURRENT_TIMESTAMP,
  `gmt_modified` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='临时用户表';

 -- 存储过程创建数据

DROP PROCEDURE IF EXISTS proc_insert_into_temp_date;--如果存在此存储过程则删掉
DELIMITER ;
CREATE PROCEDURE proc_insert_into_temp_date(in custom_value int(20))
BEGIN
    DECLARE i INT DEFAULT 1;
		DECLARE num_value INT DEFAULT 0;
		SET num_value = custom_value ;
    WHILE i<=num_value DO
        INSERT INTO temp_date(name,USER_PASSWORD,USER_EMAIL) VALUES(MD5(UUID()),MD5(UUID()),
				 CONCAT(substring(UUID(),1,7) , '@', substring(UUID(),4,8) ,'.com')
				);
        SET i = i+1;
    END WHILE;
END ;
CALL proc_insert_into_temp_date();


DROP PROCEDURE IF EXISTS proc_random_date;--如果存在此存储过程则删掉
DELIMITER ;
CREATE PROCEDURE proc_random_date(in custom_start_year int(20),in custom_end_year int(20))
BEGIN
    DECLARE i INT DEFAULT 1;
		DECLARE num_value INT DEFAULT 0;
		
END ;
CALL proc_random_date(1890,2022);




DROP PROCEDURE IF EXISTS proc_random_num;
DELIMITER ;
CREATE PROCEDURE proc_random_num(in custom_start_value double(20,2),in custom_end_value double(20,2),out result_value double(20,2))
BEGIN
    DECLARE start_value double DEFAULT 0;
		DECLARE end_value double  DEFAULT 0;
		DECLARE num double DEFAULT 0;
		DECLARE num_value double DEFAULT 0;
		DECLARE range_value  double DEFAULT 0;
		set range_value = RAND();
		set start_value = 2 ;
		set end_value = 3;
END ;

call proc_random_num(10,20,@result) ;
select @result;


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
id  NAME  weight               height                   age
2	  小明	0kg,48.0kg,0kg,0kg	 172.00,0cm,0cm,172.33	   0 , 0 ,23, 0 
5	  小红	0kg,40.0kg,0kg	     161.00,0cm,0cm	           0 , 0 ,19
8	  小花	0kg,42.0kg,0kg	     153.00,0cm,0cm	           0 , 0 ,17
12	小军	0kg,0kg	             0cm,0cm	               0 ,  0 
15	小胖	0kg,0kg,0kg	         0cm,0cm,0cm	           0 , 0 , 0 

-- 可以看到已经全部取出组合而来  虽然结果值很乱 但是这是最靠谱的 把结果处理下就行啦,比如可以考虑代码直接处理或者存储过程处理

-- 第四次  (优化第三次)

SELECT
	tb_user.id,tb_user.NAME ,
	group_concat(DISTINCT  CASE WHEN `features` = '体重' and `value` != '0kg'  THEN `value` ELSE null  END  ) AS  weight,
	group_concat(DISTINCT CASE WHEN `features` = '身高' and `value` !=  '0cm' THEN `value` ELSE null END) AS height,
	group_concat(DISTINCT CASE WHEN `features` = '年龄' and `value` !=  '0'  THEN `value` ELSE null END) AS age 
FROM user_column_row tb_user  GROUP BY tb_user.NAME order by tb_user.id;

-- 结果
id  NAME  weight  height          age
2	  小明	48kg	  172.00,172.33	  23
5	  小红	40kg	  161.00	        19
8	  小花	42kg	  153.00	        17
12	小军			
15	小胖			

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



## 七:行锁(悲观锁),表锁



## 八:事务



## 九:重要函数单独说明

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

###  批量插入





