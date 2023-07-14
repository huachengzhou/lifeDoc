
---
title: "mysql存储过程"
date: 2020-01-17T15:26:15Z
draft: false
weight: 13
---


# MySQL mysql存储过程概述
> 存储过程是存储在数据库的一组SQL语句集，用户可以通过存储过程名和传参多次调用的程序模块。
  
  
## 特点：

+ 使用灵活，可以使用流控制语句，自定义变量等完成复杂的业务逻辑。
+ 提高数据安全性，屏蔽应用程序直接对表的操作，易于进行审计。
+ 减少网络传输。
+ 提高代码维护的复杂度，实际使用中要评估场景是否适合。


## 存储过程-基本语法： (非常重要)

```scrip
CREATE
  [DEFINER = { user | CURRENT_USER }]
  PROCEDURE sp_name ([proc_parameter[,...]])
  [characteristic ...] routine_body

proc_parameter:
  [ IN | OUT | INOUT ] param_name type
type:
  Any valid MySQL data type
characteristic:
    COMMENT 'string'
  | [NOT] DETERMINISTIC
routine_body:
  Valid SQL routine statement
```

```scrip
-- $ 可以改为分号 假如你直接是在控制台那么建议用$
delimiter $ --将sql语句结束符号修改为$,这样只有sql遇到$时才开始执行
create procedure 存储过程名(参数列表)
begin
sql语句集合
end$
delimiter ; --将结束符修改为默认的分号 

```

### 例子

```mysql

-- 创建一个表
CREATE TABLE `t_user` (
  `USER_ID` int NOT NULL AUTO_INCREMENT,
  `USER_NAME` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `USER_PASSWORD` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `USER_EMAIL` char(80) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`USER_ID`),
  KEY `IDX_NAME` (`USER_NAME`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- 插入2000条数据

DROP PROCEDURE IF EXISTS proc_initData;--如果存在此存储过程则删掉
DELIMITER $
CREATE PROCEDURE proc_initData()
BEGIN
    DECLARE i INT DEFAULT 1;
    WHILE i<=2000 DO
        INSERT INTO t_user(USER_NAME,USER_PASSWORD,USER_EMAIL) VALUES(MD5(UUID()),MD5(UUID()),
				 CONCAT(substring(UUID(),1,7) , '@', substring(UUID(),4,8) ,'.com')
				);
        SET i = i+1;
    END WHILE;
END $
CALL proc_initData();

-- 执行完成后  到 mysql函数中可以查到proc_initData这个函数  实际上存储过程也是一种函数

-- $ 可以用分号代替

DROP PROCEDURE IF EXISTS proc_initData;--如果存在此存储过程则删掉
DELIMITER ;
CREATE PROCEDURE proc_initData()
BEGIN
    DECLARE i INT DEFAULT 1;
    WHILE i<=3 DO
        INSERT INTO t_user(USER_NAME,USER_PASSWORD,USER_EMAIL) VALUES(MD5(UUID()),MD5(UUID()),
				 CONCAT(substring(UUID(),1,7) , '@', substring(UUID(),4,8) ,'.com')
				);
        SET i = i+1;
    END WHILE;
END ;
CALL proc_initData();

```

## 查看存储结构

```mysql

SHOW CREATE PROCEDURE proc_initData ;

SHOW PROCEDURE STATUS LIKE '%pro%';
```

## 删除存储过程

```mysql
Drop procedure [if exists] sp_name; 
```

### 例子

```mysql
drop procedure if exists pro_insert_user;
```

## 修改存储过程 (实际无法修改  修改的是存储特征)

```mysql
-- ALTER PROCEDURE 存储过程名 [ 特征 ... ]
Alter procedure proc_name[characteristic…] 
```
> 特征指定了存储过程的特性，可能的取值有：

+ CONTAINS SQL 表示子程序包含 SQL 语句，但不包含读或写数据的语句。
+ NO SQL 表示子程序中不包含 SQL 语句。
+ READS SQL DATA 表示子程序中包含读数据的语句。
+ MODIFIES SQL DATA 表示子程序中包含写数据的语句。
+ SQL SECURITY { DEFINER |INVOKER } 指明谁有权限来执行。
+ DEFINER 表示只有定义者自己才能够执行。
+ INVOKER 表示调用者可以执行。
+ COMMENT 'string' 表示注释信息。

### 例子

```mysql
-- 创建
delimiter ;
Alter procedure pro_t11(IN param1 varchar(255), IN param2 varchar(255), OUT result varchar(2000))
  begin
    set result = concat(param1, '_---_',param2);
  end;

call pro_t11(uuid(), md5(uuid()), @param);
select @param;
-- 修改
ALTER PROCEDURE pro_t11 MODIFIES SQL DATA SQL SECURITY INVOKER;
-- 结果
ALTER PROCEDURE pro_t11 MODIFIES SQL DATA SQL SECURITY INVOKER
> OK
> 时间: 0.077s
```

## 传递参数

> 语法结构

```scrip
create procedure 存储过程名([in/out/inout] 参数名 参数类型)
...
```

+ IN : 该参数可以作为输入，也就是需要调用方传入值 , 默认
+ OUT: 该参数作为输出，也就是该参数可以作为返回值
+ INOUT: 既可以作为输入参数，也可以作为输出参数


### IN 

