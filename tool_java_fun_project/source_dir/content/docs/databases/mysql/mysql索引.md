
---
title: "mysql索引"
date: 2020-01-17T15:26:15Z
draft: false
weight: 30
---


# 索引

> MySQL使用索引快速查找具有特定列值的行。如果没有索引，MySQL必须扫描整个表以找到相关的行。较大的表，搜索速度越慢。

+ 索引由**类型**和**方法**组成(有的时候你没有指定就是使用的默认方法Btree这是一种B+树)有的人也把方法称为方式

###  讨论索引之前讨论树这种结构

+ B树

+ B树有如下特点:

+ 所有键值分布在整颗树中（索引值和具体data都在每个节点里）；
+ 任何一个关键字出现且只出现在一个结点中；
+ 搜索有可能在非叶子结点结束（最好情况O(1)就能找到数据）；
+ 在关键字全集内做一次查找,性能逼近二分查找；

+ 与AVL 树，红黑树相比性能没那么好但是可以处理较大数据量后者虽然查得快但是处理大量数据有一定的问题比如(耗内存,数据库可能会有海量的数据)

+ B+树
+ B+树是B-树的变体，也是一种多路搜索树, 它与 B- 树的不同之处在于
+ 所有关键字存储在叶子节点出现,内部节点(非叶子节点并不存储真正的 data) 为所有叶子结点增加了一个链指针
+ (自己理解)B+树每个节点都包含了指向其子节点的指针虽然没有直接包含子节点但是相当于间接包含了子节点

+ 因此B+树是大多数 MySQL 存储引擎的默认索引类型

###  讨论hash结构

+ 哈希索引能以 O(1) 时间进行查找，但是失去了有序性，它具有以下限制
+ 无法用于排序与分组
+ 只支持精确查找，无法用于部分查找和范围查找。
+ InnoDB 存储引擎有一个特殊的功能叫“自适应哈希索引”，当某个索引值被使用的非常频繁时，会在 B+Tree 索引之上再创建一个哈希索引，这样就让 B+Tree 索引具有哈希索引的一些优点，比如快速的哈希查找。

> MySQL中，只有Memory存储引擎显示支持hash索引，是Memory表的默认索引类型，尽管Memory表也可以使用B-Tree索引
> 也就是我们从某种程度日常开发基本就接触BTREE数据结构了

## 索引创建和更改语法

```shell
-- 创建 索引 

CREATE <索引名> ON <表名> (<列名> [<长度>] [ ASC | DESC])
CREATE <索引类型> <索引名> ON <表名> (<列名> [<长度>] [ ASC | DESC])
CREATE INDEX indexName ON table_name (column_name)
CREATE TABLE 也可以创建TABLE
-- 仅仅在这直接列举了
-- 包含一个索引
CREATE TABLE test_demo(
id INT NOT NULL,
name varchar(200) NOT NULL,
UNIQUE INDEX uk_idx_id(id)
);
-- 包含3个索引
-- 设定为主键后数据库会自动建立索引，innodb为聚簇索引
CREATE TABLE test_demo(
id INT(10) UNSIGNED AUTO_INCREMENT ,
uuid INT NOT NULL,
name varchar(200) NOT NULL,
PRIMARY KEY(id),
INDEX single_idx_name(name(20)) ,
UNIQUE KEY uk_idx_id(uuid)
);

DROP INDEX <索引名> ON <表名>
ALTER TABLE <表名>  DROP PRIMARY KEY：表示删除表中的主键。一个表只有一个主键，主键也是一个索引
ALTER TABLE <表名>  DROP INDEX index_name：表示删除名称为 index_name 的索引
ALTER TABLE <表名> DROP FOREIGN KEY fk_symbol：表示删除外键
```

## 索引类型

+ Normal 普通索引 Unique 唯一索引 Full Text 全文索引 SPATIAL 空间索引

> 不管什么索引类型 都可以被一列或者多列使用 这点很重要



### Normal 普通索引

