
---
title: "数据准备"
date: 2020-01-17T15:26:15Z
draft: false
weight: 4
---







+ 数据准备

数据准备

```mysql
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

CREATE TABLE `score` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stu_id` int NOT NULL,
  `c_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `grade` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO  `score`(`id`, `stu_id`, `c_name`, `grade`) VALUES (1, 901, '计算机', 98);
INSERT INTO  `score`(`id`, `stu_id`, `c_name`, `grade`) VALUES (2, 901, '英语', 80);
INSERT INTO  `score`(`id`, `stu_id`, `c_name`, `grade`) VALUES (3, 902, '计算机', 65);
INSERT INTO  `score`(`id`, `stu_id`, `c_name`, `grade`) VALUES (4, 902, '中文', 88);
INSERT INTO  `score`(`id`, `stu_id`, `c_name`, `grade`) VALUES (5, 903, '中文', 95);
INSERT INTO  `score`(`id`, `stu_id`, `c_name`, `grade`) VALUES (6, 904, '计算机', 70);
INSERT INTO  `score`(`id`, `stu_id`, `c_name`, `grade`) VALUES (7, 904, '英语', 92);
INSERT INTO  `score`(`id`, `stu_id`, `c_name`, `grade`) VALUES (8, 905, '英语', 94);
INSERT INTO  `score`(`id`, `stu_id`, `c_name`, `grade`) VALUES (9, 906, '计算机', 90);
INSERT INTO  `score`(`id`, `stu_id`, `c_name`, `grade`) VALUES (10, 906, '英语', 85);


SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for score
-- ----------------------------
DROP TABLE IF EXISTS `score`;
CREATE TABLE `score`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `stu_id` int(0) NOT NULL,
  `c_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `grade` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of score
-- ----------------------------
INSERT INTO `score` VALUES (1, 901, '计算机', 98);
INSERT INTO `score` VALUES (2, 901, '英语', 80);
INSERT INTO `score` VALUES (3, 902, '计算机', 65);
INSERT INTO `score` VALUES (4, 902, '中文', 88);
INSERT INTO `score` VALUES (5, 903, '中文', 95);
INSERT INTO `score` VALUES (6, 904, '计算机', 70);
INSERT INTO `score` VALUES (7, 904, '英语', 92);
INSERT INTO `score` VALUES (8, 905, '英语', 94);
INSERT INTO `score` VALUES (9, 906, '计算机', 90);
INSERT INTO `score` VALUES (10, 906, '英语', 85);

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `id` int(0) NOT NULL,
  `class_id` int(0) NULL DEFAULT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sex` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `birth` year NULL DEFAULT NULL,
  `department` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (901, 1, '张老大', '男', 1985, '计算机系', '北京市海淀区');
INSERT INTO `student` VALUES (902, 1, '张老二', '男', 1986, '中文系', '北京市昌平区');
INSERT INTO `student` VALUES (903, 1, '张三', '女', 1990, '中文系', '湖南省永州市');
INSERT INTO `student` VALUES (904, 2, '李四', '男', 1990, '英语系', '辽宁省阜新市');
INSERT INTO `student` VALUES (905, 1, '王五', '女', 1991, '英语系', '福建省厦门市');
INSERT INTO `student` VALUES (906, 2, '王六', '男', 1988, '计算机系', '湖南省衡阳市');

-- ----------------------------
-- Table structure for tb_class
-- ----------------------------
DROP TABLE IF EXISTS `tb_class`;
CREATE TABLE `tb_class`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_class
-- ----------------------------
INSERT INTO `tb_class` VALUES (1, '一班');
INSERT INTO `tb_class` VALUES (2, '二班');

SET FOREIGN_KEY_CHECKS = 1;


CREATE TABLE `t_user` (
  `USER_ID` int NOT NULL AUTO_INCREMENT,
  `USER_NAME` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `USER_PASSWORD` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `USER_EMAIL` char(80) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`USER_ID`),
  KEY `IDX_NAME` (`USER_NAME`)
) ENGINE=InnoDB AUTO_INCREMENT=6209 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `temp_date` (
  `id` int NOT NULL AUTO_INCREMENT,
  `age` float(14,2) DEFAULT NULL COMMENT 'age',
  `name` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL COMMENT '生日',
  `gmt_created` datetime DEFAULT CURRENT_TIMESTAMP,
  `gmt_modified` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1075 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='临时用户表';

CREATE TABLE `user_column_row` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '姓名',
  `features` varchar(255) DEFAULT NULL COMMENT '特征',
  `value` varchar(255) DEFAULT NULL COMMENT '数值',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user2` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '名称',
  `age` double(11,2) DEFAULT NULL COMMENT '年龄',
  `height` double(11,2) DEFAULT NULL COMMENT '身高',
  `weight` double(11,2) DEFAULT NULL COMMENT '体重',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO  `user_column_row`(`id`, `name`, `features`, `value`) VALUES (2, '小明', '身高', '172.00');
