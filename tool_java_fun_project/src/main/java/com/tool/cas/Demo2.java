package com.tool.cas;

import sun.misc.Unsafe;

import java.lang.reflect.Field;

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
    private static long valueOffset = 0l;

    static {
        try {
            valueOffset = unsafe.objectFieldOffset(Demo_B2.class.getDeclaredField("value"));
        } catch (NoSuchFieldException e) {
            e.printStackTrace();
        }
    }

    public void increase() {
        int oldValue = 0;
        do {
            oldValue = value;
        } while (!unsafe.compareAndSwapInt(this, valueOffset, oldValue, oldValue + 1));
    }

    public int getNumber() {
        return value;
    }
}

final class UnsafeAccessor {
    private static Unsafe unsafe;

    static {
        try {
            //这个名字是Unsafe 里面的不要随便写
            Field unsafeFile = Unsafe.class.getDeclaredField("theUnsafe");
            unsafeFile.setAccessible(true);
            //因为是静态属性
            unsafe = (Unsafe) unsafeFile.get(null);
        } catch (Exception e) {
        }
    }

    public static Unsafe getUnsafe() {
        return unsafe;
    }
}