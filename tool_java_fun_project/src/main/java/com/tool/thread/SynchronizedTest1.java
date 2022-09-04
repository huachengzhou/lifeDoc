package com.tool.thread;

import org.openjdk.jol.info.ClassLayout;

public class SynchronizedTest1 {
    public static void main(String[] args) throws Exception {
        runD() ;
    }

    /**
     * 无锁 -> 偏向锁 -> 轻量级锁 -> 重量级锁
     * @throws Exception
     */
    public static void runD()throws Exception{
        System.out.println("run...................");
        //偏向锁
        long millis = 5000;
        //偏向锁 默认4秒后开启
        Thread.sleep(millis);
        Student student = new Student();
        System.out.println(ClassLayout.parseInstance(student).toPrintable());

        synchronized (student) {
            System.out.println("偏向锁");
            System.out.println(ClassLayout.parseInstance(student).toPrintable());
        }
        Thread thread = new Thread(() -> {
            synchronized (student) {
                System.out.println("轻量级锁(threadA不启动的情况)");
                System.out.println(ClassLayout.parseInstance(student).toPrintable());
                try {
                    //让线程晚点儿死亡，造成锁的竞争
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        Thread threadA = new Thread(() -> {
            synchronized (student) {
                System.out.println("重量级锁");
                System.out.println(ClassLayout.parseInstance(student).toPrintable());
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        thread.start();
        threadA.start();//注释后  thread中的对象标识符是轻量级锁
    }

    /**
     * 无锁 -> 偏向锁 -> 轻量级锁
     * @throws Exception
     */
    public static void runC()throws Exception{
        System.out.println("run...................");
        //偏向锁
        long millis = 5000;
        //偏向锁 默认4秒后开启
        Thread.sleep(millis);
        Student student = new Student();
        System.out.println(ClassLayout.parseInstance(student).toPrintable());

        synchronized (student) {
            System.out.println("偏向锁");
            System.out.println(ClassLayout.parseInstance(student).toPrintable());
        }
        Thread thread = new Thread(() -> {
            synchronized (student) {
                System.out.println("轻量级锁");
                System.out.println(ClassLayout.parseInstance(student).toPrintable());
            }
        });

        thread.start();
        thread.join();

        System.out.println(ClassLayout.parseInstance(student).toPrintable());
    }

    /**
     * 轻量级锁
     * @throws Exception
     */
    public static void runB()throws Exception{
        //在4秒以前  创建的对象 对象头默认写入的是轻量级锁标识 只是没有写入线程相关和同步锁信息等
        Student tempStudent = new Student();
        System.out.println(ClassLayout.parseInstance(tempStudent).toPrintable());
        synchronized (tempStudent) {
            System.out.println(ClassLayout.parseInstance(tempStudent).toPrintable());
        }
        System.out.println(ClassLayout.parseInstance(tempStudent).toPrintable());
    }

    /**
     * 偏向锁
     * @throws Exception
     */
    public static void runA()throws Exception{
        System.out.println("run...................");
        long millis = 5000;
        //偏向锁 默认4秒后开启
        Thread.sleep(millis);
        System.out.println(String.format("休眠%s秒结束",String.valueOf(millis/1000)));
        Student student = new Student();
        System.out.println("当偏向锁可以使用的时候,对象头的mark word默认写入的就是首先使用偏向锁标识符");
        System.out.println("带偏向锁标识符的对象头的描述");
        System.out.println(ClassLayout.parseInstance(student).toPrintable());

        synchronized (student) {
            System.out.println("对象头的mark word写入了线程相关数据(如线程id)");
            System.out.println(ClassLayout.parseInstance(student).toPrintable());
        }
        System.out.println("结束!偏向锁线程执行完毕后不会立即移除对象头里面包含偏向锁的信息而是等到某个全局安全点系统在判断是否继续偏向锁");

        System.out.println(ClassLayout.parseInstance(student).toPrintable());
    }
}
