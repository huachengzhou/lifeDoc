package com.tool.cas;

import java.util.concurrent.atomic.LongAdder;

public class Demo3 {

    public static void main(String[] args) throws Exception {
        long startTime = System.currentTimeMillis();
        Demo_B3 demo_b = new Demo_B3();
        final int len = 10000000;
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < len; i++) {
                demo_b.increase();
            }
        });

        t1.start();
        for (int i = 0; i < len; i++) {
            demo_b.increase();
        }
        t1.join();
        long endTime = System.currentTimeMillis();
        System.out.println(demo_b.getNumber());
        System.out.println(String.format("time:%s", (endTime - startTime)));
    }
}


class Demo_B3 {
    private volatile int value = 0;
    private LongAdder longAdder = new LongAdder();

    public void increase() {
        longAdder.increment();
    }

    public int getNumber() {
        return longAdder.intValue();
    }
}

