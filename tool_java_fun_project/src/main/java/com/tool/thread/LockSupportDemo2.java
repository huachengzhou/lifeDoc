package com.tool.thread;

import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.locks.LockSupport;

public class LockSupportDemo2 {

    public static void main(String[] args) {
        AtomicBoolean atomicBoolean = new AtomicBoolean(false);
        long timeout = 6;
        Thread t1 = new Thread(() -> {
            System.out.println("start "+Thread.currentThread().getId());
            try {
                TimeUnit.SECONDS.sleep(timeout-1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            LockSupport.park();
            System.out.println("park "+Thread.currentThread().getId());

        }, "t1");

        t1.start();

        try {
            TimeUnit.SECONDS.sleep(timeout+2);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        LockSupport.unpark(t1);
        System.out.println("unpark "+t1.getId());


    }
}
