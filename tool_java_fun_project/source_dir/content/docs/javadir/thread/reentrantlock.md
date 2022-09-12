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

+ 模拟类虽然简单但是 模拟了关键细节 jdk其实实现并发安全都是用一些能够调用操作系统提供的关键方法来实现的 比如c++也不能实现并发安全 也是调用能够操作操作系统的一些特殊方法来间接实现的

+ 本次是 java -> jni -> c++ -> 操作系统提供的api-> 具体指令集

## 使用

+ java.util.concurrent.locks.ReentrantLock类


+ 在多线程环境下使用，创建锁对象，调用lock()获取锁开始处理逻辑，处理完unlock()释放锁。注意使用的时候lock和unlock必须成对出现，不然可能出现死锁或者严重堵塞的情况

### unlock

```java
//创建锁对象
ReentrantLock lock = new ReentrantLock();
lock.lock(); //获取锁（锁定）
System.out.println("一段需要上锁的代码")
lock.unlock(); //锁释放
```

+ 执行完代码后，释放锁，让其他线程去获取，需要注意的是，多个线程使用的锁对象必须是同一个

> 什么情况需要上锁，就是在多线程不安全的情况下，多个线程操作同一个对象。如多个线程同时操作一个队列，offer()添加对象，两个线程同时offer，因为不是原子操作，很可能一个线程添加成功，另一个线程添加失败，延伸到一些业务中是要杜绝的问题。
> 可以用锁解决问题，我们可以定义一个队列同一时间只能被一个拿到锁的线程操作，即保证offer这种非原子操作完成后，释放锁，再让其他线程拿到锁后，才能offer，保证有序的offer，不会丢失信息

## 原理

+ ReentrantLock主要用到unsafe的CAS和park两个功能实现锁（CAS + park ）

> 多个线程同时操作一个数N，使用原子（CAS）操作，原子操作能保证同一时间只能被一个线程修改，而修改数N成功后，返回true，其他线程修改失败，返回false，
  这个原子操作可以定义线程是否拿到锁，返回true代表获取锁，返回false代表为没有拿到锁。
  拿到锁的线程，自然是继续执行后续逻辑代码，而没有拿到锁的线程，则调用park，将线程（自己）阻塞。
  线程阻塞需要其他线程唤醒，ReentrantLock中用到了链表用于存放等待或者阻塞的线程，每次线程阻塞，先将自己的线程信息放入链表尾部，再阻塞自己；之后需要拿到锁的线程，在调用unlock 释放锁时，从链表中获取阻塞线程，调用unpark 唤醒指定线程
  
  
### Unsafe

+ sun.misc.Unsafe是关键类，提供大量偏底层的API 包括CAS park

+ sun.misc.Unsafe 此类在openjdk中可以查看

### CAS 原子操作

+ compare and swapz(CAS)比较并交换，是原子性操作，
+ 原理：当修改一个(内存中的)变量o的值N的时候，首先有个期望值expected，和一个更新值x，先比较N是否等于expected，等于，那么更新内存中的值为x值，否则不更新。

```java
public final native boolean compareAndSwapInt(Object o, long offset,
                                              int expected,
                                              int x);
```

+ 这里offset据了解，是对象的成员变量在内存中的偏移地址，即底层一个对象object存放在内存中，读取的地址是0x2110，此对象的一个成员变量state的值也在内存中，但内存地址肯定不是0x2110

#### java中的CAS使用

+ java.util.concurrent.locks.AbstractQueuedSynchronizer 类

```java
private static final Unsafe unsafe = Unsafe.getUnsafe();
private static final long stateOffset;
static {
        try {
            stateOffset = unsafe.objectFieldOffset
                (AbstractQueuedSynchronizer.class.getDeclaredField("state")); //获取成员变量state在内存中的偏移量

        } catch (Exception ex) { throw new Error(ex); }
    }
protected final boolean compareAndSetState(int expect, int update) {
        // See below for intrinsics setup to support this
        return unsafe.compareAndSwapInt(this, stateOffset, expect, update);
    }
```

