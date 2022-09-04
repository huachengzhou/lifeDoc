---
title: "JOL工具 "
date: 2021-04-15
draft: false
weight: 4
---

## 引入jol依赖

```maven
<dependency>
    <groupId>org.openjdk.jol</groupId>
    <artifactId>jol-core</artifactId>
    <version>0.9</version>
    <scope>provided</scope>
</dependency>
```

## 相关方法

+ 1.使用jol计算对象的大小（单位为字节）：ClassLayout.parseInstance(obj).instanceSize()

+ 2.使用jol查看对象内部的内存布局：ClassLayout.parseInstance(obj).toPrintable()

+ 3.查看对象外部信息：包括引用的对象：GraphLayout.parseInstance(obj).toPrintable()

+ 4.查看对象占用空间总大小：GraphLayout.parseInstance(obj).totalSize()

###   对象布局 空属性

```java
import org.openjdk.jol.info.ClassLayout;

public class Entity {
    public static void main(String[] args) {
        Entity entity = new Entity();
        // 打印java 对象内存布局
        System.out.println(ClassLayout.parseInstance(entity).toPrintable());
    }
}

// 输出结果
com.brown.Entity object internals: // Entity对象内存布局
 OFFSET  SIZE    TYPE DESCRIPTION                  VALUE
   0     4      (object header)         01 00 00 00 (00000001 00000000 00000000 00000000) (1)
   4     4      (object header)         00 00 00 00 (00000000 00000000 00000000 00000000) (0)
   8     4      (object header)         05 c1 00 f8 (00000101 11000001 00000000 11111000) (-134168315)
   12    4      (loss due to the next object alignment)
Instance size: 16 bytes
Space losses: 0 bytes internal + 4 bytes external = 4 bytes total
```

```shell
OFFSET：偏移地址，单位字节
SIZE：占用的内存大小，单位为字节
TYPE DESCRIPTION： 类型描述，其中object header为对象头；
object header：对象头
loss due to the next object alignment：由于下一个对象对齐而导致的丢失（有4Byte是对齐的字节（因为在64位虚拟机上对象的大小必须是8的倍数）,由于这个对象里面没有任何字段，故而对象的实例数据为0Byte）。
VALUE : 对应内存中当前存储的值；
Instance size：实例字节数值大小（**此处一个空的java对象（不包含任意字段属性）实例，其实例大小为``16Byte**）
```

### 对象布局 有属性

```java
/**
 * 带有属性的 实体类
 */
public class Student {
    private String name;
    private Integer age;
}

public class DemoT1 {
    public static void main(String[] args) {
        Student o = new Student();
        System.out.println(ClassLayout.parseInstance(o).toPrintable());
    }
}

```

```shell
// 输出结果（默认开启指针压缩）：
com.tool.thread.Student object internals:
 OFFSET  SIZE                TYPE DESCRIPTION                               VALUE
      0     4                     (object header)                           01 00 00 00 (00000001 00000000 00000000 00000000) (1)
      4     4                     (object header)                           00 00 00 00 (00000000 00000000 00000000 00000000) (0)
      8     4                     (object header)                           43 c1 00 f8 (01000011 11000001 00000000 11111000) (-134168253)
     12     4    java.lang.String Student.name                              null
     16     4   java.lang.Integer Student.age                               null
     20     4                     (loss due to the next object alignment)
Instance size: 24 bytes
Space losses: 0 bytes internal + 4 bytes external = 4 bytes total
```

### 对象布局大体由三部分构成

+ 对象头【对象头的前64位(8byte)是MarkWord，后32位(4byte)是类的元数据指针（开启指针压缩）。】
+ 实例数据
+ 字节对齐（可有可无，若对象头加上实例数据是8的倍数时，则不存在字节对齐）

## mark word (对象头的描述)

> mark word用于存储对象的运行时记录信息，如哈希值、GC分代年龄、锁状态标志、线程持有的锁、偏向线程ID、偏向时间戳等

