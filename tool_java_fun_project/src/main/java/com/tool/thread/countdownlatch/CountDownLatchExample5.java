package com.tool.thread.countdownlatch;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

public class CountDownLatchExample5 {

    private final Logger logger = LoggerFactory.getLogger(getClass()) ;

    public static void main(String[] args) {
        new CountDownLatchExample5().execute();
    }


    public void execute(){
        //最多等待2.5秒
        CountDownLatch countDownLatch = new CountDownLatch(1);
        try {
            countDownLatch.await(2500, TimeUnit.MILLISECONDS);
        } catch (InterruptedException e) {
            logger.error(e.getMessage());
        }
        RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
        Object obj = new Object() ;
        //真实项目考虑这样
        /*
         taskExecutor.execute(() -> {
            // 把旧RequestAttributes放到新线程的RequestContextHolder中
            RequestContextHolder.setRequestAttributes(attributes);
            //写你的业务
            myService(obj) ;
            countDownLatch.countDown();
        });
        * **/

        //现在模拟这样写
        new Thread(() -> {
            // 把旧RequestAttributes放到新线程的RequestContextHolder中
            RequestContextHolder.setRequestAttributes(attributes);
            //写你的业务
            myService(obj) ;
            countDownLatch.countDown();
        }).start();
        //finish
        System.out.println("执行结束");
    }

    private void myService(Object obj){
        try {
           Thread.sleep(1000*10);
        } catch (InterruptedException e) {
            logger.error(e.getMessage());
        }
        System.out.println("执行了业务方法");
    }


}
