---
title : 'gitIntroduction'
date : '2021-02-15'
draft : false
tags : ["git"]
categories : ["linux","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---

# git学习
## git 区域概念
* git分为工作区(我们自己的file)和版本库这其中版本库又包含暂存区(Stage)和分支区(master)
+ git add ********** 把文件添加到仓库
+ git reset README.md 取消提交到暂存区域
+ git commmit -m 'xxxx' 提交到仓库
+ git diff 查看提交到仓库文件之后文件又被修改的变化
+ git status 查看状态

+ git rm -f gitS.md 强制删除

+ git log 显示从最近到最远的提交日志
+ git log --pretty=oneline 只显示版本号

## 关于版本回退问题

+ git reset --hard HEAD^ 版本重置为上一个版本

+ git 关于版本处理进行了设置
+ git reset --hard HEAD^　重置为上一个版本
* 这里解释下HEAD表示当前版本 如最新提交的版本号:3a451d666e6c952e1588117ef18933be489beb18 zch,
* 上上一个版本就是HEAD^^ 那么假如是重置为上上一个版本那么命令就是git reset --hard HEAD^^
* 那么假如说有100个版本呢?当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100
* 如:git reset --hard HEAD~50 往上５０个版本
* 当然了如果记得具体版本号当然更好了
+ git reset --hard 3a451d666e6c952e1588117ef18933be489beb18 这样就可以了,对了这的版本号其实可以不用写全,因为是linux嘛


+ git reflog 记录一天的命令(当天)
```
a249f45 HEAD@{0}: reset: moving to HEAD^
545bb20 HEAD@{1}: commit: 2018年 03月 12日 星期一 10:17:56
a249f45 HEAD@{2}: commit: append GPL
3a451d6 HEAD@{3}: commit (initial): zch
```
* 你可以发现这里面包含当天所有操作的版本号(因为回退到某个版本之后那个版本号你再用git log就查找不出来了)
+ git log可以查看提交历史，以便确定要回退到哪个版本
+ git reflog查看命令历史，以便确定要回到未来的哪个版本。

* (假如在工作区的内容已经做了修改与暂存区之间相比有了变化,并且你想要要丢弃这种变化,那么你可以)
+ git checkout -- gitS.md 抛弃工作区所做的修改　那么工作区就被修改为与暂存区一样了
+ git checkout -- file命令中的--很重要，没有--，就变成了“切换到另一个分支”的命令
> 关于删除文件
+ 假如说你删除了当前工作区的某一个文件比如gitS.md
> 如进行了这个操作 rm gitS.md(linux 下)
> 这个时候，Git知道你删除了文件，因此，工作区和版本库就不一致了，git status命令会立刻告诉你哪些文件被删除了(git status)
> 现在你有两个选择，一是确实要从版本库中删除该文件，那就用命令(git rm gitS.md) (git commit -m 'yes delete file')
> 另一种情况是删错了，因为版本库里还有呢，所以可以很轻松地把误删的文件恢复到最新版本 命令(git checkout -- gitS.md)

# 分支(重点)
+ git checkout -b dev (创建dev分支，然后切换到dev分支)
```
git branch dev 创建分支dev
git checkout dev 切换到分支dev
```
+ git branch命令查看当前分支
> git branch命令会列出所有分支，当前分支前面会标一个*号
```
* dev
  master
```
> 可以随便写点内容然后提交 git commit -m 'branch test'
> 现在，dev分支的工作完成，我们就可以切换回master分支
+ git checkout master 切换到当前分支 (这时查看gitS.md刚刚随便写的内容并没有在file中)
>　我们需要与当前分支合并
+ git merge dev (dev与master合并,master表示主分支)
>  cat gitS.md 就看到我们添加的内容了
+ 再次查看当前分支 git branch (可以看到现在的分支已经是主分支了)
```
  dev
* master
```
+ 删除dev分支(git branch -d dev)
+ 再次查看 git branch (可以看到只是主分支master了)
```
* master
```
## 分支小结
```
Git鼓励大量使用分支：

查看分支：git branch

创建分支：git branch <name>

切换分支：git checkout <name>

创建+切换分支：git checkout -b <name>

合并某分支到当前分支：git merge <name>

删除分支：git branch -d <name>

```
## 分支冲突
```
当新创建了一个分支,并且修改内容提交之后,而后又转回到主分支并且又做了修改并且也提交之后,在这之后又进行了合并分支
这里我们把新创建分支并且做修改的内容称为a,把转到主分支并且做修改的内容称为b,当且仅当a与b相同的时候,这时会发生冲突
(因为这样在工作区的物理映射都一致了,ps因为都是由工作区提交到缓存区的嘛)
这个时候我们需要手动解决冲突问题,只需要在把工作区的内容重新修改(这里是已经合并之后)当然不能和b一致有一点点区别即可
然后重新提交就好
```

## 分支管理策略
```
通常，合并分支时，如果可能，Git会用Fast forward模式，但这种模式下，删除分支后，会丢掉分支信息。
如果要强制禁用Fast forward模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。
```
+ 新创建一个分支dev (git checkout -b dev)
* (git add gitS.md)   (git commit -m 'add merge')
* 在切换为主分支 (git checkout master)
+ 合并分支 以前的方式(git merge dev),这种方式上面说了会丢失信息,因此不采用此种方式(git merge --no-ff -m 'merge with no-ff' dev)这样就留下了合并信息
* (git log --graph --pretty=oneline --abbrev-commit)合并信息如下:
```
*   c41b6a7 merge with no-ff
|\  
| * d93a2e5 add merge
|/  
*   8e4aa4c conflict fixed
```

```
分支策略
在实际开发中，我们应该按照几个基本原则进行分支管理：
首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；
那在哪干活呢？干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，
```
## Bug分支
```
软件开发中，bug就像家常便饭一样。有了bug就需要修复，在Git中，由于分支是如此的强大，
所以，每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。

当你接到一个修复一个代号101的bug的任务时，很自然地，你想创建一个分支issue-101来修复它，但是，等等，当前正在dev上进行的工作还没有提交
并不是你不想提交，而是工作只进行到一半，还没法提交，预计完成还需1天时间。但是，必须在两个小时内修复该bug，怎么办？
幸好，Git还提供了一个stash功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作
```
+ git stash (暂时保存未提交的状态)
+ (git checkout -b issue-101) 说明:却换到此版本之后实际工作区的内容并没有你还没有提交的内容,因此你做出修改
```
承接上面,关于是否有冲突问题,冲突的原因是你在主分支(master)开发的同时又去修改了项目内容并且和修复bug的分支所做出的修改有相同的地方
,这时就会产生冲突,在你把bug分支与主分支合并之后并且恰好产生冲突git是会提示的　git会标识出来 这个时侯bug修改的内容已经被添加到了主分支
因此主分支中关于冲突的部分被git标识了,这个时候我们自己手动修改即可(重复的删除即可,然后在重新提交,检查无误之后删除bug分支)

```
* 修复完成之后提交 (git add gitS.md) (git commit -m 'fix bug 101')
* 切换到master分支 (git checkout master)
* 与bug分支合并(git merge --no-ff -m "merged bug fix 101" issue-101) 删除issue-101 (git branch -d issue-101)
* (检查是否有冲突,一般不会有)

* 回到工作的分支上去写代码,这时需要恢复 (git stash pop)||恢复的同时把stash内容也删了
* 注意:可以多次stash，恢复的时候，先用git stash list查看，然后恢复指定的stash，用命令git stash apply stash@{0}或者git stash pop stash@{0}
* (检查是否有冲突 我自己检查是有冲突的, git给我把恢复的那行(原来的)给标识出来了,然后就删除多余的并且也把标识符也删除然后重新提交即可)

## 强行删除某个分支 (假如某个项目中的某个功能不需要了,并且这个功能还没有提交,那么需要强行删除这个分支)(git branch -D feature-xx)(只需把d改为大写即可)

# 多人协作
+ 要查看远程库的信息(git remote)  origin ,远程仓库的默认名称是origin

+ 查看详细信息(git remote -v)

```
origin	git@github.com:noatnu/docZCH.git (fetch)
origin	git@github.com:noatnu/docZCH.git (push)
psuh 推送地址,fetch抓取地址(当且仅当你有推送权限才会看到push地址)
```
## 推送分支
* 推送分支，就是把该分支上的所有本地提交推送到远程库。推送时，要指定本地分支，这样，Git就会把该分支推送到远程库对应的远程分支上
+ 假如推送本地的主分支 (git push origin master),假如不是主分支,例如要推送的分支是dev,那么 (git push origin dev)

## 抓取分支
* 多人协作时，大家都会往master和dev分支上推送各自的修改
* A小伙伴 git clone git@github.com:noatnu/jkblue.git
* A小伙伴从远程库clone时，默认情况下，A小伙伴只能看到本地的master分支
* 现在，A小伙伴要在dev分支上开发，就必须创建远程origin的dev分支到本地，于是他用这个命令创建本地dev分支
* (git checkout -b dev origin/dev) 相当于把远程仓库与新创建并且已经切换到dev的分支相关联起来
* (git checkout -b dev)因为此命令表示创建并且切换,后面origin/dev表示关联起来

# 标签
* 在Git中打标签非常简单，首先，切换到需要打标签的分支上
* (git checkout dev)
* 打标签 (git tag v1.1)
* 查看标签 git tag
* 还可以对具体的版本打标签,比如某某版本号是123456
* (git tag v1.2 123456)
* 还可以创建带有说明的标签，用-a指定标签名，-m指定说明文字
* (git tag -a v1.2 -m '打标签' 123456)

# 提交并推送
```
首先进入需要提交的那个项目

将此项目下所有的文件添加到git版本管理系统下,假如你需要其它操作添加，直接正则表达式过滤添加
git add ./*  

提交到 git 本地仓库
git commit -m '2020-01-20 下午推送一次'

推送
git push -u origin master
如果报错请检查一下推送的分支是否正确
git branch
会这样显示
----
* dev
  marster
---
表示当前分值在dev分支

改为 git push -u origin dev

看到推送的数据,以及没有出现error等就表示成功
你可以git status查看下

```

##  [回到linux首页](../index.md)
