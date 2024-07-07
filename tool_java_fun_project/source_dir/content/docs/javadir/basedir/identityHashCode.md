---
title: "Java中对象内存地址"
date: 2022-10-05
draft: false
weight: 3
---


## 内存地址


### identityHashCode与真正的内存地址

> 严格来说，identityHashCode()并不指向真实的地址，关于对象的真正地址，可以参见 Java 正确获取对象内存地址的方式

```java
String s1 = new String("s1") ;
String s2 = new String("s1") ;
System.out.println(System.identityHashCode(s1));
System.out.println(System.identityHashCode(s2));
// 1688376486
// 2114664380
```

### Java 对象布局 ( JOL ) 工具

+ 首先，添加 jol-core依赖：

```xml
<dependency> 
    <groupId>org.openjdk.jol</groupId>
    <artifactId>jol-core</artifactId>
    <version>0.10</version>
</dependency>

```

+ 要在 JVM 中查找特定对象的内存地址，我们可以使用 addressOf() 方法：

```java
String answer = "s1";
System.out.println("The memory address is " + VM.current().addressOf(answer));

// The memory address is 31875131456
```

