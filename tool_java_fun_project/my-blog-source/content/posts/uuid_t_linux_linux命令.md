---
title : 'linux命令'
date : '2021-02-15'
draft : false
tags : ["linux"]
categories : ["Temp","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---

# linux命令

## 文件管理

### 文件基本操作
+ less命令 (Q退出less命令)([pagedown]： 向下翻动一页)([pageup]： 向上翻动一页) less ss.md
+ cat命令 (cat -n ss.md > sdfsd.txt)把 ss.md 的文档内容加上行号后输入 sdfsd.txt 这个文档里,
  这要注意假如sdfsd.txt先有文档会被清空,另外(cat ss.md)可以把消息打印到输出流中,cat 软盘功能暂时不予以考虑
+ ls命令 (ls -a)显示所有文件及目录包括隐藏文件,相当于la命令,ll显示具体信息
  
+ touch命令 主要用作创建文件如touch ss.md,(touch -m miss,touch -a miss)可以改变文件的读取时间,另外touch miss也可以改变文件的读取时间,
  当且仅当miss不存在的时候会创建miss空文件
  
+ mkdir命令 主要用作创建文件目录;(mkdir dd)创建一个dd目录,(mkdir -p dd/ffg)在当前目录下建立一个dd目录并且在dd下创建一个ffg目录,假如dd不存在会自动创建的

+ mv命令 (mv missA miss.txt)把missA修改为miss.txt (mv sskg /home/zhou/fontconfig/dgsd/sdfg)把sskg移到sdfg目录 (mv ss.md ~)

+ file命令 (file -c ss.md)详细显示指令执行过程(file -v ss.md)显示版本信息 (tar zcvf ss.tar ss.md,file -z ss.tar)尝试去解读压缩文件的内容

+ find命令 (find . -type f)将目前目录其其下子目录中所有一般文件列出(find . -ctime -20)将目前目录及其子目录下所有最近 20 天内更新过的文件列出
  (find /home/zhou/fontconfig -name '**.md')任意的以md结尾的文件,-name改为-iname会忽略大小写(find /home/zhou/fontconfig -size 0)所有文件长度为0的普通文件
+ split命令 ( split -2 sdfsd.txt)  每隔２行分割成一个文件--> 分割后:xaa  xab  xac  xad  xae  xaf  xag

+ pwd命令 (pwd)pwd命令用于显示工作目录
+ rm命令 删除操作 (rm xaa)删除单一文件xaa文本文件,这里也是可以用正则的如rm x** ,(rm -r dgsd)递归删除文件目录dgsd下的所有文件包括其本身;
  (rm -rf baba)加了一个f此命令表示即使原档案属性设为唯读，亦直接删除，无需逐一确认
+ cp命令 复制或者说是拷贝命令 (cp ss.md s1)注意是在同级目录下 (cp /home/zhou/fontconfig/s1/ss.md ~),将ss.md复制到主home下,这的~可以随便换为其它目录
  (cp -a s1 /home/zhou/fontconfig/s2,cp -a s1 s2)当cp的是目录时要加上-a参数,当然如果加上-p就更好了,因为-p表示把file拥有的权限也一起复制
   如:(cp -ap s1 /home/zhou/fontconfig/s2),(cp -ap ./* /home/zhou/fontconfig/s3)在某个目录把所有内容都复制到s3下
+ chmod 权限命令 Linux/Unix 的文件调用权限分为三级 : 文件拥有者、群组、其他。利用 chmod 可以藉以控制文件如何被他人所调用。
+ u 表示该文件的拥有者，g 表示与该文件的拥有者属于同一个群体(group)者，o 表示其他以外的人，a 表示这三者皆是。+ 表示增加权限、- 表示取消权限、= 表示唯一设定权限。
  r 表示可读取，w 表示可写入，x 表示可执行，X 表示只有当该文件是个子目录或者该文件已经被设定过为可执行
+ (chmod ugo+r miss.txt)将文件miss.txt 设为所有人皆可读取;(chmod u+x ex1.py)将 ex1.py 设定为只有该文件拥有者可以执行;(chmod 777 file)chmod也可以用数字来表示权限如
  
   
## 文本操作
+ 假如是ubuntu则可以直接使用gedit (sudo apt-get install gedit)
+ vi命令 切换模式(i：光标处开始插入,l：光标所在行首开始插入,a：光标所在行尾开始插入,o：光标下插入新行) 进入编辑模式,当编辑完成时,在按Esc按键退出编辑模式,保存并退出：wq,
   不保存退出： q！
## 备份与压缩
+ zip (zip -r cc.zip s*)-r递归处理，将指定目录下的所有文件和子目录一并处理 (zip -rP 123456 miss.zip miss.txt)-P加密压缩密码123456 解压 unzip miss.zip
+ zip文件乱码问题 unzip -O cp936 xxx.zip
+ tar (tar zcvf ss.tar.gz miss.txt)压缩 (tar zxvf ss.tar.gz)解压
+ rar (rar x xxx.rar)解压

## 系统操作
+ (shutdown -h now)立即关机 (shutdown +5 "system 5mine")指定5分钟后关机
+ (export -p)列出所有的环境变量
+ uname -sr 内核版本查看
+ ubuntu (root密码修改 sudo passwd 输入两次就是root密码)






