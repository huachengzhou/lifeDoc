---
title: "unsafe"
date: 2022-09-06
draft: false
weight: 5
---


# 前言

+ Unsafe类位于sun.misc包下，它是java实现高并发的基础，通过它可以执行一些不安全的操作，如像C语言一样直接操作内存资源，它提供的这些方法增强了java对底层资源的操作能力，但同时也增加了程序出错的风险，所以对它的使用一定要慎重

# 核心功能介绍


![][imgA]
![][imgA_]

+ Unsafe提供的API大致可分为内存操作、CAS、Class相关、对象操作、线程调度、系统信息获取、内存屏障相关、数组相关等。下面介绍几个方法的使用。

# 获取Unsafe对象

```java
import sun.misc.Unsafe;
import java.lang.reflect.Field;

public final class UnsafeAccessor {
    private static Unsafe unsafe;
    //Unsafe提供的getUnsafe()方法只能被根类加载器加载的类所调用，也就是jdk内部的类。我们可以通过反射来获取Unsafe对象
    static {
        try {
            //这个名字是 theUnsafe 里面的不要随便写
            Field unsafeFile = Unsafe.class.getDeclaredField("theUnsafe");
            unsafeFile.setAccessible(true);
            //因为是静态属性
            unsafe = (Unsafe) unsafeFile.get(null);
        } catch (Exception e) {
        }
    }

    public static Unsafe getUnsafe() {
        return unsafe;
    }
}
```
# AtomicInteger实现

+ 在AtomicInteger的实现中，静态属性valueOffset即为属性value的内存偏移地址，在静态代码块中通过Unsafe的objectFieldOffset方法对valueOffset赋值。在AtomicInteger中提供的线程安全方法中，通过属性valueOffset可以定位到属性value的内存地址，从而可以根据CAS实现对value属性的原子操作。

![][imgB]
![][imgB_]

+ 上图为某个AtomicInteger对象自增操作前后的内存示意图，对象的基地址baseAddress=“0x110000”，通过baseAddress+valueOffset得到value的内存地址valueAddress=“0x11000c”；然后通过CAS进行原子性的更新操作，成功则返回，否则继续重试，直到更新成功为止。


# CAS

+ CAS(compareAndSwap)即比较并替换，是实现并发算法时常用到的一种技术，CAS操作包含三个参数，要修改变量的内存位置、预期原值、要修改为的值，如果变量的值和预期原值相等，就修改为新值，否则不做处理。CAS底层为一条原子指令cmpxchg，可以保证原子性，Unsafe提供的CAS方法如compareAndSwapInt底层就是CPU指令cmpxchg


```java
/**
	*  CAS
  * @param o         包含要修改field的对象
  * @param offset    对象中某field的偏移量
  * @param expected  期望值
  * @param update    更新值
  * @return          true | false
  */
public final native boolean compareAndSwapObject(Object o, long offset,  Object expected, Object update);

public final native boolean compareAndSwapInt(Object o, long offset, int expected,int update);
  
public final native boolean compareAndSwapLong(Object o, long offset, long expected, long update);
```

+ compareAndSwapInt 使用 (AtomicInteger中也是使用这个)

```java
public class Demo2 {

    public static void main(String[] args) throws Exception {
        long startTime = System.currentTimeMillis();
        Demo_B2 demo_b = new Demo_B2();
        final int len = 10000000;
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < len; i++) {
                demo_b.increase();
            }
        });

        t1.start();
        for (int i = 0; i < len; i++) {
            demo_b.increase();
        }
        t1.join();
        long endTime = System.currentTimeMillis();
        System.out.println(demo_b.getNumber());
        System.out.println(String.format("time:%s", (endTime - startTime)));
    }

}

class Demo_B2 {
    //jdk级别代码才能这样  因为这个级别的会涉及到绕过jvm所以得另寻出路
    final static Unsafe unsafe = UnsafeAccessor.getUnsafe();
    private volatile int value = 0;
    //内存偏移量地址(相对地址)
    private long valueOffset = 0l;


    public void increase() {
        if (valueOffset == 0l) {
            try {
                valueOffset = unsafe.objectFieldOffset(Demo_B2.class.getDeclaredField("value"));
            } catch (NoSuchFieldException e) {
                e.printStackTrace();
            }
        }
        int oldValue = 0;
        do {
            oldValue = value;
        } while (!unsafe.compareAndSwapInt(this, valueOffset, oldValue, oldValue + 1));
    }

    public int getNumber() {
        return value;
    }
}
```

