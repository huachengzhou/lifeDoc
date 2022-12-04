---
title: "CountDownLatch 和 CyclicBarrier"
date: 2022-09-01
draft: false
weight: 3
---


> CountDownLatch是减法操作   CyclicBarrier具有CountDownLatch的所有功能




# CountDownLatch

>  CountDownLatch中count down是倒数的意思，latch则是门闩的含义。整体含义可以理解为倒数的门栓,所以当门打开时,N个人是不能进屋的,也就是N个线程是不能继续向下运行的,支持这样的特性可以控制线程执行任务的时机,使线程以 "组团"的方式一起执行任务

>  CountDownLatch中count down是倒数的意思，latch则是门闩的含义。整体含义可以理解为倒数的门栓，似乎有一点“三二一，芝麻开门”的感觉。CountDownLatch的作用也是如此，在构造CountDownLatch的时候需要传入一个整数n，在这个整数“倒数”到0之前，主线程需要等待在门口，而这个“倒数”过程则是由各个执行线程驱动的，每个线程执行完一个任务“倒数”一次。总结来说，CountDownLatch的作用就是等待其他的线程都执行完任务，必要时可以对各个任务的执行结果进行汇总，然后主线程才继续往下执行
  
>  CountDownLatch主要有两个方法：countDown()和await()。countDown()方法用于使计数器减一，其一般是执行任务的线程调用，await()方法则使调用该方法的线程处于等待状态，其一般是主线程调用。这里需要注意的是，countDown()方法并没有规定一个线程只能调用一次，当同一个线程调用多次countDown()方法时，每次都会使计数器减一；另外，await()方法也并没有规定只能有一个线程执行该方法，如果多个线程同时执行await()方法，那么这几个线程都将处于等待状态，并且以共享模式享有同一个锁。

+ await()方法 一般是使用者或者主线程调用  countDown()方法 子任务线程组调用

+ 第一个例子
  
```java
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
/*
任务执行开始前!
任务执行开始
MyService.downMethod
任务执行结束!
*/
```

+ 第二个例子 裁判员等待 所有运动员到场馆中

```java
import java.util.Arrays;
import java.util.concurrent.CountDownLatch;

public class CountDownLatchExample3 {

    public static void main(String[] args) {
        String[] names = new String[]{"姚明", "易建联", "李宁", "邓亚萍"};
        new Referee(names).start();
    }

    //裁判员
    public static class Referee extends Thread {
        private String[] names;

        public Referee(String[] names) {
            this.names = names;
        }

        @Override
        public void run() {
            try {
                System.out.println("运动员名单" + Arrays.toString(names));
                CountDownLatch countDownLatch = new CountDownLatch(names.length);
                for (String name : names) {
                    Athletes athletes = new Athletes(countDownLatch, name);
                    athletes.start();
                }
                countDownLatch.await();
                System.out.println("所有运动员都已经到齐了!");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    //运动员
    public static class Athletes extends Thread {
        private CountDownLatch countDownLatch;

        private String name;

        public Athletes(CountDownLatch countDownLatch, String name) {
            this.countDownLatch = countDownLatch;
            this.name = name;
        }

        @Override
        public void run() {
            System.out.println("运动员" + this.name + "到了");
            this.countDownLatch.countDown();
        }
    }
}
/*
运动员名单[姚明, 易建联, 李宁, 邓亚萍]
运动员姚明到了
运动员易建联到了
运动员李宁到了
运动员邓亚萍到了
所有运动员都已经到齐了!
* */
```

+ 第三个例子是对第二个例子的改进  假如某个运动员超过了比赛的时间那么我们就取消该运动员的此次比赛资格

```java
import java.util.Arrays;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

public class CountDownLatchExample4 {
    public static void main(String[] args) {
        String[] names = new String[]{"姚明", "易建联", "李宁", "邓亚萍"};
        new Referee(names).start();
    }

    //裁判员
    public static class Referee extends Thread {
        private String[] names;

        public Referee(String[] names) {
            this.names = names;
        }

        @Override
        public void run() {
            try {
                System.out.println("运动员名单" + Arrays.toString(names));
                CountDownLatch countDownLatch = new CountDownLatch(names.length);
                for (String name : names) {
                   Athletes athletes = new Athletes(countDownLatch, name);
                    athletes.start();
                }
                countDownLatch.await(2, TimeUnit.SECONDS);
                System.out.println("比赛开始!");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    //运动员
    public static class Athletes extends Thread {
        private CountDownLatch countDownLatch;

        private String sportsName;

        public Athletes(CountDownLatch countDownLatch, String name) {
            this.countDownLatch = countDownLatch;
            this.sportsName = name;
        }

        @Override
        public void run() {
            if ("李宁".equals(this.sportsName)) {
                System.out.println("运动员" + this.sportsName + "路上堵车不能按时到达");
                try {
                    Thread.sleep(4000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.println("运动员" + this.sportsName + "到了");
            this.countDownLatch.countDown();
        }
    }
}

/*
运动员名单[姚明, 易建联, 李宁, 邓亚萍]
运动员姚明到了
运动员易建联到了
运动员邓亚萍到了
运动员李宁路上堵车不能按时到达
比赛开始!
运动员李宁到了
* */
```

