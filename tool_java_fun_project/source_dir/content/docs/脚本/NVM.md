---
title: "多版本Node.js的版本共存和无缝切换 "
date: 2021-06-17
draft: false
weight: 15
---


# nvm

> 主要原理就是nodeJs多版本切换

## nvm-windows

+ [下载](https://github.com/coreybutler/nvm-windows)

+ ps 我选择的是2024-07-09看到的最高版本1.1.12
+ [安装](https://github.com/coreybutler/nvm-windows/tags)
+ [安装exe](https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe)
+ 如果使用压缩包 就自己配置好环境变量即可 [参考](https://www.cnblogs.com/alinelong/p/18025263)

### 使用  
> 以后安装nodeJs版本就直接用 num安装即可

+ 查看有哪些可使用版本

```cmd
C:\Users\noatn>nvm list available

|   CURRENT    |     LTS      |  OLD STABLE  | OLD UNSTABLE |
|--------------|--------------|--------------|--------------|
|    22.4.1    |   20.15.1    |   0.12.18    |   0.11.16    |
|    22.4.0    |   20.15.0    |   0.12.17    |   0.11.15    |
|    22.3.0    |   20.14.0    |   0.12.16    |   0.11.14    |
|    22.2.0    |   20.13.1    |   0.12.15    |   0.11.13    |
|    22.1.0    |   20.13.0    |   0.12.14    |   0.11.12    |
|    22.0.0    |   20.12.2    |   0.12.13    |   0.11.11    |
|    21.7.3    |   20.12.1    |   0.12.12    |   0.11.10    |
|    21.7.2    |   20.12.0    |   0.12.11    |    0.11.9    |
|    21.7.1    |   20.11.1    |   0.12.10    |    0.11.8    |
|    21.7.0    |   20.11.0    |    0.12.9    |    0.11.7    |
|    21.6.2    |   20.10.0    |    0.12.8    |    0.11.6    |
|    21.6.1    |    20.9.0    |    0.12.7    |    0.11.5    |
|    21.6.0    |   18.20.4    |    0.12.6    |    0.11.4    |
|    21.5.0    |   18.20.3    |    0.12.5    |    0.11.3    |
|    21.4.0    |   18.20.2    |    0.12.4    |    0.11.2    |
|    21.3.0    |   18.20.1    |    0.12.3    |    0.11.1    |
|    21.2.0    |   18.20.0    |    0.12.2    |    0.11.0    |
|    21.1.0    |   18.19.1    |    0.12.1    |    0.9.12    |
|    21.0.0    |   18.19.0    |    0.12.0    |    0.9.11    |
|    20.8.1    |   18.18.2    |   0.10.48    |    0.9.10    |

This is a partial list. For a complete list, visit https://nodejs.org/en/download/releases
```

+ 如 我安装

```cmd
nvm install 20.11.1
```

+ 过程

```cmd
C:\Users\noatn>nvm install 20.11.1
Downloading node.js version 20.11.1 (64-bit)...
Extracting node and npm...
Complete
npm v10.2.4 installed successfully.


Installation complete. If you want to use this version, type

nvm use 20.11.1
```

+ 切换

```cmd
C:\Users\noatn>nvm use 20.11.1
Now using node v20.11.1 (64-bit)

C:\Users\noatn>node -v
v20.11.1
```


## 帮助命令

+ 已经安装在 nvm 中的 Node.js 版本

```cmd
C:\Users\noatn>nvm ls

  * 20.11.1 (Currently using 64-bit executable)
    16.14.2
```

或者

```cmd
C:\Users\noatn>nvm list

  * 20.11.1 (Currently using 64-bit executable)
    16.14.2
```


### help

```cmd
Usage:

  nvm arch                     : Show if node is running in 32 or 64 bit mode.
  nvm current                  : Display active version.
  nvm debug                    : Check the NVM4W process for known problems (troubleshooter).
  nvm install <version> [arch] : The version can be a specific version, "latest" for the latest current version, or "lts" for the
                                 most recent LTS version. Optionally specify whether to install the 32 or 64 bit version (defaults
                                 to system arch). Set [arch] to "all" to install 32 AND 64 bit versions.
                                 Add --insecure to the end of this command to bypass SSL validation of the remote download server.
  nvm list [available]         : List the node.js installations. Type "available" at the end to see what can be installed. Aliased as ls.
  nvm on                       : Enable node.js version management.
  nvm off                      : Disable node.js version management.
  nvm proxy [url]              : Set a proxy to use for downloads. Leave [url] blank to see the current proxy.
                                 Set [url] to "none" to remove the proxy.
  nvm node_mirror [url]        : Set the node mirror. Defaults to https://nodejs.org/dist/. Leave [url] blank to use default url.
  nvm npm_mirror [url]         : Set the npm mirror. Defaults to https://github.com/npm/cli/archive/. Leave [url] blank to default url.
  nvm uninstall <version>      : The version must be a specific version.
  nvm use [version] [arch]     : Switch to use the specified version. Optionally use "latest", "lts", or "newest".
                                 "newest" is the latest installed version. Optionally specify 32/64bit architecture.
                                 nvm use <arch> will continue using the selected version, but switch to 32/64 bit mode.
  nvm root [path]              : Set the directory where nvm should store different versions of node.js.
                                 If <path> is not set, the current root will be displayed.
  nvm [--]version              : Displays the current running version of nvm for Windows. Aliased as v.
```

+ 从上面可以看到 nvm list ,nvm on,nvm off ,nvm use [version] ,nvm uninstall
这些命令都非常好 列出版本，启用呀 禁用呀 切换呀  卸载呀