* 在Java中，compareAndSetState这个操作如果更新成功，返回true,失败返回false，通过这个机制，可以定义锁（乐观锁）。
* 如三个线程A，B，C，在目标值为0的情况下，同时执行compareAndSetState(0,1) 去修改它期望值是0，更新值是1，因为是原子操作，在第一个线程操作成功之后目标值变为1，返回true
* 所以另外两个线程就因为期望值为0不等于1，返回false。我们可以理解为，返回true的线程拿到了锁。
* 最终调用的Java类是sun.misc.Unsafe

### park 阻塞

> LockSupport中的park和unpark实际上依旧是使用的unsafe中的park和unpark

+ Java中可以通过unsafe.park()去阻塞（停止）一个线程，也可以通过unsafe.unpark()让一个阻塞线程恢复继续执行

#### unsafe.park()

+ 阻塞(某种意义上停止)当前线程

```java
public native void park(boolean isAbsolute, long time); 
```

#### unsafe.unpark()

+ 取消阻塞(唤醒)线程

```java
public native void unpark(Object thread);
```


#### park与interrupt的区别

+ interrupt是Thread类的的API，park是Unsafe类的API，两者是有区别的。
+ 测试了解，Thread.currentThread().interrupt(),线程会继续运行，而Unsafe.park(Thread.currentThread())就是直接阻塞线程，不继续运行代码

### 获取锁

+ 线程cas操作失败，可以park阻塞自己，让其他拥有锁的线程在unlock的时候释放自己，达到锁的效果

+ java.util.concurrent.locks.ReentrantLock的lock方法是

```java
public void lock() {
    sync.lock();
}
```

+ 而sync的实现类其中一个是java.util.concurrent.locks.ReentrantLock.NonfairSync 不公平锁，它的逻辑比较直接

```java
/**
NonfairSync
*/
final void lock() {
    if (compareAndSetState(0, 1))//cas操作，如果true 则表示操作成功，获取锁
        setExclusiveOwnerThread(Thread.currentThread()); //设置获取锁拥有者为当前线程
    else
        acquire(1);//获取锁失败，锁住线程(自己)
}
```

#### 获取失败后阻塞线程

+ 如果获取锁失败，会再尝试一次，失败后，将线程（自己）阻塞

```java
public final void acquire(int arg) {
        if (!tryAcquire(arg) &&
            acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
            selfInterrupt();
    }
protected final boolean tryAcquire(int acquires) {
            return nonfairTryAcquire(acquires);
        }
final boolean nonfairTryAcquire(int acquires) {
            final Thread current = Thread.currentThread();
            int c = getState();
            if (c == 0) { 
			//如果期望值为0，内存值也为0，再次尝试获取锁（此时其他线程也可能尝试获取锁）
                if (compareAndSetState(0, acquires)) {
                    setExclusiveOwnerThread(current); //第二次获取成功，放回true
                    return true;
                }
            }
            else if (current == getExclusiveOwnerThread()) {
                int nextc = c + acquires;
                if (nextc < 0) // overflow
                    throw new Error("Maximum lock count exceeded");
                setState(nextc);
                return true;
            }
            return false; //没有获取到锁，返回false，则 !tryAcquire(arg) 为true，执行acquireQueued(addWaiter(Node.EXCLUSIVE), arg)
        }
```

+ 获取锁失败，线程会进入循环，acquireQueued 方法中for是个无限循环，除非获取锁成功后，才会return。

```java
//获取锁失败后，准备阻塞线程（自己）
//阻塞之前，添加节点存放到链表，其他线程可以通过这个链表唤醒此线程
private Node addWaiter(Node mode) {
        Node node = new Node(Thread.currentThread(), mode); 
        // Try the fast path of enq; backup to full enq on failure
        Node pred = tail;
        if (pred != null) {
            node.prev = pred;
            if (compareAndSetTail(pred, node)) {//cas操作
                pred.next = node;
                return node;
            }
        }
        enq(node);
        return node;
    }

// 在此方法直到获取锁成功才会跳出循环
final boolean acquireQueued(final Node node, int arg) {
        boolean failed = true;
        try {
            boolean interrupted = false;
            for (;;) {
                final Node p = node.predecessor();
                if (p == head && tryAcquire(arg)) {
                    setHead(node);
                    p.next = null; // help GC
                    failed = false;
                    return interrupted; //获取锁成功之后才会return跳出此方法
                }
                if (shouldParkAfterFailedAcquire(p, node) && //如果满足阻塞条件
                    parkAndCheckInterrupt()) 
                    interrupted = true;
            }
        } finally {
            if (failed)
                cancelAcquire(node);
        }
    }

    private final boolean parkAndCheckInterrupt() {
        LockSupport.park(this);//停止线程（自己）
        return Thread.interrupted();
    }
```

