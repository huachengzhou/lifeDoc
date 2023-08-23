---
title: "Routing"
date: 2023-08-15
draft: false
weight: 4
---



> 一个生产者，一个交换机，两个队列，两个消费者

![][img4]
![][img4_]





## 绑定

在前面的示例中，我们已经创建了绑定。你可能还记得 代码如下：

```java
channel.queueBind(queueName, EXCHANGE_NAME, "");
```

绑定可以采用额外的路由键参数。为了避免 与basic_publish参数混淆，我们将它称为绑定键。这就是我们如何使用键创建绑定：


```java
channel.queueBind(queueName, EXCHANGE_NAME, "black");
```



## 直接交换(direct)

> 与 扇出不同的是  扇出是广播模式  无脑通知到所有队列  ,队列无需知道路由规则,只需知道广播交换机就行

+ 规则算法: 直接交换很简单 - 消息转到 **binding key(绑定键)** 与消息的 **routing key(路由键)** 完全匹配的队列。



![][img5]
![][img5_]

在上面这张图中，我们可以看到 X 绑定了两个队列，绑定类型是 direct。队列 Q1 绑定键为 orange，
队列 Q2 绑定键有两个:一个绑定键为 black，另一个绑定键为 green.


在这种绑定情况下，生产者发布消息到 exchange 上，绑定键为 orange 的消息会被发布到队列
Q1。绑定键为 blackgreen 和的消息会被发布到队列 Q2，其他消息类型的消息将被丢弃。


### 多重绑定 


![][img6]
![][img6_]

当然如果 exchange 的绑定类型是 direct，但是它绑定的多个队列的 key 如果都相同，在这种情
况下虽然绑定类型是 direct 但是它表现的就和 fanout 有点类似了，就跟广播差不多，如上图所示。





## 示例

![][img7]
![][img7_]


### 生产者

```java
package com.ng.my.routing;

import com.my.common.RabbitMqUtils;
import com.rabbitmq.client.Channel;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * 生产者
 * @author : chengdu
 * @date :  2023/8/20-08
 **/
public class EmitLogDirect {

    private final Logger logger = LoggerFactory.getLogger(getClass());
    private static final String EXCHANGE_NAME = "logDirect";


    @Test
    public void acceptProducer() throws Exception {
        Channel channel = RabbitMqUtils.getChannel();

        //创建交换机 并指定直接交换模式
        channel.exchangeDeclare(EXCHANGE_NAME, "direct");

        //从控制台当中接受信息
        logger.info("start");

        //创建需要绑定的路由key  注意这里不说bingKey 是 routingKey
        Map<String, String> bindingKeyMap = new HashMap<>(4);
        bindingKeyMap.put("info", "普通 info 信息");
        bindingKeyMap.put("warning", "警告 warning 信息");
        bindingKeyMap.put("error", "错误 error 信息");
        //debug 没有消费这接收这个消息 所有就丢失了
        bindingKeyMap.put("debug", "调试 debug 信息");
        TimeUnit.SECONDS.sleep(10);
        Iterator<Map.Entry<String, String>> iterator = bindingKeyMap.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, String> stringEntry = iterator.next();
            //路由key
            String routingKey = stringEntry.getKey();
            String message = stringEntry.getValue();
            logger.info("生产者 路由匹配算法key:"+routingKey);
            channel.basicPublish(EXCHANGE_NAME, routingKey, null, message.getBytes("UTF-8"));
        }

        TimeUnit.MINUTES.sleep(2);
        logger.info("end");
    }

}

```


### 消费者

```java
package com.ng.my.routing;

import cn.hutool.json.JSONUtil;
import com.my.common.RabbitMqUtils;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.TimeUnit;

/**
 * 消费者
 * @author : chengdu
 * @date :  2023/8/20-08
 **/
public class ReceiveLogsDirect {

    private final Logger logger = LoggerFactory.getLogger(getClass());
    private static final String EXCHANGE_NAME = "logDirect";

    @Test
    public void executeWork() throws Exception{
        Channel channel = RabbitMqUtils.getChannel();

        //创建2个临时队列
        String queueOne = channel.queueDeclare().getQueue();
        String queueTwo = channel.queueDeclare().getQueue();

        //第一个队列 绑定一个路由key
        channel.queueBind(queueOne, EXCHANGE_NAME, "error");


        //第二个队列分别和三个路由路由key相绑定
        channel.queueBind(queueTwo, EXCHANGE_NAME, "info");
        channel.queueBind(queueTwo, EXCHANGE_NAME, "error");
        channel.queueBind(queueTwo, EXCHANGE_NAME, "warning");
        //丢掉debug消息
//        channel.queueBind(queueTwo, EXCHANGE_NAME, "debug");



        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            logger.info("consumerTag:" + consumerTag);
            logger.info("properties:" + JSONUtil.toJsonStr(delivery.getProperties()));
            logger.info("envelope:" + JSONUtil.toJsonStr(delivery.getEnvelope()));
            System.out.println(" 消息 '" + message + "'");
        };
        //队列名称,自动应答
        channel.basicConsume(queueOne, true, deliverCallback, consumerTag -> { });
        channel.basicConsume(queueTwo, true, deliverCallback, consumerTag -> { });

        TimeUnit.MINUTES.sleep(2);
        logger.info("end");
    }

}

```


## 总结

在生产者那是路由key  这里确定的是交换机和路由key的关系

在消费者那路由key 必须和生产者一致才行  路由key可以多个队列绑定相同的路由key


[img4]:../../.././imgs/java/rabbitmq/Publish_Subscribe_bindings.png
[img4_]:../../../../imgs/java/rabbitmq/Publish_Subscribe_bindings.png

[img5]:../../.././imgs/java/rabbitmq/direct-exchange_1.png
[img5_]:../../../../imgs/java/rabbitmq/direct-exchange_1.png


[img6]:../../.././imgs/java/rabbitmq/direct-exchange-multiple.png
[img6_]:../../../../imgs/java/rabbitmq/direct-exchange-multiple.png

[img7]:../../.././imgs/java/rabbitmq/Routing.png
[img7_]:../../../../imgs/java/rabbitmq/Routing.png
