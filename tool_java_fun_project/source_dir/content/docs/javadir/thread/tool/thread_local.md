---
title: "ThreadLocal"
date: 2022-09-01
draft: false
weight: 1
---


## 一:介绍




> ThreadLocal直译为线程局部变量，或许将它命名为ThreadLocalVariable更为合适。其主要作用就是实现线程本地存储功能，通过线程本地资源隔离，解决多线程并发场景下线程安全问题

> 类ThreadLocal 主要解决的就是每个线程绑定自己的值,可以将ThreadLocal类比喻成全局存放数据的盒子,盒子中可以存放每个线程 的私有数据


## 二:用法举例

```java
public class ToolsThreadLocal {

    public static ThreadLocal t1 = new ThreadLocal();

}



public class ThreadLocalA extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 50; i++) {
            ToolsThreadLocal.t1.set("thread a "+i);
            System.out.println(ToolsThreadLocal.t1.get());
        }
    }
}


public class ThreadLocalB extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 50; i++) {
            ToolsThreadLocal.t1.set("thread b "+i);
            System.out.println(ToolsThreadLocal.t1.get());
        }
    }
}

public class ThreadLocalRun {
    public static void main(String[] args) {
        ThreadLocalA  threadLocalA = new ThreadLocalA();
        threadLocalA.start();

        ThreadLocalB  threadLocalB = new ThreadLocalB();
        threadLocalB.start();

        for (int i = 0; i < 50; i++) {
            ToolsThreadLocal.t1.set("thread main "+i);
            System.out.println(ToolsThreadLocal.t1.get());
        }
    }
}
```

## 三:应用场景

> 针对ThreadLocal而言，由于其适合隔离、线程本地存储等特性，因此天然的适合一些Web应用场景，比如下面所列举的例子：

+ 代替参数显式传递(很少使用)
+ 存储全局用户登录信息
+ 存储数据库连接，以及Session等信息
+ Spring事务处理方案

## 四:api

+ get

```java
public T get() {
    // 获取当前操作线程
    Thread t = Thread.currentThread();
    // 调用getMap方法，返回当前线程的实例变量threadLocals值
    ThreadLocalMap map = getMap(t);
    // 如果返回map不为空，返回map中所存储的以当前ThreadLocal对象为key的值
    if (map != null) {
        ThreadLocalMap.Entry e = map.getEntry(this);
        if (e != null) {
            @SuppressWarnings("unchecked")
            T result = (T)e.value;
            return result;
        }
    }
    // 如果map为空进行map值的初始化
    return setInitialValue();
}
 
ThreadLocalMap getMap(Thread t) {
    // 返回传入线程(当前线程)中成员变量的threadLocals值
    return t.threadLocals;
}
 
private T setInitialValue() {
    // 调用initialValue()方法设置初始值，默认不设置任何值，可以在创建ThreadLocal
    // 对象时被重写进行初始化，只会进行一次初始化。
    T value = initialValue();
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
    if (map != null)
        map.set(this, value);
    else
        createMap(t, value);
    return value;
}
 
void createMap(Thread t, T firstValue) {
    // 初始化当前线程对象实例变量threadLocals的值，Map所对应的key为当前ThreadLocal对象
    t.threadLocals = new ThreadLocalMap(this, firstValue);
}
```

+ set

```java
public void set(T value) {
    // 获取当前线程对象
    Thread t = Thread.currentThread();
    // 调用getMap方法，传入当前对象的值，获取当前线程的实例变量threadLocals值
    ThreadLocalMap map = getMap(t);
    if (map != null)
        map.set(this, value);
    else
        // 如果map为空，创建ThreadLocalMap
        createMap(t, value);
}
```


