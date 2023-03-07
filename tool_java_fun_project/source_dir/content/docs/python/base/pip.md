---
title: "python pip"
date: 2023-02-15
draft: false
weight: 2
---

## 安装

目前如果你在Python官网下载最新版本的安装包，都已经自带了该工具

Python 2.7.9 + 或 Python 3.4+ 以上版本都自带 pip 工具。

+ 检测安装

```cmd
C:\Users\noatn> pip --version
pip 23.0.1 from c:\soft\python\lib\site-packages\pip (python 3.7)

C:\Users\noatn>
```

+ 下载安装

可以通过命令 pip --version 来判断是否已安装： pip --version

如果你还未安装，则可以使用以下两种方法来安装：

1、Python附带了一个ensurepip模块，可以在Python环境中安装pip。cmd输入以下命令

```cmd
py -m ensurepip --upgrade
```

2、还可以下载一个Python脚本，使用命令行引导逻辑来安装pip

下载脚本 到你的Python文件夹下
win+cmd打开终端，切换至你脚本的目录
输入命令回车

```cmd
py get-pip.py
```

## 最常用命令

+ 升级pip

```cmd
python -m pip install --upgrade pip
```


+ 显示版本和路径

```cmd
C:\Users\noatn>pip --version
pip 23.0.1 from c:\soft\python\lib\site-packages\pip (python 3.7)

C:\Users\noatn>
```

+ 获取帮助

```cmd
C:\Users\noatn>pip --help

Usage:
  pip <command> [options]

Commands:
  install                     Install packages.
  download                    Download packages.
  uninstall                   Uninstall packages.
  freeze                      Output installed packages in requirements format.
  inspect                     Inspect the python environment.
  list                        List installed packages.
  show                        Show information about installed packages.
  check                       Verify installed packages have compatible dependencies.
  config                      Manage local and global configuration.
  search                      Search PyPI for packages.
  cache                       Inspect and manage pip's wheel cache.
  index                       Inspect information available from package indexes.
  wheel                       Build wheels from your requirements.
  hash                        Compute hashes of package archives.
  completion                  A helper command used for command completion.
  debug                       Show information useful for debugging.
  help                        Show help for commands.

General Options:
  -h, --help                  Show help.
  --debug                     Let unhandled exceptions propagate outside the main subroutine, instead of logging them
                              to stderr.
  --isolated                  Run pip in an isolated mode, ignoring environment variables and user configuration.
  --require-virtualenv        Allow pip to only run in a virtual environment; exit with an error otherwise.
  --python <python>           Run pip with the specified Python interpreter.
  -v, --verbose               Give more output. Option is additive, and can be used up to 3 times.
  -V, --version               Show version and exit.
  -q, --quiet                 Give less output. Option is additive, and can be used up to 3 times (corresponding to
                              WARNING, ERROR, and CRITICAL logging levels).
  --log <path>                Path to a verbose appending log.
  --no-input                  Disable prompting for input.
  --proxy <proxy>             Specify a proxy in the form scheme://[user:passwd@]proxy.server:port.
  --retries <retries>         Maximum number of retries each connection should attempt (default 5 times).
  --timeout <sec>             Set the socket timeout (default 15 seconds).
  --exists-action <action>    Default action when a path already exists: (s)witch, (i)gnore, (w)ipe, (b)ackup,
                              (a)bort.
  --trusted-host <hostname>   Mark this host or host:port pair as trusted, even though it does not have valid or any
                              HTTPS.
  --cert <path>               Path to PEM-encoded CA certificate bundle. If provided, overrides the default. See 'SSL
                              Certificate Verification' in pip documentation for more information.
  --client-cert <path>        Path to SSL client certificate, a single file containing the private key and the
                              certificate in PEM format.
  --cache-dir <dir>           Store the cache data in <dir>.
  --no-cache-dir              Disable the cache.
  --disable-pip-version-check
                              Don't periodically check PyPI to determine whether a new version of pip is available for
                              download. Implied with --no-index.
  --no-color                  Suppress colored output.
  --no-python-version-warning
                              Silence deprecation warnings for upcoming unsupported Pythons.
  --use-feature <feature>     Enable new functionality, that may be backward incompatible.
  --use-deprecated <feature>  Enable deprecated functionality, that will be removed in the future.

C:\Users\noatn>
```

