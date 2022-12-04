package com.tool.thread.countdownlatch;

import java.util.Arrays;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

public class CountDownLatchExample4 {
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
                countDownLatch.await(2, TimeUnit.SECONDS);
                System.out.println("比赛开始!");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    //运动员
    public static class Athletes extends Thread {
        private CountDownLatch countDownLatch;

        private String sportsName;

        public Athletes(CountDownLatch countDownLatch, String name) {
            this.countDownLatch = countDownLatch;
            this.sportsName = name;
        }

        @Override
        public void run() {
            if ("李宁".equals(this.sportsName)) {
                System.out.println("运动员" + this.sportsName + "路上堵车不能按时到达");
                try {
                    Thread.sleep(4000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.println("运动员" + this.sportsName + "到了");
            this.countDownLatch.countDown();
        }
    }
}
