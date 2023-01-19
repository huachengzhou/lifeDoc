---
title : '18道非常牛逼的Nginx面试题'
date : '2021-02-15'
draft : false
tags : ["面试"]
categories : ["java","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---

# 1、请解释一下什么是 Nginx? 

> Nginx 是一个 web 服务器和反向代理服务器，用于 HTTP、HTTPS、SMTP、POP3 和IMAP 协议。
>
> **2、请列举 Nginx 的一些特性。**Nginx 服务器的特性包括：
>
> 反向代理/L7 负载均衡器嵌入式 Perl 解释器
>
> 动态二进制升级
>
> 可用于重新编写 URL，具有非常好的 PCRE 支持**3、请列举 Nginx 和 Apache 之间的不同点**

# 4、请解释 Nginx 如何处理 HTTP 请求。 

> Nginx 使用反应器模式。主事件循环等待操作系统发出准备事件的信号，这样数据就可以从套接字读取，在该实例中读取到缓冲区并进行处理。单个线程可以提供数万个并发连接。
>
> **5、在 Nginx 中，如何使用未定义的服务器名称来阻止处理请求?** 只需将请求删除的服务器就可以定义为：
>
> Server {listen 80;server\_name " " ;return 444;
>
> }
>
> 这里，服务器名被保留为一个空字符串，它将在没有"主机"头字段的情况下匹配请求，而一个特殊的 Nginx 的非标准代码 444 被返回，从而终止连接。

# 6、 使用"反向代理服务器"的优点是什么? 

> 反向代理服务器可以隐藏源服务器的存在和特征。它充当互联网云和 web 服务器之间的中间层。这对于安全方面来说是很好的，特别是当您使用 web 托管服务时。

# 7、请列举 Nginx 服务器的最佳用途。 

> Nginx 服务器的最佳用法是在网络上部署动态 HTTP 内容，使用 SCGI、WSGI 应用程序服务器、用于脚本的 FastCGI 处理程序。它还可以作为负载均衡器。
>
> **8、请解释 Nginx 服务器上的 Master 和 Worker 进程分别是什么?** Master 进程：读取及评估配置和维持
>
> Worker 进程：处理请求

# 9、请解释你如何通过不同于 80 的端口开启 Nginx? 

> 为了通过一个不同的端口开启 Nginx，你必须进入/etc/Nginx/sites-enabled/， 如果这是默认文件，那么你必须打开名为"default"的文件。编辑文件，并放置在你想要的端口：
>
> Like server { listen 81; }

# 10、请解释是否有可能将 Nginx 的错误替换为 502 错误、503? 

> 502 =错误网关
>
> 503 =服务器超载
>
> 有可能，但是您可以确保 fastcgi\_intercept\_errors 被设置为 ON，并使用错误页面指令。
>
> Location / {fastcgi\_pass 127.0.01:9001;fastcgi\_intercept\_errors on;error\_page 502 =503/error\_page.html;\#...}

# 11、在 Nginx 中，解释如何在 URL 中保留双斜线? 

> 要在 URL 中保留双斜线，就必须使用 merge\_slashes\_off; 语法:merge\_slashes \[on/off\]
>
> 默认值: merge\_slashes on 环境: http，server

# 12、请解释 ngx\_http\_upstream\_module 的作用是什么? 

> ngx\_http\_upstream\_module 用于定义可通过 fastcgi 传递、proxy 传递、uwsgi 传递、memcached 传递和 scgi 传递指令来引用的服务器组。

# 13、请解释什么是 C10K 问题? 

> C10K 问题是指无法同时处理大量客户端(10,000)的网络套接字。**14、请陈述 stub\_status 和 sub\_filter 指令的作用是什么?**
>
> Stub\_status 指令：该指令用于了解 Nginx 当前状态的当前状态，如当前的活动连接，接受和处理当前读/写/等待连接的总数
>
> Sub\_filter 指令：它用于搜索和替换响应中的内容，并快速修复陈旧的数据 **15、解释 Nginx 是否支持将请求压缩到上游?**
>
> 您可以使用 Nginx 模块 gunzip 将请求压缩到上游。gunzip 模块是一个过滤器， 它可以对不支持"gzip"编码方法的客户机或服务器使用"内容编码:gzip"来解压缩响应。

# 16、解释如何在 Nginx 中获得当前的时间? 

> 要获得 Nginx 的当前时间，必须使用 SSI 模块、\$date\_gmt 和\$date\_local 的变量。
>
> Proxy\_set\_header THE-TIME \$date\_gmt; **17、用 Nginx 服务器解释-s 的目的是什么?** 用于运行 Nginx -s 参数的可执行文件。**18、解释如何在 Nginx 服务器上添加模块?**
>
> 在编译过程中，必须选择 Nginx 模块，因为 Nginx 不支持模块的运行时间选择。
>
> 更多请关注微信公众号：Java 技术栈，回复：面试