> in类型传参示例：对于之前创建的查看db1数据库中有哪些存储过程的get_project_plan_details_count，我们可以给get_project_plan_details_count一个输入参数，实现查看项目任务数量。

```mysql
--创建table

CREATE TABLE `tb_project_plan_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `project_work_stage_id` int(11) DEFAULT NULL COMMENT '工作阶段编号',
  `plan_id` int(11) DEFAULT NULL COMMENT '项目计划编号',
  `project_id` int(11) DEFAULT NULL COMMENT '项目编号',
  `project_phase_id` int(11) DEFAULT NULL COMMENT '任务节点编号',
  `project_phase_details_id` int(11) DEFAULT '0' COMMENT '工作内容编号',
  `project_phase_name` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '工作事项',
  `plan_start_date` datetime DEFAULT NULL COMMENT '计划开始日期',
  `plan_end_date` datetime DEFAULT NULL COMMENT '计划结束日期',
  `plan_hours` decimal(18,2) DEFAULT NULL COMMENT '计划工时',
  `plan_remarks` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '计划说明',
  `execute_user_account` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '执行人',
  `execute_department_id` int(11) DEFAULT NULL COMMENT '执行部门编号',
  `bis_enable` bit(1) DEFAULT b'1' COMMENT '是否启用',
  `proportion` decimal(18,2) DEFAULT '100.00' COMMENT '权重占比',
  `sorting` int(11) DEFAULT '1' COMMENT '排序',
  `pid` int(11) DEFAULT '0' COMMENT '上级编号',
  `first_pid` int(11) DEFAULT '0' COMMENT '第一级上级，如果为第一级则为0',
  `bis_start` bit(1) DEFAULT b'0' COMMENT '任务是否已开始',
  `process_ins_id` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0' COMMENT '流程实例编号',
  `task_submit_time` datetime DEFAULT NULL COMMENT '最终成果提交时间',
  `task_remarks` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '工作成果描述',
  `actual_hours` decimal(18,2) DEFAULT NULL COMMENT '实际工时',
  `bis_all_submit` bit(1) DEFAULT b'0' COMMENT '是否整体提交',
  `bis_again_submit` bit(1) DEFAULT b'0' COMMENT '是否是多次提交',
  `status` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'running' COMMENT '流程状态',
  `bis_partake` bit(1) DEFAULT b'1' COMMENT '是否参与',
  `return_details_id` int(11) DEFAULT '0' COMMENT '退回前任务编号',
  `return_process_ins_id` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '退回流程实例编号',
  `bis_new` bit(1) DEFAULT b'1' COMMENT '是否最新任务',
  `sign_filed` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户标识，无其它用途',
  `bis_last_layer` bit(1) DEFAULT b'1' COMMENT '是否最后一个层级',
  `return_details_reason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '退回说明',
  `creator` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '创建人',
  `gmt_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间，记录变化后会自动更新时间戳',
  `project_work_stage_key` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '阶段KEY',
  `bis_finish` bit(1) DEFAULT NULL COMMENT '任务是否完成',
  `task_status` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '任务状态',
  `select_project_tree_node` json DEFAULT NULL COMMENT '选择的项目树任务,json',
  `submit_count` int(11) DEFAULT '0' COMMENT '提交统计(提交了多少次-任务重做了几次)',
  `bis_supplement` bit(1) DEFAULT b'0' COMMENT '是否是补充任务',
  `other_remark` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '其他说明',
  `new_report_number` bit(1) DEFAULT b'0' COMMENT '如果是报告任务，是否需要重新获取文号',
  `task_model` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '任务类型',
  `form_code` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '表单编号',
  `other_task_user` json DEFAULT NULL COMMENT '其他任务责任人',
  `material_class_id` int(11) DEFAULT NULL COMMENT '资料分类',
  `service_bean_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '自定义服务bean名称',
  `track_audit_class_id` int(11) DEFAULT NULL COMMENT '审计事项分类',
  `simple_task` bit(1) DEFAULT b'0' COMMENT '是否简单任务方式填写',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `index_plan_id` (`plan_id`) USING BTREE,
  KEY `work_stage_id_index` (`project_work_stage_id`) USING BTREE,
  KEY `phase_id_index` (`project_phase_id`) USING BTREE,
  KEY `project_id_index` (`project_id`) USING BTREE,
  KEY `un_index` (`submit_count`,`status`,`sorting`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14273 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--准备数据

INSERT INTO `pmcc_costs`.`tb_project_plan_details`(`id`, `project_work_stage_id`, `plan_id`, `project_id`, `project_phase_id`, `project_phase_details_id`, `project_phase_name`, `plan_start_date`, `plan_end_date`, `plan_hours`, `plan_remarks`, `execute_user_account`, `execute_department_id`, `bis_enable`, `proportion`, `sorting`, `pid`, `first_pid`, `bis_start`, `process_ins_id`, `task_submit_time`, `task_remarks`, `actual_hours`, `bis_all_submit`, `bis_again_submit`, `status`, `bis_partake`, `return_details_id`, `return_process_ins_id`, `bis_new`, `sign_filed`, `bis_last_layer`, `return_details_reason`, `creator`, `gmt_created`, `gmt_modified`, `project_work_stage_key`, `bis_finish`, `task_status`, `select_project_tree_node`, `submit_count`, `bis_supplement`, `other_remark`, `new_report_number`, `task_model`, `form_code`, `other_task_user`, `material_class_id`, `service_bean_name`, `track_audit_class_id`, `simple_task`) VALUES (50, 8, 59, 14, 13, 0, '收集资料', '2018-06-20 00:00:00', '2018-06-20 00:00:00', 1.00, '1', 'luohong', 8, b'1', 20.00, 1, 0, 0, b'0', '362948', '2018-06-20 18:21:19', '1', 1.00, b'0', b'0', 'finish', b'1', 0, NULL, b'1', NULL, b'1', NULL, NULL, '2019-10-08 16:18:28', '2019-10-08 16:18:28', NULL, NULL, NULL, NULL, 0, b'0', NULL, b'0', NULL, NULL, NULL, NULL, NULL, NULL, b'0');
INSERT INTO `pmcc_costs`.`tb_project_plan_details`(`id`, `project_work_stage_id`, `plan_id`, `project_id`, `project_phase_id`, `project_phase_details_id`, `project_phase_name`, `plan_start_date`, `plan_end_date`, `plan_hours`, `plan_remarks`, `execute_user_account`, `execute_department_id`, `bis_enable`, `proportion`, `sorting`, `pid`, `first_pid`, `bis_start`, `process_ins_id`, `task_submit_time`, `task_remarks`, `actual_hours`, `bis_all_submit`, `bis_again_submit`, `status`, `bis_partake`, `return_details_id`, `return_process_ins_id`, `bis_new`, `sign_filed`, `bis_last_layer`, `return_details_reason`, `creator`, `gmt_created`, `gmt_modified`, `project_work_stage_key`, `bis_finish`, `task_status`, `select_project_tree_node`, `submit_count`, `bis_supplement`, `other_remark`, `new_report_number`, `task_model`, `form_code`, `other_task_user`, `material_class_id`, `service_bean_name`, `track_audit_class_id`, `simple_task`) VALUES (54, 9, 60, 14, 19, 0, '招标施工图', '2018-06-20 00:00:00', '2018-06-20 00:00:00', 1.00, '1', 'luohong', 8, b'1', 10.00, 5, 0, 0, b'0', '0', NULL, NULL, NULL, b'0', b'0', 'running', b'1', 0, NULL, b'1', NULL, b'1', NULL, NULL, '2019-10-08 16:18:28', '2021-05-13 14:27:51', NULL, NULL, NULL, NULL, 0, b'0', NULL, b'0', NULL, NULL, NULL, NULL, NULL, NULL, b'0');
INSERT INTO `pmcc_costs`.`tb_project_plan_details`(`id`, `project_work_stage_id`, `plan_id`, `project_id`, `project_phase_id`, `project_phase_details_id`, `project_phase_name`, `plan_start_date`, `plan_end_date`, `plan_hours`, `plan_remarks`, `execute_user_account`, `execute_department_id`, `bis_enable`, `proportion`, `sorting`, `pid`, `first_pid`, `bis_start`, `process_ins_id`, `task_submit_time`, `task_remarks`, `actual_hours`, `bis_all_submit`, `bis_again_submit`, `status`, `bis_partake`, `return_details_id`, `return_process_ins_id`, `bis_new`, `sign_filed`, `bis_last_layer`, `return_details_reason`, `creator`, `gmt_created`, `gmt_modified`, `project_work_stage_key`, `bis_finish`, `task_status`, `select_project_tree_node`, `submit_count`, `bis_supplement`, `other_remark`, `new_report_number`, `task_model`, `form_code`, `other_task_user`, `material_class_id`, `service_bean_name`, `track_audit_class_id`, `simple_task`) VALUES (58, 9, 60, 14, 20, 0, '施工图', '2018-06-20 00:00:00', '2018-06-20 00:00:00', 1.00, '2', 'luohong', 8, b'1', 30.00, 9, 0, 0, b'0', '0', '2018-06-21 11:25:08', '1', 1.00, b'0', b'0', 'finish', b'1', 0, NULL, b'1', NULL, b'1', NULL, NULL, '2019-10-08 16:18:28', '2019-10-08 16:18:28', NULL, NULL, NULL, NULL, 0, b'0', NULL, b'0', NULL, NULL, NULL, NULL, NULL, NULL, b'0');


-- 开始

DROP PROCEDURE IF EXISTS get_project_plan_details_count;

DELIMITER ;
CREATE PROCEDURE get_project_plan_details_count( in custom_id int(20)) 
BEGIN  
SELECT count(id) as count FROM  `tb_project_plan_details` where `project_id` = custom_id ;
END ; 

CALL get_project_plan_details_count(14);

```

