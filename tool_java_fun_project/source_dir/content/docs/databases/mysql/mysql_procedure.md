
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


## 存储过程-基本语法：

```mysql
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

```mysql
delimiter $ --将sql语句结束符号修改为$,这样只有sql遇到$时才开始执行
create procedure 存储过程名(参数列表)
begin
sql语句集合
end$
delimiter ; --将结束符修改为默认的分号 

```

## 例子一 

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

## 传递参数

> 语法结构

```mysql
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

