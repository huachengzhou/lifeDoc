---
title: " Groovy 概述 "
date: 2021-04-15
draft: false
weight: 1
---

# Groovy 概述

+ Groovy是一种基于Java平台的面向对象语言。 Groovy 1.0于2007年1月2日发布，其中Groovy 2.4是当前的主要版本。 Groovy通过Apache License v 2.0发布。

## Groovy的特点

+ 同时支持静态和动态类型。
+ 支持运算符重载。
+ 本地语法列表和关联数组。
+ 对正则表达式的本地支持。
+ 各种标记语言，如XML和HTML原生支持。
+ Groovy对于Java开发人员来说很简单，因为Java和Groovy的语法非常相似。
+ 您可以使用现有的Java库。
+ Groovy扩展了java.lang.Object。


###  groovy-脚本和类

+ 在groovy中定义类和java中是一样的。类的方法可以是static，也可以是非static的

+ groovy中的方法可以是public, protected, private，同时也支持java中的修饰符，比如synchronized

+ groovy自动导入的包有以下这些
* groovy.lang.*
* groovy.util.*
* java.lang.*
* java.util.*
* java.net.*
* java.io.* 
* import java.math.BigInteger 
* import java.math.BigDecimal

+ 在groovy和java中不同的一点就是，groovy默认是public的
+ 每一个groovy类，在JVM层级，都是字节码形式的java code，所以在java代码中可以调用groovy中申明的方法，反之亦然

+ 你可以指定方法的参数和返回值，以便他们能够更好的和java代码相互调用。当然你也可以实现接口或者重载方法。但是需要你没有指定方法后者属性的类型的话，那么在JVM层级的字节码中，他们将会是 java.lang.Object 类型

+ 例如 Callee.groovy

```
class Callee{
     void hello(){
        println "hello, world" ;
    }
}

c = new Callee() ;
c.hello();
```


+ 创建你的第一个 Hello World 程序

```
class Example1 {

    public static void main(String[] args) {
        println("你好,世界 !") ;
    }

}
```

`你好,世界 !`

+ 当然你也可以不定义一个类 因为groovy中行得通
` println("你好,世界 !") ;同样可以打印出字符串`

###  在 Groovy 中导入语句

* import 语句可以用来导入，可以让你的代码使用其他库的功能。这是通过使用在 Import 关键字完成。
下面的示例演示了如何使用 MarkupBuilder 的类，它可能是最常用的创建 HTML 或 XML 标记的类之一。

```
import groovy.xml.MarkupBuilder 
def xml = new MarkupBuilder() 
```

### Groovy 令牌

+ 令牌可以是一个关键字，一个标识符，常量，字符串文字或符号。
`println(“Hello World”);` 

+ 在上面的代码行中，有两个令牌，首先是关键词的 println 而接下来就是字符串的“Hello World”。

### Groovy 注释

 + 在您的代码中使用注释。Groovy 的注释可以是单行或多行。单行注释使用 // 在该行的任何位置来识别。一个例子如下所示 -


```
class Example {
   static void main(String[] args) {
      // Using a simple println statement to print output to the console
      println('Hello World');
   }
}
```

### 分号

+ 就像 Java 编程语言，它需要具有分号在 Groovy 定义多个语句之间进行区分。

```
class Example {
   static void main(String[] args) {
      // One can see the use of a semi-colon after each statement
      def x = 5;
      println('Hello World');  
   }
}
```



### 身份标识



+ 标识符被用来定义变量，函数或其他用户定义的变量。标识符以字母开头，美元或下划线。他们不能以数字开头。以下是有效标识符的一些例子 



```
def employeename  

def student1  

def student_name
```



+ 其中**，DEF** 是在 Groovy 用来定义标识符的关键字。下面是一个如何在我们的 Hello World 程序中使用标识符的代码示例

```
class Example {
   static void main(String[] args) {
      // One can see the use of a semi-colon after each statement
      def x = 5;
      println('Hello World'); 
   }
}
// 在上述的例子中，变量 x 被用作标识符。
```

###  关键词



<table><tbody><tr><td>as</td><td>assert</td><td>break</td><td>case</td></tr><tr><td>catch</td><td>class</td><td>const</td><td>continue</td></tr><tr><td>def</td><td>default</td><td>do</td><td>else</td></tr><tr><td>enum</td><td>extends</td><td>false</td><td>Finally</td></tr><tr><td>for</td><td>goto</td><td>if</td><td>implements</td></tr><tr><td>import</td><td>in</td><td>instanceof</td><td>interface</td></tr><tr><td>new</td><td>pull</td><td>package</td><td>return</td></tr><tr><td>super</td><td>switch</td><td>this</td><td>throw</td></tr><tr><td>throws</td><td>trait</td><td>true</td><td>try</td></tr><tr><td>while</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>

### 空白

+ 空白是在编程语言如 Java 和 Groovy 用来形容空格，制表符，换行符和注释术语。空格分隔从另一个声明的一部分，使编译器，其中一个元素标识的声明。

+ 例如，在下面的代码示例，存在关键字 **def** 和变量 x 之间的空白。这是为了让编译器知道 **DEF** 是需要被使用，并且是 x 应该是需要被定义的变量名的关键字。

```
def x = 5;
```



### 文字

+ 文字是在 groovy 中表示固定值的符号。Groovy 语言有符号整数，浮点数，字符和字符串。下面是一些在 Groovy 编程语言文字的例子 -

```
12 
1.45 
‘a’ 
“aa”
```



