---
title : 'jsp > 字符串el表达式'
date : '2021-02-15'
draft : false
tags : ["jsp"]
categories : ["java","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---


## 字符串el表达式







```
fn:contains 判断字符串是否包含另外一个字符串 <c:if test="${fn:contains(name, searchString)}">
fn:containsIgnoreCase 判断字符串是否包含另外一个字符串(大小写无关) <c:if test="${fn:containsIgnoreCase(name, searchString)}">
fn:endsWith 判断字符串是否以另外字符串结束 <c:if test="${fn:endsWith(filename, ".txt")}">
fn:escapeXml 把一些字符转成XML表示，例如 <字符应该转为< ${fn:escapeXml(param:info)}
fn:indexOf 子字符串在母字符串中出现的位置 ${fn:indexOf(name, "-")}
fn:join 将数组中的数据联合成一个新字符串，并使用指定字符格开 ${fn:join(array, ";")}
fn:length 获取字符串的长度，或者数组的大小 ${fn:length(shoppingCart.products)}
fn:replace 替换字符串中指定的字符 ${fn:replace(text, "-", "?")}
fn:split 把字符串按照指定字符切分 ${fn:split(customerNames, ";")}
fn:startsWith 判断字符串是否以某个子串开始 <c:if test="${fn:startsWith(product.id, "100-")}">
fn:substring 获取子串 ${fn:substring(zip, 6, -1)}
fn:substringAfter 获取从某个字符所在位置开始的子串  ${fn:substringAfter(zip, "-")}
fn:substringBefore 获取从开始到某个字符所在位置的子串 ${fn:substringBefore(zip, "-")}
fn:toLowerCase 转为小写 ${fn.toLowerCase(product.name)}
fn:toUpperCase 转为大写字符 ${fn.UpperCase(product.name)}
fn:trim 去除字符串前后的空格 ${fn.trim(name)}
```











```
函数 
描述
fn:contains(string, substring)
如果参数string中包含参数substring，返回true

fn:containsIgnoreCase(string, substring)
如果参数string中包含参数substring（忽略大小写），返回true

fn:endsWith(string, suffix)
如果参数 string 以参数suffix结尾，返回true

fn:escapeXml(string)
将有特殊意义的XML (和HTML)转换为对应的XML character entity code，并返回

fn:indexOf(string, substring)
返回参数substring在参数string中第一次出现的位置

fn:join(array, separator)
将一个给定的数组array用给定的间隔符separator串在一起，组成一个新的字符串并返回。

fn:length(item)
返回参数item中包含元素的数量。参数Item类型是数组、collection或者String。如果是String类型,返回值是String中的字符数。

fn:replace(string, before, after)
返回一个String对象。用参数after字符串替换参数string中所有出现参数before字符串的地方，并返回替换后的结果 

fn:split(string, separator)
返回一个数组，以参数separator 为分割符分割参数string，分割后的每一部分就是数组的一个元素

fn:startsWith(string, prefix)
如果参数string以参数prefix开头，返回true

fn:substring(string, begin, end)
返回参数string部分字符串, 从参数begin开始到参数end位置，包括end位置的字符

fn:substringAfter(string, substring)
返回参数substring在参数string中后面的那一部分字符串?? 

fn:substringBefore(string, substring)
返回参数substring在参数string中前面的那一部分字符串

fn:toLowerCase(string)
将参数string所有的字符变为小写，并将其返回

fn:toUpperCase(string)
将参数string所有的字符变为大写，并将其返回

fn:trim(string)


在jsp中 使用EL表达式时，不可以使用java提供的功能，比如indexOf()等。
<c:if test="${Boolean.valueOf(requestScope.addresult)==false}"> 
```


