```shell
drop table if EXISTS t_example_index ;

CREATE TABLE t_example_index (
    c1 INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    c2 VARCHAR(100),
    c3 VARCHAR(100),
	  n1 int(12),
	  n2 int(12),
    n3 int(12))
ENGINE=InnoDB;

-- Normal 表示普通索引，大多数情况下都可以使用
-- 没有指定索引方法
CREATE INDEX index_c1 ON t_example_index ( n1 );

mysql> SHOW INDEX FROM t_example_index ;
+-----------------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
| Table           | Non_unique | Key_name | Seq_in_index | Column_name | Collation | Cardinality | Sub_part | Packed | Null | Index_type | Comment | Index_comment | Visible | Expression |
+-----------------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
| t_example_index |          0 | PRIMARY  |            1 | c1          | A         |           0 | NULL     | NULL   |      | BTREE      |         |               | YES     | NULL       |
| t_example_index |          1 | index_c1 |            1 | n1          | A         |           0 | NULL     | NULL   | YES  | BTREE      |         |               | YES     | NULL       |
+-----------------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
2 rows in set (0.06 sec)

-- 当使用 NORMAL 的时候不需要加上NORMAL
CREATE NORMAL INDEX index_c2 ON t_example_index ( n2 );
-- 使用多列一起组成索引
CREATE  INDEX index_c2 ON t_example_index ( n2,n3 );
mysql> SHOW INDEX FROM t_example_index ;
+-----------------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
| Table           | Non_unique | Key_name | Seq_in_index | Column_name | Collation | Cardinality | Sub_part | Packed | Null | Index_type | Comment | Index_comment | Visible | Expression |
+-----------------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
| t_example_index |          0 | PRIMARY  |            1 | c1          | A         |           0 | NULL     | NULL   |      | BTREE      |         |               | YES     | NULL       |
| t_example_index |          1 | index_c1 |            1 | n1          | A         |           0 | NULL     | NULL   | YES  | BTREE      |         |               | YES     | NULL       |
| t_example_index |          1 | index_c2 |            1 | n2          | A         |           0 | NULL     | NULL   | YES  | BTREE      |         |               | YES     | NULL       |
| t_example_index |          1 | index_c2 |            2 | n3          | A         |           0 | NULL     | NULL   | YES  | BTREE      |         |               | YES     | NULL       |
+-----------------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
4 rows in set (0.09 sec)
```

### Unique 唯一索引 

```mysql
 drop table if EXISTS t_example_index_x2 ;

CREATE TABLE t_example_index_x2 (
    c1 INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    c2 VARCHAR(100),
    c3 VARCHAR(100),
	  n1 int(12),
	  n2 int(12),
    n3 int(12))
ENGINE=InnoDB;
-- 使用单列索引
CREATE UNIQUE INDEX index_c1 ON t_example_index_x2 ( n1 );
-- 使用2列索引
CREATE UNIQUE INDEX index_c2_3 ON t_example_index_x2 ( n2,n3 );
```

### Full Text 全文索引

```mysql

drop table if EXISTS t_example_full_text_index ;

CREATE TABLE t_example_full_text_index  (
  id int(11) NOT NULL AUTO_INCREMENT,
  pro_date datetime DEFAULT NULL,
  price_remark varchar(255) DEFAULT NULL,
  title varchar(255) NOT NULL,
  post_content text,
  body text,
  remark text,
  gmt_created datetime DEFAULT CURRENT_TIMESTAMP,
  gmt_modified datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- 单列索引
CREATE FULLTEXT INDEX post_content_full_index on t_example_full_text_index(post_content) ;

mysql> SHOW INDEX FROM t_example_full_text_index ;
+---------------------------+------------+-------------------------+--------------+--------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
| Table                     | Non_unique | Key_name                | Seq_in_index | Column_name  | Collation | Cardinality | Sub_part | Packed | Null | Index_type | Comment | Index_comment | Visible | Expression |
+---------------------------+------------+-------------------------+--------------+--------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
| t_example_full_text_index |          0 | PRIMARY                 |            1 | id           | A         |           0 | NULL     | NULL   |      | BTREE      |         |               | YES     | NULL       |
| t_example_full_text_index |          1 | post_content_full_index |            1 | post_content | NULL      |           0 | NULL     | NULL   | YES  | FULLTEXT   |         |               | YES     | NULL       |
+---------------------------+------------+-------------------------+--------------+--------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
2 rows in set (0.18 sec)

-- 组合索引

CREATE FULLTEXT INDEX body_and_title_full_index on t_example_full_text_index(body,title) ;

mysql> SHOW INDEX FROM t_example_full_text_index ;
+---------------------------+------------+---------------------------+--------------+--------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
| Table                     | Non_unique | Key_name                  | Seq_in_index | Column_name  | Collation | Cardinality | Sub_part | Packed | Null | Index_type | Comment | Index_comment | Visible | Expression |
+---------------------------+------------+---------------------------+--------------+--------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
| t_example_full_text_index |          0 | PRIMARY                   |            1 | id           | A         |           0 | NULL     | NULL   |      | BTREE      |         |               | YES     | NULL       |
| t_example_full_text_index |          1 | post_content_full_index   |            1 | post_content | NULL      |           0 | NULL     | NULL   | YES  | FULLTEXT   |         |               | YES     | NULL       |
| t_example_full_text_index |          1 | body_and_title_full_index |            1 | body         | NULL      |           0 | NULL     | NULL   | YES  | FULLTEXT   |         |               | YES     | NULL       |
| t_example_full_text_index |          1 | body_and_title_full_index |            2 | title        | NULL      |           0 | NULL     | NULL   |      | FULLTEXT   |         |               | YES     | NULL       |
+---------------------------+------------+---------------------------+--------------+--------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
4 rows in set (0.23 sec)
-- 提一句全文索引的使用方法
SELECT * FROM t_example_full_text_index WHERE MATCH (post_content) AGAINST ('北京' IN NATURAL LANGUAGE MODE);

-- ALTER TABLE  t_example_full_text_index ADD FULLTEXT INDEX remark_index(remark)  ;
```

