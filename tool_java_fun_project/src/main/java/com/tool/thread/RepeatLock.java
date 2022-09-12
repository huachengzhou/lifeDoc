package com.tool.thread;


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