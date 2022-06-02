
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

-- 创建生成指定范围的随机数字
DROP PROCEDURE IF EXISTS proc_random_num;
DELIMITER ;

CREATE PROCEDURE proc_random_num(in custom_start_value double(12,2),in custom_end_value double(12,2),out result_value double(12,2))
BEGIN
  DECLARE start_value_p1 double(12,2) DEFAULT 0;
  DECLARE end_value_p1 double(12,2) DEFAULT 0;
  DECLARE num double DEFAULT 0;
  DECLARE num_value double DEFAULT 0;
  DECLARE range_value_t  double DEFAULT 0;
  DECLARE random_value_t  double DEFAULT 0;

  set `start_value_p1`  =  `custom_start_value`  ;
  set `end_value_p1`  = `custom_end_value`  ;
	set range_value_t = `custom_end_value` -  `custom_start_value` ;
  set random_value_t = RAND();
	set num_value =  `custom_start_value` + ROUND(random_value_t * range_value_t) ;
	set result_value = num_value ;
--   SELECT start_value_p1,`end_value_p1` ;
END ;



-- 创建生成指定范围的随机日期


DROP PROCEDURE IF EXISTS proc_random_date;--如果存在此存储过程则删掉
DELIMITER ;
CREATE PROCEDURE proc_random_date(in custom_start_year int(20),in custom_end_year int(20),in custom_start_month int(20),in custom_end_month int(20),in custom_start_day int(20),in custom_end_day int(20),out result_string LONGTEXT)
BEGIN
    DECLARE a1 int default 0;
    DECLARE a2 int default 0;
    DECLARE a3 int default 0;
		DECLARE string_value LONGTEXT DEFAULT '' ;
		-- 调用生成指定范围的数字存储过程
		CALL  proc_random_num(`custom_start_year` , `custom_end_year` , a1) ;
		CALL  proc_random_num(`custom_start_month` , `custom_end_month` , a2) ;
		CALL  proc_random_num(`custom_start_day` , `custom_end_day` , a3) ;
		set string_value = CONCAT_WS( '-', a1 , a2 , a3) ;
		set result_string = string_value ;
END ;
CALL proc_random_date(1890,2022,1,12,1,31,@result);
select @result;

-- 插入指定数量的日期

-- 创建插入数据的存储过程


DROP PROCEDURE IF EXISTS proc_insert_into_temp_date;--如果存在此存储过程则删掉
DELIMITER ;
CREATE PROCEDURE proc_insert_into_temp_date(in custom_value int(20))
BEGIN
    DECLARE i INT DEFAULT 1;
		DECLARE num_value INT DEFAULT 0;
		DECLARE date_value_param VARCHAR(255) ;
		SET num_value = custom_value ;
    WHILE i<=num_value DO
				CALL proc_random_date(1890,2022,1,12,1,31,date_value_param);
        INSERT INTO temp_date(`name`,`age`,`birthday`) VALUES(MD5(UUID()),CEILING(RAND()*100),date_value_param);
        SET i = i+1;
    END WHILE;
END ;

set @result_num = 1000;
CALL proc_insert_into_temp_date(@result_num);

-- 完成数据准备

-- 开始查询

SELECT
	DATE_ADD( `birthday`, INTERVAL 1 MONTH ) AS DATE_ADD_ONE_MONTH,
	DATE_SUB( `birthday`, INTERVAL 1 MONTH ) AS DATE_SUB_ONE_MONTH,
	DATE_FORMAT( `birthday`, '%Y-%m-%d %H-%i-%S' ) AS DATE_FORMAT 
FROM
	temp_date limit 1,30

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



## 七:行锁(悲观锁),表锁,页面锁

> 锁定用于确保事务完整性和数据库一致性。 锁定可以防止用户读取其他用户正在更改的数据，并防止多个用户同时更改相同的数据。 如果不使用锁定，数据库中的数据可能在逻辑上变得不正确，而针对这些数据进行查询可能会产生想不到的结果。