### OUT 

> out类型传参示例：根据传入的身高变量，获取当前身高的所属的身材类型

```mysql
DROP PROCEDURE IF EXISTS pro_t4;

create procedure pro_t4(in height int , out description varchar(100))
begin
if height >= 180 then
set description='高挑';
elseif height >= 170 and height < 180 then
set description='标准';
else
set description='一般';
end if;
end;

 -- 调用
call pro_t4(180,@res);
select @res ;

-- 在变量前添加@符号的变量叫做用户会话变量，这种的作用于是整个会话过程。
```

### INOUT 

```mysql
-- 带INOUT的存储过程 

DROP PROCEDURE IF EXISTS sp_inout;
DELIMITER ;
CREATE PROCEDURE sp_inout(INOUT p_num INT) 
BEGIN 
SET p_num=p_num*10; 
END ;


-- 调用并输出结果 
SET @p_num=2; 


call sp_inout(@p_num); 
SELECT @p_num; 

```

### 随机练习

```mysql
-- 练习1
drop procedure  if exists  pro_t10 ;
DELIMITER ;
create procedure pro_t10(INOUT param int)
  begin
    set param = param*10;
  end;
set @param = 2;
call pro_t10(@param);

select @param ;

-- 练习2
drop procedure if exists pro_t11;
delimiter ;
create procedure pro_t11(in param1 varchar(255), in param2 varchar(255), out result varchar(2000))
  begin
    set result = concat(param1, '---',param2);
  end;

call pro_t11(uuid(), md5(uuid()), @param);
select @param;

```

