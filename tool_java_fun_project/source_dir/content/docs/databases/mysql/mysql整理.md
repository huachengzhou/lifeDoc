
---
title: "mysql整理"
date: 2020-01-17T15:26:15Z
draft: false
weight: 31
---


# mysql整理

## 跨库更新数据
```mysql
UPDATE pmcc_assess.tb_project_info aTable
INNER JOIN (
SELECT
id as data_id,
uuid as data_uuid 
FROM 
pmcc_contract.tb_cms_contract  bTable
) bTable ON aTable.contract_id = bTable.data_uuid  
SET  aTable.contract_uuid = bTable.data_uuid , aTable.contract_id = null  where 1=1 and  aTable.contract_uuid is null and aTable.contract_id is not null  and  aTable.id = 596;


UPDATE pmcc_assess.tb_project_info aTable
INNER JOIN (
SELECT
id as data_id,
uuid as data_uuid 
FROM 
pmcc_contract.tb_cms_contract  bTable
) bTable ON aTable.contract_uuid = bTable.data_uuid  
SET  aTable.contract_id = bTable.data_id where 1=1 and  aTable.contract_id is null and aTable.contract_uuid is not null  and  aTable.id = 596;
```

## 步长

```mysql
SHOW VARIABLES LIKE 'auto_inc%'; 

SET @@auto_increment_increment=3; -- 将自增长步长设置为3

SET @@auto_increment_offset=4; -- 将自增长开始值设置为4

SHOW VARIABLES LIKE 'auto_inc%'; 

alter table `user` drop column id; 

alter table `user`add id BIGINT;
alter table `user` change id id BIGINT not null auto_increment primary key;
```

## 统计sql

```mysql

# 处理 uuid重复问题
UPDATE tb_data_block SET uuid = CONCAT( MD5(UUID()) ,'_',UUID_SHORT(),'_', MD5(curtime()) ) WHERE  uuid is null  ;
UPDATE tb_data_automatic_position SET uuid = CONCAT( MD5(UUID()) ,'_',UUID_SHORT(),'_', MD5(RAND()) ) WHERE  uuid is null  ;


#查询当天的记录
select count(1) from tableName where TO_DAYS(timeField) = TO_DAYS(NOW())

# 从今天开始退回几天的实体数量 假如是1那么就是昨天
select count(1) from tb_basic_building  where 1=1 and TO_DAYS(NOW()) - TO_DAYS(gmt_created) = 4 ;


# 统计 当周的实体数量

SELECT count(1) FROM tableName  WHERE YEARWEEK(date_format(timeField,'%Y-%m-%d'),1) = YEARWEEK(now(),1);

# 统计 当月的实体数量
SELECT count(1) FROM tableName  WHERE 1=1 AND DATE_FORMAT( timeField, '%Y%m' ) = DATE_FORMAT( CURDATE( ) , '%Y%m' )





/*最近一周*/
SELECT  count(1) as count_num  FROM tb_basic_building WHERE DATE_SUB(CURDATE(),INTERVAL 1 WEEK) <= DATE(gmt_created);


/*某个年份下*/
SELECT
	sum( CASE MONTH ( a.gmt_created ) WHEN '1' THEN 1 ELSE 0 END ) AS january,
	sum( CASE MONTH ( a.gmt_created ) WHEN '2' THEN 1 ELSE 0 END ) AS february,
	sum( CASE MONTH ( a.gmt_created ) WHEN '3' THEN 1 ELSE 0 END ) AS march,
	sum( CASE MONTH ( a.gmt_created ) WHEN '4' THEN 1 ELSE 0 END ) AS april,
	sum( CASE MONTH ( a.gmt_created ) WHEN '5' THEN 1 ELSE 0 END ) AS may,
	sum( CASE MONTH ( a.gmt_created ) WHEN '6' THEN 1 ELSE 0 END ) AS june,
	sum( CASE MONTH ( a.gmt_created ) WHEN '7' THEN 1 ELSE 0 END ) AS july,
	sum( CASE MONTH ( a.gmt_created ) WHEN '8' THEN 1 ELSE 0 END ) AS august,
	sum( CASE MONTH ( a.gmt_created ) WHEN '9' THEN 1 ELSE 0 END ) AS september,
	sum( CASE MONTH ( a.gmt_created ) WHEN '10' THEN 1 ELSE 0 END ) AS october,
	sum( CASE MONTH ( a.gmt_created ) WHEN '11' THEN 1 ELSE 0 END ) AS november,
	sum( CASE MONTH ( a.gmt_created ) WHEN '12' THEN 1 ELSE 0 END ) AS december 
FROM
	tb_basic_building  a
WHERE
	YEAR ( a.gmt_created ) = 2021;
	
	/*按自然周统计(所有)*/
	SELECT DATE_FORMAT(gmt_created,'%y年%u周') as week_name,min(gmt_created) as week_check_start_time,count(*) as count_num
FROM tb_basic_building
GROUP BY DATE_FORMAT(gmt_created,'%y%u')
ORDER BY week_name asc;


/*某年某月下的每周统计数量*/
	SELECT DATE_FORMAT(gmt_created,'%y年%u周') as w,min(gmt_created) as st,count(*) as count_num
FROM tb_basic_building where 1=1 and  month(gmt_created)=9 and YEAR(gmt_created) = 2021
GROUP BY DATE_FORMAT(gmt_created,'%y%u')
ORDER BY w asc;

	
	
	/*按月统计(所有)*/
	
	SELECT DATE_FORMAT(gmt_created,'%y年%m月') as m,count(*) as count_num
FROM tb_basic_building
GROUP BY DATE_FORMAT(gmt_created,'%y%m')
ORDER BY m asc
	
	
	
	
	/*按季度统计*/
	
SELECT FLOOR((DATE_FORMAT(gmt_created,'%m')-1)/3)+1 as quarter_num,min(gmt_created) as quarter_check_start_time,count(*) as count_num
FROM tb_basic_building
WHERE DATE_FORMAT(gmt_created,'%Y') = 2021
GROUP BY FLOOR((DATE_FORMAT(gmt_created,'%m')-1)/3)+1
ORDER BY quarter_num asc;


	
	
	
	/*按年统计*/
	SELECT DATE_FORMAT(gmt_created,'%Y') as year_name,count(*) as count_num
FROM tb_basic_building
GROUP BY DATE_FORMAT(gmt_created,'%Y')
ORDER BY year_name asc;



/*按天统计*/
SELECT
    count(id) count_num,
    DATE(gmt_created) day_name
FROM
    tb_basic_building
GROUP BY
    DATE(gmt_created)
ORDER BY
    DATE(gmt_created) DESC;



/*按周统计*/
SELECT
    count(id) count_num,
    WEEK(gmt_created) week_name
FROM
    tb_basic_building
GROUP BY
    WEEK(gmt_created)
ORDER BY
    WEEK(gmt_created) DESC;
		
		
		
		/*按月统计*/
SELECT
    count(id) count_num,
    MONTH(gmt_created) month_name
FROM
    tb_basic_building
GROUP BY
    MONTH(gmt_created)
ORDER BY
    MONTH(gmt_created) DESC;

```

## 添加字段

```mysql
alter table tb_project_plan_details add   `bis_mobile` bit(1) DEFAULT b'0' COMMENT '是否为移动端创建';

```
