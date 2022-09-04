package com.tool.thread;

import org.openjdk.jol.info.ClassLayout;

public class Entity2 {
    public static void main(String[] args) {
        Entity2 entity = new Entity2();
        // 打印java 对象内存布局
        System.out.println(ClassLayout.parseInstance(entity).toPrintable());
    }
}
