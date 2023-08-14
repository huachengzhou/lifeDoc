---
title: "rabbit-mq"
date: 2020-01-17T15:26:15Z
draft: false
weight: 7
---


# rabbit-mq

+ 安装用户
```cmd
-- 创建账号
C:\Users\noatn>rabbitmqctl add_user admin 123456
Adding user "admin" ...
Done. Don't forget to grant the user permissions to some virtual hosts! See 'rabbitmqctl help set_permissions' to learn more.

-- 设置用户角色
C:\Users\noatn>rabbitmqctl set_user_tags admin administrator
Setting tags for user "admin" to [administrator] ...

-- 设置用户权限
C:\Users\noatn>rabbitmqctl set_permissions -p "/" admin ".*" ".*" ".*"
Setting permissions for user "admin" in vhost "/" ...

C:\Users\noatn>rabbitmqctl list_users
Listing users ...
user    tags
admin   [administrator]
guest   [administrator]

```



[下载地址](https://www.rabbitmq.com/download.html)
[参考1](https://blog.csdn.net/weixin_41421314/article/details/128315400)