### SPATIAL 空间索引

> 空间索引创建中，要求空间类型的字段必须为非空

```mysql
drop table if EXISTS tb_geometry_example ;

CREATE TABLE tb_geometry_example(
id int(11) NOT NULL AUTO_INCREMENT,
geo GEOMETRY NOT NULL,
geo_a GEOMETRY NOT NULL,
geo_b GEOMETRY NOT NULL,
geo_c GEOMETRY NOT NULL,
 title varchar(255) NOT NULL,
 remark varchar(500) NOT NULL,
PRIMARY KEY (id)
) ENGINE=MyISAM;

CREATE SPATIAL INDEX geo_index on tb_geometry_example(geo);
CREATE SPATIAL INDEX geo_a_geo_b_index on tb_geometry_example(geo_a,geo_b)
> 1070 - Too many key parts specified; max 1 parts allowed
> 时间: 0s
-- 说明不能组合索引
ALTER TABLE tb_geometry_example ADD SPATIAL  INDEX geo_a_index(geo_a) ;
```

## 索引方法


## 索引组合的方式


+ 单列索引

```
参考本文前面
```

+ 唯一索引
```
主键和唯一索引的区别
1、主键是一种约束，唯一索引是一种索引，两者在本质上是不同的。

2、主键创建后一定包含一个唯一性索引，唯一性索引不一定就是主键。

3、唯一性索引列允许空值， 而主键列不允许为空值。

4、主键可以被其他表引用为外键，而唯一索引不能。

5、 一个表最多只能创建一个主键，但是可以创建多个唯一索引。

6、主键更适合那些不容易改变的唯一标识，如自动递增列，身份证号等。

7、在RBO 模式下，主键的执行计划优先级高于唯一索引。两者可以提高查询的速度。
```

+ 多列索引(组合索引)
```
参考本文前面
```


+ 前缀索引
  
```
指的是mysql like 某些对那列字段增加索引可以使用like 但是只能是前缀查询如keyword%
select title,content from demo_like_table where 1=1 and title like ‘73%';
具体参考本主题的mysql优化
```

+ 隐藏索引
```
实际指的是主键  主键是一种特殊索引 即使你没有指定主键列是索引它也是索引
```


## 聚簇索引和非聚簇索引

+ 聚集索引。表数据按照索引的顺序来存储的，也就是说索引项的顺序与表中记录的物理顺序一致。对于聚集索引，叶子结点即存储了真实的数据行，不再有另外单独的数据页。 在一张表上最多只能创建一个聚集索引，因为真实数据的物理顺序只能有一种

+ 非聚集索引。表数据存储顺序与索引顺序无关。对于非聚集索引，叶结点包含索引字段值及指向数据页数据行的逻辑指针，其行数量与数据表行数据量一致

+ 总结一下：聚集索引是一种稀疏索引，数据页上一级的索引页存储的是页指针，而不是行指针。而对于非聚集索引，则是密集索引，在数据页的上一级索引页它为每一个数据行存储一条索引记录

+ 一个表只能有一个聚簇索引

> 目前，只有solidDB和InnoDB支持聚簇索引，MyISAM不支持聚簇索引。一些DBMS允许用户指定聚簇索引，但是MySQL的存储引擎到目前为止都不支持

