---
title: "Java8 流式数据处理 短介绍"
date: 2022-10-05
draft: false
weight: 8
---



## 一:流介绍
+ 流表面上看起来和集合很类似，都可以让我们转换和获取数据。但是，它们之间存在着显著的差异;
+ 1:流并不能存储元素，这些元素可能存储在底层的集合中,或者是按需生成的
+ 2:流的操作不会修改其数据源。例如filter方法不会从新的流移除元素，而是会生成一个新的流，其中不包含被过滤掉的元素。
+ 3:流的操作是尽可能的惰性的。这意味着直至需要其结果时，操作才会执行。

![][img3]
![][img3_]


```
流机器（动画来自 Tagir Valeev）
Stream的效果就像上图展示的它可以先把数据变成符合要求的样子（map），吃掉不需要的东西（filter）然后得到需要的东西（collect）。
```

+ 流API UML

![][img5]
![][img5_]

## 二:流创建


| 说明     |  示 例  |
| :-----: | :----:  |
| 创建不包括任何元素的流     | Stream stream = Stream.empty()  |
| of方法具有可变长参数,因此我们可以构建具有任意数量引元的流       |   Stream<String> song = Stream.of("gently" ,"down","the","stream");或者Stream<String> song = Stream.of("stream");        |
| Stream一共有2个创建无限流的静态方法     |        generate()和iterate()             |
| generate方法会接受一个不包含任何引元的函数 |   Stream<String> stream = Stream.generate(() -> UUID.randomUUID().toString())或者Stream<String> stream = Stream.generate(() -> UUID.randomUUID().toString()).limit(20);//20个    |


[img3]:../.././imgs/java/stream/fuse.svg
[img3_]:../../../imgs/java/stream/fuse.svg


[img5]:../.././imgs/java/stream/webp.png
[img5_]:../../../imgs/java/stream/webp.png