> 在计算机科学中，锁是在执行多线程时用于强行限制资源访问的同步机制，即用于在并发控制中保证对互斥要求的满足。在数据库的锁机制中介绍过，在DBMS中，可以按照锁的粒度把数据库锁分为行级锁(INNODB引擎)、表级锁(MYISAM引擎)和页级锁(BDB引擎 )。

### 行级锁

+ 行级锁是Mysql中锁定粒度最细的一种锁，表示只针对当前操作的行进行加锁。行级锁能大大减少数据库操作的冲突。其加锁粒度最小，但加锁的开销也最大。行级锁分为**共享锁** 和 **排他锁**。

+ 特点:开销大，加锁慢；会出现死锁；锁定粒度最小，发生锁冲突的概率最低，并发度也最高。

### 表级锁

+ 表级锁是MySQL中锁定粒度最大的一种锁，表示对当前操作的整张表加锁，它实现简单，资源消耗较少，被大部分MySQL引擎支持。最常使用的MYISAM与INNODB都支持表级锁定。表级锁定分为**表共享读锁**（共享锁）与**表独占写锁**（排他锁）

+ 特点:开销小，加锁快；不会出现死锁；锁定粒度大，发出锁冲突的概率最高，并发度最低。

### 页级锁

+ 页级锁是MySQL中锁定粒度介于行级锁和表级锁中间的一种锁。表级锁速度快，但冲突多，行级冲突少，但速度慢。所以取了折衷的页级，一次锁定相邻的一组记录。BDB支持页级锁

+ 特点:开销和加锁时间界于表锁和行锁之间；会出现死锁；锁定粒度界于表锁和行锁之间，并发度一般

### MySQL常用存储引擎的锁机制

+ MyISAM和MEMORY采用表级锁(table-level locking)
+ BDB采用页面锁(page-level locking)或表级锁，默认为页面锁
+ InnoDB支持行级锁(row-level locking)和表级锁,默认为行级锁

### Innodb中的行锁与表锁

+ 前面提到过，在Innodb引擎中既支持行锁也支持表锁，那么什么时候会锁住整张表，什么时候或只锁住一行呢？
+ InnoDB行锁是通过给索引上的索引项加锁来实现的，这一点MySQL与Oracle不同，后者是通过在数据块中对相应数据行加锁来实现的。InnoDB这种行锁实现特点意味着：只有通过索引条件检索数据，InnoDB才使用行级锁，否则，InnoDB将使用表锁！
+ 在实际应用中，要特别注意InnoDB行锁的这一特性，不然的话，可能导致大量的锁冲突，从而影响并发性能。
+ 行级锁都是基于索引的，如果一条SQL语句用不到索引是不会使用行级锁的，会使用表级锁。行级锁的缺点是：由于需要请求大量的锁资源，所以速度慢，内存消耗大。

### 行级锁与死锁

> MyISAM中是不会产生死锁的，因为MyISAM总是一次性获得所需的全部锁，要么全部满足，要么全部等待。而在InnoDB中，锁是逐步获得的，就造成了死锁的可能。

> 在MySQL中，行级锁并不是直接锁记录，而是锁索引。索引分为主键索引和非主键索引两种，如果一条sql语句操作了主键索引，MySQL就会锁定这条主键索引；如果一条语句操作了非主键索引，MySQL会先锁定该非主键索引，再锁定相关的主键索引。 在UPDATE、DELETE操作时，MySQL不仅锁定WHERE条件扫描过的所有索引记录，而且会锁定相邻的键值，即所谓的next-key locking。

+ 当两个事务同时执行，一个锁住了主键索引，在等待其他相关索引。另一个锁定了非主键索引，在等待主键索引。这样就会发生死锁。

+ 发生死锁后，InnoDB一般都可以检测到，并使一个事务释放锁回退，另一个获取锁完成事务。

+ 有多种方法可以避免死锁，这里只介绍常见的三种
+ 1、如果不同程序会并发存取多个表，尽量约定以相同的顺序访问表，可以大大降低死锁机会。
+ 2、在同一个事务中，尽可能做到一次锁定所需要的所有资源，减少死锁产生概率；
+ 3、对于非常容易产生死锁的业务部分，可以尝试使用升级锁定颗粒度，通过表级锁定来减少死锁产生的概率；

