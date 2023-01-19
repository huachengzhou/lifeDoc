---
title : 'DOS > network'
date : '2021-02-15'
draft : false
tags : ["windows"]
categories : ["Temp","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---


# DOS网络操作命令

+ netstat -ano (列出所有端口的情况)

```
PS C:\Users\noatn> netstat -ano

活动连接

  协议  本地地址          外部地址        状态           PID
  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING       1028
  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING       4
  TCP    0.0.0.0:1024           0.0.0.0:0              LISTENING       852
  TCP    0.0.0.0:1025           0.0.0.0:0              LISTENING       2232
  TCP    0.0.0.0:3306           0.0.0.0:0              LISTENING       3672
  TCP    0.0.0.0:5040           0.0.0.0:0              LISTENING       5660
  TCP    0.0.0.0:7680           0.0.0.0:0              LISTENING       6628
  TCP    0.0.0.0:49664          0.0.0.0:0              LISTENING       868
  TCP    0.0.0.0:49665          0.0.0.0:0              LISTENING       784
  TCP    0.0.0.0:49666          0.0.0.0:0              LISTENING       1580
  TCP    0.0.0.0:49667          0.0.0.0:0              LISTENING       1316
  TCP    127.0.0.1:1036         0.0.0.0:0              LISTENING       2536
  TCP    127.0.0.1:1155         127.0.0.1:1156         ESTABLISHED     1204
  TCP    127.0.0.1:1156         127.0.0.1:1155         ESTABLISHED     1204
  TCP    127.0.0.1:1157         127.0.0.1:1158         ESTABLISHED     1204
  TCP    127.0.0.1:1158         127.0.0.1:1157         ESTABLISHED     1204
  TCP    127.0.0.1:6942         0.0.0.0:0              LISTENING       1204
  TCP    127.0.0.1:10000        0.0.0.0:0              LISTENING       3556
  TCP    127.0.0.1:63342        0.0.0.0:0              LISTENING       1204
  TCP    192.168.31.208:139     0.0.0.0:0              LISTENING       4
  TCP    192.168.31.208:3810    104.18.25.243:80       ESTABLISHED     6976
  TCP    192.168.31.208:4258    13.107.3.254:443       ESTABLISHED     6976
  TCP    192.168.31.208:4368    40.90.189.152:443      ESTABLISHED     3700
  TCP    192.168.31.208:4571    111.231.211.246:443    FIN_WAIT_1      9324
  TCP    192.168.31.208:4589    111.12.62.190:443      LAST_ACK        9324
  TCP    192.168.31.208:4593    185.199.108.153:443    FIN_WAIT_1      9324
  TCP    192.168.31.208:4595    112.25.253.5:443       ESTABLISHED     9324
  TCP    192.168.31.208:4596    223.85.58.79:443       CLOSE_WAIT      9324
  TCP    192.168.31.208:4600    223.85.58.79:443       LAST_ACK        9324
  TCP    192.168.31.208:4602    192.144.173.136:7823   ESTABLISHED     9324
  TCP    192.168.31.208:4609    192.30.252.153:80      LAST_ACK        9324
  TCP    192.168.31.208:4610    192.30.252.153:80      LAST_ACK        9324
  TCP    192.168.31.208:4611    192.30.252.153:80      LAST_ACK        9324
  TCP    192.168.31.208:4616    209.197.3.24:443       LAST_ACK        9324
  TCP    192.168.31.208:4617    140.205.33.7:443       TIME_WAIT       0
  TCP    [::]:135               [::]:0                 LISTENING       1028
  TCP    [::]:445               [::]:0                 LISTENING       4
  TCP    [::]:1024              [::]:0                 LISTENING       852
  TCP    [::]:1025              [::]:0                 LISTENING       2232
  TCP    [::]:3306              [::]:0                 LISTENING       3672
  TCP    [::]:7680              [::]:0                 LISTENING       6628
  TCP    [::]:49664             [::]:0                 LISTENING       868
  TCP    [::]:49665             [::]:0                 LISTENING       784
  TCP    [::]:49666             [::]:0                 LISTENING       1580
  TCP    [::]:49667             [::]:0                 LISTENING       1316
  UDP    0.0.0.0:500            *:*                                    3540
  UDP    0.0.0.0:4500           *:*                                    3540
  UDP    0.0.0.0:5050           *:*                                    5660
  UDP    0.0.0.0:5353           *:*                                    6324
  UDP    0.0.0.0:5353           *:*                                    9324
  UDP    0.0.0.0:5353           *:*                                    6324
  UDP    0.0.0.0:5353           *:*                                    8372
  UDP    0.0.0.0:5353           *:*                                    10032
  UDP    0.0.0.0:5353           *:*                                    10032
  UDP    0.0.0.0:5353           *:*                                    9324
  UDP    0.0.0.0:5353           *:*                                    8372
  UDP    0.0.0.0:5353           *:*                                    2076
  UDP    0.0.0.0:5355           *:*                                    2076
  UDP    0.0.0.0:49665          *:*                                    3636
  UDP    0.0.0.0:57076          *:*                                    2076
  UDP    0.0.0.0:58215          *:*                                    2076
  UDP    127.0.0.1:1900         *:*                                    9868
  UDP    127.0.0.1:40000        *:*                                    3556
  UDP    127.0.0.1:49664        *:*                                    4008
  UDP    127.0.0.1:51112        *:*                                    6976
  UDP    127.0.0.1:62732        *:*                                    9868
  UDP    192.168.31.208:137     *:*                                    4
  UDP    192.168.31.208:138     *:*                                    4
  UDP    192.168.31.208:1900    *:*                                    9868
  UDP    192.168.31.208:2177    *:*                                    8424
  UDP    192.168.31.208:62731   *:*                                    9868
  UDP    [::]:500               *:*                                    3540
  UDP    [::]:4500              *:*                                    3540
  UDP    [::]:5353              *:*                                    6324
  UDP    [::]:5353              *:*                                    2076
  UDP    [::]:5353              *:*                                    8372
  UDP    [::]:5353              *:*                                    10032
  UDP    [::]:5353              *:*                                    9324
  UDP    [::]:5355              *:*                                    2076
  UDP    [::]:57076             *:*                                    2076
  UDP    [::]:58215             *:*                                    2076
  UDP    [::1]:1900             *:*                                    9868
  UDP    [::1]:62730            *:*                                    9868
  UDP    [fe80::6d6c:6e66:c80:456b%16]:1900  *:*                                    9868
  UDP    [fe80::6d6c:6e66:c80:456b%16]:2177  *:*                                    8424
  UDP    [fe80::6d6c:6e66:c80:456b%16]:62729  *:*                                    9868
```



+ 查看被占用端口对应的PID，输入命令： netstat -ano|findstr '3306' ，回车，记下最后一位数字，即PID,这里是3672

```
PS C:\Users\noatn> netstat -ano|findstr '3306'                                                                                                                                                                       TCP    0.0.0.0:3306           0.0.0.0:0              LISTENING       3672
  TCP    [::]:3306              [::]:0                 LISTENING       3672
```

+ ipconfig用法

```
PS C:\WINDOWS\system32> ipconfig /?

用法:
    ipconfig [/allcompartments] [/? | /all |
                                 /renew [adapter] | /release [adapter] |
                                 /renew6 [adapter] | /release6 [adapter] |
                                 /flushdns | /displaydns | /registerdns |
                                 /showclassid adapter |
                                 /setclassid adapter [classid] |
                                 /showclassid6 adapter |
                                 /setclassid6 adapter [classid] ]

其中
    adapter             连接名称
                       (允许使用通配符 * 和 ?，参见示例)

    选项:
       /?               显示此帮助消息
       /all             显示完整配置信息。
       /release         释放指定适配器的 IPv4 地址。
       /release6        释放指定适配器的 IPv6 地址。
       /renew           更新指定适配器的 IPv4 地址。
       /renew6          更新指定适配器的 IPv6 地址。
       /flushdns        清除 DNS 解析程序缓存。
       /registerdns     刷新所有 DHCP 租用并重新注册 DNS 名称
       /displaydns      显示 DNS 解析程序缓存的内容。
       /showclassid     显示适配器允许的所有 DHCP 类 ID。
       /setclassid      修改 DHCP 类 ID。
       /showclassid6    显示适配器允许的所有 IPv6 DHCP 类 ID。
       /setclassid6     修改 IPv6 DHCP 类 ID。


默认情况下，仅显示绑定到 TCP/IP 的每个适配器的 IP 地址、子网掩码和
默认网关。

对于 Release 和 Renew，如果未指定适配器名称，则会释放或更新所有绑定
到 TCP/IP 的适配器的 IP 地址租用。

对于 Setclassid 和 Setclassid6，如果未指定 ClassId，则会删除 ClassId。

示例:
    > ipconfig                       ... 显示信息
    > ipconfig /all                  ... 显示详细信息
    > ipconfig /renew                ... 更新所有适配器
    > ipconfig /renew EL*            ... 更新所有名称以 EL 开头
                                         的连接
    > ipconfig /release *Con*        ... 释放所有匹配的连接，
                                         例如“有线以太网连接 1”或
                                             “有线以太网连接 2”
    > ipconfig /allcompartments      ... 显示有关所有隔离舱的
                                         信息
    > ipconfig /allcompartments /all ... 显示有关所有隔离舱的
                                         详细信息
```

```
1.显示网络协议配置 ipconfig 如果要查看跟详细的网络配置信息 /all 包括MAC地址、IP地址、子网掩码、默认网关、DNS
2.更新IP地址 ipconfig/renew
3.初始化网络配置 ipconfig/registerdns 将网络状态还原到初始状态
4.显示本地DNS信息 ipconfig/displaydns
5.清除本地DNS缓存内容 ipconfig/flushdns
6.取消IP地址租用 ipconfig/release DHCP服务器：动态获取到IP地址及其他网络设置
7.备份网络设置 ipconfig/all>c:\bak.txt 将所有网络配置信息备份到bak.txt中
```

+ ipconfig 举例用法 显示本地DNS信息

```
PS C:\WINDOWS\system32> ipconfig /displaydns

Windows IP 配置

    1.0.0.127.in-addr.arpa
    ----------------------------------------
    记录名称. . . . . . . : 1.0.0.127.in-addr.arpa.
    记录类型. . . . . . . : 12
    生存时间. . . . . . . : 540319
    数据长度. . . . . . . : 8
    部分. . . . . . . . . : 答案
    PTR 记录  . . . . . . : www.xmind.net


    root-c3-ca2-2009.ocsp.d-trust.net
    ----------------------------------------
    记录名称. . . . . . . : root-c3-ca2-2009.ocsp.d-trust.net
    记录类型. . . . . . . : 5
    生存时间. . . . . . . : 9
    数据长度. . . . . . . : 8
    部分. . . . . . . . . : 答案
    CNAME 记录  . . . . . : ocsp.d-trust.net


    记录名称. . . . . . . : ocsp.d-trust.net
    记录类型. . . . . . . : 1
    生存时间. . . . . . . : 9
    数据长度. . . . . . . : 4
    部分. . . . . . . . . : 答案
    A (主机)记录  . . . . : 213.61.227.196


    hm.baidu.com
    ----------------------------------------
    记录名称. . . . . . . : hm.baidu.com
    记录类型. . . . . . . : 5
    生存时间. . . . . . . : 194
    数据长度. . . . . . . : 8
    部分. . . . . . . . . : 答案
    CNAME 记录  . . . . . : hm.e.shifen.com


    记录名称. . . . . . . : hm.e.shifen.com
    记录类型. . . . . . . : 1
    生存时间. . . . . . . : 194
    数据长度. . . . . . . : 4
    部分. . . . . . . . . : 答案
    A (主机)记录  . . . . : 39.156.66.179


    www.xmind.net
    ----------------------------------------
    没有 AAAA 类型的记录


    www.xmind.net
    ----------------------------------------
    记录名称. . . . . . . : www.xmind.net
    记录类型. . . . . . . : 1
    生存时间. . . . . . . : 540319
    数据长度. . . . . . . : 4
    部分. . . . . . . . . : 答案
    A (主机)记录  . . . . : 127.0.0.1


    zhidao.baidu.com
    ----------------------------------------
    记录名称. . . . . . . : zhidao.baidu.com
    记录类型. . . . . . . : 5
    生存时间. . . . . . . : 20
    数据长度. . . . . . . : 8
    部分. . . . . . . . . : 答案
    CNAME 记录  . . . . . : iknow.baidu.com


    记录名称. . . . . . . : iknow.baidu.com
    记录类型. . . . . . . : 5
    生存时间. . . . . . . : 20
    数据长度. . . . . . . : 8
    部分. . . . . . . . . : 答案
    CNAME 记录  . . . . . : iknow.n.shifen.com


    记录名称. . . . . . . : iknow.n.shifen.com
    记录类型. . . . . . . : 1
    生存时间. . . . . . . : 20
    数据长度. . . . . . . : 4
    部分. . . . . . . . . : 答案
    A (主机)记录  . . . . : 112.34.111.123


    blog.csdn.net
    ----------------------------------------
    记录名称. . . . . . . : blog.csdn.net
    记录类型. . . . . . . : 1
    生存时间. . . . . . . : 3
    数据长度. . . . . . . : 4
    部分. . . . . . . . . : 答案
    A (主机)记录  . . . . : 47.95.47.253


    adservice.google.com
    ----------------------------------------
    记录名称. . . . . . . : adservice.google.com
    记录类型. . . . . . . : 5
    生存时间. . . . . . . : 11
    数据长度. . . . . . . : 8
    部分. . . . . . . . . : 答案
    CNAME 记录  . . . . . : pagead46.l.doubleclick.net


    记录名称. . . . . . . : pagead46.l.doubleclick.net
    记录类型. . . . . . . : 1
    生存时间. . . . . . . : 11
    数据长度. . . . . . . : 4
    部分. . . . . . . . . : 答案
    A (主机)记录  . . . . : 203.208.50.58


    记录名称. . . . . . . : pagead46.l.doubleclick.net
    记录类型. . . . . . . : 1
    生存时间. . . . . . . : 11
    数据长度. . . . . . . : 4
    部分. . . . . . . . . : 答案
    A (主机)记录  . . . . : 203.208.50.57


    记录名称. . . . . . . : pagead46.l.doubleclick.net
    记录类型. . . . . . . : 1
    生存时间. . . . . . . : 11
    数据长度. . . . . . . : 4
    部分. . . . . . . . . : 答案
    A (主机)记录  . . . . : 203.208.50.45
```

+ 检测自己的ip ipconfig

```
C:\Users\noatn>ipconfig

Windows IP 配置


以太网适配器 以太网:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . :

无线局域网适配器 本地连接* 1:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . :

无线局域网适配器 本地连接* 2:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . :

以太网适配器 以太网 2:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . :

无线局域网适配器 WLAN:

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : fe80::6d6c:6e66:c80:456b%16
   IPv4 地址 . . . . . . . . . . . . : 192.168.31.208
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   默认网关. . . . . . . . . . . . . : 192.168.31.1
```

+ 

```

```

+ 检测是否连上外网 ping url

```
C:\Users\noatn>ping 192.168.31.208

正在 Ping 192.168.31.208 具有 32 字节的数据:
来自 192.168.31.208 的回复: 字节=32 时间<1ms TTL=128
来自 192.168.31.208 的回复: 字节=32 时间<1ms TTL=128
来自 192.168.31.208 的回复: 字节=32 时间<1ms TTL=128
来自 192.168.31.208 的回复: 字节=32 时间<1ms TTL=128

192.168.31.208 的 Ping 统计信息:
    数据包: 已发送 = 4，已接收 = 4，丢失 = 0 (0% 丢失)，
往返行程的估计时间(以毫秒为单位):
    最短 = 0ms，最长 = 0ms，平均 = 0ms

C:\Users\noatn>ping www.baidu.com

正在 Ping www.baidu.com [39.156.66.14] 具有 32 字节的数据:
来自 39.156.66.14 的回复: 字节=32 时间=152ms TTL=50
来自 39.156.66.14 的回复: 字节=32 时间=821ms TTL=50
来自 39.156.66.14 的回复: 字节=32 时间=76ms TTL=50
来自 39.156.66.14 的回复: 字节=32 时间=157ms TTL=50

39.156.66.14 的 Ping 统计信息:
    数据包: 已发送 = 4，已接收 = 4，丢失 = 0 (0% 丢失)，
往返行程的估计时间(以毫秒为单位):
    最短 = 76ms，最长 = 821ms，平均 = 301ms
    
    这个网络情况就是不好的样子time>821毫秒了 ==就是延迟821毫秒
```


+ 清屏命令 cls

```
 C:\Users\noatn>dir
  驱动器 C 中的卷没有标签。
  卷的序列号是 1CE3-274F
 
  C:\Users\noatn 的目录
 
 2020/02/14  18:32    <DIR>          .
 2020/02/14  18:32    <DIR>          ..
 2020/01/24  13:55    <DIR>          .android
 2020/01/23  08:12               100 .gitconfig
 2019/12/19  20:15    <DIR>          .IntelliJIdea2017.3
 2020/01/26  17:53    <DIR>          .m2
 2020/02/14  18:32    <DIR>          .oracle_jre_usage
 2020/01/23  08:14    <DIR>          .ssh
 2020/01/14  23:17    <DIR>          .translation
 2020/01/20  21:52    <DIR>          .vscode
 2020/01/11  16:34    <DIR>          3D Objects
 2020/01/11  16:34    <DIR>          Contacts
 2020/02/14  18:32    <DIR>          Desktop
 2020/02/14  17:57    <DIR>          Documents
 2020/02/14  18:47    <DIR>          Downloads
 2020/01/11  16:34    <DIR>          Favorites
 2020/01/11  16:34    <DIR>          Links
 2020/01/11  16:34    <DIR>          Music
 2020/02/14  10:57    <DIR>          OneDrive
 2020/01/22  21:45    <DIR>          Pictures
 2020/01/11  16:34    <DIR>          Saved Games
 2020/01/11  16:34    <DIR>          Searches
 2020/01/11  16:34    <DIR>          Videos
                1 个文件            100 字节
               22 个目录 91,425,759,232 可用字节
 C:\Users\noatn>cls;
 然后就没有任何了

```



+ 系统情况查看 systeminfo

```
//这里切记不要输入;
C:\Users\noatn>systeminfo

主机名:           DESKTOP-GN2SF7M
OS 名称:          Microsoft Windows 10 家庭中文版
OS 版本:          10.0.18363 暂缺 Build 18363
OS 制造商:        Microsoft Corporation
OS 配置:          独立工作站
OS 构件类型:      Multiprocessor Free
注册的所有人:     noatnu@163.com
注册的组织:       暂缺
产品 ID:          00342-35097-36011-AAOEM
初始安装日期:     2019/12/18, 21:19:37
系统启动时间:     2020/2/14, 18:40:59
系统制造商:       LENOVO
系统型号:         20KSA00FCD
系统类型:         x64-based PC
处理器:           安装了 1 个处理器。
                  [01]: Intel64 Family 6 Model 142 Stepping 10 GenuineIntel ~1801 Mhz
BIOS 版本:        LENOVO R0PET42W (1.19 ), 2018/6/14
Windows 目录:     C:\WINDOWS
系统目录:         C:\WINDOWS\system32
启动设备:         \Device\HarddiskVolume5
系统区域设置:     zh-cn;中文(中国)
输入法区域设置:   zh-cn;中文(中国)
时区:             (UTC+08:00) 北京，重庆，香港特别行政区，乌鲁木齐
物理内存总量:     16,281 MB
可用的物理内存:   10,187 MB
虚拟内存: 最大值: 18,713 MB
虚拟内存: 可用:   11,653 MB
虚拟内存: 使用中: 7,060 MB
页面文件位置:     C:\pagefile.sys
域:               WORKGROUP
登录服务器:       \\DESKTOP-GN2SF7M
修补程序:         安装了 9 个修补程序。
                  [01]: KB4534132
                  [02]: KB4513661
                  [03]: KB4516115
                  [04]: KB4517245
                  [05]: KB4521863
                  [06]: KB4524569
                  [07]: KB4528759
                  [08]: KB4537759
                  [09]: KB4528760
网卡:             安装了 3 个 NIC。
                  [01]: Realtek PCIe GbE Family Controller
                      连接名:      以太网
                      状态:        媒体连接已中断
                  [02]: Realtek 8821CE Wireless LAN 802.11ac PCI-E NIC
                      连接名:      WLAN
                      启用 DHCP:   是
                      DHCP 服务器: 192.168.31.1
                      IP 地址
                        [01]: 192.168.31.208
                        [02]: fe80::6d6c:6e66:c80:456b
                  [03]: Sangfor SSL VPN CS Support System VNIC
                      连接名:      以太网 2
                      状态:        媒体连接已中断
Hyper-V 要求:     虚拟机监视器模式扩展: 是
                  固件中已启用虚拟化: 否
                  二级地址转换: 是
                  数据执行保护可用: 是
                  
//具体用法
C:\Users\noatn>SYSTEMINFO /?

SYSTEMINFO [/S system [/U username [/P [password]]]] [/FO format] [/NH]

描述:
    该工具显示本地或远程机器(包括服务包级别)的操作系统配置的信息。

参数列表:
    /S      system           指定要连接的远程系统。

    /U      [domain\]user    指定应该在哪个用户上下文执行命令。


    /P      [password]       指定给定用户上下文的密码。如果省略则
                             提示输入。

    /FO     format           指定显示结果的格式。
                             有效值: "TABLE"、"LIST"、"CSV"。

    /NH                      指定“列标题”不应该在输出中显示。
                             只对 "TABLE" 和 "CSV" 格式有效。

    /?                       显示帮助消息。


例如:
    SYSTEMINFO
    SYSTEMINFO /?
    SYSTEMINFO /S system
    SYSTEMINFO /S system /U user
    SYSTEMINFO /S system /U domain\user /P password /FO TABLE
    SYSTEMINFO /S system /FO LIST
    SYSTEMINFO /S system /FO CSV /NH
```




+ 内存查看 mem (部分windows不支持了或者缺失此条程序)

+ 磁盘检测 chkdsk D:

```
PS C:\WINDOWS\system32> chkdsk /?
检查磁盘并显示状态报告。


CHKDSK [volume[[path]filename]]] [/F] [/V] [/R] [/X] [/I] [/C] [/L[:size]] [/B] [/scan] [/spotfix]


  volume              指定驱动器号(后面跟一个冒号)、
                      装入点或卷名。
  filename            仅 FAT/FAT32: 指定要检查
                      碎片的文件。
  /F                  修复磁盘上的错误。
  /V                  在 FAT/FAT32 上: 显示磁盘上每个文件的
                      完整路径和名称。
                  在 NTFS 上: 显示清理消息(如果有)。
  /R                  查找坏扇区并恢复可读信息
                      (未指定 /scan 时，隐含 /F)。
  /L:size             仅 NTFS: 将日志文件大小更改为指定
                      的 KB 数。如果未指定大小，则显示
                      当前大小。
  /X                  如果必要，则先强制卸除卷。
                       该卷的所有打开的句柄都将无效
                      (隐含 /F)。
  /I                  仅 NTFS: 对索引项进行强度较小的
                      检查。
  /C                  仅 NTFS: 跳过文件夹结构内的
                      循环检查。
  /B                  仅 NTFS: 重新评估该卷上的坏簇
                      (隐含 /R)
  /scan               仅 NTFS: 在卷上运行联机扫描
  /forceofflinefix    仅 NTFS: (必须与 "/scan" 一起使用)
                      跳过所有联机修复；找到的所有故障都
                      排队等待脱机修复(即 "chkdsk /spotfix")。
  /perf               仅 NTFS: (必须与 "/scan" 一起使用)
                      使用更多系统资源尽快完成
                      扫描。这可能会对系统中运行的其他任务的性能
                      造成负面影响。
  /spotfix            仅 NTFS: 在卷上运行点修复
  /sdcleanup          仅 NTFS: 回收不需要的安全描述符
                      数据(隐含 /F)。
  /offlinescanandfix  在卷上运行脱机扫描并进行修复。
  /freeorphanedchains 仅 FAT/FAT32/exFAT: 释放所有孤立的簇链
                      而不恢复其内容。
  /markclean          仅 FAT/FAT32/exFAT: 如果未检测到损坏，则将卷
                      标记为干净，即使未指定 /F 也是如此。

/I 或 /C 开关通过跳过对卷的某些检查，
来减少运行 Chkdsk 所需的时间。

E:\temp>chkdsk D:
访问被拒绝，因为你没有足够的权限，或
该磁盘可能被另一个进程锁定。
你必须调用这一在提升模式下运行的实用工具
并确保磁盘处于解锁状态。

采用管理员登陆

PS C:\WINDOWS\system32> chkdsk d:
文件系统的类型是 NTFS。
卷标是 新加卷。

警告! 未指定 /F 参数。
将在只读模式下运行 CHKDSK。

阶段 1: 检查基本文件系统结构...
  已处理 143872 个文件记录。
文件验证完成。
  已处理 37 个大型文件记录。
  已处理 0 个错误的文件记录。

阶段 2: 检查文件名链接...
  已处理 92 个重新解析记录。
  已处理 178806 个索引项。
索引验证完成。
  已扫描到 0 个未索引文件。
  已将 0 个未编制索引的文件恢复到回收箱。
  已处理 92 个重新解析记录。

阶段 3: 检查安全描述符...
安全描述符验证完成。
  已处理 17467 个数据文件。

Windows 已扫描文件系统并且没有发现问题。
无需采取进一步操作。

总共有  307199999 KB 磁盘空间。
79964 个文件中有   26412124 KB。
17469 个索引      18832 KB。
坏扇区          0 KB。
系统正在使用     219231 KB。
日志文件占用了      65536 KB。
磁盘上  280549812 KB 可用。

每个分配单元中有       4096 字节。
磁盘上共有   76799999 个分配单元。
磁盘上有   70137453 个可用的分配单元。
```

+ dos 版本

```
E:\temp>ver

Microsoft Windows [版本 10.0.18363.592]
```

+ 探测对方计算机名

```
netstat -a 192.168.2.8

PS C:\Users\noatn> netstat -a 192.168.2.8

活动连接

  协议  本地地址          外部地址        状态
  TCP    0.0.0.0:135            DESKTOP-GN2SF7M:0      LISTENING
  TCP    0.0.0.0:445            DESKTOP-GN2SF7M:0      LISTENING
  TCP    0.0.0.0:1024           DESKTOP-GN2SF7M:0      LISTENING
  TCP    0.0.0.0:1025           DESKTOP-GN2SF7M:0      LISTENING
  TCP    0.0.0.0:3306           DESKTOP-GN2SF7M:0      LISTENING
  TCP    0.0.0.0:5040           DESKTOP-GN2SF7M:0      LISTENING
  TCP    0.0.0.0:7680           DESKTOP-GN2SF7M:0      LISTENING
  TCP    0.0.0.0:49664          DESKTOP-GN2SF7M:0      LISTENING
  TCP    0.0.0.0:49665          DESKTOP-GN2SF7M:0      LISTENING
  TCP    0.0.0.0:49666          DESKTOP-GN2SF7M:0      LISTENING
  TCP    0.0.0.0:49667          DESKTOP-GN2SF7M:0      LISTENING
  TCP    127.0.0.1:1036         DESKTOP-GN2SF7M:0      LISTENING
  TCP    127.0.0.1:1155         www:1156               ESTABLISHED
  TCP    127.0.0.1:1156         www:nfa                ESTABLISHED
  TCP    127.0.0.1:1157         www:1158               ESTABLISHED
  TCP    127.0.0.1:1158         www:1157               ESTABLISHED
  TCP    127.0.0.1:6942         DESKTOP-GN2SF7M:0      LISTENING
  TCP    127.0.0.1:10000        DESKTOP-GN2SF7M:0      LISTENING
  TCP    127.0.0.1:63342        DESKTOP-GN2SF7M:0      LISTENING
  TCP    192.168.31.208:139     DESKTOP-GN2SF7M:0      LISTENING
  
```

+ 快速诊断网卡故障 ping 127.0.0.1

```
PS C:\WINDOWS\system32> ping 127.0.0.1;                                                                                 
正在 Ping 127.0.0.1 具有 32 字节的数据:
来自 127.0.0.1 的回复: 字节=32 时间<1ms TTL=128
来自 127.0.0.1 的回复: 字节=32 时间<1ms TTL=128
来自 127.0.0.1 的回复: 字节=32 时间<1ms TTL=128
来自 127.0.0.1 的回复: 字节=32 时间<1ms TTL=128

127.0.0.1 的 Ping 统计信息:
    数据包: 已发送 = 4，已接收 = 4，丢失 = 0 (0% 丢失)，
往返行程的估计时间(以毫秒为单位):
    最短 = 0ms，最长 = 0ms，平均 = 0ms
```

+ 网络连接查看

```
PS C:\Users\noatn> netstat /?

显示协议统计信息和当前 TCP/IP 网络连接。

NETSTAT [-a] [-b] [-e] [-f] [-n] [-o] [-p proto] [-r] [-s] [-x] [-t] [interval]

  -a            显示所有连接和侦听端口。
  -b            显示在创建每个连接或侦听端口时涉及的
                可执行程序。在某些情况下，已知可执行程序承载
                多个独立的组件，这些情况下，
                显示创建连接或侦听端口时
                涉及的组件序列。在此情况下，可执行程序的
                名称位于底部 [] 中，它调用的组件位于顶部，
                直至达到 TCP/IP。注意，此选项
                可能很耗时，并且在你没有足够
                权限时可能失败。
  -e            显示以太网统计信息。此选项可以与 -s 选项
                结合使用。
  -f            显示外部地址的完全限定
                域名(FQDN)。
  -n            以数字形式显示地址和端口号。
  -o            显示拥有的与每个连接关联的进程 ID。
  -p proto      显示 proto 指定的协议的连接；proto
                可以是下列任何一个: TCP、UDP、TCPv6 或 UDPv6。如果与 -s
                选项一起用来显示每个协议的统计信息，proto 可以是下列任何一个:
                IP、IPv6、ICMP、ICMPv6、TCP、TCPv6、UDP 或 UDPv6。
  -q            显示所有连接、侦听端口和绑定的
                非侦听 TCP 端口。绑定的非侦听端口
                 不一定与活动连接相关联。
  -r            显示路由表。
  -s            显示每个协议的统计信息。默认情况下，
                显示 IP、IPv6、ICMP、ICMPv6、TCP、TCPv6、UDP 和 UDPv6 的统计信息;
                -p 选项可用于指定默认的子网。
  -t            显示当前连接卸载状态。
  -x            显示 NetworkDirect 连接、侦听器和共享
                终结点。
  -y            显示所有连接的 TCP 连接模板。
                无法与其他选项结合使用。
  interval      重新显示选定的统计信息，各个显示间暂停的
                间隔秒数。按 CTRL+C 停止重新显示
                统计信息。如果省略，则 netstat 将打印当前的
                配置信息一次。
```

+  网络连接查看 数字形式显示地址和端口号

```
PS C:\Users\noatn> netstat -n

活动连接

  协议  本地地址          外部地址        状态
  TCP    127.0.0.1:1155         127.0.0.1:1156         ESTABLISHED
  TCP    127.0.0.1:1156         127.0.0.1:1155         ESTABLISHED
  TCP    127.0.0.1:1157         127.0.0.1:1158         ESTABLISHED
  TCP    127.0.0.1:1158         127.0.0.1:1157         ESTABLISHED
  TCP    192.168.31.208:3032    117.18.237.29:80       CLOSE_WAIT
  TCP    192.168.31.208:3312    117.174.50.69:80       ESTABLISHED
  TCP    192.168.31.208:3810    104.18.25.243:80       ESTABLISHED
  TCP    192.168.31.208:3870    203.119.218.69:443     ESTABLISHED
  TCP    192.168.31.208:3880    40.119.211.203:443     ESTABLISHED
  TCP    192.168.31.208:3931    117.174.50.69:80       ESTABLISHED
  TCP    192.168.31.208:3982    213.61.227.196:80      LAST_ACK
  TCP    192.168.31.208:4021    59.110.73.45:443       LAST_ACK
  TCP    192.168.31.208:4023    112.29.158.132:443     LAST_ACK
  TCP    192.168.31.208:4026    112.29.158.132:443     LAST_ACK
  TCP    192.168.31.208:4027    112.18.249.241:443     TIME_WAIT
  TCP    192.168.31.208:4028    112.18.249.241:443     TIME_WAIT
  TCP    192.168.31.208:4029    47.95.47.253:443       TIME_WAIT
  TCP    192.168.31.208:4030    39.107.189.15:443      LAST_ACK
  TCP    192.168.31.208:4032    112.29.158.132:443     LAST_ACK
  TCP    192.168.31.208:4035    112.29.158.132:443     LAST_ACK
  TCP    192.168.31.208:4036    52.114.128.44:443      TIME_WAIT
  TCP    192.168.31.208:4038    131.253.33.254:443     ESTABLISHED
  TCP    192.168.31.208:4039    204.79.197.222:443     ESTABLISHED
  TCP    192.168.31.208:4040    204.79.197.222:443     ESTABLISHED
  TCP    192.168.31.208:4041    131.253.33.254:443     ESTABLISHED
  TCP    192.168.31.208:4042    131.253.33.254:443     ESTABLISHED
  TCP    192.168.31.208:4044    62.96.224.156:389      ESTABLISHED
  TCP    192.168.31.208:4045    117.18.237.29:80       ESTABLISHED
  TCP    192.168.31.208:4046    47.95.47.253:443       ESTABLISHED
  TCP    192.168.31.208:4047    117.177.133.243:443    ESTABLISHED
  TCP    192.168.31.208:4048    112.18.249.239:443     ESTABLISHED
  TCP    192.168.31.208:4049    204.79.197.222:443     ESTABLISHED
  TCP    192.168.31.208:4050    221.178.73.35:443      ESTABLISHED
  TCP    192.168.31.208:4051    39.107.11.172:443      ESTABLISHED
  TCP    192.168.31.208:4052    112.29.158.132:443     ESTABLISHED
  TCP    192.168.31.208:4053    183.220.151.49:443     ESTABLISHED
  TCP    192.168.31.208:4054    13.107.3.254:443       ESTABLISHED
```

