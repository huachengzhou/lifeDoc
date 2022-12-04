package com.tool.thread.countdownlatch;

import java.util.Arrays;
import java.util.concurrent.CountDownLatch;

public class CountDownLatchExample3 {

    public static void main(String[] args) {
        String[] names = new String[]{"姚明", "易建联", "李宁", "邓亚萍"};
        new Referee(names).start();
    }

    //裁判员
    public static class Referee extends Thread {
        private String[] names;

        public Referee(String[] names) {
            this.names = names;
        }

        @Override
        public void run() {
            try {
                System.out.println("运动员名单" + Arrays.toString(names));
                CountDownLatch countDownLatch = new CountDownLatch(names.length);
                for (String name : names) {
                    Athletes athletes = new Athletes(countDownLatch, name);
                    athletes.start();
                }
                countDownLatch.await();
                System.out.println("所有运动员都已经到齐了!");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    //运动员
    public static class Athletes extends Thread {
        private CountDownLatch countDownLatch;

        private String name;

        public Athletes(CountDownLatch countDownLatch, String name) {
            this.countDownLatch = countDownLatch;
            this.name = name;
        }

        @Override
        public void run() {
            System.out.println("运动员" + this.name + "到了");
            this.countDownLatch.countDown();
        }
    }
}
