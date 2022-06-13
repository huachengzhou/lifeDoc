
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


## 缓存

## 全文