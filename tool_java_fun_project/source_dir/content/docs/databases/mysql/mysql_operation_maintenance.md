
---
title: "mysql运维"
date: 2020-01-17T15:26:15Z
draft: false
weight: 15
---

## 一: 备份

### 1: 备份内容

+ 数据 (数据文件或文本格式数据)

+ 操作日志(binlog)  (数据库变更日志)
 
### 2:冷备份与热备份

+ 冷备份 (关闭数据库服务，完整拷贝数据文件)
 
+ 热备份 (在不影响数据库读写服务的情况下备份数据库)

### 3:本地备份与远程备份
+ 本地备份 (在数据库服务器本地进行备份)

+ 远程备份 (远程连接数据库进行备份)

### 4:全量备份与增量备份
+ 全量备份 (备份完整的数据库)

+ 增量备份 (只备份上一次备份以来发生修改的数据)

### 5:备份周期

+ 考虑因素：
+ 数据库大小(决定备份时间)
+ 恢复速度要求(快速or慢速)
+ 备份方式(全量or增量)

### 6:常用工具及用法

+ mysqldump - 逻辑备份，热备
+ xtrabackup - 物理备份， 热备
+ Lvm/zfs snapshot - 物理备份
+ mydumper - 逻辑备份，热备
+ cp - 物理备份，冷备

### 常用工具及用法 - mysqldump

+ 逻辑备份

```mysql
-- 备份全部数据库的数据库结构
mysqldump -h localhost -p3307 -uroot  -p123456 -A >  D:\data\databases\mysql\mysql_all_2023-09-02.sql
mysqldump -h localhost -p3307 -uroot  -p123456 -A -d >  D:\data\mysql_all.sql

-- 备份全部数据库的数据和结构
mysqldump -h localhost -p3307 -uroot  -p123456 -A >  D:\data\mysql_all_2.sql
mysqldump -h localhost -p3307 -uroot  -p123456 -A >  D:\data\databases\mysql\mysql_all_data_2023-09-02.sql

-- 备份单个数据库的结构和数据
mysqldump -h localhost -p3307 -uroot  -p123456 --databases test3  >  D:\data\test3_all.sql

-- 备份单个数据库的结构(当你需要备份结构和数据同时的时候移除-d 参数即可)
mysqldump -h localhost -p3307 -uroot  -p123456 --databases test3 -d >  D:\data\test3_all_1.sql

-- 备份单个数据库的数据
mysqldump -h localhost -p3307 -uroot  -p123456 --databases test3 -t >  D:\data\test3_data_1.sql
mysqldump -h 127.0.0.1 -p3307 -uroot  -p123456 --databases test3  >  D:\data\databases\mysql\2023-09-02_x_test3.sql

-- 备份多个数据库的数据  (貌似无法备份指定端口和主机的数据)
mysqldump -u root -p123456 --databases mybatis-plus shard-jdbc-slave > D:\data\databases\mysql\2023-09-02_shard-jdbc-slave_mybatis-plus_3306.sql


-- 备份单个数据库的结构
mysqldump -h localhost -p3307 -uroot  -p123456  test3 -d >  D:\data\test3_jiegou.sql

-- 备份单个数据库的结构和数据
mysqldump -h localhost -p3307 -uroot  -p123456 --databases test3 > D:\data\test3.sql

-- 登录数据库
mysql -h localhost -p3307 -uroot  -p123456

```


## 7:主从复制

### 要求

> 主从复制必须满足一定的条件的 当你随便按照某种写法设置了很可能压根没达到要求



* 主从配置需要注意的点
  * 主从服务器操作系统版本和位数一致；
  * Master 和 Slave 数据库的版本要一致；
  * Master 和 Slave 数据库中的数据要一致；
  * Master 开启二进制日志， Master 和 Slave 的 server_id 在局域网内必须唯一；


* MySQL 主从复制（也称 A/B 复制） 的原理
	* Master将数据改变记录到二进制日志(binary log)中，也就是配置文件log-bin指定的文件， 