+ Hotspot 64位实现

![][imgA]
![][imgA_]

+ Hotspot 32位实现

![][imgB]
![][imgB_]

+ mark word中锁状态描述（根据后三位判断）

| 偏向锁位 1bit（是否偏向锁）     |  锁标志位 2bit  |      锁状态        |
|  :-----: |    :----:  |               :----:                    |
|     0    |    01     |                        无锁态(new)        |
|     1    |    01    |                                偏向锁        |
|          |    00    |      轻量级锁（自旋锁、无锁、自适应自旋锁）        |
|          |    10    |                    重量级锁                  |
|          |    11    |                    GC 标记                  |


+ hotspot中对于对象头的描述

```c
//  32 bits:  32位操作系统
//  --------
//             hash:25 ------------>| age:4    biased_lock:1 lock:2 (normal object)
//             JavaThread*:23 epoch:2 age:4    biased_lock:1 lock:2 (biased object)
//             size:32 ------------------------------------------>| (CMS free block)
//             PromotedObject*:29 ---------->| promo_bits:3 ----->| (CMS promoted object)
//
//  64 bits:  64位操作系统
//  --------
//  unused:25 hash:31 -->| unused:1   age:4    biased_lock:1 lock:2 (normal object)  // 无锁
//  JavaThread*:54 epoch:2 unused:1   age:4    biased_lock:1 lock:2 (biased object)  // 偏向锁
//  PromotedObject*:61 --------------------->| promo_bits:3 ----->| (CMS promoted object) // 轻量级锁、重量级锁
//  size:64 ----------------------------------------------------->| (CMS free block) 总长度

```

+ 64位操作系统的对象头的描述翻译如下

```c
|--------------------------------------------------------------------------------------------------------------------------------------|

​ Object Header (128 bits)

|--------------------------------------------------------------------------------------------------------------------------------------|

| Mark Word (64 bits) | Klass Word (64 bits) |默认开启指针压缩(32bits) |--------------------------------------------------------------------------------------------------------------------------------------|
|unused:25|identity_hashcode:31(56) | unused:1 | age:4 | biased_lock:1 | lock:2 | OOP to metadata object | 无锁
|--------------------------------------------------------------------------------------------------------------------------------------|
|thread:54 | epoch:2 | unused:1 | age:4 | biased_lock:1 | lock:2 | OOP to metadata object | 偏向锁
|---------------------------------------------------------------------|----------------------------------------------------------------|
| ptr_to_lock_record:62 | lock:2 | OOP to metadata object | 轻量锁
|--------------------------------------------------------------------------------------------------------------------------------------|
| ptr_to_heavyweight_monitor:62 | lock:2 | OOP to metadata object | 重量锁
|------------------------------------------------------------------------------------------------------------|
| | lock:2 | OOP to metadata object | GC
|--------------------------------------------------------------------------------------------------------------------------------------|
```


