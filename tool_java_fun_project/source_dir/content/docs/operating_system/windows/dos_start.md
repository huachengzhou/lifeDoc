---
title: "DOS命令 基本介绍 "
date: 2021-04-15
draft: false
weight: 1
---

## 介绍

+ windows不区分大小写

```bat
C:\Users\noatn>echo '你好'
'你好'

C:\Users\noatn>ECHO '你好'
'你好'
```


## 体验

+ 体验1

+ @echo off 关闭原始盘符

```bat
C:\Users\noatn>echo '你好'
'你好'

C:\Users\noatn>

C:\Users\noatn>@echo off
Echo 'hello world'
'hello world'

```

+ pause 暂停

```bat
@echo off
Echo 'hello world'
pause
```

+ 查看ip地址

```bat
C:\Users\noatn>ipconfig

Windows IP 配置


以太网适配器 以太网 2:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . :

以太网适配器 以太网:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . :

无线局域网适配器 本地连接* 1:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . :

无线局域网适配器 本地连接* 2:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . :

以太网适配器 VMware Network Adapter VMnet1:

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : fe80::bc7f:faee:41f9:ecf7%18
   IPv4 地址 . . . . . . . . . . . . : 192.168.79.1
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   默认网关. . . . . . . . . . . . . :

以太网适配器 VMware Network Adapter VMnet8:

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : fe80::f508:71d3:56e1:6b30%10
   IPv4 地址 . . . . . . . . . . . . : 192.168.12.1
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   默认网关. . . . . . . . . . . . . :

无线局域网适配器 WLAN:

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : fe80::a855:ecd0:285d:352e%13
   IPv4 地址 . . . . . . . . . . . . : 192.168.31.80
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   默认网关. . . . . . . . . . . . . : 192.168.31.1

以太网适配器 蓝牙网络连接:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . :
192.168.31.80 这就是本地ipv4版本地址
```

+ 打开计算器

```bat
calc
```


## 算术运算

+ 基本使用

```batch
C:\Users\noatn>set /a 2+5
7
C:\Users\noatn>set /a 4%3
1
C:\Users\noatn>set /a 2*3
6
```

+ 编写批处理文件

```batch
@echo off

set /a var_one = 3 * 7
echo %var_one%

pause
```

+ %var_one% 相当于引用变量var_one值

+ 有优先级的情况

```batch
@echo off

set /a param_a = (2+3) *10
set /a param_b = (2+30-100) *10

echo %param_a%

echo %param_b%

pause
```


### 重定向运算

+ \>  代表将结果存储到对应的位置

```batch
C:\Users\noatn>d:

D:\>cd D:\data\game

D:\data\game>echo '你好'
'你好'

D:\data\game>echo '你好' > a.txt

D:\data\game>dir
 驱动器 D 中的卷没有标签。
 卷的序列号是 60C3-1FDB

 D:\data\game 的目录

2022/10/23  15:51    <DIR>          .
2022/10/23  15:51    <DIR>          ..
2022/10/23  15:51                 9 a.txt
               1 个文件              9 字节
               2 个目录 293,906,841,600 可用字节

D:\data\game>type a.txt
'你好'

D:\data\game>
```

+ \>>   代表将结果追加并存储到对应的位置

```batch
D:\data\game>echo '你好' >> a.txt

D:\data\game>type a.txt
'你好'
'你好'

```


+ \< 读出命令或者文件内容

```batch
D:\data\game>sort < study.txt
'好好学习'
'天天向上'
```


+ type 文本文件内容查看

```batch
D:\data\game>echo '好好学习' > study.txt

D:\data\game>echo '天天向上' >> study.txt

D:\data\game>type study.txt
'好好学习'
'天天向上'
```

### 多命令运算

+ && 具有短路 第一个命令错误不会执行第二个命令

