---
title: "ask"
date: 2023-08-15
draft: false
weight: 10
---


# 应答机制

> 消费者完成一个任务可能需要一段时间，如果其中一个消费者处理一个长的任务并仅只完成
了部分突然它挂掉了，会发生什么情况。RabbitMQ 一旦向消费者传递了一条消息，便立即将该消
息标记为删除。在这种情况下，突然有个消费者挂掉了，我们将丢失正在处理的消息。以及后续
发送给该消费这的消息，因为它无法接收到。


为了保证消息在发送过程中不丢失，rabbitmq 引入消息应答机制，消息应答就是:消费者在接
收到消息并且处理该消息之后，告诉 rabbitmq 它已经处理了，rabbitmq 可以把该消息删除了。


+ Channel.basicAck(用于肯定确认)


+ Channel.basicNack(用于否定确认)


+ Channel.basicReject(用于否定确认)

与 Channel.basicNack 相比少一个参数 , 不处理该消息了直接拒绝，可以将其丢弃了


+ 一个消息没有确认并且该消费者掉线了