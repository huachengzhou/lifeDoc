---
title: "跨域问题"
date: 2022-10-05
draft: false
weight: 1
---

# 跨域

## 介绍

> 跨域，指的是从一个域名去请求另外一个域名的资源，即跨域名请求。跨域时，浏览器不能执行其他域名网站的脚本，这是由浏览器的同源策略造成的，是浏览器施加的安全限制， 跨域限制访问，其实是浏览器的限制。

> 同源策略是浏览器最核心也最基本的安全功能，不同源的客户端脚本在没有明确授权的情况下，不能读写对方资源 ，这是一个用于隔离潜在恶意文件的重要安全机制。所以跨域问题只在浏览器中出现，如果客户端是APP的话，那跨域问题就不存在了。 PS：IE端口除外，IE对同源策略的定义有略微的不同，具体可以查看文末给出的同源策略的链接。





## 为什么会跨域

说到跨域不得不谈的就是浏览器的同源策略，跨域也是因为浏览器这个机制引起的，这个机制的存在还是在于安全

### 1.什么是源

> Web内容的源由用于访问它的URL 的方案(协议)，主机(域名)和端口定义。只有当方案，主机和端口都匹配时，两个对象具有相同的起源。

+ 所谓同源是指：域名，协议，端口相同，即两个资源具有相同的源。 只要三者之间有一个不同，就是跨域（跨源）
+ 同源不同源一句话就可以判断：就是url中 scheme host port 都相同即为同源。
下面认识下url 结构中的这三个部分

### 2. URL结构

> URL 代表着是统一资源定位符（Uniform Resource Locator）。URL 无非就是一个给定的独特资源在 Web 上的地址。

+ URL有如下结构组成：

+ Schme 或者 Protocol

![][img2]
![][img2_]


+ Domain Name 也叫做host域名

![][img3]
![][img3_]

+ port 端口号

![][img4]
![][img4_]

+ Parameters参数

![][img5]
![][img5_]

+ Anchor 锚点，一般用于定位位置

![][img6]
![][img6_]


### 3. 同源不同源举例

举一下同源不同源的例子，便于理解

+ **同源例子**

|例子|原因|
|--|:--:|
|http://example.com/app1/index.html  <==> http://example.com/app2/index.html|相同的 scheme http 和host|
|http://Example.com:80  <==> http://example.com|http 默认80端口所以同源|


+ **不同源例子**

|例子|原因|
|--|:--:|
|http://example.com/app1  <==> https://example.com/app2|不同的协议|
|http://example.com  <==> http://myapp.example.com|不同的host|
|http://example.com  <==> http://example.com:8080|不同的端口|




### 4. 浏览器为什么需要同源策略

同源策略是一个重要的安全策略，它用于限制一个origin的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档，减少可能被攻击的媒介。


### 5. 常规前端请求跨域


在没有前后端分离的时候，跨域问题往往是很少的。因为前后端都部署到一起。现在前后端分离不管vue /react 面临跨域请求的问题。

下面是引用官网描述的一张图来解释跨域：

![][img7]
![][img7_]

跨源域资源共享（CORS）机制允许 Web 应用服务器进行跨源访问控制，从而使跨源数据传输得以安全进行。现代浏览器支持在 API 容器中（例如 XMLHttpRequest 或 Fetch）使用 CORS，以降低跨源 HTTP 请求所带来的风险


## 二、前端解决方案


+ **jsonp**

> JSONP的原理非常简单，就是HTML标签中，很多带src属性的标签都可以跨域请求内容，比如我们熟悉的img图片标签。同理，script标签也可以，可以利用script标签来执行跨域的javascript代码。通过这些代码，我们就能实现前端跨域请求数据。

> jsonp 可以在前端解决跨域问题，但是只是针对于get请求。实现方式可以引用一些npm 第三方库实现，jquery 也是带的。

> 可以在npm 搜下jsonp 库实现，非常简单。

### jsonp原理

> 我个人理解jsonp实际上是钻了空子然后利用这个空子来间接的实现了 get方式的跨域请求逻辑 以载入脚本方式去请求数据然后把脚本响应的数据包在回调脚本函数的参数里面  回调函数一执行就拿到了数据



