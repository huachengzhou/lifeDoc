---
title: "Fork-Join"
date: 2022-09-01
draft: false
weight: 9
---


# Fork-Join

## 简介

从JDK1.7开始，Java提供Fork/Join框架用于并行执行任务，它的思想就是讲一个大任务分割成若干小任务，最终汇总每个小任务的结果得到这个大任务的结果。

这种思想和MapReduce很像（input --> split --> map --> reduce --> output）

+ 主要有两步：

* 第一、任务切分；
* 第二、结果合并

它的模型大致是这样的：线程池中的每个线程都有自己的工作队列（PS：这一点和ThreadPoolExecutor不同，ThreadPoolExecutor是所有线程公用一个工作队列，
所有线程都从这个工作队列中取任务），当自己队列中的任务都完成以后，会从其它线程的工作队列中偷一个任务执行，这样可以充分利用资源。


## 工作窃取（work-stealing）

工作窃取（work-stealing）算法是指某个线程从其他队列里窃取任务来执行。工作窃取的运行流程图如下：


![][img3]
![][img3_]

那么为什么需要使用工作窃取算法呢？

假如我们需要做一个比较大的任务，我们可以把这个任务分割为若干互不依赖的子任务，为了减少线程间的竞争，于是把这些子任务分别放到不同的队列里，并为每个队列创建一个单独的线程来执行队列里的任务，线程和队列一一对应，比如A线程负责处理A队列里的任务。但是有的线程会先把自己队列里的任务干完，而其他线程对应的队列里还有任务等待处理。干完活的线程与其等着，不如去帮其他线程干活，于是它就去其他线程的队列里窃取一个任务来执行。而在这时它们会访问同一个队列，所以为了减少窃取任务线程和被窃取任务线程之间的竞争，通常会使用双端队列，被窃取任务线程永远从双端队列的头部拿任务执行，而窃取任务的线程永远从双端队列的尾部拿任务执行。

工作窃取算法的优点是充分利用线程进行并行计算，并减少了线程间的竞争，其缺点是在某些情况下还是存在竞争，比如双端队列里只有一个任务时。并且消耗了更多的系统资源，比如创建多个线程和多个双端队列。


## API介绍

### ForkJoinPool

ForkJoinPool与其它的ExecutorService区别主要在于它使用“工作窃取”：线程池中的所有线程都企图找到并执行提交给线程池的任务。当大量的任务产生子任务的时候，或者同时当有许多小任务被提交到线程池中的时候，这种处理是非常高效的。特别的，当在构造方法中设置asyncMode为true的时候这种处理更加高效。



![][img4]
![][img4_]

### ForkJoinTask

ForkJoinTask代表运行在ForkJoinPool中的任务。

主要方法：

+ fork()    在当前线程运行的线程池中安排一个异步执行。简单的理解就是再创建一个子任务。
+ join()    当任务完成的时候返回计算结果。
+ invoke()    开始执行任务，如果必要，等待计算完成。

子类：

+ RecursiveAction    一个递归无结果的ForkJoinTask（没有返回值）
+ RecursiveTask    一个递归有结果的ForkJoinTask（有返回值）

### ForkJoinWorkerThread

ForkJoinWorkerThread代表ForkJoinPool线程池中的一个执行任务的线程。

+ **类图**


![][img18]
![][img18_]
![][img5]
![][img5_]
![][img19]
![][img19_]

### 代码分析

WorkQueue是一个ForkJoinPool中的内部类，它是线程池中线程的工作队列的一个封装，支持任务窃取。

什么叫线程的任务窃取呢？就是说你和你的一个伙伴一起吃水果，你的那份吃完了，他那份没吃完，那你就偷偷的拿了他的一些水果吃了。
存在执行2个任务的子线程，这里要讲成存在A,B两个个WorkQueue在执行任务，A的任务执行完了，B的任务没执行完，
那么A的WorkQueue就从B的WorkQueue的ForkJoinTask数组中拿走了一部分尾部的任务来执行，可以合理的提高运行和计算效率。



![][img6]
![][img6_]

+ submit()

![][img7]
![][img7_]
![][img8]
![][img8_]
![][img9]
![][img9_]

可以看到：

+ 1:同样是提交任务，submit会返回ForkJoinTask，而execute不会
+ 2:任务提交给线程池以后，会将这个任务加入到当前提交者的任务队列中。

前面我们说过，每个线程都有一个WorkQueue，而WorkQueue中有执行任务的线程（ForkJoinWorkerThread owner），还有这个线程需要处理的任务（ForkJoinTask<?>[] array）。那么这个新提交的任务就是加到array中。

