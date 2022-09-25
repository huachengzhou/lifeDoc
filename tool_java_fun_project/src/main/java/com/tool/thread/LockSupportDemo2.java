package com.tool.thread;

import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.locks.LockSupport;

public class LockSupportDemo2 {

    public static void main(String[] args) {
        AtomicBoolean atomicBoolean = new AtomicBoolean(false);
        Thread t1 = new Thread(() -> {
            Timer timer = new Timer();
            timer.schedule(new TimerTask() {
                @Override
                public void run() {
                    atomicBoolean.set(false);
                    System.out.println("dhsdhsdhsdh");
                    // 暂停当前线程
                    LockSupport.park();
                    System.out.println("暂停线程");
                }
            }, 2000,1);

            for (; ; ) {
                if (atomicBoolean.get()) {
//                    System.out.println("LockSupportDemo2.main-" + Thread.currentThread().getName());
                }
            }

        }, "t1");

        t1.start();

        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                System.out.println("sdhsd");
                t1.interrupt();
                atomicBoolean.set(true);
            }
        }, 2000);
    }
}
