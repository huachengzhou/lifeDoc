# Groovy 变量

> Groovy中的变量可以通过两种方式定义 - 使用数据类型的本地语法，或者使用def关键字。对于变量定义，必须明确提供类型名称或在替换中使用“def”。这是Groovy解析器需要的。

+ **byte** - 这用于表示字节值。例如2。
+ **short** - 用于表示一个短数。例如10。
+ **int** - 这用于表示整数。 例如1234。
+ **long** - 这用于表示一个长数。例如10000090。
+ **float** - 用于表示32位浮点数。例如12.34。
+ **double** - 这用于表示64位浮点数。例如12.3456565。
+ **char** - 这定义了单个字符文字。例如'a'。
+ **Boolean** - 这表示一个布尔值，可以是true或false。
+ **String** - 这是以字符串形式表示的文本。 例如“Hello World”。



+ Groovy还允许其他类型的变量，如数组，结构和类

### 变量声明

---
title: " groovy变量 "
date: 2021-04-15
draft: false
weight: 3
---

+ 变量声明告诉编译器为变量创建存储的位置和大小。

+ 下面是一个变量声明的例子 -

```
// x is defined as a variable 
      String x = "Hello";
		
      // The value of the variable is printed to the console 
      println(x);
```

* 当我们运行上面的程序，我们会得到以下结果 

+ `Hello`

### 变量命名

+ 变量的名称可以由字母，数字和下划线字符组成。 它必须以字母或下划线开头。 大写和小写字母是不同的，因为Groovy，就像Java是一种区分大小写的编程语言。

```
// Defining a variable in lowercase  
      int x = 5;
	  
      // Defining a variable in uppercase  
      int X = 6; 
	  
      // Defining a variable with the underscore in it's name 
      def _Name = "Joe"; 
		
      println(x); 
      println(X); 
      println(_Name); 
```
```
5
6
Joe
你好,世界 !
```

+ 除此之外 在groovy中 定义变量也是可以不加 def 或者 基本类型

` a = 125;`

## [回到上一级](../)