+ 升级 pip

```cmd
C:\Users\noatn>pip install -U pip
Requirement already satisfied: pip in c:\soft\python\lib\site-packages (23.0.1)
WARNING: Retrying (Retry(total=4, connect=None, read=None, redirect=None, status=None)) after connection broken by 'ProxyError('Cannot connect to proxy.', OSError(0, 'Error'))': /simple/pip/
WARNING: Retrying (Retry(total=3, connect=None, read=None, redirect=None, status=None)) after connection broken by 'ProxyError('Cannot connect to proxy.', OSError(0, 'Error'))': /simple/pip/
WARNING: Retrying (Retry(total=2, connect=None, read=None, redirect=None, status=None)) after connection broken by 'ProxyError('Cannot connect to proxy.', OSError(0, 'Error'))': /simple/pip/
WARNING: Retrying (Retry(total=1, connect=None, read=None, redirect=None, status=None)) after connection broken by 'ProxyError('Cannot connect to proxy.', OSError(0, 'Error'))': /simple/pip/
WARNING: Retrying (Retry(total=0, connect=None, read=None, redirect=None, status=None)) after connection broken by 'ProxyError('Cannot connect to proxy.', OSError(0, 'Error'))': /simple/pip/
C:\Users\noatn>
```

```
ps:升级需谨慎，经常看到pip提醒升级，然后输入命令回车，系统开始下载最新版安装包，
准备安装前卸载了旧版pip，然后新版又报错无法安装，只好又重装。
```

+ 安装包

pip install SomePackage # 最新版本
pip install SomePackage==1.0.4 # 指定版本
pip install ‘SomePackage>=1.0.4’ # 最小版本

比如我要安装sklearn，输入pip install sklearn，就会安装最新版本的包

+ 升级包

pip install --upgrade SomePackage

```cmd
升级指定的包，通过使用==, >=, <=, >, < 来指定一个版本号。
```

+ 卸载包

pip uninstall SomePackage

```cmd

```

+ 搜索包

pip search SomePackage

+ 显示安装包信息

pip show SomePackage

+ 列出已安装的包

pip list

```cmd
E:\pythonProjects\python_first>pip list
Package    Version
---------- -------
pip        23.0.1
setuptools 41.2.0

```

+ 查看指定包的详细信息

pip show -f SomePackage

+ 查看需要被升级的包

我们需要查看一下现有的这些包中，哪些是需要是被升级的，可以用下面这行命令行来查看

pip list -o

+ 查看兼容问题

在下载安装一些标准库的时候，需要考虑到兼容问题，一些标准库的安装可能需要依赖其他的标准库，会存在版本相冲突等问题，我们先用下面这条命令行来检查一下是否会有冲突的问题存在

pip check package_name

当然要是我们不指定是哪个标准库的话，会检查现在已经安装的所有包中的是否存在版本冲突等问题

pip check

+ 指定国内源来安装

我们要是感觉到安装的速度有点慢，可以指定国内的源来安装某个包，例如

pip install -i https://pypi.douban.com/simple/ package_name

+ 国内源有

```
清华：https://pypi.tuna.tsinghua.edu.cn/simple
阿里云：http://mirrors.aliyun.com/pypi/simple/
中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/
华中理工大学：http://pypi.hustunique.com/
山东理工大学：http://pypi.sdutlinux.org/ 
豆瓣：http://pypi.douban.com/simple/
```

+ 下载包但是不安装

要是我们想要下载某个包到指定的路径下，命令行如下

pip download package_name -d "某个路径"

例如

pip download requests -d "."

就是在当前的目录下下载requests模块以及其他所要依赖的模块

+ 在国内无法安装某些包但是又无法达梯子的情况

比如安装 requests  
正常是 pip install requests
折中方案 pip install requests  -i http://pypi.douban.com/simple/ --trusted-host pypi.douban.com

//这里注意假如提醒你升级pip 那你升级后在重新安装包
// 有可能是叫你升级(python3版本对应的pip哦)

+ 建议使用 豆瓣的 (豆瓣网站就是python涉及到的包多一点) 各个大学可能带科研性质的多一点


