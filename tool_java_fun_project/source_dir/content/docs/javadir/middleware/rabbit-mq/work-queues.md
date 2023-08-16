---
title: "work-queues"
date: 2023-08-15
draft: false
weight: 2
---


# Work Queues





> 一个生产者，一个默认的交换机，一个队列，两个消费


![][img4]
![][img4_]

[img4]:../../.././imgs/java/rabbitmq/Work_Queues.png
[img4_]:../../../../imgs/java/rabbitmq/Work_Queues.png



## 生产者

> 需要再idea.ext.options 中加上 -Deditable.java.test.console=true


```java
import com.my.common.RabbitMqUtils;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.MessageProperties;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Scanner;
import java.util.concurrent.TimeUnit;

public class NewTask {
    private static final String TASK_QUEUE_NAME = "task_queue";
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Test
    public void acceptProducer()throws Exception{
        Channel channel = RabbitMqUtils.getChannel();
        channel.queueDeclare(TASK_QUEUE_NAME, true, false, false, null);

        //从控制台当中接受信息
        logger.info("start");
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()) {
            String message = scanner.next();

            channel.basicPublish("", TASK_QUEUE_NAME,
                    MessageProperties.PERSISTENT_TEXT_PLAIN,
                    message.getBytes("UTF-8"));
            logger.info(" [x] Sent '" + message + "'");
        }

        TimeUnit.MINUTES.sleep(2);
        logger.info("end");
    }

}

```


## 消费者


```java
import cn.hutool.core.date.DateUtil;
import cn.hutool.json.JSONUtil;
import com.my.common.RabbitMqUtils;
import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.TimeUnit;

public class NewWorker {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    private static final String TASK_QUEUE_NAME = "task_queue";

    @Test
    public void twoWork()throws Exception{
        oneWork() ;
    }


    @Test
    public void oneWork() throws Exception{
        Channel channel = RabbitMqUtils.getChannel();
        logger.info(DateUtil.now() +"等待接收消息....");

        //3:推送的消息如何进行消费的接口回调
        DeliverCallback deliverCallback = (consumerTag, message) -> {
            logger.info("接收时间:"+DateUtil.now());
            //consumerTag 消费者标签，用来区分多个消费者
            logger.info("consumerTag:" + consumerTag);
            logger.info("properties:" + JSONUtil.toJsonStr(message.getProperties()));
            logger.info("envelope:" + JSONUtil.toJsonStr(message.getEnvelope()));
            logger.info("message:" + new String(message.getBody()));
            logger.info("");
        };
        //4:取消消费的一个回调接口 如在消费的时候队列被删除掉了
        CancelCallback cancelCallback = consumerTag -> {
            //consumerTag 消费者标签，用来区分多个消费者
            logger.info("consumerTag:" + consumerTag);
        };

        /**
         * 消费者消费消息
         * 1.消费哪个队列
         * 2.消费成功之后是否要自动应答 true 代表自动应答 false 手动应答
         * 3.消费者未成功消费的回调
         */
        channel.basicConsume(TASK_QUEUE_NAME,true,deliverCallback,cancelCallback) ;
        TimeUnit.MINUTES.sleep(2);
    }

}

```

 oneWork() twoWork() 分别执行就是两个消费者