## 存储过程体 (非常重要)

> 存储过程体中可以使用各种sql语句和过程式语句的组合，来封装数据库应用中复杂的业务逻辑和处理规则，以实现数据库应用的灵活编程。下面主要介绍几个用于构造存储过程体的常用语法元素。

### 局部变量

> 在存储过程体中可以声明局部变量，用来存储存储过程体中临时结果

```scrip
DECLARE var_name[,…] type [DEFAULT value] 
Var_name:指定局部变量的名称 
Type:用于声明局部变量的数据类型 
default子句:用于为局部变量指定一个默认值。若没有指定，默认为null.
```
+ 例如 Declare cid int(10);

#### 使用说明

+ 局部变量只能在存储过程体的begin…end语句块中声明。
+ 局部变量必须在存储过程体的开头处声明。
+ 局部变量的作用范围仅限于声明它的begin..end语句块，其他语句块中的语句不可以使用它。
+ 局部变量不同于用户变量，两者区别：局部变量声明时，在其前面没有使用@符号，并且它只能在begin..end语句块中使用；而用户变量在声明时，会在其名称前面使用@符号，同时已声明的用户变量存在于整个会话之中。

#### 例子

```mysql
drop procedure if exists pro_add_t1;

delimiter ;
create procedure pro_add_t1(in  a1 int,in a2 int ,out result int )
  begin
    declare  x int default 0;
    set x = a1 + a2;
    set result  = x;
    -- 虽然可以 result = a1 + a2 但是我们为了用上局部变量还是多走一步
  end;

call pro_add_t1(1,2,@result) ;
select @result ;


```


### set语句

> 使用set语句为局部变量赋值

+ Set var_name=expr 
+ Set cid=910; 

#### 例子

```mysql
drop procedure if exists pro_set_example_t1;
delimiter ;

create procedure pro_set_example_t1(in a1  int(12),in text_v1 longtext,in f_float float(12,7),in d_double double(14,6),out result longtext)
  begin
    declare spl varchar(200) default '   ' ;
  set result = concat(a1,spl,text_v1,spl,f_float,spl,d_double) ;
  end;

call pro_set_example_t1(1,uuid(),rand(),rand(),@result) ;
select @result ;
```

+ set 中 := 和 =作用一致

```mysql
drop procedure if exists pro_set_example_t2;
delimiter ;

create procedure pro_set_example_t2(in a1  int(12),out result longtext)
  begin
	declare par1 int default 0 ;
	declare par2 int default 0 ;
	set par1 := par1 + 1 ;
	set par2 = par2 + 1 ;
	set a1 = a1 + 1;
  set result = CONCAT_WS('-', par1 , par2 , a1) ;
  end;

call pro_set_example_t2(round(rand()*10),@result) ;
select @result ;
```

+ := 特殊作用 (用变量实现行号时，必须用:=)

```mysql

CREATE TABLE `temp_date` (
  `id` int NOT NULL AUTO_INCREMENT,
  `age` float(14,2) DEFAULT NULL COMMENT 'age',
  `name` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL COMMENT '生日',
  `gmt_created` datetime DEFAULT CURRENT_TIMESTAMP,
  `gmt_modified` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='临时用户表';

set @param = ROUND(RAND()*100);
SELECT @param as param_one , @param := @param + 1 as param_two ;

-- 来看下在具体例子中的妙处吧
-- (SELECT @rownum := 0) new_table  表示派生出来了一个新的临时表
SELECT * FROM temp_date , (SELECT @rownum := 0) new_table ;

-- 然后在赋值上去
SELECT * ,( @rownum :=  @rownum + 1)as rownum FROM temp_date , (SELECT @rownum := 0) new_table ;
```

### 流程控制语句

#### (1)条件判断语句

+ **If语句**

```scrip
If search_condition then statement_list 
[elseif search_condition then statement_list]… 
[else statement_list] 
End if 

 -- 参考
if 满足条件 then
执行语句
elseif 满足条件 then
执行语句
else 
执行语句
end if;
```

##### 例子

```mysql

drop procedure if exists pro_if_example_t ;

delimiter ;
create procedure pro_if_example_t(in input double,inout  text_value longtext)
  begin
    declare remark_ varchar(200) default '学生' ;

    if input >= 90
      then set text_value = concat('a+' ,remark_) ;
      elseif input<90 and input >= 80
        then set text_value = concat('a' ,remark_) ;
      elseif input<80 and input >= 70
        then set text_value = concat('a-' ,remark_) ;
      elseif input >= 60 and input < 70
        then set text_value = concat('b+' ,remark_) ;
      else
      set text_value = concat('c' ,remark_) ;
    end if;
  end;

set @input = 100*rand();
call pro_if_example_t(@input,@result) ;
select @result ;
-- 不能字符串和数字相加 如 'b+' + remark_ 可以考虑 concat('b+' ,remark_)
```

