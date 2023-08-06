---
title: "ElasticSearch进阶篇集群+原理"
date: 2020-01-17T15:26:15Z
draft: false
weight: 5
---



# 1.相关概念解释

（1）Near Realtime（NRT）：近实时，两个意思，从写入数据到数据可以被搜索到有一个小延迟（大概1秒）；基于es执行搜索和分析可以达到秒级

（2）Cluster：集群，包含多个节点，每个节点属于哪个集群是通过一个配置（集群名称，默认是elasticsearch）来决定的，对于中小型应用来说，刚开始一个集群就一个节点很正常

（3）Node：节点(简单理解为集群中的一个服务器)，集群中的一个节点，节点也有一个名称（默认是随机分配的），节点名称很重要（在执行运维管理操作的时候），默认节点会去加入一个名称为“elasticsearch”的集群，如果直接启动一堆节点，那么它们会自动组成一个elasticsearch集群，当然一个节点也可以组成一个elasticsearch集群

（4）Index：索引(简单理解就是一个数据库)，包含一堆有相似结构的文档数据，比如可以有一个客户索引，商品分类索引，订单索引，索引有一个名称。一个index包含很多document，一个index就代表了一类类似的或者相同的document。比如说建立一个product index，商品索引，里面可能就存放了所有的商品数据，所有的商品document。

（5）Type：类型(简单理解就是一张表)，每个索引里都可以有一个或多个type，type是index中的一个逻辑数据分类，一个type下的document，都有相同的field，比如博客系统，有一个索引，可以定义用户数据type，博客数据type，评论数据type。

（6）Document&field：文档(就是一行数据)，es中的最小数据单元，一个document可以是一条客户数据，一条商品分类数据，一条订单数据，通常用JSON数据结构表示，每个index下的type中，都可以去存储多个document。一个document里面有多个field，每个field就是一个数据字段。

（7）shard：单台机器无法存储大量数据，es可以将一个索引中的数据切分为多个shard，分布在多台服务器上存储。有了shard就可以横向扩展，存储更多数据，让搜索和分析等操作分布到多台服务器上去执行，提升吞吐量和性能。每个shard都是一个lucene index。

（8）replica：任何一个服务器随时可能故障或宕机，此时shard可能就会丢失，因此可以为每个shard创建多个replica副本。replica可以在shard故障时提供备用服务，保证数据不丢失，多个replica还可以提升搜索操作的吞吐量和性能。primary shard（建立索引时一次设置，不能修改，默认5个），replica shard（随时修改数量，默认1个），默认每个索引10个shard，5个primary shard，5个replica shard，最小的高可用配置，是2台服务器。



# 2.ElasticSearch分布式架构原理


## 2.1shad与replica机制

（1）一个index包含多个shard,也就是一个index存在多个服务器上

（2）每个shard都是一个最小工作单元，承载部分数据，比如有三台服务器,现在有三条数据,这三条数据在三台服务器上各方一条.

（3）增减节点时，shard会自动在nodes中负载均衡

（4）primary shard和replica shard，每个document肯定只存在于某一个primary shard以及其对应的replica shard中，不可能存在于多个primary shard

（5）replica shard是primary shard的副本，负责容错，以及承担读请求负载

（6）primary shard的数量在创建索引的时候就固定了，replica shard的数量可以随时修改

（7）primary shard的默认数量是5，replica默认是1，默认有10个shard，5个primary shard，5个replica shard

（8）primary shard不能和自己的replica shard放在同一个节点上（否则节点宕机，primary shard和副本都丢失，起不到容错的作用），但是可以和其他primary shard的replica shard放在同一个节点上

## 2.2分布式架构图

![][img1]
![][img1_]


## 2.3容错机制

在集群中会有一个master负责当leader进行协调,比如上图的Node2为master, 那么当它挂了的时候会重现选举一个新的master,比如新选举的是Node3,这个时候replica 2这时候会变成primary.

当Node2恢复了的时候,这个时候node2的prinary会变成replica



## 2.4ES写入数据的过程


### 2.4.1简单流程:

