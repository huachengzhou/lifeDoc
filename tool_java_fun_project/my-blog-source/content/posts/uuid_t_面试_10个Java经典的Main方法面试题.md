---
title : '10个Java经典的Main方法面试题'
date : '2021-02-15'
draft : false
tags : ["面试"]
categories : ["java","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---


1.main方法是做什么用的？

main方法是Java程序的入口方法，JVM在运行的时候会首先查找main方法。

2.不用main方法如何运行一个类？

不行，没有main方法我们不能运行Java类。
在Java 7之前，你可以通过使用静态初始化运行Java类。但是，从Java 7开始就行不通了。

3.main方法如何传递参数？传递参数的类型是什么？能不能改变该参数类型？

String数组，不能改变。

4.main方法为什么是静态的？能不能改为非静态？

main()方法一定是静态的，如果main()是非静态的那么在调用main方法时JVM就得实例化
它的类。

不能改为非静态，main()方法必须声明为静态的，这样JVM才可以调用main()方法而无需实
例化它的类。
如果从main()方法去掉“static”这个声明，虽然编译依然可以成功，但在运行时会导致程序
失败。
在实例化时，还得调用类的构造函数。如果这个类的构造函数有参数，那么届时就会出现歧
义。

5.main方法能被重载吗？

可以，我们可以重载main()方法。一个Java类可以有任意数量的main()方法。

6.main方法能被覆盖吗？

在Java中静态方法在编译时会编译在一起，main方法是静态方法，所以你在Java中不能覆
盖静态方法。

7.main方法的返回类型是什么？能不能改变？

void，不能改变。


8.main方法的作用域用什么修饰？能不能改变？

public，不能改变。

9.main方法可以同步吗？

main方法可以在Java中同步，synchronized修饰符允许用于main方法的声明中，这样就可
以在Java中同步main方法了。

10.main方法可以终结吗？

可以在Java中终结main方法。

```
更多关注Java大后端公众号
```

