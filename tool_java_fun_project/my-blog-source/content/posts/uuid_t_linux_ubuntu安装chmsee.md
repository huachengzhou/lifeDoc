---
title : 'ubuntu安装chmsee'
date : '2021-02-15'
draft : false
tags : ["linux"]
categories : ["Temp","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---

垃圾的ubuntu 14.04 又一次去掉一些特别好用的软件,  官方给的解释是怕破坏他们系统. 只想说一句 我去年买了个本.

14.04 之前的版本,如13.10, 12.04 继续能够使用 sudo apt-get install chmsee  来安装.

14.04 需要下载安装包来安装:

sudo apt-get install libc6 libchm1 libgcrypt11 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk2.0-0 libpango1.0-0 libwebkitgtk-1.0-0 libxml2  安装依赖包

(64位)    sudo dpkg -i chmsee_1.3.0-2ubuntu2_amd64.deb  安装软件包,下载地址: http://kr.archive.ubuntu.com/ubuntu/pool/universe/c/chmsee/chmsee_1.3.0-2ubuntu2_amd64.deb  Ubuntu的官方软件库放心下载.

(32位)    sudo dpkg -i chmsee_1.3.0-2ubuntu2_i386.deb 安装软件包,下载地址: http://kr.archive.ubuntu.com/ubuntu/pool/universe/c/chmsee/chmsee_1.3.0-2ubuntu2_i386.deb Ubuntu的官方软件库放心下载.
