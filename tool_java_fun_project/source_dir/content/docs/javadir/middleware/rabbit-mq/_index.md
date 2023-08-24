---
title: "rabbit-mq"
date: 2020-01-17T15:26:15Z
draft: false
weight: 7
---


# RabbitMQ


## RabbitMQ 的概念 

> RabbitMQ 是一个消息中间件：它接受并转发消息。你可以把它当做一个快递站点，当你要发送一个包
裹时，你把你的包裹放到快递站，快递员最终会把你的快递送到收件人那里，按照这种逻辑 RabbitMQ 是
一个快递站，一个快递员帮你传递快件。RabbitMQ 与快递站的主要区别在于，它不处理快件而是接收，
存储和转发消息数据。

## AMQP模型

> 为了实现消息的设计因此产生了[AMQP模型](https://www.rabbitmq.com/tutorials/amqp-concepts.html)


## 四大核心概念 


### 生产者

产生数据发送消息的程序是生产者

### 交换机

交换机是 RabbitMQ 非常重要的一个部件，一方面它接收来自生产者的消息，另一方面它将消息
推送到队列中。交换机必须确切知道如何处理它接收到的消息，是将这些消息推送到特定队列还是推
送到多个队列，亦或者是把消息丢弃，这个得有交换机类型决定



### 队列

队列是 RabbitMQ 内部使用的一种数据结构，尽管消息流经 RabbitMQ 和应用程序，但它们只能存
储在队列中。队列仅受主机的内存和磁盘限制的约束，本质上是一个大的消息缓冲区。许多生产者可
以将消息发送到一个队列，许多消费者可以尝试从一个队列接收数据。这就是我们使用队列的方式


### 消费者


消费与接收具有相似的含义。消费者大多时候是一个等待接收消息的程序。请注意生产者，消费
者和消息中间件很多时候并不在同一机器上。同一个应用程序既可以是生产者又是可以是消费者。


## RabbitMQ 核心部分



## 各个名词介绍

+ **Broker**：接收和分发消息的应用，RabbitMQ Server 就是 Message Broker

+ **Virtual host**：出于多租户和安全因素设计的，把 AMQP 的基本组件划分到一个虚拟的分组中，类似
于网络中的 namespace 概念。当多个不同的用户使用同一个 RabbitMQ server 提供的服务时，可以划分出
多个 vhost，每个用户在自己的 vhost 创建 exchange／queue 等

+ **Connection**：publisher／consumer 和 broker 之间的 TCP 连接

+ **Channel**：如果每一次访问 RabbitMQ 都建立一个 Connection，在消息量大的时候建立 TCP
Connection 的开销将是巨大的，效率也较低。Channel 是在 connection 内部建立的逻辑连接，如果应用程
序支持多线程，通常每个 thread 创建单独的 channel 进行通讯，AMQP method 包含了 channel id 帮助客
户端和 message broker 识别 channel，所以 channel 之间是完全隔离的。Channel 作为轻量级的
**Connection 极大减少了操作系统建立 TCP connection 的开销**

+ **Exchange**：message 到达 broker 的第一站，根据分发规则，匹配查询表中的 routing key，分发
消息到 queue 中去。常用的类型有：direct (point-to-point), topic (publish-subscribe) and fanout
(multicast)

+ **Queue**：消息最终被送到这里等待 consumer 取走

+ **Binding**：exchange 和 queue 之间的虚拟连接，binding 中可以包含 routing key，Binding 信息被保
存到 exchange 中的查询表中，用于 message 的分发依据


+ **Routing Key**:生产者将消息发送到交换机时会携带一个key,来指定路由规则

+ **binding Key**:在绑定Exchange和Queue时，会指定一个BindingKey,生产者发送消息携带的RoutingKey会和bindingKey对比，若一致就将消息分发至这个队列




+ 安装用户
```cmd
-- 创建账号
C:\Users\noatn>rabbitmqctl add_user admin 123456
Adding user "admin" ...
Done. Don't forget to grant the user permissions to some virtual hosts! See 'rabbitmqctl help set_permissions' to learn more.

-- 设置用户角色
C:\Users\noatn>rabbitmqctl set_user_tags admin administrator
Setting tags for user "admin" to [administrator] ...

-- 设置用户权限
C:\Users\noatn>rabbitmqctl set_permissions -p "/" admin ".*" ".*" ".*"
Setting permissions for user "admin" in vhost "/" ...

C:\Users\noatn>rabbitmqctl list_users
Listing users ...
user    tags
admin   [administrator]
guest   [administrator]

-- 删除用户

rabbitmqctl delete_user javaboy

-- 修改用户密码

rabbitmqctl change_password javaboy 123456


-- 设置用户角色

rabbitmqctl set_user_tags javaboy administrator


```

+ 管理  vhost

```cmd
# 添加
rabbitmqctl add_vhost myvh


# 查看
rabbitmqctl list_vhosts

# 删除

rabbitmqctl delete_vhost myvh

# 添加虚拟主机权限

rabbitmqctl set_permissions -p myvh guest ".*" ".*" ".*"

# 禁止某个用户使用某个虚拟主机
rabbitmqctl clear_permissions -p myvh guest


```

管理页面创建 vhost

在 admin 选项卡中，点击右边的 Virtual Hosts




+ 其它命令

启动:service rabbitmq-server start

关闭:service rabbitmq-server stop

重启:service rabbitmq-server restart

启动rabbitmq：rabbitmq-service start

关闭rabbitmq：rabbitmq-service stop

关闭应用：rabbitmqctl stop_app

启动应用：rabbitmqctl start_app

查看所有的队列：rabbitmqctl list_queues

清除所有的队列：rabbitmqctl reset

查看用户：rabbitmqctl list_users

查看状态：rabbitmqctl status

查看集群状态：rabbitmqctl cluster_status

[查看应用](http://127.0.0.1:15672)


![][img1]
![][img1_]
![][img2]
![][img2_]
![][img3]
![][img3_]
![][img4]
![][img4_]
![][img5]
![][img5_]
![][img6]
![][img6_]
![][img7]
![][img7_]
![][img8]
![][img8_]
![][img9]
![][img9_]


[下载地址](https://www.rabbitmq.com/download.html)

[官方核心部分示例](https://www.rabbitmq.com/getstarted.html)

[官方AMQP模型说明](https://www.rabbitmq.com/tutorials/amqp-concepts.html)

[官方configure参数说明](https://www.rabbitmq.com/configure.html)

[官方Queue说明](https://www.rabbitmq.com/queues.html)

[官方总文档](https://www.rabbitmq.com/documentation.html)

[官方server文档](https://www.rabbitmq.com/admin-guide.html)

[官方手册里面包含一些重要参数](https://www.rabbitmq.com/manpages.html)

[参考1](https://blog.csdn.net/weixin_41421314/article/details/128315400)
[参考2](https://mikechen.cc/25166.html)
[参考3](https://blog.csdn.net/qq_45472675/article/details/110951399)



[img1]:../.././imgs/java/rabbitmq/微信截图_20230815160510.png
[img1_]:../../../imgs/java/rabbitmq/微信截图_20230815160510.png
[img2]:../.././imgs/java/rabbitmq/微信截图_20230815160535.png
[img2_]:../../../imgs/java/rabbitmq/微信截图_20230815160535.png
[img3]:../.././imgs/java/rabbitmq/微信截图_20230815160705.png
[img3_]:../../../imgs/java/rabbitmq/微信截图_20230815160705.png

[img4]:../.././imgs/java/rabbitmq/hello_world.png
[img4_]:../../../imgs/java/rabbitmq/hello_world.png

[img5]:../.././imgs/java/rabbitmq/Work_Queues.png
[img5_]:../../../imgs/java/rabbitmq/Work_Queues.png
[img6]:../.././imgs/java/rabbitmq/Publish_Subscribe.png
[img6_]:../../../imgs/java/rabbitmq/Publish_Subscribe.png
[img7]:../.././imgs/java/rabbitmq/Routing.png
[img7_]:../../../imgs/java/rabbitmq/Routing.png
[img8]:../.././imgs/java/rabbitmq/Topics.png
[img8_]:../../../imgs/java/rabbitmq/Topics.png

[img9]:../.././imgs/java/rabbitmq/RPC.png
[img9_]:../../../imgs/java/rabbitmq/RPC.png

