package com.tool.thread.cyclicbarrier;

import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.atomic.AtomicInteger;

public class CyclicBarrierDemo2 {

    public static void main(String[] args) {
        String[] names = new String[]{"小罗伯特·唐尼", "艾玛·沃特森", "艾玛·斯通", "斯嘉丽·约翰逊", "艾薇儿", "阿兰·德龙", "布雷特·道顿", "莫蕾娜·巴卡林", "费尔南达·塔瓦雷", "杰夫·高布伦", "纳帅尼尔·布佐尼"};
        AtomicInteger atomicInteger = new AtomicInteger(0);
        CyclicBarrier cyclicBarrier = new CyclicBarrier(4, () -> {
            System.out.println("接待" + atomicInteger.incrementAndGet() + "桌");
        });
        for (String name : names) {
            try {
                //这里一定延迟一下
                Thread.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            new Worker(name, cyclicBarrier).start();

//            Worker worker = new Worker(name, cyclicBarrier);
//            worker.start();
        }
    }




    public static class Worker extends Thread {
        private String firstName;
        private CyclicBarrier objKey;

        public Worker(String firstName, CyclicBarrier objKey) {
            this.firstName = firstName;
            this.objKey = objKey;
            this.setName(firstName);
        }

        @Override
        public void run() {
            try {
                System.out.println(this.firstName + "就位");
                this.objKey.await();
                System.out.println();
                System.out.println(this.firstName + "开始就餐");
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (BrokenBarrierException e) {
                e.printStackTrace();
            }
        }
    }
}
