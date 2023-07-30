---
title: "(集群)"
date: 2020-01-17T15:26:15Z
draft: false
weight: 2
---

# elasticsearch-cluster


## Cluster集群

> 一个ElasticSearch集群由一个或多个节点(Node)组成，每个集群都有一个共同的集群名称作为标识。


## Node节点

一个ElasticSearch实例即一个Node，一台机器可以有多个实例，正常使用下每个实例应该会部署在不同机器上。ElasticSearch的配置文件中可以通过node.master、node.data来设置节点类型。

　　node.master：表示节点是否具有称为主节点的资格

　　　　true代表的是有资格竞选主节点

　　　　false代表的是没有资格竞选主节点

　　node.data：表示节点是否存储数据

## Node节点组合

### 主节点+数据节点(master+data)

> 节点即有称为主节点的资格，又存储数据

```dos
node.master: true
node.data: true
```

### 数据节点(data)

> 节点没有成为主节点的资格，不参与选举，只会存储数据

```dos
node.master: false
node.data: true
```

### 客户端节点(client)

> 不会成为主节点，也不会存储数据，主要是针对海量请求的时候，可以进行负载均衡

```dos
node.master: false
node.data: false
```

### 分片

每个索引有一个或多个分片，每个分片存储不同的数据。分片可分为主分片(primary shard)和复制分片(replica shard)，复制分片是主分片的拷贝。默认每个主分片有一个复制分片，一个索引的复制分片的数量可以动态地调整，复制分片匆匆不与它的主分片在同一个节点上。


## 配置

> 约定 配三台服务器

### 第一个节点

```conf
# ======================== Elasticsearch Configuration =========================
#
# NOTE: Elasticsearch comes with reasonable defaults for most settings.
#       Before you set out to tweak and tune the configuration, make sure you
#       understand what are you trying to accomplish and the consequences.
#
# The primary way of configuring a node is via this file. This template lists
# the most important settings you may want to configure for a production cluster.
#
# Please consult the documentation for further information on configuration options:
# https://www.elastic.co/guide/en/elasticsearch/reference/index.html
#
# ---------------------------------- Cluster -----------------------------------
#
# Use a descriptive name for your cluster:
#
#集群名称，三台集群，要配置相同的集群名称！！！
#cluster.name: my-application
cluster.name: my-bootstrap
#
# ------------------------------------ Node ------------------------------------
#
# Use a descriptive name for the node:
#
#node.name: node-1
#节点名称
node.name: node-1

#是不是有资格主节点
node.master: true
#是否存储数据
node.data: true
#最⼤集群节点数
node.max_local_storage_nodes: 3 
#网关地址
network.host: localhost
#
# Add custom attributes to the node:
#
#node.attr.rack: r1
#
# ----------------------------------- Paths ------------------------------------
#
# Path to directory where to store the data (separate multiple locations by comma):
#
#path.data: /path/to/data
#
# Path to log files:
#
#path.logs: /path/to/logs
#
# ----------------------------------- Memory -----------------------------------
#
# Lock the memory on startup:
#
#bootstrap.memory_lock: true
#
# Make sure that the heap size is set to about half the memory available
# on the system and that the owner of the process is allowed to use this
# limit.
#
# Elasticsearch performs poorly when the system is swapping the memory.
#
# ---------------------------------- Network -----------------------------------
#
# Set the bind address to a specific IP (IPv4 or IPv6):
#
#network.host: 192.168.0.1
#
# Set a custom port for HTTP:
#
#http.port: 9200
# http端口 (对外端口)
http.port: 9200
#内部节点之间沟通端⼝
transport.tcp.port: 9300
#
# For more information, consult the network module documentation.
#
# --------------------------------- Discovery ----------------------------------
#
# Pass an initial list of hosts to perform discovery when this node is started:
# The default list of hosts is ["127.0.0.1", "[::1]"]
#
#discovery.seed_hosts: ["host1", "host2"]
# es7.x之后新增的配置，写入候选主节点的设备地址，在开启服务后可以被选为主节点
discovery.seed_hosts: ["127.0.0.1:9300", "127.0.0.1:9301", "127.0.0.1:9302"]
#
# Bootstrap the cluster using an initial set of master-eligible nodes:
#
#cluster.initial_master_nodes: ["node-1", "node-2"]
# es7.x之后新增的配置，初始化一个新的集群时需要此配置来选举master
cluster.initial_master_nodes: ["node-1", "node-2", "node-3"]
#
# For more information, consult the discovery and cluster formation module documentation.
#
# ---------------------------------- Gateway -----------------------------------
#
# Block initial recovery after a full cluster restart until N nodes are started:
#
#gateway.recover_after_nodes: 3
#
# For more information, consult the gateway module documentation.
#
# ---------------------------------- Various -----------------------------------
#
# Require explicit names when deleting indices:
#
#action.destructive_requires_name: true

bootstrap.system_call_filter: false
http.cors.allow-origin: "*"
http.cors.enabled: true
http.cors.allow-headers : X-Requested-With,X-Auth-Token,Content-Type,Content-Length,Authorization
http.cors.allow-credentials: true

```