这些记录叫做二进制日志事件(binary log events)；
	* Slave 通过 I/O 线程读取 Master 中的 binary log events 并写入到它的中继日志(relay log)；
	* Slave 重做中继日志中的事件， 把中继日志中的事件信息一条一条的在本地执行一次，完 
成数据在本地的存储， 从而实现将改变反映到它自己的数据(数据重放)。




主从配置的简要步骤 


+ Master 上的配置
	+ 安装数据库；
	+ 修改数据库配置文件， 指明 server_id， 开启二进制日志(log-bin)；
	+ 启动数据库， 查看当前是哪个日志， position 号是多少；
	+ 登录数据库， 授权数据复制用户（IP 地址为从机 IP 地址， 如果是双向主从， 这里的还需要授权本机的 IP 地址， 此时自己的 IP 地址就是从 IP 地址)；
	+ 备份数据库（记得加锁和解锁）；
	+ 传送备份数据到 Slave 上；
	+ 启动数据库；


+ Slave 上的配置
	+ 安装数据库；
	+ 修改数据库配置文件， 指明 server_id（如果是搭建双向主从的话， 也要开启二进制 
日志 log-bin）；
	+ 启动数据库， 还原备份；
	+ 查看当前是哪个日志， position 号是多少（单向主从此步不需要， 双向主从需要）；
	+ 指定 Master 的地址、 用户、 密码等信息；
	+ 开启同步， 查看状态。



### 第一种


#### 主mysql 

+ 配置 

```ini
[mysqld]
# skip-grant-tables 暂时注释了 容易引起 mysql服务启动后立马关闭 这个错误
# 设置3306端口
port=3306

# 自定义设置mysql的安装目录，即解压mysql压缩包的目录
# 切记此处一定要用双斜杠\\，单斜杠这里会出错。
basedir=D:\CS\databases\mysql-8.0.27-winx64

# 自定义设置mysql数据库的数据存放目录
datadir=D:\CS\databases\mysql-8.0.27-winx64\\data

# 允许最大连接数
max_connections=200

# 允许连接失败的次数，这是为了防止有人从该主机试图攻击数据库系统
max_connect_errors=10

# 服务端使用的字符集默认为UTF8
character-set-server=utf8mb4


# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB

# 默认使用“mysql_native_password”插件认证
default_authentication_plugin=mysql_native_password



#要同步的数据库 binlog-do-db：指定mysql的binlog日志记录哪个db
binlog-do-db=shard-jdbc-master

# 设置 MySQL 服务器的唯一标识符  mysql同步的数据中是包含server-id的，用于标识该语句最初是从哪个server写入的，因此server-id一定要有的
server-id = 1
# 开启主库的binlog日志
log-bin = mysql-bin
#屏蔽系统库同步
binlog-ignore-db=mysql
binlog-ignore-db=information_schema
binlog-ignore-db=performance_schema

sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION

[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8mb4

[client]
# 设置mysql客户端连接服务端时默认使用的端口和默认字符集
port=3306
default-character-set=utf8mb4
```

+ 命令

```mysql
-- 授权主备复制专用账号
-- 创建用户 前面db_sync是用户名后面的db_sync是密码
CREATE USER 'db_sync'@'%' IDENTIFIED BY 'db_sync'; 

-- 查看用户
select user,host from mysql.user;

-- 权限赋予
GRANT REPLICATION SLAVE ON *.* TO 'db_sync'@'%' ;

-- 刷新权限

FLUSH PRIVILEGES;

-- 确认位点 记录下文件名以及位点
show master status;
```


####  从mysql 

+ 配置

