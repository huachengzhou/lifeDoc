
---
title: "mysql优化"
date: 2020-01-17T15:26:15Z
draft: false
weight: 32
---


## mysql like 优化

### 思路

+ 要提高Mysql 的查询效率最有效的办法是让所有的查询走索引字段，但是在Mysql中 Like 关键字只有对前缀查询("keyword%")走索引
+ 例如:
+ select   title,content from demo_like_table where 1=1 and title  like '73%';
+ 我们常常需要模糊查询（"%keyword%"）或后缀查询("%keyword")
+ 解决办法的思路是想办法让模糊查询和后缀查询都能走索引就可以达到目的
+ 后缀查询解决方案：使用新建字段反转索引然后关键字段反转变成前缀查询
+ select  REVERSE(rtitle) as title,content from demo_like_table where 1=1 and rtitle  like '73%';
+ 上面虽然用的前缀查询但是实际起到了后缀查询的效果


```mysql
-- 创建一个表
CREATE TABLE `demo_like_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rtitle` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` longtext,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rtitle` (`rtitle`) USING BTREE,
  UNIQUE KEY `title` (`title`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 创建一个存储过程插入10w条数据

DROP PROCEDURE IF EXISTS pro_demo_like_table;--如果存在此存储过程则删掉
DELIMITER ;
CREATE PROCEDURE pro_demo_like_table(IN len_value int)
BEGIN
    DECLARE i INT DEFAULT 1;
		DECLARE `temp_value` VARCHAR(255) DEFAULT '';
    WHILE i<= len_value DO 
				set temp_value = substring(UUID(),1,7) ;
        INSERT INTO demo_like_table(title,rtitle,content,create_date) VALUES(`temp_value`, concat(REVERSE(`temp_value`),'') ,MD5(UUID()),
				 NOW());
        SET i = i+1;
    END WHILE;
END ;

-- 借用了一个反转函数 REVERSE

CALL pro_demo_like_table(100000);

-- 看一下数据(取少部分数据)
id  rtitle  title     content                           create_date
1	7b24016	61042b7	f1c4052d07190711480433bb5868d45f	2022-06-13 22:01:53
2	810e216	612e018	7da9f8cfc164709eaa538d00764b46fe	2022-06-13 22:01:53
3	df29316	61392fd	62c7635129b115d4b856ad55b2204f4e	2022-06-13 22:01:53
4	84a0416	6140a48	d8afb2f28952e446eb324fc92b211909	2022-06-13 22:01:53
5	6e28416	61482e6	86b76454892329da4b5f20f9a4900cb0	2022-06-13 22:01:54
6	60bf416	614fb06	5970f2b5e0635c73028823e425eebda4	2022-06-13 22:01:54
7	2037516	6157302	53b3c4a700d63267ea2f9efbd9aea224	2022-06-13 22:01:54
8	88be516	615eb88	fa8fd07bfe053316ffd0b0e99a53d702	2022-06-13 22:01:54
9	5e36616	61663e5	8deb3030510e1245c8d90ffa5be26e2f	2022-06-13 22:01:54
10	f4cd616	616dc4f	e76a2db7b00aaa32ecaca17d759f31ca	2022-06-13 22:01:54
11	4245716	6175424	4a243f6dde1d498dd4035c5b55f17908	2022-06-13 22:01:54
12	e880816	618088e	f2e7b09be96035cd9b0159c9dfb1818f	2022-06-13 22:01:54
13	cacb816	618bcac	4fac609c5d69f4f32925b4ab1142e883	2022-06-13 22:01:54


select  REVERSE(rtitle) as title,content from demo_like_table where 1=1 and rtitle  like '73%';
select title,content from demo_like_table where 1=1 and title  like '73%';

```

## 索引优化

### 索引

> 排好序的快速查找数据结构,影响查找和排序

### 索引重建操作

> 在MySQL数据库中,没有类似于SQL Server数据库或Oracle数据库中索引重建的语法（ALTER INDEX ... REBUILD）在官方文档中"2.11.10 Rebuilding or Repairing Tables or Indexes"中，提到下面三种方式可以Rebuild Index


+  Dump and Reload Method
+ ALTER TABLE Method
+ REPAIR TABLE Method

+ 1:DROP INDEX + CREATE INDEX方法

