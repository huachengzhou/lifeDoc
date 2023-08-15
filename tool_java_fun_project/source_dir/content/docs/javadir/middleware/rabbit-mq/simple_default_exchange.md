---
title: "Hello-world"
date: 2023-08-15
draft: false
weight: 1
---


# Hello-world








> 一个生产者，一个默认的交换机，一个队列，一个消费者

![][img4]
![][img4_]

[img4]:../../.././imgs/java/rabbitmq/hello_world.png
[img4_]:../../../../imgs/java/rabbitmq/hello_world.png




## 生产者

```java
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.RandomUtil;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author : chengdu
 * @date :  2023/8/13-08
 **/
public class Producer {
    private final static String QUEUE_NAME = "hello";
    private final Logger logger = LoggerFactory.getLogger(getClass());

    /**
     * 简单生产者
     * @throws Exception
     */
    @Test
    public void acceptProducer()throws Exception{
        //1:创建连接池
        ConnectionFactory connectionFactory = new ConnectionFactory() ;
        connectionFactory.setHost("127.0.0.1");
        connectionFactory.setUsername("admin");
        connectionFactory.setPassword("123456");

        Connection connection = connectionFactory.newConnection();
        //2:创建通道(数据交换通道)
        //channel 实现了自动 close 接口 自动关闭 不需要显示关闭
        Channel channel = connection.createChannel();

        /**
         * 生成一个队列
         * 1.队列名称
         * 2.队列里面的消息是否持久化 默认消息存储在内存中
         * 3.该队列是否只供一个消费者进行消费 是否进行共享 true 可以多个消费者消费
         * 4.是否自动删除 最后一个消费者端开连接以后 该队列是否自动删除 true 自动删除
         * 5.其他参数
         */
        channel.queueDeclare(QUEUE_NAME,false,false,false,null) ;
        String message = "hello world "+ RandomUtil.randomInt(10,10000);
        /**
         * 发送一个消息
         * 1.发送到那个交换机
         * 2.路由的 key 是哪个
         * 3.其他的参数信息
         * 4.发送消息的消息体
         */
        channel.basicPublish("",QUEUE_NAME,null,message.getBytes("UTF-8"));
        logger.info("message:"+message);
        logger.info(DateUtil.now() +"发送消息!");
    }

}
```


+ console

```
 INFO [main] (Producer.java:55) - message:hello world 7428
 INFO [main] (Producer.java:56) - 2023-08-15 18:29:51发送消息!
```


## 消费者

```java
import cn.hutool.core.date.DateUtil;
import cn.hutool.json.JSONUtil;
import com.rabbitmq.client.*;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.TimeUnit;

/**
 * @author : chengdu
 * @date :  2023/8/13-08
 **/
public class Consumer {
    private final static String QUEUE_NAME = "hello";
    private final Logger logger = LoggerFactory.getLogger(getClass());

    /**
     * 简单消费者
     * @throws Exception
     */
    @Test
    public void acceptConsumer() throws Exception {
        //1:创建连接池
        ConnectionFactory connectionFactory = new ConnectionFactory();
        connectionFactory.setHost("127.0.0.1");
        connectionFactory.setUsername("admin");
        connectionFactory.setPassword("123456");
        Connection connection = connectionFactory.newConnection();

        //2:创建通道(数据交换通道)
        Channel channel = connection.createChannel();
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
        channel.basicConsume(QUEUE_NAME,true,deliverCallback,cancelCallback) ;
        TimeUnit.MINUTES.sleep(2);
    }

}
```

+ console

```
 INFO [main] (Consumer.java:35) - 2023-08-15 18:29:45等待接收消息....
 INFO [pool-1-thread-4] (Consumer.java:39) - 接收时间:2023-08-15 18:29:51
 INFO [pool-1-thread-4] (Consumer.java:41) - consumerTag:amq.ctag-OjT8ALfp7GMjIIWGvZFGyw
 INFO [pool-1-thread-4] (Consumer.java:42) - properties:{"bodySize":16}
 INFO [pool-1-thread-4] (Consumer.java:43) - envelope:{}
 INFO [pool-1-thread-4] (Consumer.java:44) - message:hello world 7428
 INFO [pool-1-thread-4] (Consumer.java:45) - 
```



## maven

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.ng</groupId>
    <artifactId>rabbit-mp-hello</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>rabbit-mp-hello</name>
    <description>rabbit-mp-hello</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <!-- https://mvnrepository.com/artifact/junit/junit -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-log4j12 -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
            <version>1.7.21</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>

        <!--rabbitmq 依赖客户端-->
        <dependency>
            <groupId>com.rabbitmq</groupId>
            <artifactId>amqp-client</artifactId>
            <version>5.8.0</version>
        </dependency>
        <!--操作文件流的一个依赖-->
        <dependency>
            <groupId>commons-io</groupId>
            <artifactId>commons-io</artifactId>
            <version>2.6</version>
        </dependency>
        <dependency>
            <groupId>org.powermock</groupId>
            <artifactId>powermock-api-mockito2</artifactId>
            <version>2.0.4</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.powermock</groupId>
            <artifactId>powermock-module-junit4</artifactId>
            <version>2.0.4</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.powermock</groupId>
            <artifactId>powermock-core</artifactId>
            <version>2.0.4</version>
            <scope>test</scope>
        </dependency>
        <!-- hutool工具包 -->
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.6.3</version>
        </dependency>
        <dependency>
            <groupId>org.apache.maven</groupId>
            <artifactId>maven-plugin-api</artifactId>
            <version>2.0</version>
        </dependency>
        <dependency>
            <groupId>com.google.guava</groupId>
            <artifactId>guava</artifactId>
            <version>23.0</version>
        </dependency>
        <dependency>
            <groupId>com.google.code.gson</groupId>
            <artifactId>gson</artifactId>
            <version>2.8.2</version>
        </dependency>

        <dependency>
            <groupId>io.github.biezhi</groupId>
            <artifactId>TinyPinyin</artifactId>
            <version>2.0.3.RELEASE</version>
        </dependency>

        <dependency>
            <groupId>org.reflections</groupId>
            <artifactId>reflections</artifactId>
            <version>0.10.2</version> 
            <!--<version>0.9.11</version> 这个版本就不存在此现象-->
        </dependency>
        <!-- 数学工具 -->
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-math3</artifactId>
            <version>3.6.1</version>
        </dependency>
    </dependencies>


    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>8</source>
                    <target>8</target>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>

```