+ compareAndSwapObject 使用

```java
import sun.misc.Unsafe;

import java.util.UUID;

public class Demo4 {
    public static void main(String[] args) throws Exception {
        long startTime = System.currentTimeMillis();
        ObjectDemo4 objectDemo4 = new ObjectDemo4();
        final int len = 200;
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < len; i++) {
                try {
                    objectDemo4.increaseName(String.valueOf(1));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

        t1.start();
        for (int i = len; i < len * 2; i++) {
            objectDemo4.increaseName(String.valueOf(1));
        }
        t1.join();
        long endTime = System.currentTimeMillis();
        System.out.println(objectDemo4.getName());
        System.out.println(objectDemo4.getName().split("-").length);
        System.out.println(String.format("time:%s", (endTime - startTime)));
    }
}

class ObjectDemo4 {
    final static Unsafe unsafe = UnsafeAccessor.getUnsafe();
    private Integer id;
    private String name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void increaseName(String value) throws Exception {
        long valueOffset = unsafe.objectFieldOffset(ObjectDemo4.class.getDeclaredField("name"));
        String oldValue = null;
        do {
            oldValue = (String) unsafe.getObject(this, valueOffset);
        } while (!unsafe.compareAndSwapObject(this, valueOffset, oldValue, oldValue == null ? value : oldValue + "-"+value));
    }

}

```

# 对象操作

+ 此部分主要包含对象成员属性相关操作及非常规的对象实例化方式等相关方法

```java
//返回对象成员属性在内存地址相对于此对象的内存地址的偏移量
public native long objectFieldOffset(Field f);
//获得给定对象的指定地址偏移量的值，与此类似操作还有：getInt，getDouble，getLong，getChar等
public native Object getObject(Object o, long offset);
//给定对象的指定地址偏移量设值，与此类似操作还有：putInt，putDouble，putLong，putChar等
public native void putObject(Object o, long offset, Object x);
//从对象的指定偏移量处获取变量的引用，使用volatile的加载语义
public native Object getObjectVolatile(Object o, long offset);
//存储变量的引用到对象的指定的偏移量处，使用volatile的存储语义
public native void putObjectVolatile(Object o, long offset, Object x);
//有序、延迟版本的putObjectVolatile方法，不保证值的改变被其他线程立即看到。只有在field被volatile修饰符修饰时有效
public native void putOrderedObject(Object o, long offset, Object x);
//绕过构造方法、初始化代码来创建对象
public native Object allocateInstance(Class<?> cls) throws InstantiationException;
```

+ 常规对象实例化方式：我们通常所用到的创建对象的方式，从本质上来讲，都是通过new机制来实现对象的创建。但是，new机制有个特点就是当类只提供有参的构造器且没有显式声明无参构造器时，必须使用有参构造器并传递相应个数的参数进行对象构造


+ 非常规的实例化方式：而Unsafe中提供的allocateInstance方法，仅通过Class对象就可以创建此类的实例对象， 而且不需要调用其构造器、初始化代码、JVM安全检查等。它抑制修饰符检测，也就是即使构造器是private修饰的也能通过此方法实例化。 由于这种特性，allocateInstance在java.lang.invoke、Objenesis（提供绕过类构造器的对象生成方式）、Gson（反序列化时用到）中都有相应的使用
            

    
            

[参考](https://www.cnblogs.com/strongmore/p/15468423.html#autoid-3-0-0)

[imgA]:../.././imgs/java/thread/1681090-20211026230440119-1167642149.png
[imgA_]:../../../imgs/java/thread/1681090-20211026230440119-1167642149.png




[imgB]:../.././imgs/java/thread/1681090-20211026230710043-1844497729.png
[imgB_]:../../../imgs/java/thread/1681090-20211026230710043-1844497729.png