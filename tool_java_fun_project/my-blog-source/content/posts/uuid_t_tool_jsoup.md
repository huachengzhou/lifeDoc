---
title : 'jsoup'
date : '2021-02-15'
draft : false
tags : ["tool"]
categories : ["java","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---

# jsoup学习文档

## 简介


> Jsoup是用于解析HTML，就类似XML解析器用于解析XML。 Jsoup它解析HTML成为真实世界的HTML。 它与jquery选择器的语法非常相似，并且非常灵活容易使用以获得所需的结果


+jsoup api 6个包提供用于开发jsoup应用程序的类和接口。
```
org.jsoup
org.jsoup.examples
org.jsoup.helper
org.jsoup.nodes
org.jsoup.parser
org.jsoup.safety
org.jsoup.salect
```
  


## 引入

```
//大多数情况使用jsoup
org.jsoup.nodes.Document document = Jsoup.parse(html);
Document doc = Jsoup.parse(new URL("http://www.funi.com/"),7000);

//少数情况使用httpUnit
WebClient webClient = new WebClient() ;
HtmlPage htmlPage = webClient.getPage("http://www.89ip.cn/");
htmlPage.asXml()//html
```

## 使用(maven)
```
<dependency>
    <!-- jsoup HTML parser library @ http://jsoup.org/ -->
    <groupId>org.jsoup</groupId>
    <artifactId>jsoup</artifactId>
    <version>1.10.2</version>
</dependency>
<!-- httpclient -->
<dependency>
    <groupId>org.apache.httpcomponents</groupId>
    <artifactId>httpclient</artifactId>
    <version>4.5.6</version>
</dependency>
<dependency>
    <groupId>net.sourceforge.htmlunit</groupId>
    <artifactId>htmlunit</artifactId>
    <version>2.26</version>
</dependency>
```

### 解析一个body片断
> 假如你有一个HTML片断 (比如. 一个 div 包含一对 p 标签; 一个不完整的HTML文档) 想对它进行解析。这个HTML片断可以是用户提交的一条评论或在一个CMS页面中编辑body部分。

办法:使用[Jsoup.parseBodyFragment(String html)](https://jsoup.org/apidocs/org/jsoup/Jsoup.html/ '方法') ,[Document.body()](# '方法') 方法能够取得文档body元素的所有子元素，与 doc.getElementsByTag("body")相同
```
String html = "<div><p>Lorem ipsum.</p>";
Document doc = Jsoup.parseBodyFragment(html);
System.out.println(doc.html());//可以看到我们的html片段被包裹了一个body

Element body = doc.body();
System.out.println(body.html());
/*
<html>
 <head></head>
 <body>
  <div>
   <p>Lorem ipsum.</p>
  </div>
 </body>
</html>
*/

/**
<div>
 <p>Lorem ipsum.</p>
</div>
*/
```

### 从一个URL加载一个Document
> 你需要从一个网站获取和解析一个HTML文档，并查找其中的相关数据。你可以使用下面解决方法

办法:使用 [Jsoup.connect(String url)](# 'method')方法
```
Document doc = Jsoup.parse(new URL("http://www.funi.com/"),6000) ;

 Document doc2 = Jsoup.connect("http://www.funi.com/")
//                .data("query", "Java")
                .userAgent("Mozilla")
                .cookie("auth", "token")
                .timeout(3000)
                .get();
```

### 从一个文件加载一个文档
>在本机硬盘上有一个HTML文件，需要对它进行解析从中抽取数据或进行修改

办法:可以使用静态 [ Jsoup.parse(File in, String charsetName, String baseUri)](# 'method')方法
```
File input = new File("/tmp/input.html");
Document doc = Jsoup.parse(input, "UTF-8", "http://example.com/");
```

**下面例子都使用成都市房产透明网的网站和国家统计局**  

### 使用DOM方法来遍历一个文档
> 你有一个HTML文档要从中提取数据，并了解这个HTML文档的结构。

```
Document doc = null;
CloseableHttpClient httpClient = HttpClients.createDefault();
HttpGet httpGet = new HttpGet("http://www.funi.com/");
//使用chrome 头伪装
httpGet.setHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36");
//设置基本的配置
RequestConfig config = RequestConfig.custom()
        .setConnectTimeout(5000) // 设置连接超时时间 5秒钟
        .setSocketTimeout(4000) // 设置读取超时时间4秒钟
        .build();
httpGet.setConfig(config);

CloseableHttpResponse httpResponse = null;
try {
    httpResponse = httpClient.execute(httpGet);
    HttpEntity httpEntity = httpResponse.getEntity();
    if (httpEntity == null){
        return;
    }
    String html = EntityUtils.toString(httpEntity, "utf-8");
    if (StringUtils.isNotEmpty(html)) {
        doc = Jsoup.parse(html);
    }
} catch (Exception e) {
    logger.error("获取html失败!", e);
} finally {
    //关闭处理
    httpResponse.close();
    httpClient.close();
}
Element body = doc.body();
Elements foot = body.getElementsByClass("foot").first().getElementsByClass("footer clearfix").first().getElementsByTag("dl");
for (Element ele : foot) {
    System.out.println(ele.html());
    for (int i = 0; i < 20; i++) {
        System.out.print('.');
    }
}
```

### 使用选择器语法来查找元素
> 你想使用类似于CSS或jQuery的语法来查找和操作元素

#### Element
**查看元素**
+ getElementById(String id) return Element
+ getElementsByTag(String tag) return Elements
+ getElementsByClass(String className) return Elements
+ getElementsByAttribute(String key) return Elements 查找具有命名属性集的元素。不区分大小写 
+ siblingElements() return Elements 获取同级元素。如果元素没有同级元素，则返回空列表。元素不是同级元素本身，所以不会包含在返回的列表中(列表)
+ firstElementSibling() return Element 获取此元素的第一个同级元素
+ lastElementSibling() return Element 获取此元素的最后一个同级元素 
+ previousElementSibling() return Element 获取此元素的上一个同级元素
+ nextElementSibling() return Element 获取此元素的下一个同级元素
+ parents() return Elements 获取此元素的父级和父级，直到文档根
+ parent() return Element 获取此元素的父级
+ children() return Elements 获取此元素的子元素
+ child(int index) return Element 获取此元素的子元素，方法是使用其基于0的索引号
+ attributes() 获取元素的所有属性 return Attributes

**元素数据**
+ attr(String key)获取属性attr(String key, String value)设置属性
+ attributes()获取所有属性
+ id(), className() and classNames()
+ text()获取文本内容text(String value) 设置文本内容
+ html()获取元素内HTMLhtml(String value)设置元素内的HTML内容
+ outerHtml()获取元素外HTML内容
+ data()获取数据内容（例如：script和style标签)
+ tag() and tagName()

**操作HTML和文本**
+ append(String html), prepend(String html)
+ appendText(String text), prependText(String text)
+ appendElement(String tagName), prependElement(String tagName)
+ html(String value)

### 选择器语法来查找元素

+ tagname: 通过标签查找元素，比如：a
+ \#id: 通过ID查找元素，比如：#logo
+ .class: 通过class名称查找元素，比如：.masthead
``` 抓取国家统计局
Document doc = null;
CloseableHttpClient httpClient = HttpClients.createDefault();
HttpGet httpGet = new HttpGet("http://www.stats.gov.cn/");
//使用chrome 头伪装
httpGet.setHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36");
//设置基本的配置
RequestConfig config = RequestConfig.custom()
        .setConnectTimeout(5000) // 设置连接超时时间 5秒钟
        .setSocketTimeout(4000) // 设置读取超时时间4秒钟
        .build();
httpGet.setConfig(config);
CloseableHttpResponse httpResponse = null;
try {
    httpResponse = httpClient.execute(httpGet);
    HttpEntity httpEntity = httpResponse.getEntity();

    String html = EntityUtils.toString(httpEntity, "utf-8");
    if (StringUtils.isNotEmpty(html)) {
        doc = Jsoup.parse(html);
    }
} catch (Exception e) {
    logger.error("获取html失败!", e);
} finally {
    // 关闭处理
    httpResponse.close();
    httpClient.close();
}
Element body = doc.body();
//        Elements selects = body.select(".top .top03 #nav ul li");//和下面的一样
Elements selects = body.getElementsByClass("top").first().getElementsByClass("top03").first().getElementById("nav").getElementsByTag("ul").first().getElementsByTag("li");
for (Element ele : selects) {
    System.out.println(ele);
}
主要运用了上面三种选择方式
```
+ 【attribute】: 利用属性查找元素，比如：【href】
+ 【^attr】: 利用属性名前缀来查找元素，比如：可以用【^data-】 来查找带有HTML5 Dataset属性的元素
+ 【attr=value】: 利用属性值来查找元素，比如：【width=500】
+ 【attr^=value】, 【attr$=value】, 【attr*=value】: 利用匹配属性值开头、结尾或包含属性值来查找元素，比如：【href*=/path/】
+ 【attr~=regex】: 利用属性值匹配正则表达式来查找元素，比如： img【src~=(?i)\.(png|jpe?g)】
+  *: 这个符号将匹配所有元素
```
Element body = doc.body();

Elements selects = body.select(".top a[href]");//获取拥有href属性的所有元素

<a href="/was5/web/search?channelid=288041&amp;andsen=%E6%80%BB%E4%BA%BA%E5%8F%A3" target="_blank">总人口</a>
<a href="/was5/web/search?channelid=288041&amp;andsen=%E7%A4%BE%E4%BC%9A%E6%B6%88%E8%B4%B9%E5%93%81%E9%9B%B6%E5%94%AE%E6%80%BB%E9%A2%9D" target="_blank">社会消费品零售总额</a>
<a href="./zjtj/" target="_top"><img src="./images/top03_1.png"></a>
<a name="PL_MENU_NAME" href="./zjtj/gjtjj/" target="_top">国家统计局</a>
<a name="PL_MENU_NAME" href="http://jcj.ndrc.gov.cn/" target="_top">派驻纪检组</a>
<a name="PL_MENU_NAME" href="./zjtj/jgzn/" target="_top">机构职能</a>

Elements selects = body.select(".top a[name=PL_MENU_NAME]");//获取name=PL_MENU_NAME的所有这类元素

<a name="PL_MENU_NAME" href="./zjtj/gjtjj/" target="_top">国家统计局</a>
<a name="PL_MENU_NAME" href="http://jcj.ndrc.gov.cn/" target="_top">派驻纪检组</a>
<a name="PL_MENU_NAME" href="./zjtj/jgzn/" target="_top">机构职能</a>
<a name="PL_MENU_NAME" href="./tjsj/zxfb/" target="_top">最新发布</a>
<a name="PL_MENU_NAME" href="http://data.stats.gov.cn/" target="_blank">数据查询</a>
<a name="PL_MENU_NAME" href="./tjsj/sjjd/" target="_top">数据解读</a>
<a name="PL_MENU_NAME" href="./tjgz/tjdt/" target="_top">统计动态</a>

Elements selects = body.select(".top a[name^=PL]");//以PL开头

Elements selects = body.select(".top div[^cl]"); //获取div 为tag class等属性的元素
```

+ 伪选择器selectors
+ :lt(n): 查找哪些元素的同级索引值（它的位置在DOM树中是相对于它的父节点）小于n，比如：td:lt(3) 表示小于三列的元素
+ :gt(n):查找哪些元素的同级索引值大于n，比如： div p:gt(2)表示哪些div中有包含2个以上的p元素
+ :eq(n): 查找哪些元素的同级索引值与n相等，比如：form input:eq(1)表示包含一个input标签的Form元素
+ :has(seletor): 查找匹配选择器包含元素的元素，比如：div:has(p)表示哪些div包含了p元素

```
Elements selects = body.select(".center div:eq(0) ul li:lt(3)"); //eq(0)选取第一个,lt(3)表示小于三列的元素
```



+ Selector选择器组合使用
+ el#id: 元素+ID，比如： div#logo
+ el.class: 元素+class，比如： div.masthead
+ el[attr]: 元素+class，比如： a[href]
+ 任意组合，比如：a[href].highlight
+ ancestor child: 查找某个元素下子元素，比如：可以用.body p 查找在"body"元素下的所有 p元素
+ parent > child: 查找某个父元素下的直接子元素，比如：可以用div.content > p 查找 p 元素，也可以用body > * 查找body标签下所有直接子元素
+ siblingA + siblingB: 查找在A元素之前第一个同级元素B，比如：div.head + div
+ siblingA ~ siblingX: 查找A元素之前的同级X元素，比如：h1 ~ p
+ el, el, el:多个选择器组合，查找匹配任一选择器的唯一元素，例如：div.masthead, div.logo

+ 伪选择器selectors
+ :lt(n): 查找哪些元素的同级索引值（它的位置在DOM树中是相对于它的父节点）小于n，比如：td:lt(3) 表示小于三列的元素
+ :gt(n):查找哪些元素的同级索引值大于n，比如： div p:gt(2)表示哪些div中有包含2个以上的p元素
+ :eq(n): 查找哪些元素的同级索引值与n相等，比如：form input:eq(1)表示包含一个input标签的Form元素
+ :has(seletor): 查找匹配选择器包含元素的元素，比如：div:has(p)表示哪些div包含了p元素
+ :not(selector): 查找与选择器不匹配的元素，比如： div:not(.logo) 表示不包含 class="logo" 元素的所有 div 列表
+ :contains(text): 查找包含给定文本的元素，搜索不区分大不写，比如： p:contains(jsoup)
+ :containsOwn(text): 查找直接包含给定文本的元素
+ :matches(regex): 查找哪些元素的文本匹配指定的正则表达式，比如：div:matches((?i)login)
+ :matchesOwn(regex): 查找自身包含文本匹配指定正则表达式的元素
+  注意：上述伪选择器索引是从0开始的，也就是说第一个元素索引值为0，第二个元素index为1等