```dos

```

### 第二个节点

```conf
# ======================== Elasticsearch Configuration =========================
#
# NOTE: Elasticsearch comes with reasonable defaults for most settings.
#       Before you set out to tweak and tune the configuration, make sure you
#       understand what are you trying to accomplish and the consequences.
#
# The primary way of configuring a node is via this file. This template lists
# the most important settings you may want to configure for a production cluster.
#
# Please consult the documentation for further information on configuration options:
# https://www.elastic.co/guide/en/elasticsearch/reference/index.html
#
# ---------------------------------- Cluster -----------------------------------
#
# Use a descriptive name for your cluster:
#
#集群名称，三台集群，要配置相同的集群名称！！！
#cluster.name: my-application
cluster.name: my-bootstrap
#
# ------------------------------------ Node ------------------------------------
#
# Use a descriptive name for the node:
#
#node.name: node-1
#节点名称
node.name: node-2

#是不是有资格主节点
node.master: true
#是否存储数据
node.data: true
#最⼤集群节点数
node.max_local_storage_nodes: 3 
#网关地址
network.host: localhost
#
# Add custom attributes to the node:
#
#node.attr.rack: r1
#
# ----------------------------------- Paths ------------------------------------
#
# Path to directory where to store the data (separate multiple locations by comma):
#
#path.data: /path/to/data
#
# Path to log files:
#
#path.logs: /path/to/logs
#
# ----------------------------------- Memory -----------------------------------
#
# Lock the memory on startup:
#
#bootstrap.memory_lock: true
#
# Make sure that the heap size is set to about half the memory available
# on the system and that the owner of the process is allowed to use this
# limit.
#
# Elasticsearch performs poorly when the system is swapping the memory.
#
# ---------------------------------- Network -----------------------------------
#
# Set the bind address to a specific IP (IPv4 or IPv6):
#
#network.host: 192.168.0.1
#
# Set a custom port for HTTP:
#
#http.port: 9200
# http端口 (对外端口)
http.port: 9201
#内部节点之间沟通端⼝
transport.tcp.port: 9301
#
# For more information, consult the network module documentation.
#
# --------------------------------- Discovery ----------------------------------
#
# Pass an initial list of hosts to perform discovery when this node is started:
# The default list of hosts is ["127.0.0.1", "[::1]"]
#
#discovery.seed_hosts: ["host1", "host2"]
# es7.x之后新增的配置，写入候选主节点的设备地址，在开启服务后可以被选为主节点
discovery.seed_hosts: ["127.0.0.1:9300", "127.0.0.1:9301", "127.0.0.1:9302"]
#
# Bootstrap the cluster using an initial set of master-eligible nodes:
#
#cluster.initial_master_nodes: ["node-1", "node-2"]
# es7.x之后新增的配置，初始化一个新的集群时需要此配置来选举master
cluster.initial_master_nodes: ["node-1", "node-2", "node-3"]
#
# For more information, consult the discovery and cluster formation module documentation.
#
# ---------------------------------- Gateway -----------------------------------
#
# Block initial recovery after a full cluster restart until N nodes are started:
#
#gateway.recover_after_nodes: 3
#
# For more information, consult the gateway module documentation.
#
# ---------------------------------- Various -----------------------------------
#
# Require explicit names when deleting indices:
#
#action.destructive_requires_name: true

bootstrap.system_call_filter: false
http.cors.allow-origin: "*"
http.cors.enabled: true
http.cors.allow-headers : X-Requested-With,X-Auth-Token,Content-Type,Content-Length,Authorization
http.cors.allow-credentials: true

```