INSERT INTO  `user_column_row`(`id`, `name`, `features`, `value`) VALUES (3, '小明', '体重', '48.0kg');
INSERT INTO  `user_column_row`(`id`, `name`, `features`, `value`) VALUES (4, '小明', '年龄', '23');
INSERT INTO  `user_column_row`(`id`, `name`, `features`, `value`) VALUES (5, '小红', '身高', '161.00');
INSERT INTO  `user_column_row`(`id`, `name`, `features`, `value`) VALUES (6, '小红', '体重', '40.0kg');
INSERT INTO  `user_column_row`(`id`, `name`, `features`, `value`) VALUES (7, '小红', '年龄', '19');
INSERT INTO  `user_column_row`(`id`, `name`, `features`, `value`) VALUES (8, '小花', '身高', '153.00');
INSERT INTO  `user_column_row`(`id`, `name`, `features`, `value`) VALUES (9, '小花', '体重', '42.0kg');
INSERT INTO  `user_column_row`(`id`, `name`, `features`, `value`) VALUES (10, '小花', '年龄', '17');
INSERT INTO  `user_column_row`(`id`, `name`, `features`, `value`) VALUES (11, '小明', '身高', '172.33');
INSERT INTO  `user_column_row`(`id`, `name`, `features`, `value`) VALUES (12, '小军', '身高', NULL);
INSERT INTO  `user_column_row`(`id`, `name`, `features`, `value`) VALUES (13, '小军', '体重', NULL);
INSERT INTO  `user_column_row`(`id`, `name`, `features`, `value`) VALUES (14, '小军', '年龄', NULL);
INSERT INTO  `user_column_row`(`id`, `name`, `features`, `value`) VALUES (15, '小胖', NULL, NULL);
INSERT INTO  `user_column_row`(`id`, `name`, `features`, `value`) VALUES (16, '小胖', NULL, NULL);
INSERT INTO  `user_column_row`(`id`, `name`, `features`, `value`) VALUES (17, '小胖', NULL, NULL);