```ini
[mysqld]
# skip-grant-tables 暂时注释了 容易引起 mysql服务启动后立马关闭 这个错误
# 设置3309端口
port=3309

# 自定义设置mysql的安装目录，即解压mysql压缩包的目录
# 切记此处一定要用双斜杠\\，单斜杠这里会出错。
basedir=D:\CS\databases\mysql-8.0.27-slave

# 自定义设置mysql数据库的数据存放目录
datadir=D:\CS\databases\mysql-8.0.27-slave\\data

# 允许最大连接数
max_connections=200

# 允许连接失败的次数，这是为了防止有人从该主机试图攻击数据库系统
max_connect_errors=10

# 服务端使用的字符集默认为UTF8
character-set-server=utf8mb4


# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB

# 默认使用“mysql_native_password”插件认证
default_authentication_plugin=mysql_native_password



#屏蔽系统库同步
binlog-ignore-db=mysql
binlog-ignore-db=information_schema
binlog-ignore-db=performance_schema

#开启日志
log-bin=mysql-bin
#设置服务id，主从不能一致
# 设置 MySQL 服务器的唯一标识符  mysql同步的数据中是包含server-id的，用于标识该语句最初是从哪个server写入的，因此server-id一定要有的
server-id = 2
#设置需要同步的数据库
replicate_wild_do_table=shard-jdbc-master.%
#屏蔽系统库同步
replicate_wild_ignore_table=mysql.%
replicate_wild_ignore_table=information_schema.%
replicate_wild_ignore_table=performance_schema.%

sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION

[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8mb4

[client]
# 设置mysql客户端连接服务端时默认使用的端口和默认字符集
port=3309
default-character-set=utf8mb4
```

+ 命令

```mysql
#先停止同步
STOP SLAVE;


#修改从库指向到主库，使用上一步记录的文件名以及位点
CHANGE MASTER TO
master_host = 'localhost',
master_user = 'db_sync',
master_password = 'db_sync',
master_log_file = 'mysql-bin.000001',
master_log_pos = 654363;


#启动同步
START SLAVE;


#查看从库状态Slave_IO_Runing和Slave_SQL_Runing都为Yes说明同步成功，如果不为Yes，请检查error_log，然后排查相关异常。
show slave status ;
```


```mysql
stop slave

#master服务器的ip地址
CHANGE MASTER TO master_host ='localhost',
#第5步中创建的账号
master_user ='db_sync',
#第5步中创建的密码
master_password ='db_sync',
#上一步中的File
master_log_file ='mysql-bin.000004',
#上一步中的Position
master_log_pos = 525,
get_master_public_key=1;

start slave ;

#查看从库状态Slave_IO_Runing和Slave_SQL_Runing都为Yes说明同步成功，如果不为Yes，请检查error_log，然后排查相关异常。
show slave status ;
```



### 第二种


#### 主mysql 

+ 配置

```ini
[mysqld]
# skip-grant-tables 暂时注释了 容易引起 mysql服务启动后立马关闭 这个错误
# 设置3307端口
port=3307

# 自定义设置mysql的安装目录，即解压mysql压缩包的目录
# 切记此处一定要用双斜杠\\，单斜杠这里会出错。
basedir=D:\CS\databases\mysql_8.027

# 自定义设置mysql数据库的数据存放目录
datadir=D:\CS\databases\mysql_8.027\\data

# 允许最大连接数
max_connections=200

# 允许连接失败的次数，这是为了防止有人从该主机试图攻击数据库系统
max_connect_errors=10

# 服务端使用的字符集默认为UTF8
character-set-server=utf8mb4


# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB

# 默认使用“mysql_native_password”插件认证
default_authentication_plugin=mysql_native_password

sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION


# 开启慢sql

slow_query_log=ON

# 慢sql存的地址

slow_query_log_file=D:\CS\databases\mysql_8.027\log\slow.log

# 会记录没有使用索引的查询sql,但前提是必须开启 slow_query_log='ON'

log-queries-not-using-indexes =on

# 超过10秒则属于慢SQL,慢查询时间,这里为10秒,超过10秒会被记录

long_query_time=10
# 查询日志,开启对所有执行语句进行记录

general_log=on

# 查询日志,存放位置

general_log_file=D:\CS\databases\mysql_8.027\log\query.log

# 查询日志，文件中的时间显示已系统时间为准

log_timestamps = SYSTEM

server-id = 3
# 开启主库的binlog日志
log-bin=mysql-bin
#屏蔽系统库同步
binlog-ignore-db=mysql
binlog-ignore-db=sys
binlog-ignore-db=information_schema
binlog-ignore-db=performance_schema

#要同步的数据库 binlog-do-db：指定mysql的binlog日志记录哪个db
binlog-do-db=chinese


[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8mb4

[client]
# 设置mysql客户端连接服务端时默认使用的端口和默认字符集
port=3307
default-character-set=utf8mb4
```