```dos

```


### 第三个节点

```conf
# ======================== Elasticsearch Configuration =========================
#
# NOTE: Elasticsearch comes with reasonable defaults for most settings.
#       Before you set out to tweak and tune the configuration, make sure you
#       understand what are you trying to accomplish and the consequences.
#
# The primary way of configuring a node is via this file. This template lists
# the most important settings you may want to configure for a production cluster.
#
# Please consult the documentation for further information on configuration options:
# https://www.elastic.co/guide/en/elasticsearch/reference/index.html
#
# ---------------------------------- Cluster -----------------------------------
#
# Use a descriptive name for your cluster:
#
#集群名称，三台集群，要配置相同的集群名称！！！
#cluster.name: my-application
cluster.name: my-bootstrap
#
# ------------------------------------ Node ------------------------------------
#
# Use a descriptive name for the node:
#
#node.name: node-1
#节点名称
node.name: node-3

#是不是有资格主节点
node.master: true
#是否存储数据
node.data: true
#最⼤集群节点数
node.max_local_storage_nodes: 3 
#网关地址
network.host: localhost
#
# Add custom attributes to the node:
#
#node.attr.rack: r1
#
# ----------------------------------- Paths ------------------------------------
#
# Path to directory where to store the data (separate multiple locations by comma):
#
#path.data: /path/to/data
#
# Path to log files:
#
#path.logs: /path/to/logs
#
# ----------------------------------- Memory -----------------------------------
#
# Lock the memory on startup:
#
#bootstrap.memory_lock: true
#
# Make sure that the heap size is set to about half the memory available
# on the system and that the owner of the process is allowed to use this
# limit.
#
# Elasticsearch performs poorly when the system is swapping the memory.
#
# ---------------------------------- Network -----------------------------------
#
# Set the bind address to a specific IP (IPv4 or IPv6):
#
#network.host: 192.168.0.1
#
# Set a custom port for HTTP:
#
#http.port: 9200
# http端口 (对外端口)
http.port: 9202
#内部节点之间沟通端⼝
transport.tcp.port: 9302
#
# For more information, consult the network module documentation.
#
# --------------------------------- Discovery ----------------------------------
#
# Pass an initial list of hosts to perform discovery when this node is started:
# The default list of hosts is ["127.0.0.1", "[::1]"]
#
#discovery.seed_hosts: ["host1", "host2"]
# es7.x之后新增的配置，写入候选主节点的设备地址，在开启服务后可以被选为主节点
discovery.seed_hosts: ["127.0.0.1:9300", "127.0.0.1:9301", "127.0.0.1:9302"]
#
# Bootstrap the cluster using an initial set of master-eligible nodes:
#
#cluster.initial_master_nodes: ["node-1", "node-2"]
# es7.x之后新增的配置，初始化一个新的集群时需要此配置来选举master
cluster.initial_master_nodes: ["node-1", "node-2", "node-3"]
#
# For more information, consult the discovery and cluster formation module documentation.
#
# ---------------------------------- Gateway -----------------------------------
#
# Block initial recovery after a full cluster restart until N nodes are started:
#
#gateway.recover_after_nodes: 3
#
# For more information, consult the gateway module documentation.
#
# ---------------------------------- Various -----------------------------------
#
# Require explicit names when deleting indices:
#
#action.destructive_requires_name: true

bootstrap.system_call_filter: false
http.cors.allow-origin: "*"
http.cors.enabled: true
http.cors.allow-headers : X-Requested-With,X-Auth-Token,Content-Type,Content-Length,Authorization
http.cors.allow-credentials: true

```


```dos

```


### Kibana

+ Kibana是一个Web应用程序，你可以通过5601来访问它。
+ 7.x的版本已经是极简风格了，左侧的菜单栏也都是极简的图标风格，但是主要的功能如下：
+ Kibana可视化管理页面详细使用说明
+ 使用浏览器访问例如：localhost:5601 默认端口，进入首页
+ Discover：日志管理视图 主要进行搜索和查询
+ Visualize：统计视图 构建可视化的图表
+ Dashboard：仪表视图 将构建的图表组合形成图表盘
+ Timelion：时间轴视图 随着时间流逝的数据
+ APM：性能管理视图 应用程序的性能管理系统
+ Canvas：大屏展示图
+ Dev Tools： 开发者命令视图 开发工具
+ Monitoring：健康视图 请求访问性能预警
+ Management：管理视图 管理工具



