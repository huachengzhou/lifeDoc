---
title: "ReentrantLock"
date: 2022-09-11
draft: false
weight: 6
---

# ReentrantLock

## ReentrantLock 介绍

+ ReentrantLock是Java中常用的锁，属于乐观锁类型，多线程并发情况下。能保证共享数据安全性，线程间有序性
+ ReentrantLock通过原子操作和阻塞实现锁原理，一般使用lock获取锁，unlock释放锁，
+ 下面说一下锁的基本使用和底层基本实现原理，lock和unlock底层

+ lock的时候可能被其他线程获得所，那么此线程会阻塞自己，关键原理底层用到Unsafe类的API: CAS和park

+ ReentrantLock是一个可重入的互斥锁，又被称为“独占锁”

## 简单模拟 ReentrantLock 

+ 不安全的例子

```java
public class ReentrantLockDemo1 {

    public static void main(String[] args) {

        new Thread(() -> {
            drawMoney() ;
        },"线程1").start();


        new Thread(() -> {
            drawMoney() ;
        },"线程2").start();
    }

    private static void drawMoney(){
        System.out.println(Thread.currentThread().getName()+"......"+"正在取钱!");
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("取钱完毕!");
    }
    /*
    * 线程1......正在取钱!
      线程2......正在取钱!
      取钱完毕!
      取钱完毕!
      希望线程1取钱的时候线程必须等取完才能继续取钱
    * */
}
```

+ 改造如下

```java
public class ReentrantLockDemo1 {

    public static void main(String[] args) {
        ReentrantLockService  reentrantLockService = new ReentrantLockService() ;
        new Thread(() -> {
            reentrantLockService.lock();
            drawMoney();
            reentrantLockService.unLock();
        }, "线程1").start();


        new Thread(() -> {
            reentrantLockService.lock();
            drawMoney();
            reentrantLockService.unLock();
        }, "线程2").start();
    }

    private static void drawMoney() {
        System.out.println(Thread.currentThread().getName() + "......" + "正在取钱!");
        try {
            Thread.sleep(300);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("取钱完毕!");
    }

}


class ReentrantLockService {
    private final static Unsafe unsafe = UnsafeAccessor.getUnsafe();
    private  volatile int value = 0;
    //内存偏移量地址(相对地址)
    private static long valueOffset = 0l;

   static {
       try {
           valueOffset = unsafe.objectFieldOffset(ReentrantLockService.class.getDeclaredField("value"));
       } catch (NoSuchFieldException e) {
           e.printStackTrace();
       }
   }

    public void lock() {
        while (!unsafe.compareAndSwapInt(this, valueOffset, 0, 1)) {
            System.out.println("正在加锁过程中...");
        }
        System.out.println("加锁完成...");
    }

    public void unLock() {
        value = 0;
        System.out.println("解锁完成...");
    }
}

 final class UnsafeAccessor {
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

+  使用ReentrantLock 代替我写的模拟类

```java
import java.util.concurrent.locks.ReentrantLock;

public class ReentrantLockDemo1 {

    public static void main(String[] args) {
        ReentrantLock reentrantLockService = new ReentrantLock() ;
        new Thread(() -> {
            reentrantLockService.lock();
            drawMoney();
            reentrantLockService.unlock();
        }, "线程1").start();


        new Thread(() -> {
            reentrantLockService.lock();
            drawMoney();
            reentrantLockService.unlock();
        }, "线程2").start();
    }

    private static void drawMoney() {
        System.out.println(Thread.currentThread().getName() + "......" + "正在取钱!");
        try {
            Thread.sleep(300);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("取钱完毕!");
    }

}
```