### 行锁例子

+ InnoDB实现了以下两种类型的行锁：
+ 共享锁（S）：允许一个事务去读一行，阻止其他事务获得相同数据集的排它锁
+ 排他锁（X）：允许获取排他锁的事务更新数据，阻止其他事务获得相同数据集的共享锁和排他锁


| 当前锁类型\请求锁类型                | S (共享锁)              |         X(排他锁)                 |
|           :-------------            |     :-------------      |         :-------------           |
|              S(共享锁)              |        兼容              |                冲突              |
|              X(排他锁)              |        冲突              |                冲突              |





|      SQL               |           行锁类型            |        说明                 |
|           :-------------            |     :-------------      |         :-------------               |
|             INSERT...             |        排他锁              |                自动加锁              |
|             UPDATE...             |        排他锁              |                自动加锁              |
|             DELETE...             |        排他锁              |                自动加锁              |
|             SELECT...             |        不加任何锁              |                                  |
| SELECT... LOCK IN SHARE MODE   |        共享锁             |     需要在手动在SELECT之后LOCK IN SHARE MODE |
| SELECT... FOR UPDATE   |        排他锁             |     需要在手动在SELECT之后FOR UPDATE |

* 例子1 行级锁(排他锁)
```mysql
-- 创建行锁条件
-- 1、表中创建索引， select 。。。 where   字段（必须是索引）  不然行锁就无效。
-- 2、必须要有事务，这样才是 行锁（排他锁）
-- 3、在select  语句后面 加 上    FOR UPDATE；

start transaction ;
select age,birthday from temp_date where 1=1 and age = 60 for update;
-- 休眠5秒
select SLEEP(5);
commit ;
```

### 表锁定例子

+ 获取表的锁的简单形式

```mysql
LOCK TABLES table_name [READ | WRITE]
-- 可将表的名称放在LOCK TABLES关键字后面，后跟一个锁类型。 MySQL提供两种锁类型：READ和WRITE
```

+ 释放表的锁

```mysql
UNLOCK TABLES;
```

+ 表锁定为READ

* 同时可以通过多个会话获取表的READ锁。此外，其他会话可以从表中读取数据，而无需获取锁定。
* 持有READ锁的会话只能从表中读取数据，但不能写入。此外，其他会话在释放READ锁之前无法将数据写入表中。来自另一个会话的写操作将被放入等待状态，直到释放READ锁。
* 如果会话正常或异常终止，MySQL将会隐式释放所有锁。这也与WRITE锁相关。

```mysql
lock table temp_date read;
insert into temp_date(age,birthday) values(102,'2008-04-25') ;

-- 结果
lock table temp_date read
> OK
> 时间: 0s


insert into temp_date(age,birthday) values(102,'2008-04-25')
> 1099 - Table 'temp_date' was locked with a READ lock and can't be updated
> 时间: 0s

-- 继续
select age,birthday  from temp_date;
-- 可以看到 READ锁  是可以读取数据的
-- 释放锁
unlock tables ;
```

+ 表锁定WRITE

* 只有拥有表锁定的会话才能从表读取和写入数据。
* 在释放WRITE锁之前，其他会话不能从表中读写。

```mysql
-- 加锁
lock table temp_date write;
insert into temp_date(age,birthday) values(102,'2008-04-25') ;
-- 测试是否还可继续读(从其他会话查询,因为当前会话连接是有锁的)
select age,birthday  from temp_date; 
-- 发现已经被阻塞了
-- 释放锁
unlock tables ;
```

+ 表锁了，强制释放

* 1、查看当前进程

*  show processlist;

* 2、查看当前运行的事务

* SELECT * FROM information_schema.INNODB_TRX;

* 3、当前出现的锁

*  SELECT * FROM information_schema.INNODB_LOCKs;

* 4、kill掉对应进程

* kill  id




## 八:事务

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


### mysql 出现 truncated incorrect double value （已解决）

