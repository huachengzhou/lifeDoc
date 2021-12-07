
---
title: " groovy变量和数据类型 "
date: 2021-04-15
draft: false
weight: 4
---

# groovy 变量和数据类型



### groovy类型自动推断



+ 先看有一段代码

```
def a = 12;
def int a1 = 12;

def a_type = a instanceof Integer ;
def a1_type = a1 instanceof Integer ;

println(a_type) ;
println(a1_type) ;

//打印结果如下
true
true
```



+ 从上面我们可以看出a和a1实际推导出的类型是一样的,但是有哪些不同呢
+ 接着我把上面的例子改了

```
def a = 12;
def int a1 = 12;

def a_type = a instanceof Integer ;
def a1_type = a1 instanceof Integer ;

println(a_type) ;
println(a1_type) ;

a = 52253.46f ;
a1 = 52253.46f ;

println(a instanceof Integer) ;
println(a1 instanceof Integer) ;
println("a1 的值:"+a1) ;
println("a 的 值 :"+a) ;

//print result

true
true
false
true
a1 的值:52253
a 的 值 :52253.46
```



+ 看吧神奇的事情出来了, a1 的 参数类型即便被赋值了浮点数但是类型并没有改变,并且精度和赋值的值相比降低了,而 a 的类型却改变了

  ```
  另外假如在idea中编辑变量 编辑器也会提示你
  Assignment is not used less... (Ctrl+F1) 
  Inspection info: Reports on unnecessary Groovy assignment statement 
   Possible loss of precision from 'Float' to 'int' less... (Ctrl+F1) 
  Inspection info: Reports assignments with incompatible types
  ```

  

+ 假如接着上面的例子给 a变量和a1变量分别赋值字符串类型会怎样呢 (算了还是重新写吧好看点)

```
int b = 141;
x = 141;
println(b) ;
println(x) ;

b = "字符串b" ;
x = "字符串x" ;
println(b) ;
println(x) ;
//运行会怎样呢?
141
Caught: org.codehaus.groovy.runtime.typehandling.GroovyCastException: Cannot cast object '字符串b' with class 'java.lang.String' to class 'int'
141
org.codehaus.groovy.runtime.typehandling.GroovyCastException: Cannot cast object '字符串b' with class 'java.lang.String' to class 'int'
	at gr.h1.t4.run(t4.groovy:10)
```

+ 以上我们可以看出在groovy中赋值的时候系统会尝试强转类型,上面的例子是转失败的情况
+ 因此在定义变量的时候尽量不要去更改已经定义的变量的类型,尽量 申明变量类型



+ 变量的类型检测方法 

+ var_name instanceof type 如 a instanceof Integer
+ b.class ==  Integer 或 b.class.equals(Integer)









## [回到上一级](../)