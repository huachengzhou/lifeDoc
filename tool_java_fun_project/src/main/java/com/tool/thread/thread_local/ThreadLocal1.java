package com.tool.thread.thread_local;

public class ThreadLocal1 {

    public static ThreadLocal t1 = new ThreadLocal();

    public static void main(String[] args) {
        if (t1.get() == null){
            System.out.println("我从未放过值");
            t1.set("我的值");
            t1.set("我的值2");
        }

        System.out.println(t1.get());
        System.out.println(t1.get());
    }

}