INSERT INTO  `temp_date`(`id`, `age`, `name`, `birthday`, `gmt_created`, `gmt_modified`) VALUES (1, 27.00, '0512c852d8d53f715876c72a239da357', '1973-03-06', '2022-05-30 23:18:09', '2022-05-30 23:18:09');
INSERT INTO  `temp_date`(`id`, `age`, `name`, `birthday`, `gmt_created`, `gmt_modified`) VALUES (2, 3.00, '677a9a202a76195edebe5735486fbd37', '1992-02-02', '2022-05-30 23:18:09', '2022-05-30 23:18:09');
INSERT INTO  `temp_date`(`id`, `age`, `name`, `birthday`, `gmt_created`, `gmt_modified`) VALUES (3, 56.00, '960d07df0252db6c73d8bbd59bbce05f', '2016-09-23', '2022-05-30 23:18:09', '2022-05-30 23:18:09');
INSERT INTO  `temp_date`(`id`, `age`, `name`, `birthday`, `gmt_created`, `gmt_modified`) VALUES (4, 75.00, 'f715d5b2625b50c7f0bf28f4818efd28', '1963-02-25', '2022-05-30 23:18:10', '2022-05-30 23:18:10');
INSERT INTO  `temp_date`(`id`, `age`, `name`, `birthday`, `gmt_created`, `gmt_modified`) VALUES (5, 89.00, 'b61d09e5cc6e4f004bd308b871d83d9c', '1929-04-11', '2022-05-30 23:18:10', '2022-05-30 23:18:10');
INSERT INTO  `temp_date`(`id`, `age`, `name`, `birthday`, `gmt_created`, `gmt_modified`) VALUES (6, 3.00, 'bcb74f85d88f94dac13cda1dc62f9e07', '1950-08-24', '2022-05-30 23:18:10', '2022-05-30 23:18:10');
INSERT INTO  `temp_date`(`id`, `age`, `name`, `birthday`, `gmt_created`, `gmt_modified`) VALUES (7, 34.00, '5f632ce7c206a1559c0d153d4be1fc2c', '1991-09-17', '2022-05-30 23:18:10', '2022-05-30 23:18:10');
INSERT INTO  `temp_date`(`id`, `age`, `name`, `birthday`, `gmt_created`, `gmt_modified`) VALUES (8, 77.00, 'ede2768cc05a582a8b20e6a93683b435', '1901-05-25', '2022-05-30 23:18:10', '2022-05-30 23:18:10');
INSERT INTO  `temp_date`(`id`, `age`, `name`, `birthday`, `gmt_created`, `gmt_modified`) VALUES (9, 24.00, '68949a40f111939a0be18db38141c7b3', '1946-10-30', '2022-05-30 23:18:10', '2022-05-30 23:18:10');
INSERT INTO  `temp_date`(`id`, `age`, `name`, `birthday`, `gmt_created`, `gmt_modified`) VALUES (10, 2.00, '5362bb925f28dc23f94229a2653edd48', '1928-09-26', '2022-05-30 23:18:10', '2022-05-30 23:18:10');
INSERT INTO  `temp_date`(`id`, `age`, `name`, `birthday`, `gmt_created`, `gmt_modified`) VALUES (11, 58.00, 'e236185011cb88e6226ef542b83fd9e3', '1902-08-05', '2022-05-31 20:42:28', '2022-05-31 20:42:28');
INSERT INTO  `temp_date`(`id`, `age`, `name`, `birthday`, `gmt_created`, `gmt_modified`) VALUES (12, 85.00, 'baa1eac46aa193fcf6c2b704f17a2ae9', '1955-09-07', '2022-05-31 20:42:28', '2022-05-31 20:42:28');
INSERT INTO  `temp_date`(`id`, `age`, `name`, `birthday`, `gmt_created`, `gmt_modified`) VALUES (13, 8.00, 'ae4f37ff310138525784a4eb56d7ca08', '1971-07-23', '2022-05-31 20:42:28', '2022-05-31 20:42:28');
INSERT INTO  `temp_date`(`id`, `age`, `name`, `birthday`, `gmt_created`, `gmt_modified`) VALUES (14, 18.00, '64ebcbd613223347e7cee2549197eab6', '1916-10-10', '2022-05-31 20:42:28', '2022-05-31 20:42:28');


