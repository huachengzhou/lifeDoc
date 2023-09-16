---
title: "solr"
date: 2023-09-16
draft: false
weight: 7
---


# solr


## solr 的概念 

> Solr 是一个基于 Apache Lucene 之上的搜索服务器，它是一个开源的、基于 Java 的信息检索库



## 安装

+ 1、下载 Solr 安装包

[历史地址1](https://archive.apache.org/dist/lucene/solr/)

+ solr-8.11.0.tgz 适用于 Linux/Unix/OSX 系统

+ solr-8.11.0.zip 适用于 Microsoft Windows 系统

+ solr-8.11.0-src.tgz包 Solr 源代码。如果您想在不使用官方 Git 存储库的情况下在 Solr 上进行开发，这将非常有用。


### 文件布局

+  解压后目录布局

*  bin
    * 此目录中包含几个重要的脚本，这些脚本将使使用 Solr 更容易。

    * solr 和 solr.cmd
    * 这是 Solr 的控制脚本，也称为 bin/solr（对于 * nix）或者 bin/solr.cmd（对于 Windows）。这个脚本是启动和停止 Solr 的首选工具。您也可以在运行 SolrCloud 模式时创建集合或内核、配置身份验证以及配置文件。
    * post
    * Post Tool，它提供了用于发布内容到 Solr 的一个简单的命令行界面。

    * solr.in.sh 和 solr.in.cmd
    * 这些分别是为 * nix 和 Windows 系统提供的属性文件。在这里配置了 Java、Jetty 和 Solr 的系统级属性。许多这些设置可以在使用 bin/solr 或者 bin/solr.cmd 时被覆盖，但这允许您在一个地方设置所有的属性。

    * install_solr_services.sh
    * 该脚本用于 * nix 系统以安装 Solr 作为服务。在 “将 Solr 用于生产 ” 一节中有更详细的描述。

* contrib
    * Solr 的 contrib 目录包含 Solr 专用功能的附加插件。 

* dist
    * 该 dist 目录包含主要的 Solr .jar 文件。

* docs
    * 该 docs 目录包括一个链接到在线 Javadocs 的 Solr。

* example
    * 该 example 目录包括演示各种 Solr 功能的几种类型的示例。有关此目录中的内容的详细信息，请参阅下面的 Solr 示例。

* licenses
    * 该 licenses 目录包括 Solr 使用的第三方库的所有许可证。

* server
    * 此目录是 Solr 应用程序的核心所在。此目录中的 README 提供了详细的概述，但以下是一些特点：
    * Solr 的 Admin UI（server/solr-webapp）
    * Jetty 库（server/lib）
    * 日志文件（server/logs）和日志配置（server/resources）。有关如何自定义 Solr 的默认日志记录的详细信息，请参阅配置日志记录一节。
    * 示例配置（server/solr/configsets）


### 启动

+ windows

```cmd
Microsoft Windows [版本 10.0.19045.3324]
(c) Microsoft Corporation。保留所有权利。

C:\Users\noatn>d:

D:\>cd D:\CS\solr\solr-8.11.0\bin

D:\CS\solr\solr-8.11.0\bin>solr start
"java version info is 1.8.0_321"
"Extracted major version is 1"
Java HotSpot(TM) 64-Bit Server VM warning: JVM cannot use large page memory because it does not have enough privilege to lock pages in memory.
Waiting up to 30 to see Solr running on port 8983
Started Solr server on port 8983. Happy searching!
```

[http://127.0.0.1:8983/solr/](http://127.0.0.1:8983/solr/#/)

+ linux

```shell
#进入到  /solr-8.11.0/bin目录
启动命令：./solr start -force
启动命令：./solr start -e cloud -force #SolrCloud 模式下启动默认两个节点在同一台机器上启动
停止命令：./solr stop -all
重启命令：./solr restart -force
创建核心：./solr create -c <name> #name自定义
删除核心：./solr delete -c <name> #需要删除的核心名称
```