#### (2)循环语句

> While语句、repeat语句和loop语句。

#### while

```script
[begin_label:] 
while search_condition do 
Statement_list 
End while 
[end_label]

while 满足的条件 do
执行sql语句
end while;
```

##### 例子

```mysql
drop procedure if exists pro_example_while_t;

delimiter ;
create procedure pro_example_while_t(in len int,out result longtext)
  begin
  declare i int default  0;
  declare v_text longtext default '' ;
    while i <= len
    do
      set v_text = concat(v_text,',',i) , i = i+1;
    end while ;
    set result = v_text ;
  end ;

call pro_example_while_t(200,@result) ;

select @result ;

-- 其他
drop procedure if exists pro_example_while_t3;
delimiter ;
create procedure pro_example_while_t3(in len int,out result int)
  begin
    declare total int default 0;
    declare i int default  0;
    while i < len
      do
      set i = i +1;
      set total = total + i ;
    end while ;
    set result = total ;
  end;

call pro_example_while_t3(100,@result) ;
select @result ;
```

##### repeat结构

```script
repeat
执行sql语句
until 不满的条件
end repeat;
```

##### 例子

```mysql
drop procedure if exists pro_example_repeat_t;
delimiter ;
create procedure pro_example_repeat_t(in len_value int,out result_value longtext)
  begin
    declare i int default 0;
    declare v_text longtext default '' ;
    repeat
    set i = i +1;
    set v_text = concat( v_text,i,'-') ;
    until i >= len_value
    end repeat;
    set result_value = v_text ;
  end ;

call pro_example_repeat_t(200,@result) ;

select @result;
```

##### loop和leave语句

```script
[loop标签名:] loop
执行sql语句(sql语句中应该包括，退出循环的命令：leave loop标签名;如果没有将会造成死循环)
end loop [loop标签名];
```

##### 例子

```mysql
drop procedure if exists pro_loop_example_t;

delimiter ;
create procedure pro_loop_example_t(in len_value int, inout result int)
  begin
    declare i int default 0;
    declare total int default 0;
    label_loop:loop
      if i >= len_value
      then leave label_loop;
      end if;
      set i = i + 1;
      set total = total + i;
    end loop label_loop;
		set result = total;
  end;
call pro_loop_example_t(100,@result) ;
select @result;
```

#### (3)Case 语句

```script 
case 
when 条件 then
执行sql语句
when 条件 then
执行sql语句
...
else
执行sql语句
end case;
```

```mysql
drop procedure if exists pro_case_example_t2;

delimiter ;

create procedure pro_case_example_t2(in number_value double, out result longtext)
  begin
    declare temp_value longtext;
    case
      when number_value >= 90
      then
        set temp_value = '非常优秀';
      when number_value < 90 and number_value >= 80
      then
        set temp_value = '优秀';
      when number_value < 80 and number_value >= 70
      then
        set temp_value = '良';
      when number_value < 70 and number_value >= 60
      then
        set temp_value = '及格';
      when number_value < 60
      then set temp_value = '未及格';
    end case;
    set result = temp_value;
  end;
set @input = rand() * 100 + rand() * 100;
call pro_case_example_t2(@input, @result);

select @result;
```

### select … into 语句 (通过select … into 方式进行赋值操作)

> 把选定列的值直接存储到局部变量中，语法格式

> 说明:存储过程体中的select…into语句返回的结果集只能有一行数据。

```script
Select col_name[,…] into var_name[,…] table_expr 
Col_name:用于指定列名 
Var_name:用于指定要赋值的变量名 
Table_expr:表示select语句中的from字句及后面的语法部分 
```

+ 例子1

```mysql
drop procedure if exists pro_select_into_example_t2;

delimiter ;

create procedure pro_select_into_example_t2(out result longtext)
  begin
    declare name_value longtext;
    declare password_value longtext;
    select USER_NAME , USER_PASSWORD into name_value , password_value from `t_user` where USER_ID='2019';
    set result = concat(name_value,'-',password_value);
  end;

call pro_select_into_example_t2( @result);
select @result;
```

+ 例子2

```mysql
DROP PROCEDURE IF EXISTS pro_set_example_ty;

delimiter ;
CREATE PROCEDURE pro_set_example_ty ( INOUT result VARCHAR ( 255 ) ) 
	BEGIN 
	DECLARE	c1 DOUBLE DEFAULT 0;
	DECLARE	c2 DOUBLE DEFAULT 0;
	-- INTO函数不一定需要from字句及后面的语法部分
	SELECT	round( rand( ) * 10 ),	round( rand( ) * 10 ) INTO c1,	c2;
	SET result = CONCAT_WS( '-', c1, c2 );
	END;

SET @result = '';
CALL pro_set_example_ty ( @result );
SELECT @result;
```


### 定义处理程序

> 是事先定义程序执行过程中可能遇到的问题。并且可以在处理程序中定义解决这些问题的办法。这种方式可以提前预测可能出现的问题，并提出解决方法