```conf
# Kibana is served by a back end server. This setting specifies the port to use.
#server.port: 5601

# Specifies the address to which the Kibana server will bind. IP addresses and host names are both valid values.
# The default is 'localhost', which usually means remote machines will not be able to connect.
# To allow connections from remote users, set this parameter to a non-loopback address.
#server.host: "localhost"

# Enables you to specify a path to mount Kibana at if you are running behind a proxy.
# Use the `server.rewriteBasePath` setting to tell Kibana if it should remove the basePath
# from requests it receives, and to prevent a deprecation warning at startup.
# This setting cannot end in a slash.
#server.basePath: ""

# Specifies whether Kibana should rewrite requests that are prefixed with
# `server.basePath` or require that they are rewritten by your reverse proxy.
# This setting was effectively always `false` before Kibana 6.3 and will
# default to `true` starting in Kibana 7.0.
#server.rewriteBasePath: false

# The maximum payload size in bytes for incoming server requests.
#server.maxPayloadBytes: 1048576

# The Kibana server's name.  This is used for display purposes.
#server.name: "your-hostname"

# The URLs of the Elasticsearch instances to use for all your queries.
#elasticsearch.hosts: ["http://localhost:9200"]

elasticsearch.hosts: ["http://127.0.0.1:9200", "http://127.0.0.1:9201", "http://127.0.0.1:9202"]

# When this setting's value is true Kibana uses the hostname specified in the server.host
# setting. When the value of this setting is false, Kibana uses the hostname of the host
# that connects to this Kibana instance.
#elasticsearch.preserveHost: true

# Kibana uses an index in Elasticsearch to store saved searches, visualizations and
# dashboards. Kibana creates a new index if the index doesn't already exist.
#kibana.index: ".kibana"

# The default application to load.
#kibana.defaultAppId: "home"

# If your Elasticsearch is protected with basic authentication, these settings provide
# the username and password that the Kibana server uses to perform maintenance on the Kibana
# index at startup. Your Kibana users still need to authenticate with Elasticsearch, which
# is proxied through the Kibana server.
#elasticsearch.username: "kibana_system"
#elasticsearch.password: "pass"

# Enables SSL and paths to the PEM-format SSL certificate and SSL key files, respectively.
# These settings enable SSL for outgoing requests from the Kibana server to the browser.
#server.ssl.enabled: false
#server.ssl.certificate: /path/to/your/server.crt
#server.ssl.key: /path/to/your/server.key

# Optional settings that provide the paths to the PEM-format SSL certificate and key files.
# These files are used to verify the identity of Kibana to Elasticsearch and are required when
# xpack.security.http.ssl.client_authentication in Elasticsearch is set to required.
#elasticsearch.ssl.certificate: /path/to/your/client.crt
#elasticsearch.ssl.key: /path/to/your/client.key

# Optional setting that enables you to specify a path to the PEM file for the certificate
# authority for your Elasticsearch instance.
#elasticsearch.ssl.certificateAuthorities: [ "/path/to/your/CA.pem" ]

# To disregard the validity of SSL certificates, change this setting's value to 'none'.
#elasticsearch.ssl.verificationMode: full

# Time in milliseconds to wait for Elasticsearch to respond to pings. Defaults to the value of
# the elasticsearch.requestTimeout setting.
#elasticsearch.pingTimeout: 1500

# Time in milliseconds to wait for responses from the back end or Elasticsearch. This value
# must be a positive integer.
#elasticsearch.requestTimeout: 30000

# List of Kibana client-side headers to send to Elasticsearch. To send *no* client-side
# headers, set this value to [] (an empty list).
#elasticsearch.requestHeadersWhitelist: [ authorization ]

# Header names and values that are sent to Elasticsearch. Any custom headers cannot be overwritten
# by client-side headers, regardless of the elasticsearch.requestHeadersWhitelist configuration.
#elasticsearch.customHeaders: {}

# Time in milliseconds for Elasticsearch to wait for responses from shards. Set to 0 to disable.
#elasticsearch.shardTimeout: 30000

# Time in milliseconds to wait for Elasticsearch at Kibana startup before retrying.
#elasticsearch.startupTimeout: 5000

# Logs queries sent to Elasticsearch. Requires logging.verbose set to true.
#elasticsearch.logQueries: false

# Specifies the path where Kibana creates the process ID file.
#pid.file: /var/run/kibana.pid

# Enables you specify a file where Kibana stores log output.
#logging.dest: stdout

# Set the value of this setting to true to suppress all logging output.
#logging.silent: false

# Set the value of this setting to true to suppress all logging output other than error messages.
#logging.quiet: false

# Set the value of this setting to true to log all events, including system usage information
# and all requests.
#logging.verbose: false

# Set the interval in milliseconds to sample system and process performance
# metrics. Minimum is 100ms. Defaults to 5000.
#ops.interval: 5000

# Specifies locale to be used for all localizable strings, dates and number formats.
# Supported languages are the following: English - en , by default , Chinese - zh-CN .
i18n.locale: "zh-CN"


```

