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


## 创建 扇形交换机(fanout)

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


### 生产者

```java
package com.ng.my.publish_subscribe;

import com.my.common.RabbitMqUtils;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.MessageProperties;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Scanner;
import java.util.concurrent.TimeUnit;

/**
 * @author : chengdu
 * @date :  2023/8/20-08
 **/
public class EmitLog {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    private static final String EXCHANGE_NAME = "logs";

    @Test
    public void acceptProducer()throws Exception{
        Channel channel = RabbitMqUtils.getChannel();

        //创建交换机 并指定广播模式
        channel.exchangeDeclare(EXCHANGE_NAME, "fanout");

        //从控制台当中接受信息
        logger.info("start");
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()) {
            String message = scanner.next();
            logger.info(" [x] Sent '" + message + "'");
            //将消息推入到广播模式的交换机中
            channel.basicPublish(EXCHANGE_NAME, "", null, message.getBytes("UTF-8"));
            System.out.println(" [x] Sent '" + message + "'");
        }

        TimeUnit.MINUTES.sleep(2);
        logger.info("end");
    }

}

```



### 消费者

```java

package com.ng.my.publish_subscribe;

import com.my.common.RabbitMqUtils;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.TimeUnit;

/**
 * @author : chengdu
 * @date :  2023/8/20-08
 **/
public class ReceiveLogs {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    private static final String EXCHANGE_NAME = "logs";
    @Test
    public void executeWork() throws Exception{
        Channel channel = RabbitMqUtils.getChannel();

        channel.exchangeDeclare(EXCHANGE_NAME, "fanout");

        //创建一个具有随机名称的队列，或者， 甚至更好 - 让服务器为我们选择一个随机队列名称 (这也是为什么发布的时候压根没有指定  路由key)
        String queueName = channel.queueDeclare().getQueue();
        channel.queueBind(queueName, EXCHANGE_NAME, "");

        logger.info("queueName:"+queueName);

        System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println(" [x] Received '" + message + "'");
        };
        //队列名称,自动应答
        channel.basicConsume(queueName, true, deliverCallback, consumerTag -> { });

        TimeUnit.MINUTES.sleep(2);
        logger.info("end");
    }

}

```


## 总结

生产者将消息推送到广播模式的交换机中 
消费者自己创建随机队列  然后将随机队列与广播模式的交换机绑定
最后就是可以直接处理了