```script
DECLARE handler_type HANDLER FOR condition_value[,…] sp_statement 
handler_type:CONTINUE | EXIT | UNDO 
Condition_value:Sqlwarning | not found | sqlexception
```

+ handler_type(自定义程序类型)

> 为错误处理方式，参数取值有三个

+ CONTINUE continue 表示遇到错误不处理，继续执行
+ EXIT 退出
+ UNDO 撤销
  
> 表示遇到错误后，撤销之前的操作，MysqL中，暂时不支持这样的操作

+ Condition_value



+ 例子一 **违反完整性约束** SQLSTATE '23000'

```mysql
-- 先创建一个表
drop table if EXISTS t_table_x ;
CREATE TABLE t_table_x (s1 int,primary key (s1));

-- 定义第一个存储过程 没有任何错误的 (SET @x2 = 1)表示发生了错误就把 @x2 = 1
drop procedure if exists pro_handler_example_t1;
delimiter ;
CREATE PROCEDURE pro_handler_example_t1()
BEGIN
  DECLARE CONTINUE HANDLER FOR SQLSTATE '23000' SET @x2 = 1;
  SET @x = 1;
  INSERT INTO t_table_x VALUES (10);
  SET @x = 2;
  INSERT INTO t_table_x VALUES (20);
  SET @x = 3;
END;

call pro_handler_example_t1() ;
SELECT @x;
-- @x = 3
-- 表数据
10
20
-- SELECT @x2 = 1;

-- 定义第二个存储过程  第三条语句违反约束
drop procedure if exists pro_handler_example_t2;
delimiter ;
CREATE PROCEDURE pro_handler_example_t2()
BEGIN
  DECLARE CONTINUE HANDLER FOR SQLSTATE '23000' SET @x2 = 1;
  SET @x = 1;
  INSERT INTO t_table_x VALUES (10);
  SET @x = 2;
  INSERT INTO t_table_x VALUES (20);
  SET @x = 3;
	INSERT INTO t_table_x VALUES (20);
	SET @x = 4;
END;

call pro_handler_example_t2() ;

SELECT @x;
-- @x = 4
-- 表数据
10
20
-- 可以看到一共插入了三条语句  由于其中一条违反了约束只有两条语句,但是SET @x = 4依然被执行了是为什么呢，就是因为handler_type=CONTINUE(表示遇到错误不处理，继续执行)
-- 我们对上面的handler_type定义的值作改动 改为 EXIT 定义是退出 那么实际结果如何呢

-- 定义第三个存储过程
drop procedure if exists pro_handler_example_t3;
delimiter ;
CREATE PROCEDURE pro_handler_example_t3()
BEGIN
  DECLARE EXIT HANDLER FOR SQLSTATE '23000' SET @x2 = 1;
  SET @x = 1;
  INSERT INTO t_table_x VALUES (10);
  SET @x = 2;
  INSERT INTO t_table_x VALUES (20);
  SET @x = 3;
	INSERT INTO t_table_x VALUES (20);
	SET @x = 4;
END;

call pro_handler_example_t3() ;

SELECT @x;
-- @x = 3
-- 表数据
10
20
-- 可以看到 SET @x = 4; 正如预期的那样没有执行这正是handler_type=EXIT 的作用 在发生错误的时候就退出了
-- 最后我们把 handler_type=EXIT 改为 handler_type=UNDO  虽然mysql不支持但是还是把它写一下
drop procedure if exists pro_handler_example_t4;
delimiter ;
CREATE PROCEDURE pro_handler_example_t4()
BEGIN
  DECLARE UNDO HANDLER FOR SQLSTATE '23000' SET @x2 = 1;
  SET @x = 1;
  INSERT INTO t_table_x VALUES (10);
  SET @x = 2;
  INSERT INTO t_table_x VALUES (20);
  SET @x = 3;
	INSERT INTO t_table_x VALUES (20);
	SET @x = 4;
END;

-- 就不执行了 因为mysql不支持嘛  理论上 @x='' 并且t_table_x没有这其中插入的任意数据
```

+ 例子二 NOTFOUND条件用于游标(这个经常用)