# CyclicBarrier(sai k li c bai ri er 赛克利克百瑞尔)

> 类CyclicBarrier 不仅有 CountDownLatch 所具有的功能 ,还可以实现屏障等待功能(阶段性同步),它在使用上的意义在于可以循环地实现线程要一起做任务的目标,而不仅仅像类CountDownLatch一样仅仅支持一次线程与同步阻塞的特性

+ 第一个例子 美国往事 中 有四个年轻人 他们在一个存钱箱里存放他们所有的积蓄  当用钱的时候必须四个人都在场 才能打开 

```java
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

public class CyclicBarrierDemo1 {

    public static void main(String[] args) {

        String[] nameList = new String[]{"面条", "麦克斯", "吉米", "Teenager"};

        CyclicBarrier keyObj = new CyclicBarrier(4, (() -> {
            System.out.println("所有人到齐打开存钱箱");
        }));
        for (String name : nameList) {
            new AmericaMan(keyObj, name).start();
        }
    }

    public static class AmericaMan extends Thread {
        private CyclicBarrier keyObj;
        private String firstName;

        public AmericaMan(CyclicBarrier keyObj, String firstName) {
            this.keyObj = keyObj;
            this.firstName = firstName;
        }

        @Override
        public void run() {
            try {
                double v = Math.random() * 3000;
                Thread.sleep((long) v);
                System.out.println(this.firstName + "已经到现场了");
                this.keyObj.await();
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (BrokenBarrierException e) {
                e.printStackTrace();
            }
        }
    }

}

/*
吉米已经到现场了
面条已经到现场了
麦克斯已经到现场了
Teenager已经到现场了
所有人到齐打开存钱箱
* */
```


+ 第二个例子 有一些工人要去附件一家餐厅吃饭  但是餐厅不单独接待个人 至少需要4个人才能接待 因此 工人得互相凑对

```java
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.atomic.AtomicInteger;

public class CyclicBarrierDemo2 {

    public static void main(String[] args) {
        String[] names = new String[]{"小罗伯特·唐尼", "艾玛·沃特森", "艾玛·斯通", "斯嘉丽·约翰逊", "艾薇儿", "阿兰·德龙", "布雷特·道顿", "莫蕾娜·巴卡林", "费尔南达·塔瓦雷", "杰夫·高布伦", "纳帅尼尔·布佐尼"};
        AtomicInteger atomicInteger = new AtomicInteger(0);
        CyclicBarrier cyclicBarrier = new CyclicBarrier(4, () -> {
            System.out.println("接待" + atomicInteger.incrementAndGet() + "桌");
        });
        for (String name : names) {
            try {
                //这里一定延迟一下
                Thread.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            new Worker(name, cyclicBarrier).start();

//            Worker worker = new Worker(name, cyclicBarrier);
//            worker.start();
        }
    }




    public static class Worker extends Thread {
        private String firstName;
        private CyclicBarrier objKey;

        public Worker(String firstName, CyclicBarrier objKey) {
            this.firstName = firstName;
            this.objKey = objKey;
            this.setName(firstName);
        }

        @Override
        public void run() {
            try {
                System.out.println(this.firstName + "就位");
                this.objKey.await();
                System.out.println();
                System.out.println(this.firstName + "开始就餐");
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (BrokenBarrierException e) {
                e.printStackTrace();
            }
        }
    }
}
/*
小罗伯特·唐尼就位
艾玛·沃特森就位
艾玛·斯通就位
斯嘉丽·约翰逊就位
接待1桌

斯嘉丽·约翰逊开始就餐



艾玛·斯通开始就餐
艾玛·沃特森开始就餐
小罗伯特·唐尼开始就餐
艾薇儿就位
阿兰·德龙就位
布雷特·道顿就位
莫蕾娜·巴卡林就位
接待2桌

莫蕾娜·巴卡林开始就餐

布雷特·道顿开始就餐

阿兰·德龙开始就餐

艾薇儿开始就餐
费尔南达·塔瓦雷就位
杰夫·高布伦就位
纳帅尼尔·布佐尼就位
* */
```