```batch
D:\data\game>aaa && ipconfig
'aaa' 不是内部或外部命令，也不是可运行的程序
或批处理文件。

D:\data\game>net user && ipconfig

\\DESKTOP-CCD057N 的用户帐户

-------------------------------------------------------------------------------
Administrator            DefaultAccount           Guest
noatn                    WDAGUtilityAccount
命令成功完成。


Windows IP 配置


以太网适配器 以太网 2:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . :

以太网适配器 以太网:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . :

无线局域网适配器 本地连接* 1:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . :

无线局域网适配器 本地连接* 2:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . :

以太网适配器 VMware Network Adapter VMnet1:

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : fe80::bc7f:faee:41f9:ecf7%18
   IPv4 地址 . . . . . . . . . . . . : 192.168.79.1
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   默认网关. . . . . . . . . . . . . :

以太网适配器 VMware Network Adapter VMnet8:

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : fe80::f508:71d3:56e1:6b30%10
   IPv4 地址 . . . . . . . . . . . . : 192.168.12.1
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   默认网关. . . . . . . . . . . . . :

无线局域网适配器 WLAN:

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : fe80::a855:ecd0:285d:352e%13
   IPv4 地址 . . . . . . . . . . . . : 192.168.31.80
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   默认网关. . . . . . . . . . . . . : 192.168.31.1

以太网适配器 蓝牙网络连接:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . :

D:\data\game>
```

+ ||  第一个命令执行成功就不会执行第二个命令了

```batch
D:\data\game>dssdh || ipconfig
'dssdh' 不是内部或外部命令，也不是可运行的程序
或批处理文件。

Windows IP 配置


以太网适配器 以太网 2:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . :

以太网适配器 以太网:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . :

无线局域网适配器 本地连接* 1:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . :

无线局域网适配器 本地连接* 2:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . :

以太网适配器 VMware Network Adapter VMnet1:

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : fe80::bc7f:faee:41f9:ecf7%18
   IPv4 地址 . . . . . . . . . . . . : 192.168.79.1
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   默认网关. . . . . . . . . . . . . :

以太网适配器 VMware Network Adapter VMnet8:

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : fe80::f508:71d3:56e1:6b30%10
   IPv4 地址 . . . . . . . . . . . . : 192.168.12.1
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   默认网关. . . . . . . . . . . . . :

无线局域网适配器 WLAN:

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : fe80::a855:ecd0:285d:352e%13
   IPv4 地址 . . . . . . . . . . . . : 192.168.31.80
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   默认网关. . . . . . . . . . . . . : 192.168.31.1

以太网适配器 蓝牙网络连接:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . :
```

### 管道符号

+ | 

```batch
C:\Users\noatn>d:

D:\>cd D:\data\game

D:\data\game>mkdir temp

D:\data\game>cd temp

D:\data\game\temp>dir
 驱动器 D 中的卷没有标签。
 卷的序列号是 60C3-1FDB

 D:\data\game\temp 的目录

2022/10/23  20:48    <DIR>          .
2022/10/23  20:48    <DIR>          ..
               0 个文件              0 字节
               2 个目录 293,937,827,840 可用字节

D:\data\game\temp>echo '1' > 1.txt

D:\data\game\temp>echo '2' > 2.txt

D:\data\game\temp>echo '## markdown' > ok.md

D:\data\game\temp>dir
 驱动器 D 中的卷没有标签。
 卷的序列号是 60C3-1FDB

 D:\data\game\temp 的目录

2022/10/23  20:49    <DIR>          .
2022/10/23  20:49    <DIR>          ..
2022/10/23  20:48                 6 1.txt
2022/10/23  20:48                 6 2.txt
2022/10/23  20:49                16 ok.md
               3 个文件             28 字节
               2 个目录 293,937,823,744 可用字节

D:\data\game\temp>dir | find ".txt"
2022/10/23  20:48                 6 1.txt
2022/10/23  20:48                 6 2.txt

D:\data\game\temp>
```

