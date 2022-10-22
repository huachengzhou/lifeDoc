package com.tool.thread.thread_local;

public class ThreadLocalA extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 50; i++) {
            ToolsThreadLocal.t1.set("thread a "+i);
            System.out.println(ToolsThreadLocal.t1.get());
        }
    }
}
