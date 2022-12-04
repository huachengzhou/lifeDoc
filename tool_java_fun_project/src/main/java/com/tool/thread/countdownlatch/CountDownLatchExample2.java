package com.tool.thread.countdownlatch;

import java.util.concurrent.CountDownLatch;

public class CountDownLatchExample2 {

    public static class  MyService {
        private CountDownLatch downLatch = new CountDownLatch(1) ;

        public void testMethod(){
            try {
                System.out.println("任务执行开始前!");
                //await()方法则使调用该方法的线程处于等待状态，其一般是主线程调用
                downLatch.await();
                System.out.println("任务执行结束!");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        public void downMethod(){
            System.out.println("任务执行开始");
            System.out.println("MyService.downMethod");
            //线程数器减一
            downLatch.countDown();
        }
    }

    public static class MyThread extends Thread {
        private MyService myService;

        public MyThread(MyService myService) {
            super();
            this.myService = myService;
        }

        @Override
        public void run() {
            myService.testMethod();
        }
    }

    public static void main(String[] args)throws InterruptedException {
        MyService myService = new MyService();
        MyThread myThread = new MyThread(myService) ;
        myThread.start();
        //暂停2秒钟
        Thread.sleep(2000);
        //如果不调用 downMethod 方法 那么计数器就不会减一 那么主线程将一直处于等待状况
        myService.downMethod();
    }
}