+ 使用find查找网络连接 netstat -an (查看所有网络连接)

```batch
D:\data\game\temp>netstat -an

活动连接

  协议  本地地址          外部地址        状态
  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING
  TCP    0.0.0.0:443            0.0.0.0:0              LISTENING
  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING
  TCP    0.0.0.0:902            0.0.0.0:0              LISTENING
  TCP    0.0.0.0:912            0.0.0.0:0              LISTENING
  TCP    0.0.0.0:3306           0.0.0.0:0              LISTENING
  TCP    0.0.0.0:3307           0.0.0.0:0              LISTENING
  TCP    0.0.0.0:5040           0.0.0.0:0              LISTENING
  TCP    0.0.0.0:5500           0.0.0.0:0              LISTENING
  TCP    0.0.0.0:7680           0.0.0.0:0              LISTENING
  TCP    0.0.0.0:33060          0.0.0.0:0              LISTENING
  TCP    0.0.0.0:33060          0.0.0.0:0              LISTENING
  TCP    0.0.0.0:49664          0.0.0.0:0              LISTENING
  TCP    0.0.0.0:49665          0.0.0.0:0              LISTENING
  TCP    0.0.0.0:49666          0.0.0.0:0              LISTENING
  TCP    0.0.0.0:49667          0.0.0.0:0              LISTENING
  TCP    0.0.0.0:49668          0.0.0.0:0              LISTENING
  TCP    0.0.0.0:49681          0.0.0.0:0              LISTENING
  TCP    0.0.0.0:51600          0.0.0.0:0              LISTENING
  TCP    0.0.0.0:51602          0.0.0.0:0              LISTENING
  TCP    0.0.0.0:56686          0.0.0.0:0              LISTENING
  TCP    127.0.0.1:1313         0.0.0.0:0              LISTENING
  TCP    127.0.0.1:1313         127.0.0.1:59957        ESTABLISHED
  TCP    127.0.0.1:1313         127.0.0.1:60097        ESTABLISHED
  TCP    127.0.0.1:1521         0.0.0.0:0              LISTENING
  TCP    127.0.0.1:1521         127.0.0.1:56688        ESTABLISHED
  TCP    127.0.0.1:6942         0.0.0.0:0              LISTENING
  TCP    127.0.0.1:8307         0.0.0.0:0              LISTENING
  TCP    127.0.0.1:8680         0.0.0.0:0              LISTENING
  TCP    127.0.0.1:10000        0.0.0.0:0              LISTENING
  TCP    127.0.0.1:10242        0.0.0.0:0              LISTENING
  TCP    127.0.0.1:39085        0.0.0.0:0              LISTENING
  TCP    127.0.0.1:49691        127.0.0.1:49692        ESTABLISHED
  TCP    127.0.0.1:49692        127.0.0.1:49691        ESTABLISHED
  TCP    127.0.0.1:49693        127.0.0.1:49694        ESTABLISHED
  TCP    127.0.0.1:49694        127.0.0.1:49693        ESTABLISHED
  TCP    127.0.0.1:49698        127.0.0.1:49699        ESTABLISHED
  TCP    127.0.0.1:49699        127.0.0.1:49698        ESTABLISHED
  TCP    127.0.0.1:49700        127.0.0.1:49701        ESTABLISHED
  TCP    127.0.0.1:49701        127.0.0.1:49700        ESTABLISHED
  TCP    127.0.0.1:51569        127.0.0.1:51570        ESTABLISHED
  TCP    127.0.0.1:51570        127.0.0.1:51569        ESTABLISHED
  TCP    127.0.0.1:51571        127.0.0.1:51572        ESTABLISHED
  TCP    127.0.0.1:51572        127.0.0.1:51571        ESTABLISHED
  TCP    127.0.0.1:51602        127.0.0.1:60123        ESTABLISHED
  TCP    127.0.0.1:53000        0.0.0.0:0              LISTENING
  TCP    127.0.0.1:54530        0.0.0.0:0              LISTENING
  TCP    127.0.0.1:54533        0.0.0.0:0              LISTENING
  TCP    127.0.0.1:54533        127.0.0.1:59854        ESTABLISHED
  TCP    127.0.0.1:56688        127.0.0.1:1521         ESTABLISHED
  TCP    127.0.0.1:56751        0.0.0.0:0              LISTENING
  TCP    127.0.0.1:59854        127.0.0.1:54533        ESTABLISHED
  TCP    127.0.0.1:59855        127.0.0.1:59856        ESTABLISHED
  TCP    127.0.0.1:59856        127.0.0.1:59855        ESTABLISHED
  TCP    127.0.0.1:59957        127.0.0.1:1313         ESTABLISHED
  TCP    127.0.0.1:60058        127.0.0.1:51602        TIME_WAIT
  TCP    127.0.0.1:60064        127.0.0.1:51600        TIME_WAIT
  TCP    127.0.0.1:60076        127.0.0.1:1313         TIME_WAIT
  TCP    127.0.0.1:60078        127.0.0.1:51602        TIME_WAIT
  TCP    127.0.0.1:60086        127.0.0.1:51602        TIME_WAIT
  TCP    127.0.0.1:60097        127.0.0.1:1313         ESTABLISHED
  TCP    127.0.0.1:60106        127.0.0.1:51602        TIME_WAIT
  TCP    127.0.0.1:60114        127.0.0.1:51602        TIME_WAIT
  TCP    127.0.0.1:60123        127.0.0.1:51602        ESTABLISHED
  TCP    127.0.0.1:63342        0.0.0.0:0              LISTENING
  TCP    192.168.0.123:2030     0.0.0.0:0              LISTENING
  TCP    192.168.12.1:139       0.0.0.0:0              LISTENING
  TCP    192.168.12.1:2030      0.0.0.0:0              LISTENING
  TCP    192.168.31.80:139      0.0.0.0:0              LISTENING
  TCP    192.168.31.80:50211    20.197.71.89:443       ESTABLISHED
  TCP    192.168.31.80:51040    112.53.36.19:80        ESTABLISHED
  TCP    192.168.31.80:58542    112.45.122.108:443     ESTABLISHED
  TCP    192.168.31.80:59936    101.32.33.45:443       CLOSE_WAIT
  TCP    192.168.31.80:59938    101.32.33.45:443       CLOSE_WAIT
  TCP    192.168.31.80:59939    185.199.109.153:443    ESTABLISHED
  TCP    192.168.31.80:59945    172.105.220.19:80      CLOSE_WAIT
  TCP    192.168.31.80:59947    172.105.220.19:80      CLOSE_WAIT
  TCP    192.168.31.80:59948    172.105.220.19:80      CLOSE_WAIT
  TCP    192.168.31.80:59949    172.105.220.19:80      CLOSE_WAIT
  TCP    192.168.31.80:59950    172.105.220.19:80      CLOSE_WAIT
  TCP    192.168.31.80:59982    220.246.254.9:5228     CLOSE_WAIT
  TCP    192.168.31.80:60062    223.85.58.92:443       ESTABLISHED
  TCP    192.168.31.80:60089    223.87.182.189:443     TIME_WAIT
  TCP    192.168.31.80:60094    112.45.122.109:443     ESTABLISHED
  TCP    192.168.31.80:60095    112.45.122.108:443     ESTABLISHED
  TCP    192.168.31.80:60115    142.251.43.10:443      SYN_SENT
  TCP    192.168.31.80:60116    142.251.43.10:443      SYN_SENT
  TCP    192.168.31.80:60117    142.251.43.10:443      SYN_SENT
  TCP    192.168.31.80:60118    142.251.43.10:443      SYN_SENT
  TCP    192.168.31.80:60119    172.217.160.106:443    SYN_SENT
  TCP    192.168.31.80:60120    172.217.160.106:443    SYN_SENT
  TCP    192.168.31.80:60121    172.217.160.106:443    SYN_SENT
  TCP    192.168.31.80:60122    172.217.163.42:443     SYN_SENT
  TCP    192.168.79.1:139       0.0.0.0:0              LISTENING
  TCP    192.168.79.1:2030      0.0.0.0:0              LISTENING
  TCP    [::]:135               [::]:0                 LISTENING
  TCP    [::]:443               [::]:0                 LISTENING
  TCP    [::]:445               [::]:0                 LISTENING
  TCP    [::]:3306              [::]:0                 LISTENING
  TCP    [::]:3307              [::]:0                 LISTENING
  TCP    [::]:5500              [::]:0                 LISTENING
  TCP    [::]:7680              [::]:0                 LISTENING
  TCP    [::]:33060             [::]:0                 LISTENING
  TCP    [::]:33060             [::]:0                 LISTENING
  TCP    [::]:49664             [::]:0                 LISTENING
  TCP    [::]:49665             [::]:0                 LISTENING
  TCP    [::]:49666             [::]:0                 LISTENING
  TCP    [::]:49667             [::]:0                 LISTENING
  TCP    [::]:49668             [::]:0                 LISTENING
  TCP    [::]:49681             [::]:0                 LISTENING
  TCP    [::]:51600             [::]:0                 LISTENING
  TCP    [::]:56686             [::]:0                 LISTENING
  TCP    [::1]:8307             [::]:0                 LISTENING
  TCP    [::1]:49669            [::]:0                 LISTENING
  TCP    [::1]:49680            [::]:0                 LISTENING
  TCP    [fe80::a855:ecd0:285d:352e%13]:2030  [::]:0                 LISTENING
  TCP    [fe80::bc7f:faee:41f9:ecf7%18]:2030  [::]:0                 LISTENING
  TCP    [fe80::f508:71d3:56e1:6b30%10]:2030  [::]:0                 LISTENING
  UDP    0.0.0.0:5050           *:*
  UDP    0.0.0.0:5353           *:*
  UDP    0.0.0.0:5353           *:*
  UDP    0.0.0.0:5353           *:*
  UDP    0.0.0.0:5353           *:*
  UDP    0.0.0.0:5353           *:*
  UDP    0.0.0.0:5353           *:*
  UDP    0.0.0.0:5353           *:*
  UDP    0.0.0.0:5353           *:*
  UDP    0.0.0.0:5353           *:*
  UDP    0.0.0.0:5353           *:*
  UDP    0.0.0.0:5353           *:*
  UDP    0.0.0.0:5353           *:*
  UDP    0.0.0.0:5353           *:*
  UDP    0.0.0.0:5353           *:*
  UDP    0.0.0.0:5353           *:*
  UDP    0.0.0.0:5353           *:*
  UDP    0.0.0.0:5353           *:*
  UDP    0.0.0.0:5353           *:*
  UDP    0.0.0.0:5353           *:*
  UDP    0.0.0.0:5355           *:*
  UDP    0.0.0.0:54095          *:*
  UDP    0.0.0.0:61357          *:*
  UDP    127.0.0.1:1900         *:*
  UDP    127.0.0.1:40000        *:*
  UDP    127.0.0.1:52174        *:*
  UDP    127.0.0.1:53904        *:*
  UDP    192.168.12.1:137       *:*
  UDP    192.168.12.1:138       *:*
  UDP    192.168.12.1:1900      *:*
  UDP    192.168.12.1:52172     *:*
  UDP    192.168.31.80:137      *:*
  UDP    192.168.31.80:138      *:*
  UDP    192.168.31.80:1900     *:*
  UDP    192.168.31.80:52173    *:*
  UDP    192.168.79.1:137       *:*
  UDP    192.168.79.1:138       *:*
  UDP    192.168.79.1:1900      *:*
  UDP    192.168.79.1:52171     *:*
  UDP    [::]:5353              *:*
  UDP    [::]:5353              *:*
  UDP    [::]:5353              *:*
  UDP    [::]:5353              *:*
  UDP    [::]:5353              *:*
  UDP    [::]:5353              *:*
  UDP    [::]:5353              *:*
  UDP    [::]:5353              *:*
  UDP    [::]:5353              *:*
  UDP    [::]:5353              *:*
  UDP    [::]:5355              *:*
  UDP    [::1]:1900             *:*
  UDP    [::1]:52170            *:*
  UDP    [::1]:55220            *:*
  UDP    [fe80::a855:ecd0:285d:352e%13]:1900  *:*
  UDP    [fe80::a855:ecd0:285d:352e%13]:52169  *:*
  UDP    [fe80::bc7f:faee:41f9:ecf7%18]:1900  *:*
  UDP    [fe80::bc7f:faee:41f9:ecf7%18]:52167  *:*
  UDP    [fe80::f508:71d3:56e1:6b30%10]:1900  *:*
  UDP    [fe80::f508:71d3:56e1:6b30%10]:52168  *:*
```