```mysql
-- 我们使用游标 并且结合mysql临时表的语法作一个遍历查询

drop procedure if exists pro_handler_example_cursor_not_found;
delimiter ;
CREATE PROCEDURE pro_handler_example_cursor_not_found() 
begin 

declare id_value int default 0;
declare password_value varchar(100) default '';
declare name_value varchar(100) default '';
-- 定义 游标结束的变量
declare v_finished INTEGER DEFAULT 0;
-- 定义游标结束后到底该咋办 必须在游标定义语句的下一行
declare get_user_data_list_cursor cursor for select USER_NAME, USER_PASSWORD,USER_ID from `t_user`;

declare continue handler for not found set v_finished = 1;

-- 定义一个临时表 (临时表只在会话中或者会话结束以后mysql自动删除)
 DROP TEMPORARY TABLE if exists t_user_temp_print;
		CREATE TEMPORARY TABLE t_user_temp_print(
			id INT ,
			name varchar(100),
			password varchar(100)
		);
-- 打开光标
    open get_user_data_list_cursor;
		while v_finished != 1 
		do 
		FETCH get_user_data_list_cursor into name_value, password_value , id_value;
		INSERT INTO t_user_temp_print(`id`,`name`,`password`) values(id_value,name_value,password_value) ;
		end while ;
		-- 关闭光标
    close get_user_data_list_cursor;
		-- 打印数据
		select * from  t_user_temp_print;
		-- 删除临时表
		DROP TABLE  t_user_temp_print ;

end;


call pro_handler_example_cursor_not_found();
id     name                          password
9	8d80af597433177f201f86f1fe0f9d9d	64a3680910b95bc6361b560fc5e07970
10	d0e1cc42e2774e52cce412e9f5027491	ea346e9806c5f80b2a2eda551b45827b
11	88693fb73cab1f860ccfaf80de83e204	a624aa6c82faa32379892106b6daa249
12	6d47c9fffc66612fbc057201a4d910bd	1e34c1122675a45e525a1ab1b6348ca2
13	418f57775bfcdb3e0687e6c423e57d05	0a7089f91c7ab7850df0802e5ca3bc12
14	ea0f6876c57dcc3f82a36208a97afea6	b6a8591804f06e9bd99fb2114cb50861
15	3d0a07879b2e826e0b29d8ced8e92b4c	875e61c2fe9025fa30326bad73e070ca
16	877b734119235886088a5124a7fe8ddf	c293b45da05a29a3e9204625831977c5
17	f3f3c624bb418b63bdc3f580dd5039b0	860514262f38d33545d6c8301d5921b2
18	bffcad8fdfd4a95d2062d6e83098186d	2fff3c910cca03887ab6b26ee2b76cf3
19	2f1e409ea4569648270507e424a09621	78ffe25a4e2ef08605f2c25a2392f611
20	2f87b8d6988cd55c4361768735955861	e4dd44e0bf104610f915c26854f0e6f2
21	94879aadb598a19ab612b97fa0f0c769	92912589c3a3ddb4457ccc5f183df822
22	69cbf1919065ce7a04f0cb486d7a0320	03bed78d5031fd536f0af3a6f0e3cc1f
23	b77b1800acc41f27d8158c05c53ca743	fb1001ca32eea35a0a561416e9bd1996
24	57dab3aacd9776d067f7f42f1adf92d3	ddc141fef43e5d6f87659fdc5455333c
25	1208d1d73683c335a8e601f6eef5a5b4	c45e0d126705c9f83c35ed218e1b9a4e
26	fe85827612e43eee230250d8f94f12ac	301a625913e87498b656836118294225
26	fe85827612e43eee230250d8f94f12ac	301a625913e87498b656836118294225
```


## 游标（光标）

> 游标又称光标是用来存储查询结果集的数据类型，在存储过程和函数中可以使用光标对结果集进行循环的处理。类似高级编程语言中的集合类型。
> 光标的使用包括光标的声明、open、fetch和 close，其语法分别如下

+ 声明光标

```script
declare  光标名称 cursor for sql语句;
```

+ 打开光标

```script
open 光标名;
```

+ 获取光标(将光标当前数据存储到变量中)

```script
fetch 光标名 into 变量名[,变量名...];
```

+ 关闭光标

```script
close 光标名;
```

+ 简单例子

```mysql
drop procedure if exists pro_cursor_example_t2;
delimiter ;
create procedure pro_cursor_example_t2()
  begin
    declare name_value longtext;
    declare password_value longtext;
    -- 定义光标
    declare get_user_data_list cursor for select USER_NAME, USER_PASSWORD from `t_user`;
    -- 打开光标
    open get_user_data_list;
    -- 获取光标
    fetch get_user_data_list   into name_value, password_value;
    -- 打印 获取到的数据
    select concat('name: ',name_value,' password: ',password_value) as print_data;
    -- 关闭光标
    close get_user_data_list;
  end;

call pro_cursor_example_t2();
```

+ 复杂例子