[jsonp原理参考](https://www.cnblogs.com/chiangchou/p/jsonp.html)

+ 首先我们需要明白，在页面上直接发起一个跨域的ajax请求是不可以的，但是，在页面上引入不同域上的js脚本却是可以的，就像你可以在自己的页面上使用<img src=""> 标签来随意显示某个域上的图片一样

+ 比如我在8080端口的页面上请求一个9090端口的图片：可以看到直接通过src跨域请求是可以的


![][img9]
![][img9_]

那么看下如何使用<script src="">来完成一个跨域请求：

当点击"跨域获取数据"的按钮时，添加一个<script>标签，用于发起跨域请求；注意看请求地址后面带了一个callback=showData的参数；

　　showData即是回调函数名称，传到后台，用于包裹数据。数据返回到前端后，就是showData(result)的形式，因为是script脚本，所以自动调用showData函数，而result就是showData的参数。

　　至此，我们算是跨域把数据请求回来了，但是比较麻烦，需要自己写脚本发起请求，然后写个回调函数处理数据，不是很方便。

**页面**

```html
<%@ page pageEncoding="utf-8" contentType="text/html;charset=UTF-8"  language="java" %>
<html>
<head>
    <title>跨域测试</title>
    <script src="js/jquery-1.7.2.js"></script>
    <script>
        //回调函数
        function showData (result) {
            var data = JSON.stringify(result); //json对象转成字符串
            $("#text").val(data);
        }

        $(document).ready(function () {

            $("#btn").click(function () {
                //向头部输入一个脚本，该脚本发起一个跨域请求
                $("head").append("<script src='http://localhost:9090/student?callback=showData'><\/script>");
            });

        });
    </script>
</head>
<body>
    <input id="btn" type="button" value="跨域获取数据" />
    <textarea id="text" style="width: 400px; height: 100px;"></textarea>

</body>
</html>
```

**服务端**

```java
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    response.setCharacterEncoding("UTF-8");
    response.setContentType("text/html;charset=UTF-8");

    //数据
    List<Student> studentList = getStudentList();


    JSONArray jsonArray = JSONArray.fromObject(studentList);
    String result = jsonArray.toString();

    //前端传过来的回调函数名称
    String callback = request.getParameter("callback");
    //用回调函数名称包裹返回数据，这样，返回数据就作为回调函数的参数传回去了
    result = callback + "(" + result + ")";

    response.getWriter().write(result);
}
```

**结果**

![][img10]
![][img10_]

再来看jquery的jsonp方式跨域请求：
服务端代码不变，js代码如下：最简单的方式，只需配置一个dataType:'jsonp'，就可以发起一个跨域请求。jsonp指定服务器返回的数据类型为jsonp格式，可以看发起的请求路径，自动带了一个callback=xxx，xxx是jquery随机生成的一个回调函数名称。

这里的success就跟上面的showData一样，如果有success函数则默认success()作为回调函数。
说白了 jquery只不过也是按照那个空子然后做了中间处理

```html
<%@ page pageEncoding="utf-8" contentType="text/html;charset=UTF-8"  language="java" %>
<html>
<head>
    <title>跨域测试</title>
    <script src="js/jquery-1.7.2.js"></script>
    <script>

        $(document).ready(function () {

            $("#btn").click(function () {

                $.ajax({
                    url: "http://localhost:9090/student",
                    type: "GET",
                    dataType: "jsonp", //指定服务器返回的数据类型
                    success: function (data) {
                        var result = JSON.stringify(data); //json对象转成字符串
                        $("#text").val(result);
                    }
                });
            });
        });
    </script>
</head>
<body>
    <input id="btn" type="button" value="跨域获取数据" />
    <textarea id="text" style="width: 400px; height: 100px;"></textarea>
</body>
</html>
```

**结果**

![][img10]
![][img10_]


### 代理方式

#### 代理原理

> 代理服务器是介于前端和后端之间的中间服务层，前端向代理服务器发送请求时，代理服务器是允许跨域请求的，而代理服务器在收到前端的ajax请求时，会通过changeOrigin的方式，将前端请求的接口，转发给target所指向的目标服务器，从而以相同的域向目标服务器发送请求，由于代理服务器和目标服务器之间的域是相同的，因此不会出现跨域问题，从而代理服务器会收到目标服务器的响应，再将响应转发给前端即可


平常我们经常遇到的跨域问题就是，不同域名下的跨域。 那么问题来了，是怎么判断你与服务器不在一个域名下呢？

![][img11]
![][img11_]

通过chrome，我们发现原来我们的地址跟数据来源都是浏览器告诉我们的，然后它会判断是否同源，同源就正常访问。那么我们想解决问题就要从此处入手
**代理解决跨域原理**
通过一些方法设置代理，在请求发送(接收)之前加入中间层，

将不同的域名转换成相同的

就解决了跨域的问题

客户端发送请求时

不直接到服务器

而是先到代理的中间层

在这里将localhost：8088的这个域名装换为192.168.0.67:8061，

再将请求发送到服务器

这样在服务器端收到的请求就是使用的192.168.0.67:8061域名

同理，当服务器返回数据的时候，也是先到代理的中间层

将192.168.0.67:8061转换成localhos：8088；

这样在客户端也是在相同域名下访问的了


#### 代理配置

如:webpack-dev-server 配置代理 (假如前端构建工具压根不是webpack你别傻乎乎的用这个来配置比如新一代的vite)
前端无论是vue项目还是react 项目大多数都会以webpack-dev-server 来运行，webpack-dev-server 可以设置代理，前端可以在开发环境设置代理解决跨域问题。
```js
 proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      },
   }
```

vue-cli、create-react-app、umi 等脚手架找到webpack devserver配置位置配上即可

注意： 只限在开发环境，生产环境需要web 服务器同样原理代即可。 生产环境一般可以用nginx 大概是 前端请求 -> nginx这 nginx -> 具体的后端服务器 毕竟nginx可以做防盗链,负载均衡等 这些嘛

### document.domain 方式

> 由于JavaScript同源策略的限制，脚本只能读取和所属文档来源相同的窗口和文档的属性。

> 对于已经有成熟产品体系的公司来说，不同的页面可能放在不同的服务器上，这些服务器域名不同，但是拥有相同的上级域名，比如id.qq.com、www.qq.com、user.qzone.qq.com，它们都有公共的上级域名qq.com。这些服务器上的页面之间的跨域访问可以通过document.domain来进行。

> 默认情况下，document.domain存放的是载入文档的服务器的主机名，可以手动设置这个属性，不过是有限制的，只能设置成当前域名或者上级的域名，并且必须要包含一个.号，也就是说不能直接设置成顶级域名。例如：id.qq.com，可以设置成qq.com，但是不能设置成com

+ **访问同源页面例子**

打开[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cookie](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cookie)
，在f12控制台里window.open页面：[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)，访问返回的window对象的document属性，发现能够访问成功


+ **具体设置例子**

+ www.a.com上的a.html 具有相同上级域名
```js
document.domain = 'a.com';
var ifr = document.createElement('iframe');
ifr.src = 'http://script.a.com/b.html';
ifr.style.display = 'none';
document.body.appendChild(ifr);
ifr.onload = function(){
    var doc = ifr.contentDocument || ifr.contentWindow.document;
    // 在这里操纵b.html
    alert(doc.getElementsByTagName("h1")[0].childNodes[0].nodeValue);
};
```

+ script.a.com上的b.html 具有相同上级域名

```js
document.domain = 'a.com';
```

## 三、服务端解决方案

> 后端框架也很多，实现原理差不多，都是修改下相应http头。以常用的Java SpringCloud springMvc 和nodejs koa 框架为例。

**Http 协议CORS头**

跨域其实也是http层面上可以解决的问题，后端解决也是比较简单的，也是项目常见的解决手法

CORS （Cross-Origin Resource Sharing，跨域资源共享）是一个系统，它由一系列传输的HTTP头组成，这些HTTP头决定浏览器是否阻止前端 JavaScript 代码获取跨域请求的响应。

同源安全策略 默认阻止“跨域”获取资源。但是 CORS 给了web服务器这样的权限，即服务器可以选择，允许跨域请求访问到它们的资源。

|代码字段|描述|
|--|:--:|
| Access-Control-Allow-Origin | 指示请求的资源能共享给哪些域  |
| Access-Control-Allow-Credentials | 指示当请求的凭证标记为 true 时，是否响应该请求  |
| Access-Control-Allow-Headers | 用在对预请求的响应中，指示实际的请求中可以使用哪些 HTTP 头  |
| Access-Control-Allow-Methods |  指定对预请求的响应中，哪些 HTTP 方法允许访问请求的资源  |
| Access-Control-Expose-Headers |  指示哪些 HTTP 头的名称能在响应中列出  |
| Access-Control-Max-Age |  指示预请求的结果能被缓存多久  |
| Access-Control-Request-Headers |  用于发起一个预请求，告知服务器正式请求会使用那些 HTTP 头  |
| Access-Control-Request-Method |  用于发起一个预请求，告知服务器正式请求会使用哪一种 HTTP 请求方法  |
| Origin |  指示获取资源的请求是从什么域发起的  |


+ **SpringCloud设置跨域**
在跨域过滤器里配置一下跨域头部，* 是通配符即允许所有
```java
@Configuration
public class GatewayCorsConfiguation {
 
    @Bean
    public CorsFilter corsFilter(){
        // 初始化cors配置对象
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true); // 允许使用cookie，但是使用cookie是addAllowedOrigin必须是具体的地址，不能是*
//        configuration.addAllowedOrigin("*");
        configuration.addAllowedOrigin("http://manage.leyou.com");
        configuration.addAllowedMethod("*");  //允许的请求方式,get,put,post,delete
        configuration.addAllowedHeader("*");//允许的头信息
 
        //初始化cors的源对象配置
        UrlBasedCorsConfigurationSource corsConfigurationSource = new UrlBasedCorsConfigurationSource();
        corsConfigurationSource.registerCorsConfiguration("/**",configuration);
 
        //3.返回新的CorsFilter.
        return new CorsFilter(corsConfigurationSource);
    }
}
```

+ **Koa设置跨域**

koa 是插件机制，设置更简单，使用跨域插件即可

```js
import cors from "koa2-cors";
app.use(cors());
```

+ **springmvc**

```java
import lombok.extern.log4j.Log4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/app.test")
@Log4j
public class TestController {

    @CrossOrigin(origins = "*")
    @PostMapping(value = "/test", name = "test")
    @CheckRequestSign
    public HttpResult test(@RequestBody TestParam testParam){
        try {
            return HttpResult.newCorrectResult(testParam);
        } catch (Exception ex) {
            log.error("异常", ex);
            return HttpResult.newErrorResult(ex);
        }
    }
}

```

## 四、运维解决方案

> 还是利用代理方式解决,代理方式可选的方案非常之多

+ 选择nginx

+ 我理解的步骤

+ 前端和运维商量好协议路径代理规则，比如/api 代表域名
+ 前端配置webpack -dev -server 代理 到nginx层
+ 利用ngnix 配置相同转发代理到真正的服务器

这里的webpack 服务器那似乎可以直接到真正的服务器  但是大多数都不是那么做的 我理解的是首先如果前端直接到后端服务器 那么后端必须要做负载均衡 防盗链等等  还不如前端直接到nginx层(这里的nginx层可能是集群或者单机假如是集群)去nginx可以做负载均衡等

+ ngnix 配置代理解决跨域配置

```shell
...
location /api {
   proxy_pass https://b.test.com; # 设置代理服务器的协议和地址
}       
...
```

![][img8]
![][img8_]

[CORS参考](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS)
[Origin参考](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin)
[CORS参考](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)

[img2]:../.././imgs/suiji/teywty5qnc/0e77be8cd17bacd69cbc78c781b09ccb.png
[img2_]:../../../imgs/suiji/teywty5qnc/0e77be8cd17bacd69cbc78c781b09ccb.png
[img3]:../.././imgs/suiji/teywty5qnc/eeedb23b713607ad72d8af90ca434317.png
[img3_]:../../../imgs/suiji/teywty5qnc/eeedb23b713607ad72d8af90ca434317.png
[img4]:../.././imgs/suiji/teywty5qnc/748d7f6b786d4bb54726c2e9035376bd.png
[img4_]:../../../imgs/suiji/teywty5qnc/748d7f6b786d4bb54726c2e9035376bd.png

[img5]:../.././imgs/suiji/teywty5qnc/d0f7674fe11e3d29cb0609234239fbba.png
[img5_]:../../../imgs/suiji/teywty5qnc/d0f7674fe11e3d29cb0609234239fbba.png
[img6]:../.././imgs/suiji/teywty5qnc/0c5a3ffb784dd927e341fd2f58b710b2.png
[img6_]:../../../imgs/suiji/teywty5qnc/0c5a3ffb784dd927e341fd2f58b710b2.png
[img7]:../.././imgs/suiji/teywty5qnc/b13e0820da2e8d09a9bca1b0e7cb8fda.png
[img7_]:../../../imgs/suiji/teywty5qnc/b13e0820da2e8d09a9bca1b0e7cb8fda.png
[img8]:../.././imgs/suiji/teywty5qnc/73a40ca9987f72b20b45eff03b417115.png
[img8_]:../../../imgs/suiji/teywty5qnc/73a40ca9987f72b20b45eff03b417115.png

[img9]:../.././imgs/suiji/teywty5qnc/856154-20170108232245691-1216530530.png
[img9_]:../../../imgs/suiji/teywty5qnc/856154-20170108232245691-1216530530.png
[img10]:../.././imgs/suiji/teywty5qnc/856154-20170109001005441-128129104.png
[img10_]:../../../imgs/suiji/teywty5qnc/856154-20170109001005441-128129104.png
[img11]:../.././imgs/suiji/teywty5qnc/20180904165430173.png
[img11_]:../../../imgs/suiji/teywty5qnc/20180904165430173.png