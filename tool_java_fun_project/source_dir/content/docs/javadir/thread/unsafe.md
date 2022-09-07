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

+ CAS在java并发包中的原子类如AtomicInteger，AQS(AbstractQueuedSynchronizer)，ConcurrentHashMap等实现中都有广泛的使用

```java
public class AtomicInteger extends Number implements java.io.Serializable {
    private static final long serialVersionUID = 6214790243416807050L;

    // setup to use Unsafe.compareAndSwapInt for updates
    private static final Unsafe unsafe = Unsafe.getUnsafe();
    private static final long valueOffset;

    static {
        try {
            valueOffset = unsafe.objectFieldOffset
                (AtomicInteger.class.getDeclaredField("value"));
        } catch (Exception ex) { throw new Error(ex); }
    }

    private volatile int value;
}
```
https://www.cnblogs.com/strongmore/p/15468423.html#autoid-3-0-0
[imgA]:../.././imgs/java/thread/1681090-20211026230440119-1167642149.png
[imgA_]:../../../imgs/java/thread/1681090-20211026230440119-1167642149.png
