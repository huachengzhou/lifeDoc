package com.tool.thread.fork_join;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveAction;
import java.util.concurrent.TimeUnit;

public class ForkJoinPoolDemo1 {

    public static class SendMsgTask extends RecursiveAction {
        private final int THRESHOLD = 10;

        private int start;
        private int end;
        private List<String> list;

        public SendMsgTask(int start, int end, List<String> list) {
            this.start = start;
            this.end = end;
            this.list = list;
        }

        @Override
        protected void compute() {
            // 做什么
            //什么都不做
            if ((end - start) <= THRESHOLD) {
                for (int i = start; i < end; i++) {
                    //仅仅打印
                    System.out.println(Thread.currentThread().getName() + ": " + list.get(i));
                }
            } else {
                // 拆分
                int middle = (start + end) / 2;
                SendMsgTask left = new SendMsgTask(start, middle, list);
                SendMsgTask right = new SendMsgTask(middle, end, list);
                invokeAll(left, right);
            }
        }
    }

    public static void main(String[] args)throws Exception {
        List<String> list = new ArrayList<>();
        for (int i = 0; i < 123; i++) {
            list.add(String.valueOf(i + 1));
        }
        ForkJoinPool pool = new ForkJoinPool();
        //都行 submit 和 execute 以及 invoke
//        pool.submit(new SendMsgTask(0, list.size(), list));
//        pool.execute(new SendMsgTask(0, list.size(), list));
        pool.invoke(new SendMsgTask(0, list.size(), list)) ;
        pool.awaitTermination(10, TimeUnit.SECONDS);
        pool.shutdown();
    }
}
