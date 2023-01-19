---
title : 'spring常用的工具类'
date : '2021-02-15'
draft : false
tags : ["tool"]
categories : ["java","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---

# spring常用的工具类

## 内置的resouce类型 


```
UrlResource
ClassPathResource
FileSystemResource
ServletContextResource
InputStreamResource
ByteArrayResource
EncodedResource 也就是Resource加上encoding, 可以认为是有编码的资源
VfsResource(在jboss里经常用到, 相应还有 工具类 VfsUtils)
org.springframework.util.xml.ResourceUtils 用于处理表达资源字符串前缀描述资源的工具. 如: &quot;classpath:&quot;. 
有 getURL, getFile, isFileURL, isJarURL, extractJarFileURL 
```

## 工具类 


```
org.springframework.core.annotation.AnnotationUtils   处理注解
org.springframework.core.io.support.PathMatchingResourcePatternResolver  用 于处理 ant 匹配风格(com/*.jsp, com/**/*.jsp),找出所有的资源, 结合上面的resource的概念一起使用,对于遍历文件很有用. 具体请详细查看javadoc
org.springframework.core.io.support.PropertiesLoaderUtils 加载Properties资源工具类,和Resource结合
org.springframework.core.BridgeMethodResolver  桥接方法分析器.  关于桥接方法请参考: http://java.sun.com/docs/books/jls/third_edition/html/expressions.html#15.12.4.5
org.springframework.core.GenericTypeResolver  范型分析器, 在用于对范型方法, 参数分析.
org.springframework.core.NestedExceptionUtils

```

## xml工具 


```
org.springframework.util.xml.AbstractStaxContentHandler
org.springframework.util.xml.AbstractStaxXMLReader
org.springframework.util.xml.AbstractXMLReader
org.springframework.util.xml.AbstractXMLStreamReader
org.springframework.util.xml.DomUtils
org.springframework.util.xml.SimpleNamespaceContext
org.springframework.util.xml.SimpleSaxErrorHandler
org.springframework.util.xml.SimpleTransformErrorListener
org.springframework.util.xml.StaxUtils
org.springframework.util.xml.TransformerUtils
```

## 其它工具集 


```
org.springframework.util.xml.AntPathMatcherant风格的处理
org.springframework.util.xml.AntPathStringMatcher
org.springframework.util.xml.Assert断言,在我们的参数判断时应该经常用
org.springframework.util.xml.CachingMapDecorator
org.springframework.util.xml.ClassUtils用于Class的处理
org.springframework.util.xml.CollectionUtils用于处理集合的工具
org.springframework.util.xml.CommonsLogWriter
org.springframework.util.xml.CompositeIterator
org.springframework.util.xml.ConcurrencyThrottleSupport
org.springframework.util.xml.CustomizableThreadCreator
org.springframework.util.xml.DefaultPropertiesPersister
org.springframework.util.xml.DigestUtils摘要处理, 这里有用于md5处理信息的
org.springframework.util.xml.FileCopyUtils文件的拷贝处理, 结合Resource的概念一起来处理, 真的是很方便
org.springframework.util.xml.FileSystemUtils
org.springframework.util.xml.LinkedCaseInsensitiveMap
key值不区分大小写的LinkedMap
org.springframework.util.xml.LinkedMultiValueMap一个key可以存放多个值的LinkedMap
org.springframework.util.xml.Log4jConfigurer一个log4j的启动加载指定配制文件的工具类
org.springframework.util.xml.NumberUtils处理数字的工具类, 有parseNumber 可以把字符串处理成我们指定的数字格式, 还支持format格式, convertNumberToTargetClass 可以实现Number类型的转化. 
org.springframework.util.xml.ObjectUtils有很多处理null object的方法. 如nullSafeHashCode, nullSafeEquals, isArray, containsElement, addObjectToArray, 等有用的方法
org.springframework.util.xml.PatternMatchUtilsspring里用于处理简单的匹配. 如 Spring's typical &quot;xxx*&quot;, &quot;*xxx&quot; and &quot;*xxx*&quot; pattern styles
org.springframework.util.xml.PropertyPlaceholderHelper用于处理占位符的替换
org.springframework.util.xml.ReflectionUtils反映常用工具方法. 有 findField, setField, getField, findMethod, invokeMethod等有用的方法
org.springframework.util.xml.SerializationUtils用于java的序列化与反序列化. serialize与deserialize方法
org.springframework.util.xml.StopWatch一个很好的用于记录执行时间的工具类, 且可以用于任务分阶段的测试时间. 最后支持一个很好看的打印格式. 这个类应该经常用
org.springframework.util.xml.StringUtils
org.springframework.util.xml.SystemPropertyUtils
org.springframework.util.xml.TypeUtils用于类型相容的判断. isAssignable
org.springframework.util.xml.WeakReferenceMonitor弱引用的监控 
```

## 和web相关的工具 


```
org.springframework.web.util.CookieGenerator
org.springframework.web.util.HtmlCharacterEntityDecoder
org.springframework.web.util.HtmlCharacterEntityReferences
org.springframework.web.util.HtmlUtils
org.springframework.web.util.HttpUrlTemplate
这个类用于用字符串模板构建url, 它会自动处理url里的汉字及其它相关的编码. 在读取别人提供的url资源时, 应该经常用 
String url = &quot;http://localhost/myapp/{name}/{id}&quot;
org.springframework.web.util.JavaScriptUtils
org.springframework.web.util.Log4jConfigListener
用listener的方式来配制log4j在web环境下的初始化
org.springframework.web.util.UriTemplate
org.springframework.web.util.UriUtils处理uri里特殊字符的编码
org.springframework.web.util.WebUtils
org.springframework.web.util.
```



