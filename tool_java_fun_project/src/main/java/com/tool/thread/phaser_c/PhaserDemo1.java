package com.tool.thread.phaser_c;

import org.testng.annotations.Test;

import java.time.LocalDateTime;
import java.util.concurrent.Phaser;
import java.util.concurrent.TimeUnit;

public class PhaserDemo1 {

    @Test(timeOut = 15000)
    public void testMethod2() {
        final Phaser phaser = new Phaser(3) {
            @Override
            protected boolean onAdvance(int phase, int registeredParties) {
                System.out.println("执行...................");
                return super.onAdvance(phase, registeredParties);
            }
        };
        for (int i = 1; i <= 1 * 3; i++) {
//            phaser.register();
            new Thread(String.valueOf(i)) {
                public void run() {
                    System.out.println(Thread.currentThread().getName());
//                    phaser.arriveAndAwaitAdvance();
                    phaser.arriveAndDeregister();
                    System.out.println(LocalDateTime.now() + ": 到达屏障，等待其他线程，" + Thread.currentThread().getName() + ", registeredParties=" + phaser.getRegisteredParties() + ", phase=" + phaser.getPhase() + ", isTerminated=" + phaser.isTerminated() + ", ThreadId=" + Thread.currentThread().getId());

//                    phaser.arrive();
//                    phaser.arriveAndDeregister();
                }
            }.start();
        }


        try {
            Thread.sleep(1000);
            System.out.println("end!");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }


    @Test(timeOut = 15000)
    public void testMethod1() {
        final Phaser phaser = new Phaser(3) {
            @Override
            protected boolean onAdvance(int phase, int registeredParties) {
                System.out.println("执行...................");
                return super.onAdvance(phase, registeredParties);
            }
        };
        for (int i = 1; i <= 1 * 3; i++) {
            new Thread(String.valueOf(i)) {
                public void run() {
                    System.out.println(LocalDateTime.now() + ": 到达屏障，等待其他线程，" + Thread.currentThread().getName() + ", registeredParties=" + phaser.getRegisteredParties() + ", phase=" + phaser.getPhase() + ", isTerminated=" + phaser.isTerminated() + ", ThreadId=" + Thread.currentThread().getId());
                    phaser.arriveAndAwaitAdvance();
                    System.out.println(LocalDateTime.now() + ": 屏障打开，开始执行剩下任务，" + Thread.currentThread().getName() + ", registeredParties=" + phaser.getRegisteredParties() + ", phase=" + phaser.getPhase() + ", isTerminated=" + phaser.isTerminated() + ", ThreadId=" + Thread.currentThread().getId());
                }
            }.start();
        }
        try {
            Thread.sleep(1000);
            System.out.println("end!");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Test(timeOut = 15000) // time in mulliseconds
    public void methodOk() {
        Phaser phaser = new Phaser() {
            @Override
            protected boolean onAdvance(int phase, int registeredParties) {
                System.out.println(LocalDateTime.now() + ": onAdvance，registeredParties=" + getRegisteredParties() + ", phase=" + getPhase() + ", isTerminated=" + isTerminated() + ", ThreadId=" + Thread.currentThread().getId());
                return super.onAdvance(phase, registeredParties);
            }
        };
        System.out.println(LocalDateTime.now() + ": 主线程开始执行异步任务，registeredParties=" + phaser.getRegisteredParties() + ", phase=" + phaser.getPhase() + ", isTerminated=" + phaser.isTerminated() + ", ThreadId=" + Thread.currentThread().getId());
        phaser.register();
        for (int i = 0; i < 5; i++) {
            phaser.register();
            System.out.println(LocalDateTime.now() + ": 注册一个屏障，registeredParties=" + phaser.getRegisteredParties() + ", phase=" + phaser.getPhase() + ", isTerminated=" + phaser.isTerminated() + ", ThreadId=" + Thread.currentThread().getId());
            int finalI = i;
            new Thread(() -> {
                try {
                    TimeUnit.SECONDS.sleep(finalI);
                    System.out.println(LocalDateTime.now() + ": 到达屏障，等待其他线程，" + finalI + ", registeredParties=" + phaser.getRegisteredParties() + ", phase=" + phaser.getPhase() + ", isTerminated=" + phaser.isTerminated() + ", ThreadId=" + Thread.currentThread().getId());
                    phaser.arriveAndAwaitAdvance();
                    TimeUnit.SECONDS.sleep(finalI);
                    System.out.println(LocalDateTime.now() + ": 屏障打开，开始执行剩下任务，" + finalI + ", registeredParties=" + phaser.getRegisteredParties() + ", phase=" + phaser.getPhase() + ", isTerminated=" + phaser.isTerminated() + ", ThreadId=" + Thread.currentThread().getId());
                    phaser.arriveAndDeregister();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }).start();
        }
        phaser.arriveAndDeregister();
        System.out.println(LocalDateTime.now() + ": 主线程执行完毕，registeredParties=" + phaser.getRegisteredParties() + ", phase=" + phaser.getPhase() + ", isTerminated=" + phaser.isTerminated() + ", ThreadId=" + Thread.currentThread().getId());


        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
