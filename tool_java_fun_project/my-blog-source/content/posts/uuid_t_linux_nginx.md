---
title : 'nginx'
date : '2021-02-15'
draft : false
tags : ["linux"]
categories : ["Temp","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---

# nginx学习

##  基础操作
+ start ./sbin/nginx
+ stop  ./sbin/nginx -s stop 
+ quite ./sbin/nginx -s quit 

> 启动成功标志
```
Welcome to nginx!
```

>  默认监听的端口是80 也就是说访问此端口就可以得到启动成功的标识符号
+ 简单的负载均衡配置
------------------------
+ http 模块中配置
```
#配置开始 author zhou
	upstream myproject{
		server 127.0.0.1:8000 weight=3;
		server 127.0.0.1:8080 weight=10;
		server 127.0.0.1:8090;
	}
#配置结束 author zhou
```
 + location模块配置
 ```
 proxy_pass http://myproject;
 注意:这的myproject要和上面的name一致
```
 测试结果 (这的测试用到了session的唯一性)
 
     http://localhost/nginx_test/ sessionId=8D9C4ACEE65EB24301B1C0D9E4CF3A6E
     http://localhost:8080/nginx_test/ sessionId=8D9C4ACEE65EB24301B1C0D9E4CF3A6E
     http://localhost:8090/nginx_test/ sessionId=7539B2C4AFD433ECEFAC8F2B2EBCC411
     
 由于配置了权重 因此大部分是8080端口
 ## 参数解释
 + 1）down
 
     表示单前的server暂时不参与负载
 
+ 2）Weight
 
     默认为1.weight越大，负载的权重就越大。
 
+ 3）max_fails
 
     允许请求失败的次数默认为1.当超过最大次数时，返回proxy_next_upstream 模块定义的错误
 
+ 4）fail_timeout
 
     max_fails 次失败后，暂停的时间。
 
+ 5）Backup
 
     其它所有的非backup机器down或者忙的时候，请求backup机器。所以这台机器压力会最轻。
     


```
service nginx start

service nginx stop

nginx
```
 
 
