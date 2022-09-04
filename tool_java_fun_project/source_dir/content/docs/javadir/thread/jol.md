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

### 空属性  对象布局

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
