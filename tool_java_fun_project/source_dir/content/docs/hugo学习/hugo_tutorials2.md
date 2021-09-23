---
title: "hugo教程2"
date: 2017-10-17T15:26:15Z
draft: false
bookToc: false
bookFlatSection: true
---

# 教程2




+ 1、	创建blog

```
hugo new site myblog_pub
cd myblog_pub/
git submodule add https://github.com/chinanf-boy/gohugo-theme-yinwang.git themes/yinwang
```

+ 2、	修改配置

+ vi config.toml

```
root@instance-x8rtph4n:/home/go/code/hugo_dir/myblog_pub/public# more ../config.toml 
baseURL = "http://ypbsyy.github.io/"
languageCode = "en-us"
title = "我是yaopeng"
theme = "yinwang"
#pygmentsCodeFences = true
#pygmentsCodefencesGuessSyntax = false
#pygmentsStyle = "dracula"
#pygmentsOptions = ['linenos']
# 代码高亮/chroma，hugo默认自带

```
 
```
[params]
    author = "yaopeng"
    github = "yaopeng"
    # gitlab = "yobrave"
    #googleAnalytics = "****"
    # 谷歌统计gtag
    highlight = "dracula" # 默认样式 `github`
    langs = ["go"]
    # 默认加载 highlight.min.js，但 一些不支持的语言, 你自己添加,
    # 其实也可以使用hugo自带的语法高亮器设置，不过我有点懒
    # single = false
    # 单页面的Home 按钮去除
    # menus = true
    # 我 想加更多目录
    # backgroundColor = "#fbf6ec"
```

# 加点黄黄的背景色

+ 3、	创建github
 

+ 4、	部署到github

```
git submodule init
git submodule update
```
 
```
hugo --buildDrafts
cd public/
git init
git remote rm origin 
git remote add origin https://github.com/ypbsyy/ypbsyy.github.io.git
git add -A
git commit -m "first commit"
git push -u origin master

这里面实际到hugo –buildDrafts 这里就ok 剩余的是把public中的html传入静态网页中
```

+ 注意文章开头必须有这几个

```
    ---
    title: "My First Post"
    date: 2019-03-26T08:47:11+01:00
    draft: true
    ---
```

+ baseURL = "https://swagcode-io.github.io/demo"

+ 这里的url是自己对应的

+ git submodule add https://github.com/chinanf-boy/gohugo-theme-yinwang.git themes/yinwang

+ 下载主题

+ 参考网址
+ https://www.pianshen.com/article/1216214802/

+ https://zhuanlan.zhihu.com/p/105021100?utm_source=weibo

+ https://zhuanlan.zhihu.com/p/105021100?utm_source=weibo






