---
title: "git配置"
date: 2020-01-17T15:26:15Z
draft: false
weight: 1
---

	
	
	
	
	
	
	
```
zhou@zhou-Lenovo-Z480:~$ git version
	git version 2.7.4
	zhou@zhou-Lenovo-Z480:~$ ssh -T git@github.com
	Warning: Permanently added the RSA host key for IP address '192.30.255.112' to the list of known hosts.
	Permission denied (publickey).
	zhou@zhou-Lenovo-Z480:~$ git config --global user.name "zhouchenhua"
	zhou@zhou-Lenovo-Z480:~$  git config --global user.email "noatnu@163.com"
	zhou@zhou-Lenovo-Z480:~$ git config --list
	user.name=zhouchenhua
	user.email=noatnu@163.com
	zhou@zhou-Lenovo-Z480:~$ ssh-keygen -C ‘noatnu@163.com’ -t rsa
	Generating public/private rsa key pair.
	Enter file in which to save the key (/home/zhou/.ssh/id_rsa): america347191
	Enter passphrase (empty for no passphrase): 
	Enter same passphrase again: 
	Your identification has been saved in america347191.
	Your public key has been saved in america347191.pub.
	The key fingerprint is:
	SHA256:7WlMe5QL3eMrdG6b7BB/z66zSpwIOBRM0GTD4hK6BW4 ‘noatnu@163.com’
	The key's randomart image is:
	+---[RSA 2048]----+
	|    .B*          |
	|. . ..+o         |
	|.o o ..          |
	|.Eo .. . . . o   |
	|.o .  o S + = o  |
	|.      . = B.*.. |
	|          B.Boo .|
	|         . o.o+=.|
	|            .=O*+|
	+----[SHA256]-----+


	root@zhou-Lenovo-Z480:/home/zhou# cd ~/.ssh
	root@zhou-Lenovo-Z480:~/.ssh# ls -a
	.  ..  id_rsa  id_rsa.pub
	root@zhou-Lenovo-Z480:~/.ssh# gedit id_rsa.pub 
```	
	
	
	
	
	
	
	


