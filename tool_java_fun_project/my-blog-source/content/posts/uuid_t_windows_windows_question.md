---
title : 'windows > question'
date : '2021-02-15'
draft : false
tags : ["windows"]
categories : ["Temp","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---




+ 磁盘变为了动态磁盘解决办法
+ 最好是找软件解决 如DiskGenius 或者 傲梅分区助手
+ 暴力解决办法

```


1、diskpart
2、list disk
3、select disk n
4、convert basic


STEP 1：打开命令提示符窗口，在其中键入：“diskpart”命令并按下回车键。  
STEP 2：在DISKPART命令提示符下，键入“list disk”命令并按下回车键后，能够查看到电脑中的磁盘情况。 
STEP 3：在DISKPART命令提示符下，继续键入“select disk n”命令并按下回车键，其中n代表磁盘的序号。 
STEP 4：在DISKPART命令提示符下，键入“convert dynamic”命令并按下回车键后，开始转换的工作。

```

