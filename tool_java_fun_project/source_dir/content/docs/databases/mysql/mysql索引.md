
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

+ 唯一索引

+ 多列索引(组合索引)

+ 前缀索引

+ 隐藏索引

## 聚簇索引和非聚簇索引

+ 聚集索引。表数据按照索引的顺序来存储的，也就是说索引项的顺序与表中记录的物理顺序一致。对于聚集索引，叶子结点即存储了真实的数据行，不再有另外单独的数据页。 在一张表上最多只能创建一个聚集索引，因为真实数据的物理顺序只能有一种

+ 非聚集索引。表数据存储顺序与索引顺序无关。对于非聚集索引，叶结点包含索引字段值及指向数据页数据行的逻辑指针，其行数量与数据表行数据量一致

+ 总结一下：聚集索引是一种稀疏索引，数据页上一级的索引页存储的是页指针，而不是行指针。而对于非聚集索引，则是密集索引，在数据页的上一级索引页它为每一个数据行存储一条索引记录





## 索引注意事项


[备注一](https://cloud.tencent.com/developer/article/1541265)
[备注二](https://www.cnblogs.com/qlqwjy/p/7770580.html)
[备注三](https://blog.csdn.net/baidu_35813686/article/details/84434404)
[备注四](https://zhuanlan.zhihu.com/p/29118331)