INSERT INTO  `t_user`(`USER_ID`, `USER_NAME`, `USER_PASSWORD`, `USER_EMAIL`) VALUES (9, '8d80af597433177f201f86f1fe0f9d9d', '64a3680910b95bc6361b560fc5e07970', 'd474fe4@4feed-da.com');
INSERT INTO  `t_user`(`USER_ID`, `USER_NAME`, `USER_PASSWORD`, `USER_EMAIL`) VALUES (10, 'd0e1cc42e2774e52cce412e9f5027491', 'ea346e9806c5f80b2a2eda551b45827b', 'd48271b@271e4-da.com');
INSERT INTO  `t_user`(`USER_ID`, `USER_NAME`, `USER_PASSWORD`, `USER_EMAIL`) VALUES (11, '88693fb73cab1f860ccfaf80de83e204', 'a624aa6c82faa32379892106b6daa249', 'd489f9a@9f9d5-da.com');
INSERT INTO  `t_user`(`USER_ID`, `USER_NAME`, `USER_PASSWORD`, `USER_EMAIL`) VALUES (12, '6d47c9fffc66612fbc057201a4d910bd', '1e34c1122675a45e525a1ab1b6348ca2', 'd4953c5@53c88-da.com');
INSERT INTO  `t_user`(`USER_ID`, `USER_NAME`, `USER_PASSWORD`, `USER_EMAIL`) VALUES (13, '418f57775bfcdb3e0687e6c423e57d05', '0a7089f91c7ab7850df0802e5ca3bc12', 'd4a0866@08c65-da.com');
INSERT INTO  `t_user`(`USER_ID`, `USER_NAME`, `USER_PASSWORD`, `USER_EMAIL`) VALUES (14, 'ea0f6876c57dcc3f82a36208a97afea6', 'b6a8591804f06e9bd99fb2114cb50861', 'd4a8089@808bf-da.com');
INSERT INTO  `t_user`(`USER_ID`, `USER_NAME`, `USER_PASSWORD`, `USER_EMAIL`) VALUES (15, '3d0a07879b2e826e0b29d8ced8e92b4c', '875e61c2fe9025fa30326bad73e070ca', 'd4af8f7@f8fb3-da.com');
INSERT INTO  `t_user`(`USER_ID`, `USER_NAME`, `USER_PASSWORD`, `USER_EMAIL`) VALUES (16, '877b734119235886088a5124a7fe8ddf', 'c293b45da05a29a3e9204625831977c5', 'd4b713c@713f9-da.com');
INSERT INTO  `t_user`(`USER_ID`, `USER_NAME`, `USER_PASSWORD`, `USER_EMAIL`) VALUES (17, 'f3f3c624bb418b63bdc3f580dd5039b0', '860514262f38d33545d6c8301d5921b2', 'd4c2588@258b8-da.com');
INSERT INTO  `t_user`(`USER_ID`, `USER_NAME`, `USER_PASSWORD`, `USER_EMAIL`) VALUES (18, 'bffcad8fdfd4a95d2062d6e83098186d', '2fff3c910cca03887ab6b26ee2b76cf3', 'd4c9de5@9de85-da.com');
INSERT INTO  `t_user`(`USER_ID`, `USER_NAME`, `USER_PASSWORD`, `USER_EMAIL`) VALUES (19, '2f1e409ea4569648270507e424a09621', '78ffe25a4e2ef08605f2c25a2392f611', 'd4d1643@16464-da.com');
INSERT INTO  `t_user`(`USER_ID`, `USER_NAME`, `USER_PASSWORD`, `USER_EMAIL`) VALUES (20, '2f87b8d6988cd55c4361768735955861', 'e4dd44e0bf104610f915c26854f0e6f2', 'd4d8ec9@8ecd7-da.com');
INSERT INTO  `t_user`(`USER_ID`, `USER_NAME`, `USER_PASSWORD`, `USER_EMAIL`) VALUES (21, '94879aadb598a19ab612b97fa0f0c769', '92912589c3a3ddb4457ccc5f183df822', 'd4e4406@44093-da.com');
INSERT INTO  `t_user`(`USER_ID`, `USER_NAME`, `USER_PASSWORD`, `USER_EMAIL`) VALUES (22, '69cbf1919065ce7a04f0cb486d7a0320', '03bed78d5031fd536f0af3a6f0e3cc1f', 'd4f70b8@70bbe-da.com');
INSERT INTO  `t_user`(`USER_ID`, `USER_NAME`, `USER_PASSWORD`, `USER_EMAIL`) VALUES (23, 'b77b1800acc41f27d8158c05c53ca743', 'fb1001ca32eea35a0a561416e9bd1996', 'd50617a@617d0-da.com');
INSERT INTO  `t_user`(`USER_ID`, `USER_NAME`, `USER_PASSWORD`, `USER_EMAIL`) VALUES (24, '57dab3aacd9776d067f7f42f1adf92d3', 'ddc141fef43e5d6f87659fdc5455333c', 'd5151be@51c1e-da.com');
INSERT INTO  `t_user`(`USER_ID`, `USER_NAME`, `USER_PASSWORD`, `USER_EMAIL`) VALUES (25, '1208d1d73683c335a8e601f6eef5a5b4', 'c45e0d126705c9f83c35ed218e1b9a4e', 'd51c97a@c97e0-da.com');
INSERT INTO  `t_user`(`USER_ID`, `USER_NAME`, `USER_PASSWORD`, `USER_EMAIL`) VALUES (26, 'fe85827612e43eee230250d8f94f12ac', '301a625913e87498b656836118294225', 'd527dab@7daf1-da.com');