```mysql
CREATE TABLE `t_user` (
  `USER_ID` int NOT NULL AUTO_INCREMENT,
  `USER_NAME` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `USER_PASSWORD` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `USER_EMAIL` char(80) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`USER_ID`),
  KEY `IDX_NAME` (`USER_NAME`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;


drop procedure if exists pro_cursor_example_t_3;
delimiter ;
create procedure pro_cursor_example_t_3()
  begin
	
		declare name_value varchar(100) default '';
		declare v_finished INTEGER DEFAULT 0;
		declare id_value int default 0;
    declare password_value varchar(100) default '';
		
		
		  -- 定义光标
    declare get_user_data_list_cursor cursor for select USER_NAME, USER_PASSWORD,USER_ID from `t_user`;
		DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_finished = 1;
		 
		 DROP TEMPORARY TABLE if exists t_user_temp_print;
		CREATE TEMPORARY TABLE t_user_temp_print(
			id INT PRIMARY KEY,
			name varchar(100),
			password varchar(100)
		);
		
		   -- 打开光标
    open get_user_data_list_cursor;
		label_while_loop : LOOP
			FETCH get_user_data_list_cursor into name_value, password_value , id_value;
			IF v_finished = 1 THEN	LEAVE label_while_loop;
			END IF;
			INSERT INTO t_user_temp_print(`id`,`name`,`password`) values(id_value,name_value,password_value) ;
		END LOOP label_while_loop;
		-- 关闭光标
    close get_user_data_list_cursor;
		-- 打印数据
		select * from  t_user_temp_print;
		-- 删除临时表
		DROP TABLE  t_user_temp_print ;
  end;



call pro_cursor_example_t_3();




drop procedure if exists pro_cursor_example_t_4;
delimiter ;
create procedure pro_cursor_example_t_4()
  begin
	
		declare name_value varchar(100) default '';
		declare v_finished INTEGER DEFAULT 0;
		declare id_value int default 0;
    declare password_value varchar(100) default '';
		
		
		  -- 定义光标
    declare get_user_data_list_cursor cursor for select USER_NAME, USER_PASSWORD,USER_ID from `t_user`;
		DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_finished = 1;
		 
		 DROP TEMPORARY TABLE if exists t_user_temp_print;
		CREATE TEMPORARY TABLE t_user_temp_print(
			id INT ,
			name varchar(100),
			password varchar(100)
		);
		
		   -- 打开光标
    open get_user_data_list_cursor;
		while v_finished != 1 
		do 
		FETCH get_user_data_list_cursor into name_value, password_value , id_value;
		INSERT INTO t_user_temp_print(`id`,`name`,`password`) values(id_value,name_value,password_value) ;
		end while ;
		-- 关闭光标
    close get_user_data_list_cursor;
		-- 打印数据
		select * from  t_user_temp_print;
		-- 删除临时表
		DROP TABLE  t_user_temp_print ;
  end;



call pro_cursor_example_t_4();


-- 创建结构基于现有表的临时表


CREATE TEMPORARY TABLE temp_table_name
SELECT * FROM original_table
LIMIT 0;
```
+ 公司实际例子 1


```mysql

drop procedure if exists pro_cursor_base_cost_norm_dezm_material;

delimiter ;
create procedure pro_cursor_base_cost_norm_dezm_material(in custom_year int(20) , in custom_version VARCHAR(255))
  begin
    declare uuid_value VARCHAR(255);
    declare code_value VARCHAR(255);
		declare v_finished INTEGER DEFAULT 0;
    -- 定义光标
    declare get_user_data_list cursor for  select `uuid`,`code`	from `tb_base_cost_norm_dezm` where year = custom_year and speciality_number is not null  GROUP BY speciality_number;
		DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_finished = 1;
    -- 打开光标
    open get_user_data_list;
		while v_finished != 1 
		do 
		  -- 获取光标
    fetch get_user_data_list   into uuid_value, code_value;
		
		
		INSERT INTO tb_base_cost_norm_dezm_material_copy1 ( version, version_code,uuid, name, m_code,ggxh, unit_price,units_name ) SELECT
uuid_value,
code_value,
MD5( UUID( ) ),
name,
m_code,
ggxh,
unit_price,
units_name
FROM
	tb_base_cost_norm_dezm_material_copy1 
WHERE
	1 = 1 
	AND tb_base_cost_norm_dezm_material_copy1.version =  custom_version ;
		
		
    -- 打印 获取到的数据
    select concat('uuid: ',uuid_value,' code: ',code_value) as print_data;
		end while ;
    -- 关闭光标
    close get_user_data_list;
  end;

call pro_cursor_base_cost_norm_dezm_material(2015,'TuXavbSi');
```


+ 公司实际例子2

```mysql
drop procedure if exists pro_cursor_base_cost_norm_dezm_material_consume;

delimiter ;
create procedure pro_cursor_base_cost_norm_dezm_material_consume()
  begin
    declare quota_value VARCHAR(255);
    declare m_code_value VARCHAR(255);
		declare v_finished INTEGER DEFAULT 0;
    -- 定义光标
    declare get_user_data_list cursor for  select quota_code,m_code from tb_base_cost_norm_dezm_material_consume where 1=1 and quota_code is not null and m_code is not null;
		DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_finished = 1;
    -- 打开光标
    open get_user_data_list;
		while v_finished != 1 
		do 
		  -- 获取光标
    fetch get_user_data_list   into quota_value, m_code_value;
		
		
		
		
		
		
		INSERT INTO tb_base_cost_norm_dezm_material_consume_copy1 ( quota_code, m_code,uuid, dezm_uuid ) SELECT
quota_value,
m_code_value,
MD5( UUID( ) ),
tb_base_cost_norm_dezm_items.uuid 
from tb_base_cost_norm_dezm_material_consume right join tb_base_cost_norm_dezm_items on  tb_base_cost_norm_dezm_items.serial_number = tb_base_cost_norm_dezm_material_consume.quota_code where 1=1 and tb_base_cost_norm_dezm_material_consume.quota_code = quota_value ;
		
		
    -- 打印 获取到的数据
    select concat('quota_code: ',quota_value,' m_code: ',m_code_value) as print_data;
		end while ;
    -- 关闭光标
    close get_user_data_list;
  end;

call pro_cursor_base_cost_norm_dezm_material_consume();


SELECT serial_number, count(serial_number) as count from tb_base_cost_norm_dezm_items WHERE 1=1  GROUP BY serial_number HAVING count > 1 ;

```

[参考1(重点)](https://www.jb51.net/article/70677.htm)

[参考2](https://blog.csdn.net/qq_34720818/article/details/117463865)

[参考3](https://www.jb51.net/list/list_112_1.htm)

[参考4](https://blog.csdn.net/weixin_42364301/article/details/113441294)

