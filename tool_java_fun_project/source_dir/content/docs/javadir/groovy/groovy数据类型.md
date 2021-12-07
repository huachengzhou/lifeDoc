---
title: "groovy 数据类型 "
date: 2021-04-15
draft: false
weight: 2
---

# Groovy 数据类型

> 在任何编程语言中，需要使用各种变量来存储各种类型的信息。变量只是保留值的存储位置,这意味着，当你创建一个变量，你保留在内存中的一些空间来存储与变量相关的值。

> 您可能喜欢存储各种数据类型的信息，如字符串，字符，宽字符，整数，浮点数，布尔值等。基于变量的数据类型，操作系统分配内存并决定什么可以存储在保留的存储器中。

### 内置数据类型

- **byte** -这是用来表示字节值。例如2。
- **short** -这是用来表示一个短整型。例如10。
- **int** -这是用来表示整数。例如1234。
- **long** -这是用来表示一个长整型。例如10000090。
- **float** -这是用来表示32位浮点数。例如12.34。
- **double** -这是用来表示64位浮点数，这些数字是有时可能需要的更长的十进制数表示。例如12.3456565。
- **char** -这定义了单个字符文字。例如“A”。
- **Boolean** -这表示一个布尔值，可以是true或false。
- **String** -这些是以字符串的形式表示的文本。例如，“Hello World”的

### 绑定值

|  类型   | 值  |
|  ----  | ----  |
| byte  | -128到127 |
| short  | -32,768到32,767 |
| int  | 2,147,483,648 到,147,483,647 |
| long  | -9,223,372,036,854,775,808到+9,223,372,036,854,775,807 |
| float  | 1.40129846432481707e-45到3.40282346638528860e + 38 |
| double  | 4.94065645841246544e-324d 到1.79769313486231570e + 308d |

### 包装器类型

+ java.lang.Byte
+ java.lang.Short
+ java.lang.Integer
+ java.lang.Long
+ java.lang.Float
+ java.lang.Double

|  名称   | 描述  |   例如  |
|  ----  | ----  |  ----|
| java.math.BigInteger  | 不可变的任意精度的有符号整数数字 |  30克   |
| java.math.BigDecimal  | 不可变的任意精度的有符号十进制数 |  3.5克  |

```
package gr.h1

//Example of a int datatype
int x = 5;

//Example of a long datatype
long y = 100L;

//Example of a floating point datatype
float a = 10.56f;

//Example of a double datatype
double b = 10.5e40;

//Example of a BigInteger datatype
BigInteger bi = 30g;

//Example of a BigDecimal datatype
BigDecimal bd = 3.5g; //加上这个g也没事的 这是groovy特有的如java中的double a = 3.232d

BigDecimal bd2 = 235.2323552;

println(x);
println(y);
println(a);
println(b);
println(bi);
println(bd);
println(bd2);
5
100
10.56
1.05E41
30
3.5
235.2323552
      
```


## [回到上一级](../)