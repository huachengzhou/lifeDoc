---
title : 'DOS > file'
date : '2021-02-15'
draft : false
tags : ["windows"]
categories : ["Temp","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---



# DOS基本文件操作命令

+ wing+r  ==> cmd 进入dos控制台

+ D:

```
进入D盘
```


+ cd命令

```
CD命令是更改目录命令 如果要进入D盘不用这个命令直接输入 D: 回车 即可
例如:
C:\Users\HP>D:

D:\>

D:\>dir
 驱动器 D 中的卷是 新加卷
 卷的序列号是 DAB4-11FE

 D:\ 的目录

2019-10-10  14:15    <DIR>          360极速浏览器下载
2020-01-13  13:47    <DIR>          BaiduNetdiskDownload
2020-01-20  13:59    <DIR>          CS
2019-12-13  16:53    <DIR>          data
2020-02-10  15:55    <DIR>          IdeaProjects
2019-12-06  15:01    <DIR>          log
2019-10-23  10:40    <DIR>          MailMasterData
2019-09-29  10:43    <DIR>          output
2020-01-13  13:40    <DIR>          soft
2020-02-04  17:43    <DIR>          temp
2020-01-15  18:05    <DIR>          ultraeditWork
2019-12-10  09:47    <DIR>          workspace
               0 个文件              0 字节
              12 个目录 463,738,040,320 可用字节

D:\>cd CS
D:\CS> /*进入了CS目录**/

```

+ cd .. (进入当前磁盘的上一级)

```

类似于 linux 下的cd ~
zch@zch MINGW64 /d/data
$ cd ~

已经在某个磁盘下的情况下可以用cd 进入目录
C:\Users\noatn>cd d:\tencent

C:\Users\noatn>cd C:\Users\noatn\.android

C:\Users\noatn\.android>
这里进入d盘失败但是成功进入了C盘预计的目录
```




+ 创建文件 echo >fileName或者 echo [this content] > fileName

```

echo >d.txt;

============>
E:\temp>echo >d.txt;

E:\temp>dir
 驱动器 E 中的卷是 新加卷
 卷的序列号是 64E8-4ABF

 E:\temp 的目录

2020/02/14  18:56    <DIR>          .
2020/02/14  18:56    <DIR>          ..
2020/02/14  18:56                 3 d.txt
               1 个文件              3 字节
               2 个目录 264,645,689,344 可用字节

```

+ 查看文件内容 type fileName

```
E:\temp>type d.txt
this is a text file
```

+ 创建目录 md pathName

```
E:\temp>md cc

E:\temp>dir
 驱动器 E 中的卷是 新加卷
 卷的序列号是 64E8-4ABF

 E:\temp 的目录

2020/02/14  19:02    <DIR>          .
2020/02/14  19:02    <DIR>          ..
2020/02/14  19:02    <DIR>          cc
2020/02/14  18:59                19 d.txt
               1 个文件             19 字节
               3 个目录 264,645,689,344 可用字节
```


+ 复制文件 copy fileName path+fileName

```
E:\temp>copy d.txt E:\temp\cc;
已复制         1 个文件。
```



+ 深复制 XCOPY

```
H:\>xcopy /?
复制文件和目录树。

XCOPY source [destination] [/A | /M] [/D[:date]] [/P] [/S [/E]] [/V] [/W]
                           [/C] [/I] [/Q] [/F] [/L] [/G] [/H] [/R] [/T] [/U]
                           [/K] [/N] [/O] [/X] [/Y] [/-Y] [/Z] [/B] [/J]
                           [/EXCLUDE:file1[+file2][+file3]...]

  source       指定要复制的文件。
  destination  指定新文件的位置和/或名称。
  /A           仅复制有存档属性集的文件，
               但不更改属性。
  /M           仅复制有存档属性集的文件，
               并关闭存档属性。
  /D:m-d-y     复制在指定日期或指定日期以后更改的文件。
               如果没有提供日期，只复制那些
               源时间比目标时间新的文件。
  /EXCLUDE:file1[+file2][+file3]...
               指定含有字符串的文件列表。每个字符串
               在文件中应位于单独的一行。如果任何
               字符串与复制文件的绝对路径的任何部分相符，
               则排除复制该文件。例如，
               指定如 \obj\ 或 .obj 的字符串会分别
               排除目录 obj 下面的所有文件或带有
               .obj 扩展名的所有文件。
  /P           创建每个目标文件之前提示你。
  /S           复制目录和子目录，不包括空目录。
  /E           复制目录和子目录，包括空目录。
               与 /S /E 相同。可以用来修改 /T。
  /V           验证每个新文件的大小。
  /W           提示你在复制前按键。
  /C           即使有错误，也继续复制。
  /I           如果目标不存在，且要复制多个文件，
               则假定目标必须是目录。
  /Q           复制时不显示文件名。
  /F           复制时显示完整的源文件名和目标文件名。
  /L           显示要复制的文件。
  /G           允许将加密文件复制到
               不支持加密的目标。
  /H           也复制隐藏文件和系统文件。
  /R           覆盖只读文件。
  /T           创建目录结构，但不复制文件。不
               包括空目录或子目录。/T /E 包括
               空目录和子目录。
  /U           只复制已经存在于目标中的文件。
  /K           复制属性。一般的 Xcopy 会重置只读属性。
  /N           用生成的短名称复制。
  /O           复制文件所有权和 ACL 信息。
  /X           复制文件审核设置(隐含 /O)。
  /Y           取消提示以确认要覆盖
               现有目标文件。
  /-Y          要提示以确认要覆盖
               现有目标文件。
  /Z           在可重新启动模式下复制网络文件。
  /B           复制符号链接本身与链接目标。
  /J           复制时不使用缓冲的 I/O。推荐复制大文件时使用。

开关 /Y 可以预先在 COPYCMD 环境变量中设置。
这可能被命令行上的 /-Y 覆盖。
```

+ 深复制 案例

```

H:\>XCOPY Java学习相关电子书籍 E:\temp\mess

不加参数只是复制了文件，并没有复制要复制的文件夹里的文件夹
接下来复制一个包含子文件夹的案例
H:\>XCOPY Java学习相关电子书籍 E:\temp\aess /s/e
目标 E:\temp\aess 是文件名
还是目录名
(F = 文件，D = 目录)? d
Java学习相关电子书籍\Algorithms 4th Edition.pdf
Java学习相关电子书籍\Core Java. Volume II. Advanced Features, 8th Edition.pdf
Java学习相关电子书籍\Core.Java.Volume.I.Fundamentals,8th.Edition.pdf
Java学习相关电子书籍\Effective.Enterprise.Java.pdf
Java学习相关电子书籍\Flex+白皮书.pdf
Java学习相关电子书籍\Flex3高级图表开发指南.pdf
Java学习相关电子书籍\Google笔试题.pdf
Java学习相关电子书籍\head first javascript中文版.pdf
Java学习相关电子书籍\Head First Java中文版(深入浅出Java)[零基础推荐].pdf
Java学习相关电子书籍\Head First Servlet JSP(清晰中文版).PDF
Java学习相关电子书籍\Head First 设计模式.pdf
Java学习相关电子书籍\HttpClient入门.pdf
Java学习相关电子书籍\ibatis开发指南.pdf
Java学习相关电子书籍\J2EE反模式.pdf
Java学习相关电子书籍\Java Collections中的Fail Fast机制.pdf
Java学习相关电子书籍\Java Network Programming.pdf
Java学习相关电子书籍\Java Web动态图表编程.pdf
Java学习相关电子书籍\Java Web开发典型模块大全.pdf
Java学习相关电子书籍\Java 编程思想 -- 面向对象逻辑思维.pdf
Java学习相关电子书籍\Java.Rules中文版.pdf
Java学习相关电子书籍\Java.Web服务开发.pdf
Java学习相关电子书籍\JAVA2核心技术第1卷.基础知识7th.pdf
Java学习相关电子书籍\Java2网络协议技术内幕.pdf
Java学习相关电子书籍\JavaScript王者归来.pdf
Java学习相关电子书籍\JavaScript高级程序设计（第3版）中文 高清 完整 (1).pdf
Java学习相关电子书籍\JAVA与XML.pdf
Java学习相关电子书籍\JAVA优化编程.pdf
Java学习相关电子书籍\java入门到详解[推荐].pdf
Java学习相关电子书籍\java华为面试题.pdf
Java学习相关电子书籍\Java基础与案例开发详解.pdf
Java学习相关电子书籍\java基础教程(强烈推荐).pdf
Java学习相关电子书籍\Java夜未眠_程序员的心声.pdf
Java学习相关电子书籍\java实例详解.pdf
Java学习相关电子书籍\Java并发程序设计教程.pdf
Java学习相关电子书籍\Java开发利器Myeclipse全面详解.pdf
Java学习相关电子书籍\Java开发实战经典.pdf
Java学习相关电子书籍\Java数据结构和算法.pdf
Java学习相关电子书籍\Java数据结构和算法中文第二版[jb51.net].pdf
Java学习相关电子书籍\Java最著名的开源项目.pdf
Java学习相关电子书籍\Java核心技术 卷1 基础知识 原书第9版.pdf
Java学习相关电子书籍\JAVA核心技术卷2：高级特征.pdf
Java学习相关电子书籍\java核心技术，完整中文版.pdf
Java学习相关电子书籍\Java线程.pdf
Java学习相关电子书籍\Java经典问题答案.pdf
Java学习相关电子书籍\Java经典问题答案（带书签）.pdf
Java学习相关电子书籍\Java编程及相关书籍.O&#39;Reilly.Creating.Effective.Javahelp.pdf
Java学习相关电子书籍\Java编程指南.pdf
Java学习相关电子书籍\Java编程规范.pdf
Java学习相关电子书籍\Java编辑思想（第四版）..pdf
Java学习相关电子书籍\Java网络socket编程详解.pdf
Java学习相关电子书籍\Java网络编程技术与实践.pdf
Java学习相关电子书籍\Java虚拟机规范（Java SE 7）.pdf
Java学习相关电子书籍\Java解惑(中文).pdf
Java学习相关电子书籍\Java设计模式之抽象工厂模式.pdf
Java学习相关电子书籍\Java语言导学(第3版)CN.pdf
Java学习相关电子书籍\Java语言规范中文版(第三版).pdf
Java学习相关电子书籍\JAVA面向对象编程(孙卫琴).pdf
Java学习相关电子书籍\Java项目开发案例全程实录_第二版_.pdf
Java学习相关电子书籍\JDK1.5的泛型实现.pdf
Java学习相关电子书籍\jQuery基础教程第四版 (2).pdf
Java学习相关电子书籍\jQuery技术内幕：深入解析jQuery架构设计与实现原理.pdf
Java学习相关电子书籍\JSTL标签.pdf
Java学习相关电子书籍\Oracle与SQLServe..pdf
Java学习相关电子书籍\oracle存储过程超详细使用手册..pdf
Java学习相关电子书籍\Oracle数据库性能优化.pdf
Java学习相关电子书籍\Python Programming With The Java Class Libraries - A Tutorial For Building Web And Enterprise Applications With Jython..pdf
Java学习相关电子书籍\Spring.2.0核心技术与最佳实践.廖雪峰.扫描版.pdf
Java学习相关电子书籍\Spring基础教程.pdf
Java学习相关电子书籍\SPRING开发指南.pdf
Java学习相关电子书籍\SSH基础知识 常用命令 配置实例.pdf
Java学习相关电子书籍\Struts 2 in Action.pdf
Java学习相关电子书籍\Struts中文手册.pdf
Java学习相关电子书籍\The Java Virtual Machine Specification, Java SE 7 Edition.pdf
Java学习相关电子书籍\Thinking.In.Java(中文版).pdf
Java学习相关电子书籍\Windows API开发详解 函数、接口、编程实例.pdf
Java学习相关电子书籍\[21天学通Java.6(第5版)].Rogers.Cadenhead&Laura.Lemay.扫描版.pdf
Java学习相关电子书籍\[Flex.3实战].（美）艾哈迈德，（美）赫希，（美）阿比德.扫描版.pdf
Java学习相关电子书籍\[Java并发编程实践].(Java.Concurrency.in.Practice).Brian.Goetz.文字版(1).pdf
Java学习相关电子书籍\[JAVA消息服务].（美）Mark.Richards,.Richard.Monson-Haefel,.David.A.Chappell.文字版.pdf
Java学习相关电子书籍\[Java编程及相关书籍].O&#39;Reilly.Creating.Effective.Javahelp.pdf
Java学习相关电子书籍\[Java网络编程(第3版,2004)].(Java.Network.Programming).Elliotte.Rusty.Harold.文字版.pdf
Java学习相关电子书籍\[Java语言程序设计].(Introduction.to.Java.Programming,.Brief.Version,.8ed),.Liang,.文字版.pdf
Java学习相关电子书籍\[代码大全2中文版(完整清晰版)].pdf
Java学习相关电子书籍\《Effective JavaScript》扫描版（中文） (3).pdf
Java学习相关电子书籍\《SQL查询的艺术》.(张权,郭天娇).[PDF]@jb51.net.pdf
Java学习相关电子书籍\《经典JavaEE企业应用实战》 (1).pdf
Java学习相关电子书籍\中兴面试题.pdf
Java学习相关电子书籍\初学者第1章 对象入门.pdf..pdf
Java学习相关电子书籍\北京中软笔试题.pdf
Java学习相关电子书籍\华为试题.pdf
Java学习相关电子书籍\基于MVC的JavaScript Web富应用开发(完整版).pdf
Java学习相关电子书籍\大话数据结构.pdf
Java学习相关电子书籍\大话设计模式(1).pdf
Java学习相关电子书籍\大话设计模式.pdf
Java学习相关电子书籍\实用J2EE设计模式编程指南.pdf
Java学习相关电子书籍\实用算法基础教程.pdf
Java学习相关电子书籍\广东北电面试题.pdf
Java学习相关电子书籍\快速软件开发..pdf
Java学习相关电子书籍\排序算法汇总.pdf
Java学习相关电子书籍\新手学Java 7编程（第5版）.pdf
Java学习相关电子书籍\深入JAVA虚拟机.pdf
Java学习相关电子书籍\深入JAVA虚拟机第二版.pdf
Java学习相关电子书籍\深入体验Java Web开发内幕——核心基础.pdf
Java学习相关电子书籍\深入体验Javaweb开发内幕（高级特性）.pdf
Java学习相关电子书籍\深入学习：JFC SWING—JAVA 基础类组件集.pdf
Java学习相关电子书籍\王牌1 Java SE 类库查询手册.pdf
Java学习相关电子书籍\王牌2 学习成果检测——【练一练】答案.pdf
Java学习相关电子书籍\王牌3 Eclipse常用快捷键.pdf
Java学习相关电子书籍\王牌4 Eclipse提示与技巧.pdf
Java学习相关电子书籍\王牌5 Java程序员职业规划.pdf
Java学习相关电子书籍\王牌6 Java程序员面试技巧.pdf
Java学习相关电子书籍\王牌7 Java常见面试题.pdf
Java学习相关电子书籍\王牌8 扫雷英雄榜——Java常见错误及解决方案.pdf
Java学习相关电子书籍\王牌9 优秀程序员之路——Java开发经验及技巧大汇总.pdf
Java学习相关电子书籍\百度试题.pdf
Java学习相关电子书籍\第10章 Java IO系统.pdf
Java学习相关电子书籍\第11章 运行期类型鉴定.pdf
Java学习相关电子书籍\第12章 传递和返回对象.pdf
Java学习相关电子书籍\第13章 创建窗口和程序片.pdf
Java学习相关电子书籍\第14章 多线程.pdf
Java学习相关电子书籍\第15章 网络编程(1).pdf
Java学习相关电子书籍\第16章 设计范式.pdf
Java学习相关电子书籍\第17章 项目.pdf
Java学习相关电子书籍\第2章 一切都是对象.pdf
Java学习相关电子书籍\第3章 控制程序流程.pdf
Java学习相关电子书籍\第4章 初始化和清除.pdf
Java学习相关电子书籍\第5章 隐藏实施过程.pdf
Java学习相关电子书籍\第6章 类再生.pdf
Java学习相关电子书籍\第7章 多形性.pdf
Java学习相关电子书籍\第8章 对象的容纳.pdf
Java学习相关电子书籍\第9章 异常差错控制.pdf
Java学习相关电子书籍\算法与数据结构-实用算法基础教程.pdf
Java学习相关电子书籍\算法导论.pdf
Java学习相关电子书籍\精通JavaScript动态网页编程(实例版).pdf
Java学习相关电子书籍\精通JavaScript（中文清晰优化版）.pdf
Java学习相关电子书籍\精通spring - Mastering Spring.pdf
Java学习相关电子书籍\精通Struts基于MVC的Java Web设计与开发(1).pdf
Java学习相关电子书籍\精通Struts基于MVC的Java Web设计与开发.pdf
Java学习相关电子书籍\经典查询练手.pdf
Java学习相关电子书籍\编程之美-完整版.pdf
Java学习相关电子书籍\网易笔试题.pdf
Java学习相关电子书籍\网站开发前台后台技术指南.pdf
Java学习相关电子书籍\罗时飞.精通spring.pdf
Java学习相关电子书籍\腾讯试题.pdf
Java学习相关电子书籍\解析Java虚拟机器开发：权衡优化、高效和安全的最优方案.pdf
Java学习相关电子书籍\计算机导论与JavaScript编程(第3版).pdf
Java学习相关电子书籍\设计模式：Java语言中的应用.pdf
Java学习相关电子书籍\迅雷笔试题.pdf
Java学习相关电子书籍\重构-改善既有代码的设计.pdf
Java学习相关电子书籍\重构_改善既有代码的设计[高清版]..pdf
Java学习相关电子书籍\附录A 使用非JAVA代码.pdf
Java学习相关电子书籍\附录B 对比C++和java.pdf
Java学习相关电子书籍\附录C Java编程规则.pdf
Java学习相关电子书籍\附录D 性能.pdf
Java学习相关电子书籍\附录E 关于垃圾收集的一些话.pdf
Java学习相关电子书籍\高效程序员的45个习惯：敏捷开发修炼之道.pdf
Java学习相关电子书籍\黑客入门(超级详细版).pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\100道趣题.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\15天学会jQuery(0-5).pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\15天学会jQuery(11-15).pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\15天学会jQuery(6-10).pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\15天学会jquery(完整版).pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\css权威指南.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\CSS禅意花园.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\CSS网站布局实录 （第二版）.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\Head First HTML与CSS、XHTML  （中文版）.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\HTML5高级程序设计  [西林街 - 千万亿网盘资源 www.xilinjie.com].pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\HTML_5从入门到精通.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\JavaScript DOM编程艺术（中文第二版）.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\JavaScript.DOM高级程序设计.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\JavaScript设计模式.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\JavaScript语言精粹_修订版.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\JavaScript高级程序设计（第3版）中文 高清 完整.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\JQUERY权威指南（完整版）.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\ppk谈JavaScript.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\Secrets of the JavaScript Ninja.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[HTML5游戏开发].(Jeanine Meyer).徐阳等.扫描版.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[HTML5资料]Canvas入门基础教程.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[JavaScript高级程序设计(第2版)].（美）泽卡斯.扫描版.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[jQuery攻略].(印)哈瓦尼.扫描版.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[JQuery菜鸟到忍者].Sitepoint.jQuery.Novice.to.Ninja.Feb.2010.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[ppk谈JavaScript].(荷)科克.扫描版(第一部分).pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[web开发CSS系列].Apress.Pro.CSS.Techniques.Nov.2006.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[web开发CSS系列].SitePoint.Everything.You.Know.About.CSS.is.Wrong.Oct.2008.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[web开发CSS系列].The.Art.and.Science.of.CSS.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[web开发CSS系列].The.Principles.of.Beautiful.Web.Design.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[web开发CSS系列].The.Ultimate.CSS.Reference.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[web开发CSS系列].UIdesignForMereMortals.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[web开发CSS系列].WebDevelopmentSolutions.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[大家网]高性能网站建设指南[www.TopSage.com].pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[深入浅出Javascript].O'reilly.Head.First.Javascript.Jan.2008.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[精通CSS高级Web标准解决方案].CSS.Mastery.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[网页重构xhtml.css].Ajax.In.Action.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[网页重构xhtml.css].Bulletproof_Web_Design.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[网页重构xhtml.css].css.hack.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[网页重构xhtml.css].css.mastery.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[高性能网站建设指南——前端工程师技能精粹(英文原版)].O'Reilly.High.Performance.Web.Sites.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[高性能网站建设进阶指南].(Even.Faster.Web.Sites).Steve.Souders.文字版.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\[高流量网站的CSS设计].(Pro.CSS.for.High.Traffic.Websites).A.Kennedy&I.d.Leon.文字版.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\大巧不工Web前端设计修炼之道  [西林街 - 千万亿网盘资源 www.xilinjie.com].pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\悟透JavaScript.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\淘宝的HTML5实践.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\用AngularJS开发下一代Web应用.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\瞬间之美 Web界面设计如何让用户心动.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\精彩绝伦的CSS.pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\精通JavaScript(图灵计算机科学丛书).pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\网站重构—应用Web标准进行设计[中文版].pdf
Java学习相关电子书籍\JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍\高性能JavaScript.pdf
复制了 208 个文件


JavaWEB(htmi,css）、JavaScript、jQuery等相关书籍 这个就是子文件夹


 xcopy D:\CS E:\kk\ /s/c
```


+ 文件重命名命令 ren sourceFileName targetFileName

```
E:\temp\cc>ren d.txt d2.txt;

E:\temp\cc>type d2.txt
this is a text file
```

+ 文件移动命令(剪贴命令) move fileName path+FileName

```
E:\temp\cc>move d2.txt E:\temp\kk
移动了         1 个文件。
```


+ 文件删除操作 del fileName

```
E:\temp\kk>dir
 驱动器 E 中的卷是 新加卷
 卷的序列号是 64E8-4ABF

 E:\temp\kk 的目录

2020/02/14  19:10    <DIR>          .
2020/02/14  19:10    <DIR>          ..
2020/02/14  18:59                19 d2.txt
               1 个文件             19 字节
               2 个目录 264,645,689,344 可用字节

E:\temp\kk>del d2.txt

E:\temp\kk>dir
 驱动器 E 中的卷是 新加卷
 卷的序列号是 64E8-4ABF

 E:\temp\kk 的目录

2020/02/14  19:12    <DIR>          .
2020/02/14  19:12    <DIR>          ..
               0 个文件              0 字节
               2 个目录 264,645,689,344 可用字节
```

+ 删除特定文件夹下的文件
```
E:\temp>del kk
E:\temp\kk\*, 是否确认(Y/N)? Y
删除kk文件夹下所以的文件
```


+ 文件夹删除 rd /s path

```
E:\temp\kk>rd /s dg
dg, 是否确认(Y/N)? Y
```

+ 文件夹删除 rd  path

```
PS E:\temp> dir                                                                                                                                                                                                    

    目录: E:\temp


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----        2020/2/15     10:40                cc
d-----        2020/2/15     12:01                kk
-a----        2020/2/14     18:59             19 d2.txt


PS E:\temp> rd cc     
```

+ dos命令下正则表达式有效

```
D:\ter>del  *.txt ;
```

