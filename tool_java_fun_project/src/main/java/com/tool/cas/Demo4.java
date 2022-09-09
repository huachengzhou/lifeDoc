package com.tool.cas;

import sun.misc.Unsafe;

import java.util.UUID;

public class Demo4 {
    public static void main(String[] args) throws Exception {
        long startTime = System.currentTimeMillis();
        ObjectDemo4 objectDemo4 = new ObjectDemo4();
        final int len = 200;
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < len; i++) {
                try {
                    objectDemo4.increaseName(String.valueOf(1));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

        t1.start();
        for (int i = len; i < len * 2; i++) {
            objectDemo4.increaseName(String.valueOf(1));
        }
        t1.join();
        long endTime = System.currentTimeMillis();
        System.out.println(objectDemo4.getName());
        System.out.println(objectDemo4.getName().split("-").length);
        System.out.println(String.format("time:%s", (endTime - startTime)));
    }
}

class ObjectDemo4 {
    final static Unsafe unsafe = UnsafeAccessor.getUnsafe();
    private Integer id;
    private String name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void increaseName(String value) throws Exception {
        long valueOffset = unsafe.objectFieldOffset(ObjectDemo4.class.getDeclaredField("name"));
        String oldValue = null;
        do {
            oldValue = (String) unsafe.getObject(this, valueOffset);
        } while (!unsafe.compareAndSwapObject(this, valueOffset, oldValue, oldValue == null ? value : oldValue + "-"+value));
    }

}
