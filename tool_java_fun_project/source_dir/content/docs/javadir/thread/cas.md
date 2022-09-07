---
title: "cas"
date: 2022-09-01
draft: false
weight: 3
---

## 概念

+ CAS即Compare and Swap，是基于硬件级别的指令实现的同步原语，Java并发包java.utile.concurrent许多同步类基于CAS构建，因此可见CAS的重要性

## 模拟

+ 有安全问题的一段code

```java
public class Demo1 {

    public static void main(String[] args) throws Exception {
        long startTime = System.currentTimeMillis();
        Demo_B demo_b = new Demo_B();
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


class Demo_B {
    private int number = 0;

    public void increase() {
        number++;
    }

    public int getNumber() {
        return this.number;
    }
}
```

+ run print result

```shell
14023046
time:58
```

+ 在不改变代码顺序的情况下通过对Demo_B的实例方法进行同步加锁操作

```java
class Demo_B {
    private int number = 0;

    public synchronized void increase() {
        number++;
    }

    public int getNumber() {
        return this.number;
    }
}
```

+ run print result

```shell
20000000
time:615
```

+ 通过 AtomicInteger 改造

```java
class Demo_B {
    AtomicInteger atomicInteger = new AtomicInteger(0);

    public void increase() {
        atomicInteger.incrementAndGet();
    }

    public int getNumber() {
        return atomicInteger.get();
    }
}
```

```shell
20000000
time:271
```

+ 使用 AtomicInteger 自己实现incrementAndGet

```java
class Demo_B {
   final AtomicInteger atomicInteger = new AtomicInteger(0);

    public void increase() {
        int oldValue = 0;
        do {
            oldValue = atomicInteger.get();
        } while (!atomicInteger.compareAndSet(oldValue , oldValue+1));
    }

    public int getNumber() {
        return atomicInteger.get();
    }
}
```

```shell
20000000
time:605
-- 自己搞的时间还多了些 我猜是AtomicInteger的incrementAndGet已经内置了以后  执行会比我目前的运行量少 虽然它也是调用compareAndSet
```

+ Unsafe 方法介绍

```java
 /**
 * @param var1: 那个对象
 *@param var2: 对象中的域的位置
 *@param var3 : 需要比较的值
 *@param var4 : 设置之后的值
 */
public final native boolean compareAndSwapInt(Object var1, long var2, int var4, int var5)
 public final native boolean compareAndSwapObject(Object var1, long var2, Object var4, Object var5)
 public final native boolean compareAndSwapLong(Object var1, long var2, long var4, long var6)
 //var1：要修改的对象起始地址 如：0x00000111
 //var2：需要修改的具体内存地址 如100 。0x0000011+100 = 0x0000111就是要修改的值的地址
 //注意没有var3
 //var4：期望内存中的值，拿这个值和0x0000111内存中的中值比较，如果为true，则修改，返回ture,否则返回false，等待下次修改。
 //var5：如果上一步比较为ture，则把var5更新到0x0000111其实的内存中。
 //原子操作，直接操作内存。
```

+ 使用Unsafe 改造

```java
class Demo_B2 {
    //jdk级别代码才能这样  因为这个级别的会涉及到绕过jvm所以得另寻出路
    final Unsafe unsafe = Unsafe.getUnsafe();
    private volatile int value = 0;

    public void increase() {
        int oldValue = 0;
        long valueOffset = 0l;
        do {
            try {
                valueOffset = unsafe.objectFieldOffset(this.getClass().getField("value"));
            } catch (NoSuchFieldException e) {
                e.printStackTrace();
            }
        } while (!unsafe.compareAndSwapInt(this, valueOffset, oldValue, oldValue + 1));
    }

    public int getNumber() {
        return value;
    }
}
```

+ 执行直接报错

```shell
Exception in thread "main" java.lang.SecurityException: Unsafe
	at sun.misc.Unsafe.getUnsafe(Unsafe.java:90)
	
-- unsafe 提供了非常底层，操作内存，线程的方法,unsafe 对象不能直接获取，只能通过反射获取
```
+ 使用Unsafe 改造(修正后)

```java
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

final class UnsafeAccessor {
    private static Unsafe unsafe;

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


+ 使用LongAdder 改造

```java
//分段处理
 /**
     * Adds the given value.
     *
     * @param x the value to add
     */
    public void add(long x) {
        Cell[] as; long b, v; int m; Cell a;
        if ((as = cells) != null || !casBase(b = base, b + x)) {
            boolean uncontended = true;
            if (as == null || (m = as.length - 1) < 0 ||
                (a = as[getProbe() & m]) == null ||
                !(uncontended = a.cas(v = a.value, v + x)))
                longAccumulate(x, null, uncontended);
        }
    }
```

```java
import java.util.concurrent.atomic.LongAdder;

public class Demo3 {

    public static void main(String[] args) throws Exception {
        long startTime = System.currentTimeMillis();
        Demo_B3 demo_b = new Demo_B3();
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


class Demo_B3 {
    private volatile int value = 0;
    private LongAdder longAdder = new LongAdder() ;

    public void increase() {
        longAdder.increment();
    }

    public int getNumber() {
        return longAdder.intValue();
    }
}
```