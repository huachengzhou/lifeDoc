---
title: "nio"
date: 2022-10-05
draft: false
weight: 2
---


# Java NIO 简介


## 1、简介

> Java NIO（New IO）是从 Java 1.4 版本开始引入的一个新的 IO API，可以替代标准的 Java IO API。
NIO 与原来的 IO 有同样的作用和目的，但是使用方式完全不同，NIO 支持面向缓冲区的、基于通道的 IO 操作。
NIO 将以更加高效的方式进行文件的读写操作。



## 2、NIO 与 IO 的区别

| IO | NIO |
| --- | --- |
| 面向流 | 面向缓冲 |
| 阻塞IO | 非阻塞IO |
| 无 | 选择器 |

# 二、NIO 重要知识点详细介绍


## 1、通道和缓冲区

Java NIO 系统的核心在于：通道（Channel）和缓冲区（Buffer）。通道表示打开到 IO 设备（例如：文件、套接字）的连接。
若需要使用 NIO 系统，需要获取用于连接 IO 设备的通道以及用于容纳数据的缓冲区。然后操作缓冲区，对数据进行处理。简而言之，Channel 负责传输，Buffer 负责存储



## 2、面向流和面向缓冲区解释

### 传统 IO 流

### NIO

## 3、缓冲区的数据存取

缓冲区（Buffer）：一个用于特定基本数据类型的容器。由 java.nio 包定义的，所有缓冲区都是 Buffer 抽象类的子类。


### 1、缓冲区的类型

> 缓冲区（Buffer）：在 Java NIO 中负责数据的存取。缓冲区就是数组。用于存储不同类型的数据。根据数据类型的不同（boolean 除外），提供了相应类型的缓冲区：

+ ByteBuffer
+ CharBuffer
+ ShortBuffer
+ IntBuffer
+ LongBuffer
+ FloatBuffer
+ DoubleBuffer

上述缓冲区管理方式几乎一致，都是通过 allocate() 来获取缓冲区


### 2、缓冲区存取数据的两个核心方法

* put():存入数据到缓冲区中
* get():获取缓冲区中的数据

### 3、缓冲区中的四个核心属性

* capacity: 容量，表示缓冲区中最大存储数据的容量。一旦声明不能更改。
* limit: 界限，表示缓冲区中可以操作数据的大小。（limit 后的数据不能进行读写）
* position: 位置，表示缓冲区中正在操作数据的位置。
* mark: 标记，表示记录当前 position 的位置。可以通过 reset() 恢复到 mark 的位置。

+ 注： 0 <= mark <= position <= limit <= capacity










[参考](https://zhuanlan.zhihu.com/p/369062109)