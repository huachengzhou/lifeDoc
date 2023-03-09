---
title: "python pyqt5"
date: 2023-03-02
draft: false
weight: 101
---

# 关于 PyQt5

PyQt5 是Digia的一套Qt5应用框架与python的结合，同时支持2.x和3.x。本教程使用的是3.x。Qt库由Riverbank Computing开发，是最强大的GUI库之一 ，官方网站：www.riverbankcomputing.co.uk/news。

PyQt5是由一系列Python模块组成。超过620个类，6000函数和方法。能在诸如Unix、Windows和Mac OS等主流操作系统上运行。PyQt5有两种证书，GPL和商业证书。

PyQt5类分为很多模块，主要模块有：

* QtCore 包含了核心的非GUI的功能。主要和时间、文件与文件夹、各种数据、流、URLs、mime类文件、进程与线程一起使用。
* QtGui 包含了窗口系统、事件处理、2D图像、基本绘画、字体和文字类。
* QtWidgets
* QtMultimedia
* QtBluetooth
* QtNetwork
* QtPositioning
* Enginio
* QtWebSockets
* QtWebKit
* QtWebKitWidgets
* QtXml
* QtSvg
* QtSql
* QtTest

QtWidgets类包含了一系列创建桌面应用的UI元素。 QtMultimedia包含了处理多媒体的内容和调用摄像头API的类。 QtBluetooth模块包含了查找和连接蓝牙的类。 QtNetwork包含了网络编程的类，这些工具能让TCP/IP和UDP开发变得更加方便和可靠。 QtPositioning包含了定位的类，可以使用卫星、WiFi甚至文本。 Engine包含了通过客户端进入和管理Qt Cloud的类。 QtWebSockets包含了WebSocket协议的类。 QtWebKit包含了一个基WebKit2的web浏览器。 QtWebKitWidgets包含了基于QtWidgets的WebKit1的类。 QtXml包含了处理xml的类，提供了SAX和DOM API的工具。 QtSvg提供了显示SVG内容的类，Scalable Vector Graphics \(SVG\)是一种是一种基于可扩展标记语言（XML），用于描述二维矢量图形的图形格式（这句话来自于维基百科）。 QtSql提供了处理数据库的工具。 QtTest提供了测试PyQt5应用的工具。

## PyQt4和PyQt5的区别

**PyQt5不兼容PyQt4**。PyQt5有一些巨大的改进。但是，迁移并不是很难，两者的区别如下：

* 重新组合模块，一些模块已经被废弃\(QtScript\)，有些被分为两个子模块\(QtGui, QtWebKit\)。
* 添加了新的模块，比如QtBluetooth, QtPositioning，和Enginio。
* 废弃了SINGAL\(\)和SLOT\(\)的调用方式，使用了新的信号和xx处理方式。
* 不再支持被标记为废弃的或不建议使用的API。




## 安装

```cmd
pip3 install PyQt5 -i https://pypi.douban.com/simple

pip3 install PyQt5-tools -i https://pypi.douban.com/simple
```

[pyqt5原文文档](https://zetcode.com/gui/pyqt5/)
[pyqt5中文文档](https://maicss.gitbook.io/pyqt-chinese-tutoral/)
[pyqt5 github 文档出处](https://github.com/maicss/PyQt-Chinese-tutorial)
[pyqt5 博客园](https://www.cnblogs.com/dalishusheng/category/1791377.html)

