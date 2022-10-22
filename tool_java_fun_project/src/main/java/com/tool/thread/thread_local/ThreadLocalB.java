package com.tool.thread.thread_local;

public class ThreadLocalB extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 50; i++) {
            ToolsThreadLocal.t1.set("thread b "+i);
            System.out.println(ToolsThreadLocal.t1.get());
        }
    }
}
