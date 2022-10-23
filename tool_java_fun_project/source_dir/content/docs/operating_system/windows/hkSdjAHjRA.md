---
title: "DOS基本命令 (新) "
date: 2021-04-15
draft: false
weight: 2
---


## 命令格式

+ 命令 子命令 参数 操作 选项

+ /? /help 获取详细的帮助信息

```batch
D:\data\game\temp>net user /help
此命令的语法是:

NET USER
[username [password | *] [options]] [/DOMAIN]
         username {password | *} /ADD [options] [/DOMAIN]
         username [/DELETE] [/DOMAIN]
         username [/TIMES:{times | ALL}]
         username [/ACTIVE: {YES | NO}]

NET USER 将创建并修改计算机上的用户帐户。在不使用命令开关的情况下，
将列出计算机的用户帐户。用户帐户信息存储在用户帐户数据库中。

username     为可添加、删除、修改或查看的用户帐户的名称。用户帐户名称
             最多可以有 20 个字符。
password     指定或更改用户帐户的密码。密码的长度必须符合 NET ACCOUNTS
             命令的 /MINPWLEN 选项所设置的最小长度。
             最多可以有 14 个字符。
*            生成密码提示。在密码提示下键入密码时，将不会显示密码。
/DOMAIN      在当前域的域控制器上执行此操作。
/ADD         向用户帐户数据库添加用户帐户。
/DELETE      从用户帐户数据库删除用户帐户。

选项         如下所示:

   选项                       描述
      --------------------------------------------------------------------
   /ACTIVE:{YES | NO}         激活或取消激活帐户。如果该帐户处于非激活状态，
                              用户将无法访问服务器。默认设置为“YES”。
   /COMMENT:"text"            提供有关用户帐户的描述性注释。请将文本用引号
                              括起来。
   /COUNTRYCODE:nnn           使用操作系统国家/地区代码执行指定的语言文件，
                              以显示用户帮助和错误消息。值 0 表示使用默认
                              的国家/地区代码。
   /EXPIRES:{date | NEVER}    如果设置了日期，可导致帐户过期。
                              NEVER 将帐户设置为无时间限制。
                              过期日期采用格式 mm/dd/yy(yy)。
                              月份可以是一个数字、完整字母拼写，
                              或使用三个字母的缩写。年份可以使用两位数字
                              或四位数字。使用斜线(/)(不留空格)
                              将日期的各个部分隔开。
   /FULLNAME:"name"           用户的全名(而不是用户名)。请将该名称用引号
                              括起来。
   /HOMEDIR:pathname          用户的主目录设置路径。该路径必须存在。
   /PASSWORDCHG:{YES | NO}    指定用户是否可以更改其密码。默认设置
                              为“YES”。
   /PASSWORDREQ:{YES | NO}    指定用户帐户是否必须拥有密码。
                              默认设置为“YES”。
   /LOGONPASSWORDCHG:{YES|NO} 指定用户是否应在下次登录时更改其密码。
                              默认设置为“NO”。
   /PROFILEPATH[:path]        为用户登录配置文件设置路径。
   /SCRIPTPATH:pathname       用户登录脚本的位置。
   /TIMES:{times | ALL}       登录小时数。TIMES 表示为
                              day[-day][,day[-day]],time[-time][,time
                              [-time]]，增量限制为 1 小时。
                              日期可以是完整拼写，也可以是缩写。
                              小时可以是 12 或 24 小时表示法。对于
                              12 小时表示法，请使用 am、pm、a.m. 或
                              p.m。ALL 表示用户始终可以登录，
                              空白值表示用户始终不能登录。使用逗号将日期和时
                              间隔开，使用分号将多个日期和时间隔开。
   /USERCOMMENT:"text"        允许管理员添加或更改帐户的用户注释。
   /WORKSTATIONS:{computername[,...] | *}
                              列出用户可用于登录到网络的计算机，最多为八台。
                              如果 /WORKSTATIONS 没有列表，或其列表为 *，
                              则用户可以通过任何计算机登录到网络。

NET HELP 命令 | MORE 显示帮助内容，一次显示一屏。
```

## 批处理文件参数传递

+ .bat文件接受参数%num%

+ %1  %2 接收用户输入的数据绑定到参数中的位置

```batch
@cho off
echo %1
echo %2
pause
```

```batch
依据上面命令创建 PbiMCTGrJW.bat
D:\IdeaProjects\lifeDoc\tool_java_fun_project\source_dir\content\docs\operating_system\windows\bat>PbiMCTGrJW.bat 11 22
11
22
```

```batch
@echo off
rem 创建一个用户
net user %1 %2 /add
pause
```

## 注释

+ rem 后面跟注释就是

## 启动新窗口

```batch
D:\data\game\temp>start "my shell"
```




