package com.tool.thread.phaser_c;

import java.time.LocalDateTime;
import java.util.concurrent.Phaser;
import java.util.concurrent.TimeUnit;

public class PhaserDemo1 {

    public static void main(String[] args) {
        method1();
    }

    public static void testMethod2(){

    }

    private static void method1() {
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
    }
}