```mysql
drop table if exists t_example_index ;
CREATE TABLE t_example_index (
    c1 INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    c2 VARCHAR(100),
    c3 VARCHAR(100) )
ENGINE=InnoDB;
 
create index ix_t1_c2 on t_example_index(c2);

DROP INDEX ix_t1_c2 ON t_example_index; 

create index ix_t1_c2 on t_example_index(c2);
```

+ 2:ALTER TABLE方法 
+ ALTER TABLE t_example_index ENGINE = InnoDB

```mysql
SELECT table_name,create_time FROM  information_schema.TABLES WHERE table_name='t_example_index';

ALTER TABLE t_example_index ENGINE = InnoDB ;
-- ALTER TABLE t_example_index ENGINE=InnoDB 其实等价于REBUILD表（REBUILD表就是重建表的意思），所以索引也等价于重新创建了

SELECT table_name,create_time FROM  information_schema.TABLES WHERE table_name='t_example_index';
```

+ 3:REPAIR TABLE方法 (REPAIR TABLE方法用于修复被破坏的表，而且它仅仅能用于MyISAM, ARCHIVE,CSV类型的表)

```mysql
drop table if exists t_example_index_x2 ;

CREATE TABLE t_example_index_x2 (
    c1 INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    c2 VARCHAR(100),
    c3 VARCHAR(100) )
ENGINE=MyISAM;
 
REPAIR TABLE t_example_index_x2;
-- 此方法需要去检查索引文件t_example_index_x2.MYI 才能发现索引修复了
```

+ 4: OPTIMIZE TABLE方法

> 简单来说，OPTIMIZE TABLE操作使用Online DDL模式修改Innodb普通表和分区表，该方式会在prepare阶段和commit阶段持有表级锁：在prepare阶段修改表的元数据并且创建一个中间表，在commit阶段提交元数据的修改。由于prepare阶段和commit阶段在整个事务中的时间比例非常小，可以认为该OPTIMIZE TABLE的过程中不影响表的其他并发操作


```mysql
drop table if exists t_example_index_z ;

CREATE TABLE t_example_index_z (
    c1 INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    c2 VARCHAR(100),
    c3 VARCHAR(100) )
ENGINE=InnoDB;

SELECT table_name,create_time FROM  information_schema.TABLES WHERE table_name='t_example_index_z';

OPTIMIZE TABLE t_example_index_z;

SELECT table_name,create_time FROM  information_schema.TABLES WHERE table_name='t_example_index_z';
```




## 缓存(在某些版本无法实现)

+ 缓存相关的配置参数

```mysql
show variables like '%query_cache%';
+------------------------------+---------+
| Variable_name                | Value   |
+------------------------------+---------+
| have_query_cache             | YES     |      --查询缓存是否可用
| query_cache_limit            | 1048576 |      --可缓存具体查询结果的最大值
| query_cache_min_res_unit     | 4096    |      --查询缓存分配的最小块的大小(字节)
| query_cache_size             | 599040  |      --查询缓存的大小
| query_cache_type             | ON      |      --是否支持查询缓存
| query_cache_wlock_invalidate | OFF     |      --控制当有写锁加在表上的时候，是否先让该表相关的 Query Cache失效
+------------------------------+---------+
6 rows in set (0.02 sec)
```

+ 开启缓存

```mysql
-- 设置缓存内存大小
set global query_cache_size = 600000; 
 -- 开启查询缓存
set global query_cache_type = ON;    
```

## 全文

+ v 5.7.6


> 在MySQL 5.7.6之前，全文索引只支持英文全文索引，不支持中文全文索引，需要利用分词器把中文段落预处理拆分成单词，然后存入数据库。


> 从MySQL 5.7.6开始，MySQL内置了ngram全文解析器，用来支持中文、日文、韩文分词。本文使用的MySQL 版本是5.7.22，InnoDB数据库引擎。


### ngram全文解析器

>ngram就是一段文字里面连续的n个字的序列。ngram全文解析器能够对文本进行分词，每个单词是连续的n个字的序列。例如，用ngram全文解析器对“生日快乐”进行分词

+ MySQL 中使用全局变量ngram_token_size来配置ngram中n的大小，它的取值范围是1到10，默认值是2
+ 如果需要搜索单字，就要把ngram_token_size设置为1,因为中文单词最少是两个汉字，推荐使用默认值2
+ 全局变量ngram_token_size的两种设置方法
+ 1、启动mysqld命令时

```mysql
mysqld --ngram_token_size=2
```

+ 修改MySQL配置文件

```mysql
[mysqld] 
ngram_token_size=2
```