INSERT INTO  `user2`(`id`, `name`, `age`, `height`, `weight`) VALUES (2, '小明', 22.00, 48.00, 178.40);
INSERT INTO  `user2`(`id`, `name`, `age`, `height`, `weight`) VALUES (3, '小胖', 25.00, 50.00, 168.00);

CREATE TABLE `productnotes` (
  `note_id` int NOT NULL AUTO_INCREMENT,
  `prod_id` char(10) NOT NULL,
  `note_date` datetime NOT NULL,
  `note_text` text,
  PRIMARY KEY (`note_id`),
  FULLTEXT KEY `note_text` (`note_text`)
) ENGINE=MyISAM AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `products` (
  `prod_id` char(10) NOT NULL,
  `vend_id` int NOT NULL,
  `prod_name` char(255) NOT NULL,
  `prod_price` decimal(8,2) NOT NULL,
  `prod_desc` text,
  PRIMARY KEY (`prod_id`),
  KEY `fk_products_vendors` (`vend_id`),
  CONSTRAINT `fk_products_vendors` FOREIGN KEY (`vend_id`) REFERENCES `vendors` (`vend_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `vendors` (
  `vend_id` int NOT NULL AUTO_INCREMENT,
  `vend_name` char(50) NOT NULL,
  `vend_address` char(50) DEFAULT NULL,
  `vend_city` char(50) DEFAULT NULL,
  `vend_state` char(5) DEFAULT NULL,
  `vend_zip` char(10) DEFAULT NULL,
  `vend_country` char(50) DEFAULT NULL,
  PRIMARY KEY (`vend_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1007 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO  `productnotes`(`note_id`, `prod_id`, `note_date`, `note_text`) VALUES (101, 'TNT2', '2005-08-17 00:00:00', 'Customer complaint:\r\nSticks not individually wrapped, too easy to mistakenly detonate all at once.\r\nRecommend individual wrapping.');
INSERT INTO  `productnotes`(`note_id`, `prod_id`, `note_date`, `note_text`) VALUES (102, 'OL1', '2005-08-18 00:00:00', 'Can shipped full, refills not available.\r\nNeed to order new can if refill needed.');
INSERT INTO  `productnotes`(`note_id`, `prod_id`, `note_date`, `note_text`) VALUES (103, 'SAFE', '2005-08-18 00:00:00', 'Safe is combination locked, combination not provided with safe.\r\nThis is rarely a problem as safes are typically blown up or dropped by customers.');
INSERT INTO  `productnotes`(`note_id`, `prod_id`, `note_date`, `note_text`) VALUES (104, 'FC', '2005-08-19 00:00:00', 'Quantity varies, sold by the sack load.\r\nAll guaranteed to be bright and orange, and suitable for use as rabbit bait.');
INSERT INTO  `productnotes`(`note_id`, `prod_id`, `note_date`, `note_text`) VALUES (105, 'TNT2', '2005-08-20 00:00:00', 'Included fuses are short and have been known to detonate too quickly for some customers.\r\nLonger fuses are available (item FU1) and should be recommended.');
INSERT INTO  `productnotes`(`note_id`, `prod_id`, `note_date`, `note_text`) VALUES (106, 'TNT2', '2005-08-22 00:00:00', 'Matches not included, recommend purchase of matches or detonator (item DTNTR).');
INSERT INTO  `productnotes`(`note_id`, `prod_id`, `note_date`, `note_text`) VALUES (107, 'SAFE', '2005-08-23 00:00:00', 'Please note that no returns will be accepted if safe opened using explosives.');
INSERT INTO  `productnotes`(`note_id`, `prod_id`, `note_date`, `note_text`) VALUES (108, 'ANV01', '2005-08-25 00:00:00', 'Multiple customer returns, anvils failing to drop fast enough or falling backwards on purchaser. Recommend that customer considers using heavier anvils.');
INSERT INTO  `productnotes`(`note_id`, `prod_id`, `note_date`, `note_text`) VALUES (109, 'ANV03', '2005-09-01 00:00:00', 'Item is extremely heavy. Designed for dropping, not recommended for use with slings, ropes, pulleys, or tightropes.');
INSERT INTO  `productnotes`(`note_id`, `prod_id`, `note_date`, `note_text`) VALUES (110, 'FC', '2005-09-01 00:00:00', 'Customer complaint: rabbit has been able to detect trap, food apparently less effective now.');
INSERT INTO  `productnotes`(`note_id`, `prod_id`, `note_date`, `note_text`) VALUES (111, 'SLING', '2005-09-02 00:00:00', 'Shipped unassembled, requires common tools (including oversized hammer).');
INSERT INTO  `productnotes`(`note_id`, `prod_id`, `note_date`, `note_text`) VALUES (112, 'SAFE', '2005-09-02 00:00:00', 'Customer complaint:\r\nCircular hole in safe floor can apparently be easily cut with handsaw.');
INSERT INTO  `productnotes`(`note_id`, `prod_id`, `note_date`, `note_text`) VALUES (113, 'ANV01', '2005-09-05 00:00:00', 'Customer complaint:\r\nNot heavy enough to generate flying stars around head of victim. If being purchased for dropping, recommend ANV02 or ANV03 instead.');
INSERT INTO  `productnotes`(`note_id`, `prod_id`, `note_date`, `note_text`) VALUES (114, 'SAFE', '2005-09-07 00:00:00', 'Call from individual trapped in safe plummeting to the ground, suggests an escape hatch be added.\r\nComment forwarded to vendor.');


INSERT INTO  `products`(`prod_id`, `vend_id`, `prod_name`, `prod_price`, `prod_desc`) VALUES ('ANV01', 1001, '.5 ton anvil', 5.99, '.5 ton anvil, black, complete with handy hook');
INSERT INTO  `products`(`prod_id`, `vend_id`, `prod_name`, `prod_price`, `prod_desc`) VALUES ('ANV02', 1001, '1 ton anvil', 9.99, '1 ton anvil, black, complete with handy hook and carrying case');
INSERT INTO  `products`(`prod_id`, `vend_id`, `prod_name`, `prod_price`, `prod_desc`) VALUES ('ANV03', 1001, '2 ton anvil', 14.99, '2 ton anvil, black, complete with handy hook and carrying case');
INSERT INTO  `products`(`prod_id`, `vend_id`, `prod_name`, `prod_price`, `prod_desc`) VALUES ('DTNTR', 1003, 'Detonator', 13.00, 'Detonator (plunger powered), fuses not included');
INSERT INTO  `products`(`prod_id`, `vend_id`, `prod_name`, `prod_price`, `prod_desc`) VALUES ('FB', 1003, 'Bird seed', 10.00, 'Large bag (suitable for road runners)');
INSERT INTO  `products`(`prod_id`, `vend_id`, `prod_name`, `prod_price`, `prod_desc`) VALUES ('FC', 1003, 'Carrots', 2.50, 'Carrots (rabbit hunting season only)');
INSERT INTO  `products`(`prod_id`, `vend_id`, `prod_name`, `prod_price`, `prod_desc`) VALUES ('FU1', 1002, 'Fuses', 3.42, '1 dozen, extra long');
INSERT INTO  `products`(`prod_id`, `vend_id`, `prod_name`, `prod_price`, `prod_desc`) VALUES ('JP1000', 1005, 'JetPack 1000', 35.00, 'JetPack 1000, intended for single use');
INSERT INTO  `products`(`prod_id`, `vend_id`, `prod_name`, `prod_price`, `prod_desc`) VALUES ('JP2000', 1005, 'JetPack 2000', 55.00, 'JetPack 2000, multi-use');
INSERT INTO  `products`(`prod_id`, `vend_id`, `prod_name`, `prod_price`, `prod_desc`) VALUES ('OL1', 1002, 'Oil can', 8.99, 'Oil can, red');
INSERT INTO  `products`(`prod_id`, `vend_id`, `prod_name`, `prod_price`, `prod_desc`) VALUES ('SAFE', 1003, 'Safe', 50.00, 'Safe with combination lock');
INSERT INTO  `products`(`prod_id`, `vend_id`, `prod_name`, `prod_price`, `prod_desc`) VALUES ('SLING', 1003, 'Sling', 4.49, 'Sling, one size fits all');
INSERT INTO  `products`(`prod_id`, `vend_id`, `prod_name`, `prod_price`, `prod_desc`) VALUES ('TNT1', 1003, 'TNT (1 stick)', 2.50, 'TNT, red, single stick');
INSERT INTO  `products`(`prod_id`, `vend_id`, `prod_name`, `prod_price`, `prod_desc`) VALUES ('TNT2', 1003, 'TNT (5 sticks)', 10.00, 'TNT, red, pack of 10 sticks');



INSERT INTO  `vendors`(`vend_id`, `vend_name`, `vend_address`, `vend_city`, `vend_state`, `vend_zip`, `vend_country`) VALUES (1001, 'Anvils R Us', '123 Main Street', 'Southfield', 'MI', '48075', 'USA');
INSERT INTO  `vendors`(`vend_id`, `vend_name`, `vend_address`, `vend_city`, `vend_state`, `vend_zip`, `vend_country`) VALUES (1002, 'LT Supplies', '500 Park Street', 'Anytown', 'OH', '44333', 'USA');
INSERT INTO  `vendors`(`vend_id`, `vend_name`, `vend_address`, `vend_city`, `vend_state`, `vend_zip`, `vend_country`) VALUES (1003, 'ACME', '555 High Street', 'Los Angeles', 'CA', '90046', 'USA');
INSERT INTO  `vendors`(`vend_id`, `vend_name`, `vend_address`, `vend_city`, `vend_state`, `vend_zip`, `vend_country`) VALUES (1004, 'Furball Inc.', '1000 5th Avenue', 'New York', 'NY', '11111', 'USA');
INSERT INTO  `vendors`(`vend_id`, `vend_name`, `vend_address`, `vend_city`, `vend_state`, `vend_zip`, `vend_country`) VALUES (1005, 'Jet Set', '42 Galaxy Road', 'London', NULL, 'N16 6PS', 'England');
INSERT INTO  `vendors`(`vend_id`, `vend_name`, `vend_address`, `vend_city`, `vend_state`, `vend_zip`, `vend_country`) VALUES (1006, 'Jouets Et Ours', '1 Rue Amusement', 'Paris', NULL, '45678', 'France');


```



































