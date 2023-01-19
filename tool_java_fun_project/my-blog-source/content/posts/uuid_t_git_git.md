---
title : 'git'
date : '2021-02-15'
draft : false
tags : ["git"]
categories : ["problem","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---




+ Push master to origin/master was rejected by remote

```
有三种原因
1:push的这个工程是其他人新建的，找她开通master权限后，再次push

2:git 工程错误
git pull
git pull origin master
git pull origin master --allow-unrelated-histories

3:github 设置原因
勾选了Keep my email addresses private
解决办法2种
第一种  通知账户人员取消勾选
第二种
重新设置你的全局用户E-mail
git config --list 查看这个时候一定不对
因此重新设置全局email
重置上次提交的作者信息 git commit --amend --reset-author
git config --global user.name "zch"
git config --global user.email "sdhshd@163.com"
ok
对了你如果使用的不是idea而是git
那么抛出的错误非常明显
如果抛出
git报错-->! [remote rejected] master -> master (push declined due to email privacy restrictions)
那么一定是这个原因
```






+ git clone时报RPC failed; curl 18 transfer closed with outstanding read data remaining 错误
```
原因1：缓存区溢出

git config http.postBuffer 524288000

执行上面命令如果依旧clone失败，考虑可能原因2：网络下载速度缓慢

解决方法：命令行输入
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999

如果依旧clone失败，则首先浅层clone，然后更新远程库到本地

git clone --depth=1 http://gitlab.xxx.cn/yyy/zzz.git
git fetch --unshallow

```
















