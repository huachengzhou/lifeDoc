---
title: "hugo教程1"
date: 2017-10-17T15:26:15Z
draft: false
bookToc: false
bookFlatSection: true
---

# 教程1




## 快速开始



+ 步骤1：安装Hugo

```
brew install hugo
# or
port install hugo
```

+ 要验证新安装

```
hugo version
```


+ 步骤2：建立新网站

```
hugo new site quickstart
# 上面的代码将在名为的文件夹中创建一个新的Hugo网站quickstart。
```

+ 步骤3：添加主题

```
# 首先，从GitHub下载主题并将其添加到您站点的themes目录中：
cd quickstart
git init
git submodule add https://github.com/budparr/gohugo-theme-ananke.git themes/ananke
```

+ 然后，将主题添加到站点配置中：

``` 
echo 'theme = "ananke"' >> config.toml
```


+ 步骤4：添加一些内容


``` 
hugo new posts/my-first-post.md
```

+ 如果需要，请编辑新创建的内容文件，该文件将从以下内容开始：

``` 
    ---
    title: "My First Post"
    date: 2019-03-26T08:47:11+01:00
    draft: true
    ---
```


+ 步骤5：启动Hugo服务器

``` 
▶ hugo server -D

                   | EN
+------------------+----+
  Pages            | 10
  Paginator pages  |  0
  Non-page files   |  0
  Static files     |  3
  Processed images |  0
  Aliases          |  1
  Sitemaps         |  1
  Cleaned          |  0

Total in 11 ms
Watching for changes in /Users/bep/quickstart/{content,data,layouts,static,themes}
Watching for config changes in /Users/bep/quickstart/config.toml
Environment: "development"
Serving pages from memory
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop

```


+ 步骤7：建立静态页面

```
hugo -D
./public/默认情况下，输出将位于目录中（-d/--destination标志进行更改，或publishdir在配置文件中设置）
```