```mysql
n=1: '生', '日', '快', '乐' 
n=2: '生日', '日快', '快乐' 
n=3: '生日快', '日快乐' 
n=4: '生日快乐'
```

```mysql
-- 1:创建包含FULLTEXT(全文索引)的表
CREATE TABLE tb_posts (
  id int(11) NOT NULL AUTO_INCREMENT,
  pro_date datetime DEFAULT NULL,
  price_remark varchar(255) DEFAULT NULL,
  title varchar(255) NOT NULL,
  post_content text,
	gmt_created datetime DEFAULT CURRENT_TIMESTAMP,
  gmt_modified datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FULLTEXT KEY post_content (post_content)
);

-- 2:通过 alter table 的方式来添加

ALTER TABLE tb_posts ADD FULLTEXT INDEX ft_index (post_content) WITH PARSER ngram;

-- 3、直接通过create index的方式

CREATE FULLTEXT INDEX ft_index ON tb_posts (post_content) WITH PARSER ngram;
```

### 全文检索模式

+ 常用的全文检索模式有两种
+ 1、自然语言模式(NATURAL LANGUAGE MODE)
  
> 自然语言模式是MySQL 默认的全文检索模式。自然语言模式不能使用操作符，不能指定关键词必须出现或者必须不能出现等复杂查询。

+ 2、BOOLEAN模式(BOOLEAN MODE)

> BOOLEAN模式可以使用操作符，可以支持指定关键词必须出现或者必须不能出现或者关键词的权重高还是低等复杂查询。

```mysql

-- 普通短语搜索

SELECT * FROM tb_posts
WHERE MATCH (post_content)
AGAINST ('天津' );

-- 自然语言模式
-- 包含北京关键词
SELECT * FROM tb_posts
WHERE MATCH (post_content)
AGAINST ('北京' IN NATURAL LANGUAGE MODE);

-- 布尔模式
-- 必须包含
SELECT * FROM tb_posts
WHERE MATCH (post_content)
AGAINST ('无锡' IN  BOOLEAN MODE);

-- 通配符搜索
-- 匹配包含北京的字符串前缀开头的数据
SELECT * FROM tb_posts
WHERE MATCH (post_content)
AGAINST ('北京*' );

-- 如果通配符中的前缀术语长于ngram令牌大小，MySQL将把前缀术语转换为ngram短语并忽略通配符运算符
SELECT * FROM tb_posts
WHERE MATCH (post_content)
AGAINST ('北京顺鑫石门国际*' );


```

+ 全文停用词

+ 查看停用的默认词 SELECT * FROM INFORMATION_SCHEMA.INNODB_FT_DEFAULT_STOPWORD;

+ 思路 创建一个表和默认停用词相同的结构 然后你自己加记录进去 然后在设置这个表为自定义的停用词

```mysql
-- Create a new stopword table

CREATE TABLE my_stopwords(value VARCHAR(30)) ENGINE = INNODB;


-- Insert stopwords (for simplicity, a single stopword is used in this example)

INSERT INTO my_stopwords(value) VALUES ('Ishmael');


-- Create the table

 CREATE TABLE opening_lines (
id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
opening_line TEXT(500),
author VARCHAR(200),
title VARCHAR(200)
) ENGINE=InnoDB;


-- Insert data into the table

INSERT INTO opening_lines(opening_line,author,title) VALUES
('Call me Ishmael.','Herman Melville','Moby-Dick'),
('A screaming comes across the sky.','Thomas Pynchon','Gravity\'s Rainbow'),
('I am an invisible man.','Ralph Ellison','Invisible Man'),
('Where now? Who now? When now?','Samuel Beckett','The Unnamable'),
('It was love at first sight.','Joseph Heller','Catch-22'),
('All this happened, more or less.','Kurt Vonnegut','Slaughterhouse-Five'),
('Mrs. Dalloway said she would buy the flowers herself.','Virginia Woolf','Mrs. Dalloway'),
('It was a pleasure to burn.','Ray Bradbury','Fahrenheit 451');


-- Set the innodb_ft_server_stopword_table option to the new stopword table

SET GLOBAL innodb_ft_server_stopword_table = 'test/my_stopwords';


-- Create the full-text index (which rebuilds the table if no FTS_DOC_ID column is defined)

CREATE FULLTEXT INDEX idx ON opening_lines(opening_line);

```

+ 设置

```mysql
SET GLOBAL innodb_ft_aux_table='test/opening_lines';
```