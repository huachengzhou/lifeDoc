package com.tool.thread.semaphore;

import java.util.concurrent.Semaphore;

public class SemaphoreDemo1 {
    private static Semaphore semaphore = new Semaphore(3);
    private static int sumParam = 0;

    public static void main(String[] args) {
        for (int i = 0; i < 100; i++) {
            new Thread( (() -> {
                if (semaphore.availablePermits() == 0){
                    System.out.println("令牌不足!");
                }
                try {
                    semaphore.acquire(3);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("SemaphoreDemo1.main"+(sumParam++));
                semaphore.release(3);
            })).start();
        }
    }

}
