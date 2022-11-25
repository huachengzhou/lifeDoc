package com.tool.thread.semaphore;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Semaphore;
//餐厅能够容纳16个人同时吃饭 但是吃饭的人总数有200个人
public class DiningDemo {
    private static Semaphore diningLock = new Semaphore(16);
    private static ExecutorService executorService  = Executors.newCachedThreadPool();

    public static void main(String[] args) {
        for (int i = 0; i < 200; i++) {
            executorService.execute((() -> {
                if (diningLock.availablePermits() == 0) {
                    System.out.println("餐位不足!");
                }
                try {
                    diningLock.acquire();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("DiningDemo.main" + "正在吃饭");
                diningLock.release();
            }));
        }
    }
}
