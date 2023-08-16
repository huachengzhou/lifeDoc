---
title: "Publish/Subscribe"
date: 2023-08-15
draft: false
weight: 3
---


# Publish/Subscribe (发布/订阅)



> 一个生产者，一个交换机，两个队列，两个消费者


+ 生产者是发送消息的用户应用程序。
+ 队列是存储消息的缓冲区。
+ 消费者是接收消息的用户应用程序。





![][img4]
![][img4_]

[img4]:../../.././imgs/java/rabbitmq/Publish_Subscribe.png
[img4_]:../../../../imgs/java/rabbitmq/Publish_Subscribe.png


## 创建 扇形交换机

RabbitMQ 中消息传递模型的核心思想是生产者 从不将任何消息直接发送到队列。实际上，很多时候 生产者甚至不知道消息是否会传递给任何所有队列


有几种可用的交换类型：direct, topic, headers , fanout 本次使用 fanout并且使用它的日志

```java
channel.exchangeDeclare("logs", "fanout");
```

fanout 交换非常简单。正如您可能从 名称，它只是将收到的所有消息广播到所有队列让它知道



## 临时队列


```java
String queueName = channel.queueDeclare().getQueue();
```


## 绑定


![][img5]
![][img5_]

[img5]:../../.././imgs/java/rabbitmq/Publish_Subscribe_bindings.png
[img5_]:../../../../imgs/java/rabbitmq/Publish_Subscribe_bindings.png

我们已经创建了一个扇出交换和一个队列。现在我们需要 告诉交换机将消息发送到我们的队列。这种关系 交换和队列之间称为绑定。

```java
channel.queueBind(queueName, "logs", "");
```

从现在开始，日志交换会将消息附加到我们的队列中。


## 将一切整合在一起

发出日志消息的生产者程序看起来不多 与上一教程不同。最重要的变化是 我们现在希望将消息发布到我们的日志交换，而不是 无名者。我们需要在发送时提供一个路由密钥，但它 对于扇出交换，将忽略值。下面是 EmitLog.java 程序的代码：


