

---
title: "DNS 污染"
date: 2021-01-17T15:26:15Z
draft: false
---

# 中国国内访问 GitHub 为什么很慢很卡甚至访问不了？如何加速访问 GitHub 网站？

## 个人总结：强扭的瓜不甜，修改 hosts 也就片刻好光景，要不了多久就变得比没改 hosts 之前更慢。所以还是顺其自然就好，不要白费力气去修改 hosts。

+ **摘要** 

+ 网站分发加速网络的域名遭到 DNS 污染，DNS 不能直接找到那个最快的 IP！ 通过修改系统 hosts 文件的办法，绕过国内 DNS 解析，直接访问 GitHub 的 CDN 节点，从而达到加速的目的！
  

+ 如何检验效果

+ 操作之前先 ping 一下 github.com，两个请求超时，两个 93ms。
+ 操作之后再 ping 一下 github.com，没有丢失，四个 287ms。

### 一、国内访问 GitHub 为什么很慢？

+ GitHub 的 CDN 域名遭到 DNS 污染，导致无法连接使用 GitHub 的加速分发服务器，才使得国内访问速度很慢。
  

### 二、如何解决 DNS 污染？

+ 通过修改 Hosts 文件，将域名解析直接指向 IP 地址来绕过 DNS 的解析，以此解决污染问题。

### 三、具体操作步骤

+ 1、打开 https://www.ipaddress.com/ 这个全球最好的 IP 地址查询工具网站来查询出域名当前对应的最优 IP。（不要用 ip168.com 这类国内的 IP 探针，其获取的国外域名的 ip 也是被 DNS 污染过的）

+ 查询下面 3 个网址对应的 IP 地址
+ github.com : 140.82.113.4
+ assets-cdn.github.com : 185.199.108.153 185.199.109.153 185.199.110.153 185.199.111.153
+ github.global.ssl.fastly.net : 199.232.69.194

+ 2、修改本地电脑系统 hosts 文件

+ Windows 系统中的文件路径： `C:\WINDOWS\system32\drivers\etc`

+ Linux 系统中的文件路径 `/etc/hosts`

+ 直接在最后面加入以下代码

```
192.30.253.112 github.com
140.82.113.4 github.com
185.199.108.153 assets-cdn.github.com
199.232.69.194 github.global.ssl.fastly.net
```

> 说明：在 Windows 系统中，包括 XP、Win7、Win8 、Win10 系统中，hosts 文件的位置都是一样的。如果 etc 文件夹中并没有 hosts 文件，那么可能是该文件隐藏了，可以设置一下，让其显示出来即可。

+ 3、 更新dns缓存

+ 修改后会直接生效，无需刷新 DNS 缓存，因为 hosts 的优先级大于 DNS 域名解析，添加完 hosts 之后，再访问对应的域名，已经就与 DNS 没关系了。如果未生效，重启操作系统或用命令刷新。

+ Windows 系统：`ipconfig /flushdns`
+ Linux 系统：`systemctl restart nscd`
+ Mac 系统：`sudo dscacheutil -flushcache或sudo killall -HUP mDNSResponder`