+ 索引模式 
  > 添加索引

+ Discover 中
  > 利用添加的索引模式 查看数据

## 其它

+ 检查集群健康状态

```js
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:9200/_cat/health?v", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  /*
epoch      timestamp cluster      status node.total node.data shards pri relo init unassign pending_tasks max_task_wait_time active_shards_percent
1690721429 12:50:29  my-bootstrap green           3         3     20  10    0    0        0             0                  -                100.0%

  */
```

+ 获取集群中节点的列表

```js
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:9200/_cat/nodes?v", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

/*
ip        heap.percent ram.percent cpu load_1m load_5m load_15m node.role master name
127.0.0.1           29          68  20                          dilmrt    -      node-1
127.0.0.1           16          68  12                          dilmrt    -      node-3
127.0.0.1           31          68  17                          dilmrt    *      node-2

*/
```

+ 获取所有分片的信息参数

```js
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:9200/_cat/indices?v", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  /*
  health status index                          uuid                   pri rep docs.count docs.deleted store.size pri.store.size
green  open   .kibana-event-log-7.8.0-000001 leckoQnzTWycaQi_rIvmoQ   1   1          1            0     10.6kb          5.3kb
green  open   book2                          KRexSOorR1it17bSClzGSg   1   1          0            0       416b           208b
green  open   cars                           8wWe-fscTLO9VYEi_fNm-Q   1   1          8            0     10.4kb          5.2kb
green  open   .apm-custom-link               IZVh3QEtTb-QDl5go8UP8g   1   1          0            0       416b           208b
green  open   .kibana_task_manager_1         wxKwqAHySzOXSPL3f-DHlA   1   1          5            0       29kb         14.5kb
green  open   .apm-agent-configuration       Hb1HIqQLSoOaj_Ke50JThQ   1   1          0            0       416b           208b
green  open   .kibana_1                      BpEJkkh2RCKpWKMfBgBaBw   1   1         26            7      138kb           69kb
green  open   user                           pawJ4cqlRlqZd2xNWe4ppw   1   1          4            0     10.1kb            5kb
green  open   shopping                       KLV8BfnjR1awSNnTXiWrJg   1   1          1            0     16.5kb          8.2kb

  */
```

+ 单个节点信息

```js
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:9200?pretty", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  /*
  {
    "name": "node-1",
    "cluster_name": "my-bootstrap",
    "cluster_uuid": "uS-eNJGZRYaxbZoB0AAxZQ",
    "version": {
        "number": "7.8.0",
        "build_flavor": "default",
        "build_type": "zip",
        "build_hash": "757314695644ea9a1dc2fecd26d1a43856725e65",
        "build_date": "2020-06-14T19:35:50.234439Z",
        "build_snapshot": false,
        "lucene_version": "8.5.1",
        "minimum_wire_compatibility_version": "6.8.0",
        "minimum_index_compatibility_version": "6.0.0-beta1"
    },
    "tagline": "You Know, for Search"
}
  */
```


[参考1](https://www.cnblogs.com/chenyanbin/p/13493920.html#%E9%85%8D%E7%BD%AEkibana)
