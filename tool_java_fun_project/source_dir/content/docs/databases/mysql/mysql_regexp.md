
---
title: "mysql正则表达式"
date: 2020-01-17T15:26:15Z
draft: false
weight: 29
---


## 一:数据准备

```mysql
CREATE TABLE `t_user` (
  `USER_ID` int NOT NULL AUTO_INCREMENT,
  `USER_NAME` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `USER_PASSWORD` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `USER_EMAIL` char(80) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`USER_ID`),
  KEY `IDX_NAME` (`USER_NAME`)
) ENGINE=InnoDB AUTO_INCREMENT=209 DEFAULT CHARSET=utf8mb3;

-- 如果存在此存储过程则删掉
DROP PROCEDURE IF EXISTS proc_initData;
DELIMITER ;
CREATE PROCEDURE proc_initData()
BEGIN
    DECLARE i INT DEFAULT 1;
    WHILE i<=6000 DO
        INSERT INTO t_user(USER_NAME,USER_PASSWORD,USER_EMAIL) VALUES(MD5(UUID()),MD5(UUID()),
				 CONCAT(substring(UUID(),1,7) , '@', substring(UUID(),4,8) ,'.com')
				);
        SET i = i+1;
    END WHILE;
END ;
CALL proc_initData();

```

## 二:符号介绍

```linux
模式	描述（具体匹配什么）
^	匹配字符串的开始位置。
$	匹配字符串的结束位置。
.	匹配除 "\n" 之外的任何单个字符。
[...]	匹配所包含的任意一个字符。
[^...]	匹配未包含的任意字符。
?	匹配它前面的零个或一个子表达式（字符串）。
*	匹配它前面的零个或多个子表达式（字符串）。
+	匹配它前面的一个或多个子表达式（字符串）。
[abc]	匹配方括号之间列出的任何字符。
[^abc]	匹配方括号之间未列出的任何字符。
[A-Z]	匹配任何大写字母。
[a-z]	匹配任何小写字母。
[0-9]	匹配从0到9的任何数字。
[[:<:]]	匹配单词的开头。
[[:>:]]	匹配单词的结尾。
[:class:]	匹配字符类，即[：alpha：]匹配字母，[：space：]匹配空格，[：punct：]匹配标点符号，[：upper：] 匹配上层字母。
p1|p2|p3	匹配任何模式，p1或 p2或p3
{n}	匹配n前面元素的子表达式
{m,n}	匹配m到前面元素的n个子表达式
```


```mysql
select * from t_user;

-- 包含8的正则匹配
select * from t_user where USER_NAME REGEXP '8';

-- 包含8或者9的正则匹配 or
select * from t_user where USER_NAME REGEXP '8|9';

-- 以8开头的正则匹配
SELECT * from t_user where USER_NAME REGEXP '^8' ;

-- 以1结尾的正则匹配
SELECT * from t_user where USER_NAME REGEXP '1$' ;


-- 以8或者9开头的正则匹配
SELECT * from t_user where USER_NAME REGEXP '^[8-9]' ;


-- 以a-z开头的正则匹配 并且第二位是数字8的正则匹配
SELECT * from t_user where USER_NAME REGEXP '^[a-z]8' ;

-- 转义符号 由于.是特殊符号 那么要找包含.的字符必须转义
SELECT * from t_user where USER_PASSWORD REGEXP '\\.' ;


-- ^[8]* 以8开头有0个或者多个  [a-z]+ 有1个或者多个 0? 有0个或者1个匹配  [:alpha:]{1,4} 任意字符1到4个
SELECT * from t_user where USER_NAME REGEXP '^[8]*[a-z]+0?[:alpha:]{1,4}' ;
SELECT CONCAT(USER_ID,'-',USER_PASSWORD,' USER_NAME:',USER_NAME) as new_name from t_user where USER_NAME REGEXP '^[8]*[a-z]+0?[:alpha:]{1,4}' ;

```