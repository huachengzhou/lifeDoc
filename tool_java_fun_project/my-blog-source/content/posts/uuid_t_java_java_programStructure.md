---
title : 'java > programStructure'
date : '2021-02-15'
draft : false
tags : ["java"]
categories : ["Temp","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---



### Java的程序结构

```
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```



+ Java区分大小写
+ 关键字public称为访问修饰符 (这些修饰符用于控制其它程序对这部分代码的访问级别)
+ 关键字class表面Java程序的全部内容都包含在类中
+ 关键字class后面紧跟类名
> Java中定义类名的规则很宽松。名字必须以字母开头,后面可以跟字母和数字的任意组合。长度基本没有限制,但是不能使用Java保留字(例如class或public)作为类名

> 标准的命名规范为(FirstSample):类名是以大写字母开头的名词。如果由多个单词组成，每个单词的第一个字母都应该大写(驼峰命名法)

+ 源代码的文件名必须与公共类的名字相同,并用.java作为扩展名

#### 数据类型
```
 String s = RandomStringUtils.random(22) ;
        byte[] bytes = s.getBytes();
        byte a1 = 35;
        System.out.println(a1);
        System.out.println(Arrays.toString(bytes));
        byte[] bytes1 = new byte[35] ;
        int[] ints = new int[35] ;
        for (int i = 0; i < 35; i++) {
//            bytes1[i] = (byte) RandomUtils.nextInt(-128,127) ;//byte 范围
            bytes1[i] = (byte) RandomUtils.nextInt(28,127) ;
//            ints[i] =  RandomUtils.nextInt(-2147483648,2147483647) ;//int的范围
            ints[i] =  RandomUtils.nextInt(8,2147483647) ;
        }
        System.out.println(new String(bytes1));
        char ch = (char)RandomUtils.nextInt(4347,347437343);//int 转换为char
         ch = 3643473473443;//Integer number too large 说明char也有最大值
          ch = -63434;//负数不能给char
        System.out.println(ch);
        ?
        byte数据类型 8位，我的疑惑是，io流读取文件，是读取这个文件的每个字符对应其编码的2进制？那么所有的二进制大小都不超过8位吗？
        我的理解是，文件传输的时候用的是字符流或者字节流，
        字符与字节
        1、ASCII码：一个英文字母（不分大小写）占一个字节的空间，一个中文汉字占两个字节的空间。一个二进制数字序列，在计算机中作为一个数字单元，一般为8位二进制数，换算为十进制。最小值-128，最大值127。如一个ASCII码就是一个字节。
        2、UTF-8编码：一个英文字符等于一个字节，一个中文（含繁体）等于三个字节。中文标点占三个字节，英文标点占一个字节
        3、Unicode编码：一个英文等于两个字节，一个中文（含繁体）等于两个字节。中文标点占两个字节，英文标点占两个字节
        传输的最小单位就是字节，一个字节是8位，正好每个byte的大小是8，一个 byte表示一个字节，不浪费空间。
        
        因为计算机处理数据的单位就是字节。所以，当我们处理磁盘文件和内存数据的时候，就正好选择和计算机处理数据单位等大的数据类型来存储数据。而且，我们调用的类库中的API也都是使用这样类型的参数。所以，我们就必须在编写程序的时候使用byte类型的数组。
```
#### Java语言提供了八种基本类型。六种数字类型（四个整数型，两个浮点型），一种字符类型，还有一种布尔型
    byte 1字节(8位) 最小值是 -128（-2^7）；最大值是 127（2^7-1）；默认值是 0；byte 类型用在大型数组中节约空间，主要代替整数，因为 byte 变量占用的空间只有 int 类型的四分之一；文件流数组刚好采用byte
    short 2字节(16位) 最小值是 -32768（-2^15）；最大值是 32767（2^15 - 1）；默认值是 0；
    int 4字节(32位) 最小值是 -2,147,483,648（-2^31）；最大值是 2,147,483,647（2^31 - 1）；一般地整型变量默认为 int 类型；默认值是 0 ；
    float 4字节(32位)  最小值：Float.MIN_VALUE=1.4E-45 最大值：Float.MAX_VALUE=3.4028235E38 默认值是 0.0f；
    lang 8字节(64位) 最小值是 -9,223,372,036,854,775,808（-2^63）； 最大值是 9,223,372,036,854,775,807（2^63 -1）； 默认值是 0L；
    double 8字节(64位) 最小值：Double.MIN_VALUE=4.9E-324 最大值：Double.MAX_VALUE=1.7976931348623157E308 默认值是 0.0d；
    char char类型是一个单一的 16 位 Unicode 字符；最小值是 \u0000（即为0）；最大值是 \uffff（即为65,535）；
    boolean 4字节 boolean数据类型表示一位的信息；只有两个取值：true 和 false；默认值是 false；


#### 变量
> 在Java中，每一个变量都有一个类型(type)
##### 变量初始化
> 声明一个变量之后，必须用赋值语句对变量进行显示初始化，千万不要使用未初始化的变量
> 在Java中可以将声明放在代码中的任何地方

#### 常量
> 在Java中利用关键字final指示常量,关键字final只能被赋值一次,一旦被赋值后就不能被更改了
```
             >>final类中的成员方法收影响   隐士指定为final方法
final修饰  类 > 此类不能被继承
             >> final类中的成员变量并不受影响
             
          方法 > 不能被重写
          
          成员变量 > 必须赋值，初始化一次
```



#### 位运算
> 和c++类似
#### [位运算](java_bitOperation.md)
#### [数学公式](useMath.md)







