package com.tool.thread.fork_join;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveTask;
import java.util.concurrent.TimeUnit;

public class ForkJoinPoolDemo2 {

    public static class SumTask  extends RecursiveTask<Integer> {
        private final int THRESHOLD = 10;

        private int start;
        private int end;
        private List<Integer> list;

        public SumTask(int start, int end, List<Integer> list) {
            this.start = start;
            this.end = end;
            this.list = list;
        }

        @Override
        protected Integer compute() {
            // 做什么
            //什么都不做
            if ((end - start) <= THRESHOLD) {
                // 直接求和
                int sum = 0;
                for (int i = start; i < end; i++) {
                    //仅仅打印
                    sum += this.list.get(i);
                }
                return sum;
            } else {
                // 拆分
                int middle = (start + end) / 2;
                SumTask left = new SumTask(start, middle, list);
                SumTask right = new SumTask(middle, end, list);
                invokeAll(left, right);
                return left.join() + right.join();
            }
        }
    }

    public static void main(String[] args) throws Exception {
        List<Integer> list = new ArrayList<>();
        for (int i = 1; i <= 123; i++) {
            list.add(i);
        }
        ForkJoinPool pool = new ForkJoinPool();
        //都行 submit 和 execute 以及 invoke

        SumTask sumTask = new SumTask(0, list.size(), list);

        pool.submit(sumTask);
//        pool.execute(sumTask);
//        pool.invoke(sumTask);


        System.out.println(sumTask.join());
        pool.awaitTermination(10, TimeUnit.SECONDS);
        pool.shutdown();
    }
}
