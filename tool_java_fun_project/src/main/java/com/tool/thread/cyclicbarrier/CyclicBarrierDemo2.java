package com.tool.thread.cyclicbarrier;

import java.util.Arrays;
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.atomic.AtomicInteger;

public class CyclicBarrierDemo2 {
    private static ConcurrentLinkedQueue<String> linkedQueue = new ConcurrentLinkedQueue<>();

    public static void main(String[] args) {
        String[] names = new String[]{"小罗伯特·唐尼", "艾玛·沃特森", "艾玛·斯通", "斯嘉丽·约翰逊", "艾薇儿", "阿兰·德龙", "布雷特·道顿", "莫蕾娜·巴卡林", "费尔南达·塔瓦雷", "杰夫·高布伦", "纳帅尼尔·布佐尼", "爱丽丝"};
        AtomicInteger atomicInteger = new AtomicInteger(0);

        CyclicBarrier cyclicBarrier = new CyclicBarrier(4, () -> {
            System.out.println("接待第" + atomicInteger.incrementAndGet() + "桌");
            System.out.println("人员:" + Arrays.toString(linkedQueue.toArray()));
            linkedQueue.clear();
        });


        int i = 1;


        for (String name : names) {
            if (i % 4 == 0) {

            }
//            try {
//                //这里一定延迟一下
//                Thread.sleep(1);
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
//            new Worker(name, cyclicBarrier).start();

            Worker worker = new Worker(name, cyclicBarrier);
            worker.start();

            //返回当前在屏障处等待的参与者数目
            System.out.println(cyclicBarrier.getNumberWaiting());


//            try {
//                worker.join(10);
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
            i++;
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
                linkedQueue.add(this.firstName);
                //到达 屏障点
                this.objKey.await();
                //屏障点 结束
                System.out.println(this.firstName + "开始就餐");
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (BrokenBarrierException e) {
                e.printStackTrace();
            }
        }
    }
}