### InnoDB的聚簇索引

+ InnoDB对主键建立聚簇索引。
+ 如果你不指定主键，InnoDB会用一个具有唯一且非空值的索引来代替。
+ 如果不存在这样的索引，InnoDB会定义一个隐藏的主键，然后对其建立聚簇索引


## Hash索引

```mysql
CREATE TABLE tb_test_hash (
  fname VARCHAR(50) NOT NULL,
  lname VARCHAR(50) NOT NULL
) ENGINE=MEMORY;


ALTER TABLE tb_test_hash ADD INDEX   hash_index(fname) ;

DROP INDEX hash_index on tb_test_hash;
```



## 索引注意事项





### 哪些情况适合创建索引

+ 字段的数值有唯一性的限制

> 业务上具有唯一特性的字段，即使是组合字段，也必须建成唯一索引。（来源：Alibaba）
说明：不要以为唯一索引影响了 insert 速度，这个速度损耗可以忽略，但提高查找速度是明显的。

+ 频繁作为 WHERE 查询条件的字段

> 某个字段在SELECT语句的 WHERE 条件中经常被使用到，那么就需要给这个字段创建索引了。尤其是在
数据量大的情况下，创建普通索引就可以大幅提升数据查询的效率。

+ 经常 GROUP BY 和 ORDER BY 的列

> 索引就是让数据按照某种顺序进行存储或检索，因此当我们使用 GROUP BY 对数据进行分组查询，或者
使用 ORDER BY 对数据进行排序的时候，就需要 对分组或者排序的字段进行索引 。如果待排序的列有多
个，那么可以在这些列上建立 组合索引

+ UPDATE、DELETE 的 WHERE 条件列

> 对数据按照某个条件进行查询后再进行 UPDATE 或 DELETE 的操作，如果对 WHERE 字段创建了索引，就
能大幅提升效率。原理是因为我们需要先根据 WHERE 条件列检索出来这条记录，然后再对它进行更新或
删除。如果进行更新的时候，更新的字段是非索引字段，提升的效率会更明显，这是因为非索引字段更
新不需要对索引进行维护

+ DISTINCT 字段需要创建索引

```
有时候我们需要对某个字段进行去重，使用 DISTINCT，那么对这个字段创建索引，也会提升查询效率。
比如，我们想要查询课程表中不同的 student_id 都有哪些，如果我们没有对 student_id 创建索引，执行
SQL 语句：
运行结果（600637 条记录，运行时间 0.683s ）：
如果我们对 student_id 创建索引，再执行 SQL 语句：
运行结果（600637 条记录，运行时间 0.010s ）：
你能看到 SQL 查询效率有了提升，同时显示出来的 student_id 还是按照 递增的顺序 进行展示的。这是因
为索引会对数据按照某种顺序进行排序，所以在去重的时候也会快很多。
```

+ 多表 JOIN 连接操作时，创建索引注意事项
> 首先， 连接表的数量尽量不要超过 3 张 ，因为每增加一张表就相当于增加了一次嵌套的循环，数量级增
长会非常快，严重影响查询的效率。

> 其次， 对 WHERE 条件创建索引 ，因为 WHERE 才是对数据条件的过滤。如果在数据量非常大的情况下，
没有 WHERE 条件过滤是非常可怕的。

> 最后， 对用于连接的字段创建索引 ，并且该字段在多张表中的 类型必须一致 。比如 course_id 在
student_info 表和 course 表中都为 int(11) 类型，而不能一个为 int 另一个为 varchar 类型。
举个例子，如果我们只对 student_id 创建索引，执行 SQL 语句：

```
SELECT course_id, name, student_info.student_id, course_name
FROM student_info JOIN course
ON student_info.course_id = course.course_id
WHERE name = '462eed7ac6e791292a79';
-- 运行结果（1 条数据，运行时间 0.189s ）：
-- 这里我们对 name 创建索引，再执行上面的 SQL 语句，运行时间为 0.002s 。
```

### 索引使用注意事项

+ 如果对大的文本进行搜索，使用全文索引而不要用使用 like ‘%…%’
+ like语句不要以通配符开头
+ 对于LIKE：在以通配符%和_开头作查询时，MySQL不会使用索引。like操作一般在全文索引中会用到（InnoDB数据表不支持全文索引）

```mysql
-- 例如下句会使用索引
SELECT * FROM mytable WHERE username like 'admin%'
而下句就不会使用
SELECT * FROM mytable WHEREt Name like '%admin'
```