+ **ForkJoinWorkerThread**

![][img10]
![][img10_]

从代码中我们可以清楚地看到，ForkJoinWorkThread持有ForkJoinPool和ForkJoinPool.WorkQueue的引用，以表明该线程属于哪个线程池，它的工作队列是哪个

+ **ForkJoinTask**

+ fork()


![][img11]
![][img11_]

可以看到，如果是ForkJoinWorkerThread运行过程中fork()，则直接加入到它的工作队列中，否则，重新提交任务。



![][img12]
![][img12_]
![][img13]
![][img13_]

可以看到它们都会等待计算完成

### 图形化处理过程

![][img14]
![][img14_]




![][img15]
![][img15_]
![][img16]
![][img16_]
![][img17]
![][img17_]


## 使用示例

+ 仅仅打印

```java
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

```

+ 求和 

```java
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

```


## 总结

+ 执行方法

| 方法名     |  说明 例  |
| :-----: | :----:  |
| invoke(ForkJoinTask)      | 提交任务并一直阻塞直到任务执行完成返回合并结果。  |
| execute(ForkJoinTask)       | 异步执行任务，无返回值  |
| submit(ForkJoinTask)       | 异步执行任务，返回task本身，可以通过task.get()方法获取合并之后的结果。  |

+ 是否有返回值

+ 1.如果有返回值就继承RecursiveTask，没有返回值就继承RecursiveAction
+ 2.invoke同步调用，如果想要异步调用，可以使用pool.execute(...);替换invoke方法


[img3]:../../.././imgs/java/thread/874963-20180523154643214-1612544334.png
[img3_]:../../../../imgs/java/thread/874963-20180523154643214-1612544334.png
[img4]:../../.././imgs/java/thread/874963-20180523155916226-588922770.png
[img4_]:../../../../imgs/java/thread/874963-20180523155916226-588922770.png

[img5]:../../.././imgs/java/thread/874963-20180523163540976-673113189.png
[img5_]:../../../../imgs/java/thread/874963-20180523163540976-673113189.png
[img6]:../../.././imgs/java/thread/874963-20180523165423328-909454940.png
[img6_]:../../../../imgs/java/thread/874963-20180523165423328-909454940.png
[img7]:../../.././imgs/java/thread/874963-20180523170036097-1854162491.png
[img7_]:../../../../imgs/java/thread/874963-20180523170036097-1854162491.png
[img8]:../../.././imgs/java/thread/874963-20180523170046577-972016318.png
[img8_]:../../../../imgs/java/thread/874963-20180523170046577-972016318.png

[img9]:../../.././imgs/java/thread/874963-20180523170247725-1317698839.png
[img9_]:../../../../imgs/java/thread/874963-20180523170247725-1317698839.png
[img10]:../../.././imgs/java/thread/874963-20180523171750912-109401693.png
[img10_]:../../../../imgs/java/thread/874963-20180523171750912-109401693.png
[img11]:../../.././imgs/java/thread/874963-20180523172200955-636692873.png
[img11_]:../../../../imgs/java/thread/874963-20180523172200955-636692873.png
[img12]:../../.././imgs/java/thread/874963-20180523173616950-645619291.png
[img12_]:../../../../imgs/java/thread/874963-20180523173616950-645619291.png

[img13]:../../.././imgs/java/thread/874963-20180523174040579-1660483412.png
[img13_]:../../../../imgs/java/thread/874963-20180523174040579-1660483412.png
[img14]:../../.././imgs/java/thread/874963-20180523175928739-1854695576.png
[img14_]:../../../../imgs/java/thread/874963-20180523175928739-1854695576.png
[img15]:../../.././imgs/java/thread/874963-20180523180033920-1766834164.png
[img15_]:../../../../imgs/java/thread/874963-20180523180033920-1766834164.png
[img16]:../../.././imgs/java/thread/874963-20180523180043948-1139632177.png
[img16_]:../../../../imgs/java/thread/874963-20180523180043948-1139632177.png

[img17]:../../.././imgs/java/thread/874963-20180523182024837-2085258468.png
[img17_]:../../../../imgs/java/thread/874963-20180523182024837-2085258468.png


[img18]:../../.././imgs/java/thread/874963-20180523163529873-1907395587.png
[img18_]:../../../../imgs/java/thread/874963-20180523163529873-1907395587.png
[img19]:../../.././imgs/java/thread/874963-20180523163554075-1223888829.png
[img19_]:../../../../imgs/java/thread/874963-20180523163554075-1223888829.png
