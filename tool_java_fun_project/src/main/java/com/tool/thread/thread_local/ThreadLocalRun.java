package com.tool.thread.thread_local;

public class ThreadLocalRun {
    public static void main(String[] args) {
        ThreadLocalA  threadLocalA = new ThreadLocalA();
        threadLocalA.start();

        ThreadLocalB  threadLocalB = new ThreadLocalB();
        threadLocalB.start();

        for (int i = 0; i < 50; i++) {
            ToolsThreadLocal.t1.set("thread main "+i);
            System.out.println(ToolsThreadLocal.t1.get());
        }
    }
}