+ 当 int 类型 与 字符串 相连的时候 用 + 就会报错
+ 使用CONCAT(）函数来连接即可
+ 列如 CONCAT(1,‘王’）代替 1 + ‘王’

### MySQL 1064 You have an error in your SQL syntax 错误解决办法

+ 　这是因为数据库表中的字段名引用了关键字，例如上面报错字段“desc
+  写sql语句时，引用到与mysql关键字重名的字段时，加上`` 
+  如: set `start_value_p1`  =  `custom_start_value`  ;


### mysql中 FORM的疑问

```mysql

CREATE TABLE `temp_date` (
  `id` int NOT NULL AUTO_INCREMENT,
  `age` float(14,2) DEFAULT NULL COMMENT 'age',
  `name` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL COMMENT '生日',
  `gmt_created` datetime DEFAULT CURRENT_TIMESTAMP,
  `gmt_modified` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='临时用户表';

-- 正常操作

SELECT id,age,birthday FROM temp_date ;

-- 奇奇怪怪的东西出来了

SELECT id,age,birthday FROM (SELECT id,age,birthday FROM temp_date ) tb_table ;
-- 注意上面tb_table还必须得加上 否则就报错误 Every derived table must have its own alias 相当于派生表了

-- 相当于FROM 实际可以跟上虚拟的派生表
```

### Mysql 相邻两行记录某列的差值方法

+ 最终demo

```mysql
SELECT 
 r_tab.id,
 r_tab.age,
 r_tab.birthday,
 r_tab.diff ,
 r_tab.diff_content 
FROM

(
SELECT tb_r.id, tb_r.age, tb_r.birthday, (tb_r.age - tb_y.age)as diff ,(CONCAT_WS('-',tb_r.age,tb_y.age))as diff_content 
 FROM 

(
SELECT tab.age,tab.id,(@rownum := @rownum + 1) AS rownum,tab.birthday FROM  temp_date tab,(SELECT @rownum := 0) r_tx
) tb_r 

LEFT JOIN

(
SELECT tab.age,tab.id,(@INDEX_NUM := @INDEX_NUM + 1) AS rownum,tab.birthday FROM  temp_date tab,(SELECT @INDEX_NUM := 0) r_ty
) tb_y

on tb_r.rownum = tb_y.rownum + 1
) r_tab

-- tb_r 和 tb_y比较后形成新的衍生或者派生表 r_tab  然后再把 r_tab 数据查出来
```

+ 简化后

```mysql
SELECT tb_r.id, tb_r.age, tb_r.birthday, (tb_r.age - tb_y.age)as diff ,(CONCAT_WS('-',tb_r.age,tb_y.age))as diff_content 
 FROM 

(
SELECT tab.age,tab.id,(@rownum := @rownum + 1) AS rownum,tab.birthday FROM  temp_date tab,(SELECT @rownum := 0) r_tx
) tb_r 

LEFT JOIN

(
SELECT tab.age,tab.id,(@INDEX_NUM := @INDEX_NUM + 1) AS rownum,tab.birthday FROM  temp_date tab,(SELECT @INDEX_NUM := 0) r_ty
) tb_y

on tb_r.rownum = tb_y.rownum + 1

-- tb_r 和 tb_y 直接作比较得出数据就可以了 (然后这里用left join就是以tb_r为主)
```

+ 在上面的例子解决后 增加 SQL实现相邻两行数据的加减乘除操作

```mysql
SELECT tb_r.id, tb_r.age, tb_r.birthday,(tb_r.age + tb_y.age)as add_v, (tb_r.age - tb_y.age)as sub_v , (tb_r.age * tb_y.age)as mul_v,(tb_r.age / tb_y.age)as div_v
 FROM 

(
SELECT tab.age,tab.id,(@rownum := @rownum + 1) AS rownum,tab.birthday FROM  temp_date tab,(SELECT @rownum := 0) r_tx
) tb_r 

LEFT JOIN

(
SELECT tab.age,tab.id,(@INDEX_NUM := @INDEX_NUM + 1) AS rownum,tab.birthday FROM  temp_date tab,(SELECT @INDEX_NUM := 0) r_ty
) tb_y

on tb_r.rownum = tb_y.rownum + 1
-- 利用上面的例子实现加减乘除
```