+ [32位操作系统的对象头信息](https://zhangboyi.blog.csdn.net/article/details/91492985?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-1.control)



## 以 mark word 变化调试线程锁升级过程


### 无锁 -> 偏向锁


```java
package com.tool.thread;

import org.openjdk.jol.info.ClassLayout;

public class SynchronizedTest1 {
    public static void main(String[] args) throws Exception {
        runA() ;
    }
    public static void runA()throws Exception{
            System.out.println("run...................");
            //偏向锁
            long millis = 5000;
            //偏向锁 默认4秒后开启
            Thread.sleep(millis);
            System.out.println(String.format("休眠%s秒结束",String.valueOf(millis/1000)));
            Student student = new Student();
            System.out.println("当偏向锁可以使用的时候,对象头的mark word默认写入的就是首先使用偏向锁标识符");
            System.out.println("带偏向锁标识符的对象头的描述");
            System.out.println(ClassLayout.parseInstance(student).toPrintable());
            synchronized (student) {
                System.out.println("对象头的mark word写入了线程相关数据(如线程id)");
                System.out.println(ClassLayout.parseInstance(student).toPrintable());
            }
            System.out.println("结束!偏向锁线程执行完毕后不会立即移除对象头里面包含偏向锁的信息而是等到某个全局安全点系统在判断是否继续偏向锁");
            System.out.println(ClassLayout.parseInstance(student).toPrintable());
        }
}
```


```shell
run...................
休眠5秒结束
当偏向锁可以使用的时候,对象头的mark word默认写入的就是首先使用偏向锁标识符
带偏向锁标识符的对象头的描述
com.tool.thread.Student object internals:
 OFFSET  SIZE                TYPE DESCRIPTION                               VALUE
      0     4                     (object header)                           05 00 00 00 (00000101 00000000 00000000 00000000) (5)
      4     4                     (object header)                           00 00 00 00 (00000000 00000000 00000000 00000000) (0)
      8     4                     (object header)                           43 c1 00 f8 (01000011 11000001 00000000 11111000) (-134168253)
     12     4    java.lang.String Student.name                              null
     16     4   java.lang.Integer Student.age                               null
     20     4                     (loss due to the next object alignment)
Instance size: 24 bytes
Space losses: 0 bytes internal + 4 bytes external = 4 bytes total

//下面两行表示的是mark word
      0     4                     (object header)                           05 00 00 00 (00000101 00000000 00000000 00000000) (5)
      4     4                     (object header)                           00 00 00 00 (00000000 00000000 00000000 00000000) (0)
// 元数据指针
      8     4                     (object header)                           43 c1 00 f8 (01000011 11000001 00000000 11111000) (-134168253)
// 00000101 就是8位的锁年代和锁标识符所占

对象头的mark word写入了线程相关数据(如线程id)
com.tool.thread.Student object internals:
 OFFSET  SIZE                TYPE DESCRIPTION                               VALUE
      0     4                     (object header)                           05 b0 c5 be (00000101 10110000 11000101 10111110) (-1094340603)
      4     4                     (object header)                           1c 02 00 00 (00011100 00000010 00000000 00000000) (540)
      8     4                     (object header)                           43 c1 00 f8 (01000011 11000001 00000000 11111000) (-134168253)
     12     4    java.lang.String Student.name                              null
     16     4   java.lang.Integer Student.age                               null
     20     4                     (loss due to the next object alignment)
Instance size: 24 bytes
Space losses: 0 bytes internal + 4 bytes external = 4 bytes total

//00000101 00000000 00000000 00000000 => 00000101 10110000 11000101 10111110  || 00000000 00000000 00000000 00000000 => 00011100 00000010 00000000 00000000 线程锁相关信息写入到mark word中了

结束!偏向锁线程执行完毕后不会立即移除对象头里面包含偏向锁的信息而是等到某个全局安全点系统在判断是否继续偏向锁
com.tool.thread.Student object internals:
 OFFSET  SIZE                TYPE DESCRIPTION                               VALUE
      0     4                     (object header)                           05 b0 c5 be (00000101 10110000 11000101 10111110) (-1094340603)
      4     4                     (object header)                           1c 02 00 00 (00011100 00000010 00000000 00000000) (540)
      8     4                     (object header)                           43 c1 00 f8 (01000011 11000001 00000000 11111000) (-134168253)
     12     4    java.lang.String Student.name                              null
     16     4   java.lang.Integer Student.age                               null
     20     4                     (loss due to the next object alignment)
Instance size: 24 bytes
Space losses: 0 bytes internal + 4 bytes external = 4 bytes total
//同步块执行完毕 并没有立即清除对象头里面的偏向锁相关标识符
```

### 无锁 ->  轻量级锁

```java
import org.openjdk.jol.info.ClassLayout;

public class SynchronizedTest1 {
    public static void main(String[] args) throws Exception {
        runB() ;
    }
    public static void runB()throws Exception{
        //注意:-XX:BiasedLockingStartupDelay=0 改了偏向锁的启动时间那么也是达不到我们说的效果的
        //在4秒以前  创建的对象 对象头默认写入的是轻量级锁标识 只是没有写入线程相关和同步锁信息等
        Student tempStudent = new Student();
        System.out.println(ClassLayout.parseInstance(tempStudent).toPrintable());
        synchronized (tempStudent) {
            System.out.println(ClassLayout.parseInstance(tempStudent).toPrintable());
        }
        System.out.println(ClassLayout.parseInstance(tempStudent).toPrintable());
    }
}

```

```shell
//属于轻量级锁但是没有写入线程和同步相关数据
com.tool.thread.Student object internals:
 OFFSET  SIZE                TYPE DESCRIPTION                               VALUE
      0     4                     (object header)                           01 00 00 00 (00000001 00000000 00000000 00000000) (1)
      4     4                     (object header)                           00 00 00 00 (00000000 00000000 00000000 00000000) (0)
      8     4                     (object header)                           43 c1 00 f8 (01000011 11000001 00000000 11111000) (-134168253)
     12     4    java.lang.String Student.name                              null
     16     4   java.lang.Integer Student.age                               null
     20     4                     (loss due to the next object alignment)
Instance size: 24 bytes
Space losses: 0 bytes internal + 4 bytes external = 4 bytes total
//属于轻量级锁已经写入线程和同步相关数据
com.tool.thread.Student object internals:
 OFFSET  SIZE                TYPE DESCRIPTION                               VALUE
      0     4                     (object header)                           98 f6 7f 3b (10011000 11110110 01111111 00111011) (998241944)
      4     4                     (object header)                           2b 00 00 00 (00101011 00000000 00000000 00000000) (43)
      8     4                     (object header)                           43 c1 00 f8 (01000011 11000001 00000000 11111000) (-134168253)
     12     4    java.lang.String Student.name                              null
     16     4   java.lang.Integer Student.age                               null
     20     4                     (loss due to the next object alignment)
Instance size: 24 bytes
Space losses: 0 bytes internal + 4 bytes external = 4 bytes total
//执行完毕 Displaced Mark Word(将标识符同步加锁和线程相关移除并改为默认的标识符)  执行完毕后依旧是轻量级标识符 
com.tool.thread.Student object internals:
 OFFSET  SIZE                TYPE DESCRIPTION                               VALUE
      0     4                     (object header)                           01 00 00 00 (00000001 00000000 00000000 00000000) (1)
      4     4                     (object header)                           00 00 00 00 (00000000 00000000 00000000 00000000) (0)
      8     4                     (object header)                           43 c1 00 f8 (01000011 11000001 00000000 11111000) (-134168253)
     12     4    java.lang.String Student.name                              null
     16     4   java.lang.Integer Student.age                               null
     20     4                     (loss due to the next object alignment)
Instance size: 24 bytes
Space losses: 0 bytes internal + 4 bytes external = 4 bytes total
//001 -> 000 -> 001
```

### 无锁 -> 偏向锁 -> 轻量级锁

```java
import org.openjdk.jol.info.ClassLayout;
public class SynchronizedTest1 {
    public static void main(String[] args) throws Exception {
        runC() ;
    }

    public static void runC()throws Exception{
        System.out.println("run...................");
        //偏向锁
        long millis = 5000;
        //偏向锁 默认4秒后开启
        Thread.sleep(millis);
        Student student = new Student();
        System.out.println(ClassLayout.parseInstance(student).toPrintable());

        synchronized (student) {
            System.out.println("偏向锁");
            System.out.println(ClassLayout.parseInstance(student).toPrintable());
        }
        Thread thread = new Thread(() -> {
            synchronized (student) {
                System.out.println("轻量级锁");
                System.out.println(ClassLayout.parseInstance(student).toPrintable());
            }
        });

        thread.start();
        thread.join();


        System.out.println(ClassLayout.parseInstance(student).toPrintable());
    }
}
```

```shell
run...................
com.tool.thread.Student object internals:
 OFFSET  SIZE                TYPE DESCRIPTION                               VALUE
      0     4                     (object header)                           05 00 00 00 (00000101 00000000 00000000 00000000) (5)
      4     4                     (object header)                           00 00 00 00 (00000000 00000000 00000000 00000000) (0)
      8     4                     (object header)                           92 d7 00 f8 (10010010 11010111 00000000 11111000) (-134162542)
     12     4    java.lang.String Student.name                              null
     16     4   java.lang.Integer Student.age                               null
     20     4                     (loss due to the next object alignment)
Instance size: 24 bytes
Space losses: 0 bytes internal + 4 bytes external = 4 bytes total

偏向锁
com.tool.thread.Student object internals:
 OFFSET  SIZE                TYPE DESCRIPTION                               VALUE
      0     4                     (object header)                           05 d8 88 7c (00000101 11011000 10001000 01111100) (2089342981)
      4     4                     (object header)                           3d 02 00 00 (00111101 00000010 00000000 00000000) (573)
      8     4                     (object header)                           92 d7 00 f8 (10010010 11010111 00000000 11111000) (-134162542)
     12     4    java.lang.String Student.name                              null
     16     4   java.lang.Integer Student.age                               null
     20     4                     (loss due to the next object alignment)
Instance size: 24 bytes
Space losses: 0 bytes internal + 4 bytes external = 4 bytes total

轻量级锁
com.tool.thread.Student object internals:
 OFFSET  SIZE                TYPE DESCRIPTION                               VALUE
      0     4                     (object header)                           f0 ef 8f 15 (11110000 11101111 10001111 00010101) (361754608)
      4     4                     (object header)                           a1 00 00 00 (10100001 00000000 00000000 00000000) (161)
      8     4                     (object header)                           92 d7 00 f8 (10010010 11010111 00000000 11111000) (-134162542)
     12     4    java.lang.String Student.name                              null
     16     4   java.lang.Integer Student.age                               null
     20     4                     (loss due to the next object alignment)
Instance size: 24 bytes
Space losses: 0 bytes internal + 4 bytes external = 4 bytes total

com.tool.thread.Student object internals:
 OFFSET  SIZE                TYPE DESCRIPTION                               VALUE
      0     4                     (object header)                           01 00 00 00 (00000001 00000000 00000000 00000000) (1)
      4     4                     (object header)                           00 00 00 00 (00000000 00000000 00000000 00000000) (0)
      8     4                     (object header)                           92 d7 00 f8 (10010010 11010111 00000000 11111000) (-134162542)
     12     4    java.lang.String Student.name                              null
     16     4   java.lang.Integer Student.age                               null
     20     4                     (loss due to the next object alignment)
Instance size: 24 bytes
Space losses: 0 bytes internal + 4 bytes external = 4 bytes total
偏向锁 -> 偏向锁标识加锁 -> 轻量级锁 -> 无锁状态
101 ->  101 -> 00 -> 01
```


### 无锁 -> 偏向锁 -> 轻量级锁 -> 重量级锁

+ 重量级锁在轻量级锁级别达到后如果满足重量级锁情况继续升级

```java
import org.openjdk.jol.info.ClassLayout;

public class SynchronizedTest1 {
    public static void main(String[] args) throws Exception {
        runD() ;
    }

    public static void runD()throws Exception{
        System.out.println("run...................");
        //偏向锁
        long millis = 5000;
        //偏向锁 默认4秒后开启
        Thread.sleep(millis);
        Student student = new Student();
        System.out.println(ClassLayout.parseInstance(student).toPrintable());

        synchronized (student) {
            System.out.println("偏向锁");
            System.out.println(ClassLayout.parseInstance(student).toPrintable());
        }
        Thread thread = new Thread(() -> {
            synchronized (student) {
                System.out.println("轻量级锁(threadA不启动的情况)");
                System.out.println(ClassLayout.parseInstance(student).toPrintable());
                try {
                    //让线程晚点儿死亡，造成锁的竞争
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        Thread threadA = new Thread(() -> {
            synchronized (student) {
                System.out.println("重量级锁");
                System.out.println(ClassLayout.parseInstance(student).toPrintable());
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        thread.start();
        threadA.start();//注释后  thread中的对象标识符是轻量级锁
    }
}
```

```shell
run...................
com.tool.thread.Student object internals:
 OFFSET  SIZE                TYPE DESCRIPTION                               VALUE
      0     4                     (object header)                           05 00 00 00 (00000101 00000000 00000000 00000000) (5)
      4     4                     (object header)                           00 00 00 00 (00000000 00000000 00000000 00000000) (0)
      8     4                     (object header)                           92 d7 00 f8 (10010010 11010111 00000000 11111000) (-134162542)
     12     4    java.lang.String Student.name                              null
     16     4   java.lang.Integer Student.age                               null
     20     4                     (loss due to the next object alignment)
Instance size: 24 bytes
Space losses: 0 bytes internal + 4 bytes external = 4 bytes total

偏向锁
com.tool.thread.Student object internals:
 OFFSET  SIZE                TYPE DESCRIPTION                               VALUE
      0     4                     (object header)                           05 c0 fa 43 (00000101 11000000 11111010 01000011) (1140506629)
      4     4                     (object header)                           1d 01 00 00 (00011101 00000001 00000000 00000000) (285)
      8     4                     (object header)                           92 d7 00 f8 (10010010 11010111 00000000 11111000) (-134162542)
     12     4    java.lang.String Student.name                              null
     16     4   java.lang.Integer Student.age                               null
     20     4                     (loss due to the next object alignment)
Instance size: 24 bytes
Space losses: 0 bytes internal + 4 bytes external = 4 bytes total

轻量级锁(threadA不启动的情况)
com.tool.thread.Student object internals:
 OFFSET  SIZE                TYPE DESCRIPTION                               VALUE
      0     4                     (object header)                           4a 56 b9 5e (01001010 01010110 10111001 01011110) (1589204554)
      4     4                     (object header)                           1d 01 00 00 (00011101 00000001 00000000 00000000) (285)
      8     4                     (object header)                           92 d7 00 f8 (10010010 11010111 00000000 11111000) (-134162542)
     12     4    java.lang.String Student.name                              null
     16     4   java.lang.Integer Student.age                               null
     20     4                     (loss due to the next object alignment)
Instance size: 24 bytes
Space losses: 0 bytes internal + 4 bytes external = 4 bytes total

重量级锁
com.tool.thread.Student object internals:
 OFFSET  SIZE                TYPE DESCRIPTION                               VALUE
      0     4                     (object header)                           4a 56 b9 5e (01001010 01010110 10111001 01011110) (1589204554)
      4     4                     (object header)                           1d 01 00 00 (00011101 00000001 00000000 00000000) (285)
      8     4                     (object header)                           92 d7 00 f8 (10010010 11010111 00000000 11111000) (-134162542)
     12     4    java.lang.String Student.name                              null
     16     4   java.lang.Integer Student.age                               null
     20     4                     (loss due to the next object alignment)
Instance size: 24 bytes
Space losses: 0 bytes internal + 4 bytes external = 4 bytes total
101 -> 101 -> 10 -> 10
```

### 锁升级所有源码

```java
import org.openjdk.jol.info.ClassLayout;

public class SynchronizedTest1 {
    public static void main(String[] args) throws Exception {
        runD() ;
    }

    /**
     * 无锁 -> 偏向锁 -> 轻量级锁 -> 重量级锁
     * @throws Exception
     */
    public static void runD()throws Exception{
        System.out.println("run...................");
        //偏向锁
        long millis = 5000;
        //偏向锁 默认4秒后开启
        Thread.sleep(millis);
        Student student = new Student();
        System.out.println(ClassLayout.parseInstance(student).toPrintable());

        synchronized (student) {
            System.out.println("偏向锁");
            System.out.println(ClassLayout.parseInstance(student).toPrintable());
        }
        Thread thread = new Thread(() -> {
            synchronized (student) {
                System.out.println("轻量级锁(threadA不启动的情况)");
                System.out.println(ClassLayout.parseInstance(student).toPrintable());
                try {
                    //让线程晚点儿死亡，造成锁的竞争
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        Thread threadA = new Thread(() -> {
            synchronized (student) {
                System.out.println("重量级锁");
                System.out.println(ClassLayout.parseInstance(student).toPrintable());
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        thread.start();
        threadA.start();//注释后  thread中的对象标识符是轻量级锁
    }

    /**
     * 无锁 -> 偏向锁 -> 轻量级锁
     * @throws Exception
     */
    public static void runC()throws Exception{
        System.out.println("run...................");
        //偏向锁
        long millis = 5000;
        //偏向锁 默认4秒后开启
        Thread.sleep(millis);
        Student student = new Student();
        System.out.println(ClassLayout.parseInstance(student).toPrintable());

        synchronized (student) {
            System.out.println("偏向锁");
            System.out.println(ClassLayout.parseInstance(student).toPrintable());
        }
        Thread thread = new Thread(() -> {
            synchronized (student) {
                System.out.println("轻量级锁");
                System.out.println(ClassLayout.parseInstance(student).toPrintable());
            }
        });

        thread.start();
        thread.join();

        System.out.println(ClassLayout.parseInstance(student).toPrintable());
    }

    /**
     * 轻量级锁
     * @throws Exception
     */
    public static void runB()throws Exception{
        //在4秒以前  创建的对象 对象头默认写入的是轻量级锁标识 只是没有写入线程相关和同步锁信息等
        Student tempStudent = new Student();
        System.out.println(ClassLayout.parseInstance(tempStudent).toPrintable());
        synchronized (tempStudent) {
            System.out.println(ClassLayout.parseInstance(tempStudent).toPrintable());
        }
        System.out.println(ClassLayout.parseInstance(tempStudent).toPrintable());
    }

    /**
     * 偏向锁
     * @throws Exception
     */
    public static void runA()throws Exception{
        System.out.println("run...................");
        long millis = 5000;
        //偏向锁 默认4秒后开启
        Thread.sleep(millis);
        System.out.println(String.format("休眠%s秒结束",String.valueOf(millis/1000)));
        Student student = new Student();
        System.out.println("当偏向锁可以使用的时候,对象头的mark word默认写入的就是首先使用偏向锁标识符");
        System.out.println("带偏向锁标识符的对象头的描述");
        System.out.println(ClassLayout.parseInstance(student).toPrintable());

        synchronized (student) {
            System.out.println("对象头的mark word写入了线程相关数据(如线程id)");
            System.out.println(ClassLayout.parseInstance(student).toPrintable());
        }
        System.out.println("结束!偏向锁线程执行完毕后不会立即移除对象头里面包含偏向锁的信息而是等到某个全局安全点系统在判断是否继续偏向锁");

        System.out.println(ClassLayout.parseInstance(student).toPrintable());
    }
}
```

+ [文章参考1](https://blog.csdn.net/weixin_44349870/article/details/124537260)
+ [文章参考2](https://www.cnblogs.com/LemonFive/p/11246086.html)


[imgA]:../.././imgs/java/thread/f93288a0ce12bb7e84ebee2dda5b1df6.png
[imgA_]:../../../imgs/java/thread/f93288a0ce12bb7e84ebee2dda5b1df6.png

[imgB]:../.././imgs/java/thread/33bfc4f92adcad8e47b4a30fea50e990.png
[imgB_]:../../../imgs/java/thread/33bfc4f92adcad8e47b4a30fea50e990.png