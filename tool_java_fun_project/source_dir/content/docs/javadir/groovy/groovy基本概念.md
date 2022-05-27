---
title: "groovy 基本概念 "
date: 2021-04-15
draft: false
weight: 1
---

# groovy 基本概念



### 1、基本概念



> Groovy是一种面向对象的动态类型语言，跟Java一样运行在JVM上。
>
> （注：给Java静态世界带来动态能力的语言）



+ 与Java不同的语言特性：

+ a) 函数字面值

+ b) 对集合的一等支持

+ c) 对正则表达式的一等支持

+ d) 对XML处理的一等支持

+ （注：所谓“一等”指的是内置到语言的语法中，不需要调用类库。）



### 2:Groovy能解决包括：

+ 快速Web开发

+ 原型设计

+ 脚本处理

+ 等问题，这些使用Java不是解决动态层问题的理想语言。

例如:

```
System.out.println("It's a Groovy baby, yeah!");

def writer = new StringWriter();
def xml = new groovy.xml.MarkupBuilder(writer);

xml.person(id:2){
name  'kobicc'
age  1
}

println  writer.toString();
```



