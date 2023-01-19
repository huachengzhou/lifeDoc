---
title : 'dom4j'
date : '2021-02-15'
draft : false
tags : ["tool"]
categories : ["java","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---

# dom4j

> 选取节点

+ nodename 选取当前节点的所有子节点

+ / 从根节点选取

+ // 从匹配选择的当前节点选择文档中的节点，而不考虑它们的位置

+ . 选取当前节点

+  .. 选取当前节点的父节点

+ @ 选取属性

> 实例
+ 路径表达式  &nbsp;结果

+ bookstore 选取 bookstore 元素的所有子节点

+ /bookstore 选取根元素 bookstore

+ bookstore/book 选取bookstore 下名字为 book的所有子元素。

+ //book 选取所有 book 子元素，而不管它们在文档中的位置。

+ bookstore//book 选取bookstore 下名字为 book的所有后代元素，而不管它们位于 bookstore 之下的什么位置。

+ //@lang 选取所有名为 lang 的属性。

> 常见的谓语的一些路径表达式

+ /bookstore/book[1] 选取属于 bookstore 子元素的第一个 book 元素。
+ /bookstore/book[last()] 选取属于 bookstore 子元素的最后一个 book 元素。
+ /bookstore/book[last()-1] 选取属于 bookstore 子元素的倒数第二个 book 元素。
+ /bookstore/book[position()<3] 选取最前面的两个属于 bookstore 元素的子元素的 book 元素。
+ //title[@lang] 选取所有拥有名为 lang 的属性的 title 元素。
+ //title[@lang='eng'] 选取所有 title 元素，要求这些元素拥有值为 eng 的 lang 属性。
+ /bookstore/book[price>35.00] 选取所有 bookstore 元素的 book 元素，要求book元素的子元素 price 元素的值须大于 35.00。
+ /bookstore/book[price>35.00]/title 选取所有 bookstore 元素中的 book 元素的 title 元素，要求book元素的子元素 price 元素的值须大于 35.00

> 选取未知节点

+ 通配符 描述
+ * 匹配任何元素节点
+ @* 匹配任何属性节点
+ node() 匹配任何类型的节点
+ 路径表达式 结果
+ //book/title | //book/price 选取所有 book 元素的 title 和 price 元素。
+ //title | //price 选取所有文档中的 title 和 price 元素。
+ /bookstore/book/title|//price 选取所有属于 bookstore 元素的 book 元素的title 元素，以及文档中所有的 price 元素。
  
