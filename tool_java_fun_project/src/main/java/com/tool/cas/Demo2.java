package com.tool.cas;

import sun.misc.Unsafe;


public class Demo2 {

    public static void main(String[] args) throws Exception {
        long startTime = System.currentTimeMillis();
        Demo_B2 demo_b = new Demo_B2();
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


class Demo_B2 {
    //jdk级别代码才能这样  因为这个级别的会涉及到绕过jvm所以得另寻出路
    final static Unsafe unsafe = UnsafeAccessor.getUnsafe();
    private volatile int value = 0;
    //内存偏移量地址(相对地址)
    private long valueOffset = 0l;


    public void increase() {
        if (valueOffset == 0l) {
            try {
                valueOffset = unsafe.objectFieldOffset(Demo_B2.class.getDeclaredField("value"));
            } catch (NoSuchFieldException e) {
                e.printStackTrace();
            }
        }
        int oldValue = 0;
        do {
            oldValue = value;
        } while (!unsafe.compareAndSwapInt(this, valueOffset, oldValue, oldValue + 1));
    }

    public int getNumber() {
        return value;
    }
}

