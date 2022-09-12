package com.tool.thread;

import com.tool.cas.UnsafeAccessor;
import sun.misc.Unsafe;

import java.util.concurrent.locks.ReentrantLock;

public class ReentrantLockDemo1 {


    public static void main(String[] args) {
//        ReentrantLockService  reentrantLockService = new ReentrantLockService() ;
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
//        int anInt = unsafe.getInt(this, valueOffset);
        while (!unsafe.compareAndSwapInt(this, valueOffset, 0, 1)) {
//            System.out.println("正在加锁过程中...");
        }
        System.out.println("加锁完成...");
    }

    public void unLock() {
        value = 0;
        System.out.println("解锁完成...");
    }
}