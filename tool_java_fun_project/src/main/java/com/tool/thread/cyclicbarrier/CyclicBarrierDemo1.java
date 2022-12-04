package com.tool.thread.cyclicbarrier;

import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

public class CyclicBarrierDemo1 {

    public static void main(String[] args) {

        String[] nameList = new String[]{"面条", "麦克斯", "吉米", "Teenager"};

        CyclicBarrier keyObj = new CyclicBarrier(4, (() -> {
            System.out.println("所有人到齐打开存钱箱");
        }));
        for (String name : nameList) {
            new AmericaMan(keyObj, name).start();
        }
    }

    public static class AmericaMan extends Thread {
        private CyclicBarrier keyObj;
        private String firstName;

        public AmericaMan(CyclicBarrier keyObj, String firstName) {
            this.keyObj = keyObj;
            this.firstName = firstName;
        }

        @Override
        public void run() {
            try {
                double v = Math.random() * 3000;
                Thread.sleep((long) v);
                System.out.println(this.firstName + "已经到现场了");
                this.keyObj.await();
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (BrokenBarrierException e) {
                e.printStackTrace();
            }
        }
    }

}