+ 命令

```mysql

-- 授权主备复制专用账号
-- 创建用户 前面repl_xx_gongsi是用户名后面的xx_gongsi_master_123456是密码
CREATE USER 'repl_xx_gongsi'@'127.0.0.1' IDENTIFIED WITH mysql_native_password BY 'xx_gongsi_master_123456';


-- 查看用户
select user,host from mysql.user;


-- 权限赋予
GRANT REPLICATION SLAVE ON *.* TO 'repl_xx_gongsi'@'127.0.0.1';


-- 刷新权限

FLUSH PRIVILEGES;

-- 确认位点 记录下文件名以及位点
show master status;
```


#### 从mysql

```ini
[mysqld]
# skip-grant-tables 暂时注释了 容易引起 mysql服务启动后立马关闭 这个错误
# 设置3308端口
port=3308

# 自定义设置mysql的安装目录，即解压mysql压缩包的目录
# 切记此处一定要用双斜杠\\，单斜杠这里会出错。
basedir=D:\CS\databases\mysql_8.027_3308_slave

# 自定义设置mysql数据库的数据存放目录
datadir=D:\CS\databases\mysql_8.027_3308_slave\\data

# 允许最大连接数
max_connections=200

# 允许连接失败的次数，这是为了防止有人从该主机试图攻击数据库系统
max_connect_errors=10

# 服务端使用的字符集默认为UTF8
character-set-server=utf8mb4


# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB

# 默认使用“mysql_native_password”插件认证
default_authentication_plugin=mysql_native_password

sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION


# 开启慢sql

slow_query_log=ON

# 慢sql存的地址

slow_query_log_file=D:\CS\databases\mysql_8.027_3308_slave\log\slow.log

# 会记录没有使用索引的查询sql,但前提是必须开启 slow_query_log='ON'

log-queries-not-using-indexes =on

# 超过10秒则属于慢SQL,慢查询时间,这里为10秒,超过10秒会被记录

long_query_time=10
# 查询日志,开启对所有执行语句进行记录

general_log=on

# 查询日志,存放位置

general_log_file=D:\CS\databases\mysql_8.027_3308_slave\log\query.log

# 查询日志，文件中的时间显示已系统时间为准

log_timestamps = SYSTEM

server-id = 4
#屏蔽系统库同步
replicate_wild_ignore_table=mysql.%
replicate_wild_ignore_table=information_schema.%
replicate_wild_ignore_table=performance_schema.%
replicate_wild_ignore_table=sys.%
#设置需要同步的数据库
replicate_wild_do_table=chinese.%


[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8mb4

[client]
# 设置mysql客户端连接服务端时默认使用的端口和默认字符集
port=3308
default-character-set=utf8mb4
```

+ 命令


```mysql
#先停止同步
STOP SLAVE;

#修改从库指向到主库，使用上一步记录的文件名以及位点

CHANGE MASTER TO
MASTER_HOST='127.0.0.1',
MASTER_USER='repl_xx_gongsi',
master_port = 3307,
MASTER_PASSWORD='xx_gongsi_master_123456',
MASTER_LOG_FILE='mysql-bin.000003',
MASTER_LOG_POS=1099;

#启动同步
START SLAVE;

#查看从库状态Slave_IO_Runing和Slave_SQL_Runing都为Yes说明同步成功，如果不为Yes，请检查error_log，然后排查相关异常。
show slave status ;
```