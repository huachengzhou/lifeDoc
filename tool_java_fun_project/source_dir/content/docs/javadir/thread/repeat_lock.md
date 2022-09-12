---
title: "java重复加锁"
date: 2022-09-11
draft: false
weight: 7
---

> 可重入锁，从字面来理解，就是可以重复进入的锁

+ 可重入锁，也叫做递归锁，指的是同一线程外层函数获得锁之后，内层递归函数仍然有获取该锁的代码，但不受影响

+ 在java环境下reentrantlock和synchronized都是可重入锁

## 可重入锁的实现原理

+ 加锁时，需要判断锁是否已经被获取。如果已经被获取，则判断获取锁的线程是否是当前线程。如果是当前线程，则给获取次数加1。如果不是当前线程，则需要等待

+ 释放锁时，需要给锁的获取次数减1，然后判断，次数是否为0了。如果次数为0了，则需要调用锁的唤醒方法，让锁上阻塞的其他线程得到执行的机会

## 模拟实现简单的可重入锁

```java
public class RepeatLock {
    //private UnreentrantLock unreentrantLock = new UnreentrantLock();
    private ReentrantLock reentrantLock = new ReentrantLock();

    //加锁建议在try里面，解锁建议在finally
    public void methodA() throws InterruptedException {
        try {
            reentrantLock.lock();
            System.out.println("methodA方法被调用");
            methodB();
        } finally {
            reentrantLock.unlock();
        }
    }

    public void methodB() {
        try {
            reentrantLock.lock();
            System.out.println("methodB方法被调用");
        } catch (InterruptedException e) {
            e.fillInStackTrace();
        } finally {
            reentrantLock.unlock();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        for (int i = 0; i < 10; i++) {
            //演示的是同个线程多次加锁
            new RepeatLock().methodA();
        }
    }
}

class ReentrantLock {
    private boolean isLocked = false;
    private int lockedCount = 0;
    private Thread lockedOwner = null;

    public synchronized void lock() throws InterruptedException {
        Thread currentThread = Thread.currentThread();
        //如果不是同一个线程上锁就等待
        if (isLocked && currentThread.getId() != lockedOwner.getId()) {
            System.out.println("进入wait等待 " + Thread.currentThread().getName());
            System.out.println("当前锁状态 isLocked = " + isLocked);
            System.out.println("当前count数量 lockedCount =  " + lockedCount);
            wait();
        }
        //标记锁住状态和当前线程和锁计数器自增
        isLocked = true;
        lockedOwner = currentThread;
        lockedCount++;
    }

    public synchronized void unlock() {
        Thread currentThread = Thread.currentThread();
        System.out.println("进入unlock解锁 " + Thread.currentThread().getName());
        //如果当前线程是该锁的持有者
        if (currentThread.getId() == this.lockedOwner.getId()) {
            //解锁的时候锁计数器自减
            lockedCount--;
            //直到减少至为零的时候标记为未锁状态线程持有置空唤醒等待(需要拿锁的线程)
            if (lockedCount == 0) {
                isLocked = false;
                lockedOwner = null;
                notify();
            }
        }
    }
}
```

## ReentrantLock

+ 重入锁 ReentrantLock，顾名思义，就是支持重进入的锁，它表示该锁能够支持一个线程对资源的重复加锁。除此之外，该锁还支持获取锁时的公平和非公平性选择

+ 所谓不支持重进入，可以考虑如下场景：当一个线程调用 lock() 方法获取锁之后，如果再次调用 lock() 方法，则该线程将会被自己阻塞，原因是在调用 tryAcquire(int acquires) 方法时会返回 false，从而导致线程阻塞


### 重进入特性的实现需要解决以下两个问题

* 线程再次获取锁

* 锁需要去识别获取锁的线程是否为当前占据锁的线程，如果是，则再次成功获取

* 锁的最终释放

* 线程重复 n 次获取锁，随后在第 n 次释放该锁后，其他线程能获取到锁。实现此功能，理应考虑使用计数

+ ReentrantLock 通过组合自定义同步器来实现锁的获取与释放，以非公平锁实现为例，获取同步状态的代码如下所示，主要是增加了再次获取同步状态的处理逻辑

```java
final boolean nonfairTryAcquire(int acquires) {
    final Thread current = Thread.currentThread();
    int c = getState();
    if (c == 0) {
        if (compareAndSetState(0, acquires)) {
            setExclusiveOwnerThread(current);
            return true;
        }
    }
    // 判断当前线程是否为获取锁的线程
    else if (current == getExclusiveOwnerThread()) {
        // 将同步值进行增加，并返回 true
        int nextc = c + acquires;
        if (nextc < 0)
            throw new Error("Maximum lock count exceeded");
        setState(nextc);
        return true;
    }
    return false;
}
```

+ 考虑到成功获取锁的线程再次获取锁，只是增加同步状态值，这也就要求 ReentrantLock 在释放同步状态时减少同步状态值，该方法代码如下：

```java
protected final boolean tryRelease(int releases) {
    // 减少状态值
    int c = getState() - releases;
    if (Thread.currentThread() != getExclusiveOwnerThread())
        throw new IllegalMonitorStateException();
    boolean free = false;
    // 当同步状态为0，将占有线程设为null，并返回true，表示释放成功
    if (c == 0) {
        free = true;
        setExclusiveOwnerThread(null);
    }
    setState(c);
    return free;
}
```