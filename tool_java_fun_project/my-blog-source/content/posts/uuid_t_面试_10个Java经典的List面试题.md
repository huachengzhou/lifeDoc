---
title : '10个Java经典的List面试题'
date : '2021-02-15'
draft : false
tags : ["面试"]
categories : ["java","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---


1、你知道的 List 都有哪些？
ArrayList、LinkedList、Vector 等。
2、List 和 Vector 有什么区别？
Vector 是 List 接口下线程安全的集合。
3、List 是有序的吗？
List 是有序的。
4、ArrayList 和 LinkedList 的区别？分别用在什么场景？
ArrayList 和 LinkedList 数据结构不一样，前者用在查询较多的场合，后者适用于插入较多的
场合。
5、ArrayList 和 LinkedList 的底层数据结构是什么？
ArrayList 使用的是数组结构，LinkedList 使用的是链表结构。
6、ArrayList 默认大小是多少，是如何扩容的？
Jdk1.7 之前 ArrayList 默认大小是 10，JDK1.7 之后是 0，JDK 差异，每次约按 1.5 倍扩容。
7、List 是线程安全的吗？如果要线程安全要怎么做？
List 中 的 Vector 才 是 线 程 安 全 的 ， 其 他 要 实 现 线 程 安 全 使 用 工 具 类
Collections.synchronizedList(new ArrayList())方法。
8、怎么给 List 排序？
使用 List 自身的 sort 方法，或者使用 Collections.sort(list)方法;
9、Arrays.asList 方法后的 List 可以扩容吗？
Arrays.asList 使用的是 final 数组，并且不支持 add 方法，不支持扩容。
10、List 和 Array 之间如何互相转换？
List>Array 使用 toArray 方法，Array>List 使用 Arrays.asList(array)方法，由于它是固定的，不固
定的可以使用 new ArrayList(Arrays.asList(array))。