+ 不要在列上进行运算
+ 索引列不能是表达式的一部分，也不是是函数的参数

```mysql
-- 例如以下两个查询无法使用索引
-- 1:表达式
 select actor_id from sakila.actor where actor_id+1=5;

-- 2:函数参数
select ... where TO_DAYS(CURRENT_DATE) - TO_DAYS(date_col)<=10;
```

+ 尽量不要使用NOT IN、<>、!= 操作
+ 应尽量避免在 where 子句中使用!=或<>操作符，否则将引擎放弃使用索引而进行全表扫描

```mysql
-- 对于not in，可以用not exists或者（外联结+判断为空）来代替；很多时候用 exists 代替 in 是一个好的选择：
select num from a where num in(select num from b) ;
-- 用下面的语句替换
select num from a where exists(select 1 from b where num=a.num) ;
```

+ 对于<>，用其它相同功能的操作运算代替，如a<>0 改为 a>0 or a<0

+ or条件
+ 用 or 分割开的条件， 如果 or 前的条件中的列有索引， 而后面的列中没有索引， 那么涉及到的索引都不会被用到
+ 应尽量避免在 where 子句中使用 or 来连接条件，否则将导致引擎放弃使用索引而进行全表扫描

+ 如:
```mysql
-- 假设num1有索引，num2没有索引
select id from t where num1=10 or num2=20 ;
-- 会放弃使用索引，可以改为这样查询
select id from t where num1=10 union all select id from t where num2=20 ;
-- 这样虽然num2没有使用索引，但至少num1会使用索引，提高效率
```

+ 组合索引的使用要遵守“最左前缀”原则' 

+ 组合索引：当不需要考虑排序和分组时，将选择性最高的列放在前面通常是最好的
```mysql
-- 如
CREATE TABLE People (
  last_name varchar(50) not null,
  first_name varchar(50) not null,
  birthday date not null,
  gender enum('m', 'f') not null,
  key(last_name, first_name, birthday)
);
```

+ 查询必须从索引的最左边的列开始，否则无法使用索引。例如，你不能直接利用索引查找在某一天出生的人
+ 不能跳过某一索引列。例如，你不能利用索引查找last name为Smith且出生于某一天的人
+ 存储引擎不能使用索引中范围条件右边的列。例如，如果你的查询语句为WHERE last_name="Smith" AND first_name LIKE 'J%' AND dob='1976-12-23'，则该查询只会使用索引中的前两列，因为LIKE是范围查询
+ 假如你一定要使用like 查询并且用到索引 那么参考本主题mysql优化
+ 使用索引排序时，ORDER BY也要遵守“最左前缀”原则
+ 当索引的顺序与ORDER BY中的列顺序相同，且所有的列是同一方向（全部升序或者全部降序）时，可以使用索引来排序
+ ORDER BY子句和查询型子句的限制是一样的：需要满足索引的最左前缀的要求，有一种情况下ORDER BY子句可以不满足索引的最左前缀要求，那就是前导列为常量时：WHERE子句或者JOIN子句中对前导列指定了常量
+ 如果查询是连接多个表，仅当ORDER BY中的所有列都是第一个表的列时才会使用索引。其它情况都会使用filesort文件排序
+ 如果列类型是字符串，那么一定记得在 where 条件中把字符常量值用引号引起来，否则的话即便这个列上有索引，MySQL 也不会用到的，因为MySQL 默认把输入的常量值进行转换以后才进行检索
```mysql
explain select * from company2 where name = '294' ;
```

+ 最后
```
只有当数据库里已经有了足够多的测试数据时，它的性能测试结果才有实际参考价值。
如果在测试数据库里只有几百条数据记录，它们往往在执行完第一条查询命令之后就被全部加载到内存里，
这将使后续的查询命令都执行得非常快——不管有没有使用索引。只有当数据库里的记录超过了1000条、
数据总量也超过了 MySQL服务器上的内存总量时，数据库的性能测试结果才有意义。

在不确定应该在哪些数据列上创建索引的时候，人们从EXPLAIN SELECT命令那里往往可以获得一些帮助。
这其实只是简单地给一条普通的SELECT命令加一个EXPLAIN关键字作为前缀而已。
有了这个关键字，MySQL将不是去执行那条SELECT命令，而是去对它进行分析。
MySQL将以表格的形式把查询的执行过程和用到的索引(如果有的话)等信息列出来。
```