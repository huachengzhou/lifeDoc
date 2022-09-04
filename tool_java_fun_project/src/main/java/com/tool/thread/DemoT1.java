package com.tool.thread;

import org.openjdk.jol.info.ClassLayout;

public class DemoT1 {
    public static void main(String[] args) {
        Student o = new Student();
        System.out.println(ClassLayout.parseInstance(o).toPrintable());
    }
}
