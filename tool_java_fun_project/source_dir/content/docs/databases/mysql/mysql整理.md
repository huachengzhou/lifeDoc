
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


## 查询插入

```mysql






-- 一:处理 清单版本

-- bom_dir_gbq_2003 转移到  tb_base_cost_norm_qdxm_items 中


-- 2003版本 tb_base_cost_norm_dezm uuid = 'ZQF8pnF4'


-- 删除2003版本的数据

delete  from tb_base_cost_norm_qdxm_items  WHERE version = 'ZQF8pnF4';

-- 批量插入数据

INSERT INTO tb_base_cost_norm_qdxm_items ( version, uuid, serial_number, NAME, units_name, project_feature, project_content ) SELECT
'ZQF8pnF4',
MD5( UUID( ) ),
dir_code,
dir_name,
dir_name,
class_tag,
CONCAT( start_quota_code, '-', end_quota_code ) 
FROM
	pmcc_costs.bom_dir_gbq_2003 
WHERE
	1 = 1 
	AND pmcc_costs.bom_dir_gbq_2003.dir_code is not null  ;
	
INSERT INTO tb_base_cost_norm_qdxm_items ( version, uuid, serial_number, NAME, units_name, project_feature, project_content ) SELECT
'ZQF8pnF4',
MD5( UUID( ) ),
quota_code,
quota_name,
units,
project_feature,
project_content

FROM
	pmcc_costs.bom_quota_gbq_2003 
WHERE
	1 = 1 
	AND pmcc_costs.bom_quota_gbq_2003.quota_code is not null  ;

	
	

-- bom_dir_gbq_2008 转移到  tb_base_cost_norm_qdxm_items 中


-- 2008版本 tb_base_cost_norm_dezm uuid = 'N1BryK2L'


-- 删除2008版本的数据

delete  from tb_base_cost_norm_qdxm_items  WHERE version = 'N1BryK2L';

-- 批量插入数据

INSERT INTO tb_base_cost_norm_qdxm_items ( version, uuid, serial_number, NAME, units_name, project_feature, project_content ) SELECT
'N1BryK2L',
MD5( UUID( ) ),
dir_code,
dir_name,
dir_name,
class_tag,
CONCAT( start_quota_code, '-', end_quota_code ) 
FROM
	pmcc_costs.bom_dir_gbq_2008 
WHERE
	1 = 1 
	AND pmcc_costs.bom_dir_gbq_2008.dir_code is not null  ;
	
	
INSERT INTO tb_base_cost_norm_qdxm_items ( version, uuid, serial_number, NAME, units_name, project_feature, project_content ) SELECT
'N1BryK2L',
MD5( UUID( ) ),
quota_code,
quota_name,
units,
project_feature,
project_content 
FROM
	pmcc_costs.bom_quota_gbq_2008 
WHERE
	1 = 1 
	AND pmcc_costs.bom_quota_gbq_2008.quota_code IS NOT NULL;
	
	
	

-- bom_dir_gbq_qg 转移到  tb_base_cost_norm_qdxm_items 中


-- qg版本 tb_base_cost_norm_dezm uuid = 'J1fdFWPW'


-- 删除(全国)qg版本的数据

delete  from tb_base_cost_norm_qdxm_items  WHERE version = 'J1fdFWPW';

-- 批量插入数据

INSERT INTO tb_base_cost_norm_qdxm_items ( version, uuid, serial_number, NAME, units_name, project_feature, project_content ) SELECT
'J1fdFWPW',
MD5( UUID( ) ),
dir_code,
dir_name,
dir_name,
class_tag,
CONCAT( start_quota_code, '-', end_quota_code ) 
FROM
	pmcc_costs.bom_dir_gbq_qg 
WHERE
	1 = 1 
	AND pmcc_costs.bom_dir_gbq_qg.dir_code is not null  ;


INSERT INTO tb_base_cost_norm_qdxm_items ( version, uuid, serial_number, NAME, units_name, project_feature, project_content ) SELECT
'J1fdFWPW',
MD5( UUID( ) ),
quota_code,
quota_name,
units,
project_feature,
calculation_rules
FROM
	pmcc_costs.bom_quota_gbq_qg 
WHERE
	1 = 1 
	AND pmcc_costs.bom_quota_gbq_qg.quota_code is not null  ;
	
	
	
-- 二:开始处理定额版本

 -- 2009
 
 delete  from tb_base_cost_norm_dezm_items  WHERE version = 'LdRmHFky';


-- 处理定额版本详细

INSERT INTO tb_base_cost_norm_dezm_items ( version, uuid, serial_number, name,units_name, base_price,rgf,clf,jxf,zhf,project_feature,project_content ) SELECT
'LdRmHFky',
MD5( UUID( ) ),
quota_code,
quota_name,
units,
base_price,
cost_of_labor,
cost_of_raw_materials,
cost_of_mechanical,
cost_of_comprehensive,
project_feature,
project_content


FROM
	pmcc_costs.bom_quota_sc_2009 
WHERE
	1 = 1 
	AND pmcc_costs.bom_quota_sc_2009.quota_code is not null  ;
	
-- 处理材料	

INSERT INTO tb_base_cost_norm_dezm_material ( version, uuid, name, ggxh,unit_price, units_name ) SELECT
'LdRmHFky',
MD5( UUID( ) ),
m_name,
m_code,
m_price,
m_units

FROM
	pmcc_costs.bom_material_sc_2009 
WHERE
	1 = 1 
	AND pmcc_costs.bom_material_sc_2009.m_code is not null  ;
	
	
	
-- 处理关联表


	
	
	INSERT INTO tb_base_cost_norm_dezm_material_consume ( uuid, quota_code, m_code, cl_consume ) SELECT
MD5( UUID( ) ),
quota_code,
m_code,
m_consume 
FROM
	pmcc_costs.bom_material_consume_sc_2009;
	
	-- 更新  dezm_uuid
	
	UPDATE tb_base_cost_norm_dezm_material_consume a_table
INNER JOIN tb_base_cost_norm_dezm_items b_table ON a_table.quota_code = b_table.serial_number 
SET a_table.dezm_uuid = b_table.uuid 
WHERE
	1 = 1 
	AND a_table.dezm_uuid IS NULL ;

-- 更新  cl_uuid
UPDATE tb_base_cost_norm_dezm_material_consume a_table
INNER JOIN tb_base_cost_norm_dezm_material b_table ON a_table.m_code = b_table.ggxh 
SET a_table.cl_uuid = b_table.uuid 
WHERE
	1 = 1 
	AND a_table.cl_uuid IS NULL 
	AND b_table.version = 'LdRmHFky' ;
-- 处理 2015 


 delete  from tb_base_cost_norm_dezm_items  WHERE version = 'TuXavbSi';
 
 
 -- 处理定额版本详细
 
 INSERT INTO tb_base_cost_norm_dezm_items ( version, uuid, serial_number, name,units_name, base_price,rgf,clf,jxf,zhf,project_feature,project_content ) SELECT
'TuXavbSi',
MD5( UUID( ) ),
quota_code,
quota_name,
units,
base_price,
cost_of_labor,
cost_of_raw_materials,
cost_of_mechanical,
cost_of_comprehensive,
project_feature,
project_content


FROM
	pmcc_costs.bom_quota_sc_2015 
WHERE
	1 = 1 
	AND pmcc_costs.bom_quota_sc_2015.quota_code is not null  ;
	
	
	
-- 处理材料	

INSERT INTO tb_base_cost_norm_dezm_material ( version, uuid, name, ggxh,unit_price, units_name ) SELECT
'TuXavbSi',
MD5( UUID( ) ),
m_name,
m_code,
m_price,
m_units

FROM
	pmcc_costs.bom_material_sc_2015 
WHERE
	1 = 1 
	AND pmcc_costs.bom_material_sc_2015.m_code is not null  ;
	
	
	
	-- 处理关联表
	
	
	INSERT INTO tb_base_cost_norm_dezm_material_consume ( uuid, quota_code, m_code, cl_consume ) SELECT
MD5( UUID( ) ),
quota_code,
m_code,
m_consume 
FROM
	pmcc_costs.bom_material_consume_sc_2015;
	
	
	
-- 处理2020 


 delete  from tb_base_cost_norm_dezm_items  WHERE version = 'tQYJwqlO';
 
 
  -- 处理定额版本详细
 
 INSERT INTO tb_base_cost_norm_dezm_items ( version, uuid, serial_number, name,units_name, base_price,rgf,clf,jxf,zhf,project_feature,project_content ) SELECT
'tQYJwqlO',
MD5( UUID( ) ),
quota_code,
quota_name,
units,
base_price,
cost_of_labor,
cost_of_raw_materials,
cost_of_mechanical,
cost_of_comprehensive,
project_feature,
project_content


FROM
	pmcc_costs.bom_quota_sc_2020 
WHERE
	1 = 1 
	AND pmcc_costs.bom_quota_sc_2020.quota_code is not null  ;
	
	
	
-- 处理材料	

INSERT INTO tb_base_cost_norm_dezm_material ( version, uuid, name, ggxh,unit_price, units_name ) SELECT
'tQYJwqlO',
MD5( UUID( ) ),
m_name,
m_code,
m_price,
m_units

FROM
	pmcc_costs.bom_material_sc_2020 
WHERE
	1 = 1 
	AND pmcc_costs.bom_material_sc_2020.m_code is not null  ;
	
	
	-- 处理关联表
	
	
	
	INSERT INTO tb_base_cost_norm_dezm_material_consume ( uuid, quota_code, m_code, cl_consume ) SELECT
MD5( UUID( ) ),
quota_code,
m_code,
m_consume 
FROM
	pmcc_costs.bom_material_consume_sc_2020;
	
	
	-- 更新关联表 id
	
	
	
	UPDATE tb_base_cost_norm_dezm_material_consume a_table
INNER JOIN tb_base_cost_norm_dezm_items b_table ON a_table.quota_code = b_table.serial_number 
SET a_table.dezm_uuid = b_table.uuid 
WHERE
	1 = 1 
	AND a_table.dezm_uuid IS NULL ;
	
	
	
	UPDATE tb_base_cost_norm_dezm_material_consume a_table
INNER JOIN tb_base_cost_norm_dezm_material b_table ON a_table.m_code = b_table.ggxh 
SET a_table.cl_uuid = b_table.uuid 
WHERE
	1 = 1 
	AND a_table.cl_uuid IS NULL ;
```