+ 查找当前主机与外部建立连接的网络

```batch
D:\data\game\temp>netstat -an | find "ESTABLISHED"
  TCP    127.0.0.1:1313         127.0.0.1:59957        ESTABLISHED
  TCP    127.0.0.1:1313         127.0.0.1:60156        ESTABLISHED
  TCP    127.0.0.1:1521         127.0.0.1:56688        ESTABLISHED
  TCP    127.0.0.1:49691        127.0.0.1:49692        ESTABLISHED
  TCP    127.0.0.1:49692        127.0.0.1:49691        ESTABLISHED
  TCP    127.0.0.1:49693        127.0.0.1:49694        ESTABLISHED
  TCP    127.0.0.1:49694        127.0.0.1:49693        ESTABLISHED
  TCP    127.0.0.1:49698        127.0.0.1:49699        ESTABLISHED
  TCP    127.0.0.1:49699        127.0.0.1:49698        ESTABLISHED
  TCP    127.0.0.1:49700        127.0.0.1:49701        ESTABLISHED
  TCP    127.0.0.1:49701        127.0.0.1:49700        ESTABLISHED
  TCP    127.0.0.1:51569        127.0.0.1:51570        ESTABLISHED
  TCP    127.0.0.1:51570        127.0.0.1:51569        ESTABLISHED
  TCP    127.0.0.1:51571        127.0.0.1:51572        ESTABLISHED
  TCP    127.0.0.1:51572        127.0.0.1:51571        ESTABLISHED
  TCP    127.0.0.1:51600        127.0.0.1:60197        ESTABLISHED
  TCP    127.0.0.1:51602        127.0.0.1:60189        ESTABLISHED
  TCP    127.0.0.1:54533        127.0.0.1:59854        ESTABLISHED
  TCP    127.0.0.1:56688        127.0.0.1:1521         ESTABLISHED
  TCP    127.0.0.1:59854        127.0.0.1:54533        ESTABLISHED
  TCP    127.0.0.1:59855        127.0.0.1:59856        ESTABLISHED
  TCP    127.0.0.1:59856        127.0.0.1:59855        ESTABLISHED
  TCP    127.0.0.1:59957        127.0.0.1:1313         ESTABLISHED
  TCP    127.0.0.1:60156        127.0.0.1:1313         ESTABLISHED
  TCP    127.0.0.1:60189        127.0.0.1:51602        ESTABLISHED
  TCP    127.0.0.1:60197        127.0.0.1:51600        ESTABLISHED
  TCP    192.168.31.80:50211    20.197.71.89:443       ESTABLISHED
  TCP    192.168.31.80:51040    112.53.36.19:80        ESTABLISHED
  TCP    192.168.31.80:60192    223.85.58.92:443       ESTABLISHED
```







