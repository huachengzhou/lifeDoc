package com.tool.cas;

import java.util.concurrent.atomic.AtomicInteger;

public class Demo1 {

    public static void main(String[] args) throws Exception {
        long startTime = System.currentTimeMillis();
        Demo_B demo_b = new Demo_B();
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


class Demo_B {
   final AtomicInteger atomicInteger = new AtomicInteger(0);

    public void increase() {
        int oldValue = 0;
        do {
            oldValue = atomicInteger.get();
        } while (!atomicInteger.compareAndSet(oldValue , oldValue+1));
    }

    public int getNumber() {
        return atomicInteger.get();
    }
}