### 释放锁

+ 一个线程拿到锁之后，执行完关键代码，必须unlock释放锁的，否则其他线程永远拿不到锁

```java
public void unlock() {
        sync.release(1);
    }

public final boolean release(int arg) {
        if (tryRelease(arg)) {
            Node h = head;
            if (h != null && h.waitStatus != 0)
                unparkSuccessor(h);
            return true;
        }
        return false;
    }
//java.util.concurrent.locks.ReentrantLock.Sync 的tryRelease
 protected final boolean tryRelease(int releases) {
            int c = getState() - releases; //这里一般是 1 - 1 = 0
            if (Thread.currentThread() != getExclusiveOwnerThread()) //只能是锁的拥有者释放锁
                throw new IllegalMonitorStateException();
            boolean free = false;
            if (c == 0) {
                free = true;
                setExclusiveOwnerThread(null);
            }
            setState(c); //设置state为0，相当于释放锁，让其他线程compareAndSetState(0, 1)可能成功
			
            return free;
        }

protected final void setState(int newState) {
        state = newState; //没有cas操作
    }
```


+ setState不做cas操作是因为，只有拥有锁的线程才调用unlock，不存才并发混乱问题
+ 其他线程没拿到锁不会设值成功，其他线程在此线程设置state为0之前，compareAndSetState(0, 1)都会失败，拿不到锁，此线程设置state为0之后，其他线程compareAndSetState(0, 1)才有可能成功，返回true从而拿到锁

#### 释放线程

+ 线程在获取锁失败后，有可能阻塞线程（自己），在阻塞之前把阻塞线程信息放入链表的
+ 释放锁之后，线程会尝试通过链表释放其他线程（一个），让一个阻塞线程恢复运行

```java
private void unparkSuccessor(Node node) {
        int ws = node.waitStatus;
        if (ws < 0)
            compareAndSetWaitStatus(node, ws, 0);
        Node s = node.next;
        if (s == null || s.waitStatus > 0) {
            s = null;
            for (Node t = tail; t != null && t != node; t = t.prev) // 循环获取前面的节点
                if (t.waitStatus <= 0)
                    s = t; //循环，找到链表最前面需要被唤醒的线程
        }
        if (s != null)
            LockSupport.unpark(s.thread); //唤醒（释放）被阻塞的线程
    }
```

### 阻塞线程被取消阻塞后如何拿到锁(ReentrantLock中)

+ 有时候线程被中断后，唤醒继续执行后面的代码，
+ 线程没有拿到锁之后主动阻塞自己的，但所还没拿到，被唤醒之后怎么去尝试重新获取锁呢？ 里面有一个for循环

```java
final void lock() {
            if (compareAndSetState(0, 1)) 
                setExclusiveOwnerThread(Thread.currentThread());//拿到锁
            else
                acquire(1); //没有拿到锁
        }
// 上锁失败，会添加一个节点，节点包含线程信息，将此节点放入队列
public final void acquire(int arg) {
        if (!tryAcquire(arg) &&
            acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
            selfInterrupt();
    }

// 存好节点后，将线程（自己）中断，等其他线程唤醒（自己）
final boolean acquireQueued(final Node node, int arg) {
        boolean failed = true;
        try {
            boolean interrupted = false;
            for (;;) {//循环 被唤醒后线程还是在此处循环
                
                final Node p = node.predecessor();
                if (p == head && tryAcquire(arg)) {//尝试获取锁
                    setHead(node);
                    p.next = null; // help GC
                    failed = false;
                    return interrupted; //如果拿到锁了，才会return
                }
                if (shouldParkAfterFailedAcquire(p, node) &&
                    parkAndCheckInterrupt()) //没拿到锁时，主动中断Thread.currentThread()
                    interrupted = true;
            }
        } finally {
            if (failed)
                cancelAcquire(node);
        }
    }
```

+ 被唤醒后继续执行compareAndSetState(0, 1)返回false没拿到锁，则继续循环或阻塞
  
+ compareAndSetState(0, 1) 这个操作是获取锁的关键