+ 1:客户端选择一个node发送请求过去，这个node就是coordinating node (协调节点)
+ 2:coordinating node，对document进行路由，将请求转发给对应的node
+ 3: 实际上的node上的primary shard处理请求，然后将数据同步到replica node
+ 4:coordinating node，如果发现primary node和所有的replica node都搞定之后，就会返回请求到客户端
+ 这个路由简单的说就是取模算法,比如说现在有3太服务器,这个时候传过来的id是5,那么5%3=2,就放在第2太服务器



### 2.4.2写入数据底层原理:


![][img2]
![][img2_]


原理

1:先往内存缓冲区中写并且同时往日志里面写 translog

2: 刷新（refresh）将内存缓冲区的数据写回到文件中并形成分段(注意可能由于不同版本以及配置刷新时间也不同 旧版本是1秒)

3: 分段合并(合并步骤2产生的段) 注意默认是30分钟或者段内容大于500M 都是可以设置的





## 2.5ES查询过程


### 2.5.1倒排序算法


查询有个算法叫倒排序:简单的说就是:通过分词把词语出现的id进行记录下来,再查询的时候先去查到哪些id包含这个数据,然后再根据id把数据查出来. 要是不理解的可以先去查下什么是倒排序


### 2.5.2查询过程


+ 1: 客户端发送一个请求给coordinate node
+ 2: 协调节点将搜索的请求转发给所有的shard对应的primary shard 或replica shard
+ 3: query phase：每一个shard 将自己搜索的结果（其实也就是一些唯一标识），返回给协调节点，有协调节点进行数据的合并，排序，分页等操作，产出最后的结果
+ 4: fetch phase ，接着由协调节点，根据唯一标识去各个节点进行拉去数据，最总返回给客户端

### 2.5.3查询原理


查询过程大体上分为查询和取回这两个阶段，广播查询请求到所有相关分片，并将它们的响应整合成全局排序后的结果集合，这个结果集合会返回给客户端。


#### 1)查询阶段


+ 1:当一个节点接收到一个搜索请求，这这个节点就会变成协调节点，第一步就是将广播请求到搜索的每一个节点的分片拷贝，查询请求可以被某一个主分片或某一个副分片处理，协调节点将在之后的请求中轮训所有的分片拷贝来分摊负载。
+ 2:每一个分片将会在本地构建一个优先级队列，如果客户端要求返回结果排序中从from 名开始的数量为size的结果集，每一个节点都会产生一个from+size大小的结果集，因此优先级队列的大小也就是from+size，分片仅仅是返回一个轻量级的结果给协调节点，包括结果级中的每一个文档的ID和进行排序所需要的信息。
+ 3:协调节点将会将所有的结果进行汇总，并进行全局排序，最总得到排序结果。



#### 2)取值阶段

+ 1:查询过程得到的排序结果，标记处哪些文档是符合要求的，此时仍然需要获取这些文档返回给客户端
+ 2:协调节点会确定实际需要的返回的文档，并向含有该文档的分片发送get请求，分片获取的文档返回给协调节点，协调节点将结果返回给客户端


## 2.6更新过程

### 2.6.1document的全量替换


+ 1:这个就是用新的数据全部覆盖以前的数据
+ 2:重新创建一个document并把原来的标记为delete
+ 3:partial update, 就是制定需要更新的字段.
全量是把数据找出来,然后再java代码中进行修改,再放回去.
partial是直接提交需要修改的字段然后直接修改,在一个shard中进行,内部也是全量替换.



### 2.6.2强制创建

就是不管原来的数据,直接强制创建一个新的


### 2.7删除过程


当要进行删除document的时候,只是把它标记为delete,当数据到达一定的时候再进行删除, 有点像JVM中标记清除法








[img1]:../../.././imgs/elasticsearch/image/20190522205818635.png
[img1_]:../../../../imgs/elasticsearch/image/20190522205818635.png


[img2]:../../.././imgs/elasticsearch/image/20190522155754105.png
[img2_]:../../../../imgs/elasticsearch/image/20190522155754105.png



