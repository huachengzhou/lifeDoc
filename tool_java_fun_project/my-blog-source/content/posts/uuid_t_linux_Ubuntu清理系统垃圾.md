---
title : 'Ubuntu清理系统垃圾'
date : '2021-02-15'
draft : false
tags : ["linux"]
categories : ["Temp","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---

1，非常有用的清理命令：
sudo apt-get autoclean --清理旧版本的软件缓存
  www.2cto.com  
sudo apt-get clean--清理所有软件缓存
 
sudo apt-get autoremove--删除系统不再使用的孤立软件
 
这三个命令主要清理升级缓存以及无用包的。
 
2，清理opera firefox的缓存文件：
ls ~/.opera/cache4
ls ~/.mozilla/firefox/*.default/Cache
 
3，清理Linux下孤立的包：
图形界面下我们可以用：gtkorphan
sudo apt-get install gtkorphan -y
终端命令下我们可以用：deborphan
sudo apt-get install deborphan -y
 
4，卸载：tracker
这个东西一般我只要安装Ubuntu就会第一删掉tracker 他不仅会产生大量的cache文件而且还会影响开机速度。所以在新得利里面删掉就行。  www.2cto.com  
 
5，删除多余的内核：一定不要删错哦，切记！！
打开终端敲命令：dpkg --get-selections|grep linux
有image的就是内核文件
删除老的内核文件：
sudo apt-get remove 内核文件名（例如：linux-image-2.6.27-2-generic）
内核删除，释放空间了，应该能释放130－140M空间。
 
最后不要忘了看看当前内核：uname -a
附录：
包管理的临时文件目录:
包在
/var/cache/apt/archives
没有下载完的在
/var/cache/apt/archives/partial

