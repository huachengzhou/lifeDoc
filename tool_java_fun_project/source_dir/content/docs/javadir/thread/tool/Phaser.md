---
title: "Phaser"
date: 2022-09-01
draft: false
weight: 4
---


# Phaser


java7中引入了一种新的可重复使用的同步屏障,称为移相器Phaser

Phaser拥有与CyclicBarrier和CountDownLatch类似的功劳.但是这个类提供了更加灵活的应用.CountDownLatch和CyclicBarrier都是只适用于固定数量的参与者.移相器适用于可变数目的屏障,在这个意义上,可以在任何时间注册新的参与者.并且在抵达屏障是可以注销已经注册的参与者.因此,注册到同步移相器的参与者的数目可能会随着时间的推移而变化

如CyclicBarrier一样,移相器可以重复使用,这意味着当前参与者到达移相器后,可以再一次注册自己并等待另一次到达.因此,移相器会有多代.一旦为某个特定相位注册的所有参与者都到达移相器,就增加相数.相数从零开始,在达到Integer.MAX_VALUE后,再次绕回0.当移相器发生变化时,通过重写onAdvance方法,可以自行可选操作.这个方法也可用于终止移相器.移相器一旦被终止,所有的同步方法就会立即返回,并尝试注册新的失败的参与者

移相器的另一个重要特征是:移相器可能是分层的,这允许你以树形结构来安排移相器以减少竞争.很明显,更小的组将拥有更少的竞争同步的参与者.因此,将大量的参与者分成较小的组可以减少竞争.虽然创建移相器能增加中的吞吐量,但是这需要更多的开销.最后,移相器的另一个重要的特征在于监控功能,使用独立的对象可以监视移相器的当前状态.监视器可以查询注册到移相器的参与者的数量,以及已经到达和还没有到达某个特定相数的参与者的数量

Phaser中是通过计数器来控制。在Phaser中计数器叫做parties， 我们可以通过Phaser的构造函数或者register()方法来注册

通过调用register()方法，我们可以动态的控制phaser的个数。如果我们需要取消注册，则可以调用arriveAndDeregister()方法

## 方法

+ **register()**
+ 注册一个需要协作的线程。

+ **bulkRegister(int parties)**
+ 批量注册需要协作的线程。

+ **arrive()**
+ 到达屏障直接执行，无需等待其他线程。

+ **arriveAndAwaitAdvance()**
+ 到达屏障，必须等待其他线程。

+ **arriveAndDeregister()**
+ 到达屏障，注销自己，无需等待其他线程到达。

+ **onAdvance(int phase, int registeredParties)**
+ 参与协作的线程都到达屏障后，会调用该方法。

## 例子

+ case 1

```java
   final Phaser phaser = new Phaser(3) {
            @Override
            protected boolean onAdvance(int phase, int registeredParties) {
                System.out.println(phase + "_" + registeredParties);
                System.out.println(Thread.currentThread().getName() + " 调用了onAdvance方法");
//                switch (phase) {
//                    case 0:
//                        System.out.println("第一阶段，买食材完成啦！总共参与人数：" + registeredParties);
//                        return false;
//                    case 1:
//                        System.out.println("第二阶段，炒菜完成啦！总共参与人数：" + registeredParties);
//                        return false;
//                    case 2:
//                        System.out.println("第三阶段，吃完饭啦！总共参与人数：" + registeredParties);
//                        return false;
//                    default:
//                        return true;
//                }
                return super.onAdvance(phase, registeredParties);
            }
        };

        for (int i = 1; i <= 1 * 3; i++) {
            if (i >= 2 && i % 3 == 1) {
                System.out.println("i:" + i);
//                phaser.bulkRegister(3);
            }
            new Thread(String.valueOf(i)) {
                public void run() {
                    //注册
//                    phaser.register();
                    System.out.println(Thread.currentThread().getName()+"---------------------");
                    //注册并释放
                    phaser.arriveAndAwaitAdvance();
                    System.out.println(Thread.currentThread().getName() + "....................");
                }
            }.start();
        }
```
