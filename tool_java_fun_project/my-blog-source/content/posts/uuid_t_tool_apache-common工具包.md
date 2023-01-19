---
title : 'apache-common工具包'
date : '2021-02-15'
draft : false
tags : ["tool"]
categories : ["java","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---

## Apache Commons 工具类介绍及简单使用

| 组件     |  功能介绍  |
| :-----: | :----:  |
|    BeanUtils     |      Commons-BeanUtils 提供对 Java 反射和自省API的包装, 提供了对于JavaBean进行各种操作，克隆对象,属性等等.    |
|     Betwixt    |     XML与Java对象之间相互转换.      |
|     Codec    |     处理常用的编码方法的工具类包 例如DES、SHA1、MD5、Base64等.      |
|     Collections    |     java集合框架操作.      |
|     Compress    |     java提供文件打包 压缩类库.     |
|     Configuration    |  Commons-Configuration 工具对各种各式的配置和参考文件提供读取帮助,java应用程序的配置管理类库.     |
|     DBCP    |     提供数据库连接池服务.   |
|     DbUtils    |  DbUtils 是一个 JDBC helper 类库，完成数据库任务的简单的资源清除代码,提供对jdbc 的操作封装来简化数据查询和记录读取操作  |
|     Email    |     java发送邮件 对javamail的封装.  |
|     FileUpload    |     提供文件上传功能.  |
|     HttpClient   |     提供HTTP客户端与服务器的各种通讯操作. 现在已改成HttpComponents  |
|     Lang   |     Java基本对象方法的工具类包 如：StringUtils,ArrayUtils等等.  |
|     Logging   |     提供的是一个Java 的日志接口.  |
|     Validator   |     提供了客户端和服务器端的数据验证框架.  |
|     Primitives   |     Commons-Primitives提供了一个更小，更快和更易使用的对Java基本类型的支持。当前主要是针对基本类型的 collection。  |
|     Math   |     Math 是一个轻量的，自包含的数学和统计组件，解决了许多非常通用但没有及时出现在Java标准语言中的实践问题  |
|     EL   |   Commons-EL 提供在JSP2.0规范中定义的EL表达式的解释器.  |
|     Discovery    |  Commons-Discovery 提供工具来定位资源 (包括类) ，通过使用各种模式来映射服务/引用名称和资源名称。  |
|     Digester     |  Commons-Digester 是一个 XML-Java对象的映射工具，用于解析 XML配置文件.  |
|     Chain     |  Chain 提供实现组织复杂的处理流程的“责任链模式”  |
|     Modeler     |  Commons-Modeler 提供了建模兼容JMX规范的Mbean的机制.  |
|     Net     |  Net 是一个网络工具集，基于 NetComponents 代码，包括 FTP 客户端等等  |

# 一:org.apache.commons.lang

+ ArrayUtils – 用于对数组的操作，如添加、查找、删除、子数组、倒序、元素类型转换等；

```
ArrayUtils类
ArrayUtils.toString(array)  将数组转为为字符串，格式如：{2,4,8,16}
ArrayUtils.contains(array,8)  判断数组中是否包含数字8，（一维数组）
ArrayUtils.indexOf(array,8)  判断数组中第一个8的位置（一维数组）
ArrayUtils.lastIndexOf(array,8) 判断数组中最后一个8的位置。（一维数组）
ArrayUtils.clone(array) 给一个一维数组来个拷贝
ArrayUtils.reverse(array);  翻转该一维数组
ArrayUtils.toMap(array); 将一个二维数组转换为map，二维数组中至少与两列，第一列为key第二列为value == >注意的是传入toMap()中的二维数组必须是对象如Integer
```

+ BitField – 用于操作位元，提供了一些方便而安全的方法；

+ BooleanUtils – 用于操作和转换 boolean 或者 Boolean 及相应的数组；

```
 boolean[] booleans = new boolean[]{true, false, true};
//和，并且
System.out.println(BooleanUtils.and(booleans));//false
//或者
System.out.println(BooleanUtils.or(booleans));//true
ProjectInfo projectInfo = null;
if (projectInfo != null && projectInfo.getId() != 0);
//可以用上面的改为
BooleanUtils.and(new boolean[]{projectInfo != null,projectInfo.getId() != 0});
Integer integer = 0;
System.out.println(BooleanUtils.toBooleanObject(integer));//false
```

+ CharEncoding – 包含了 Java 环境支持的字符编码，提供是否支持某种编码的判断；

```
System.out.println(CharEncoding.ISO_8859_1);
System.out.println(CharEncoding.US_ASCII);
System.out.println(CharEncoding.UTF_8);
System.out.println(CharEncoding.UTF_16);
System.out.println(CharEncoding.UTF_16BE);
System.out.println(CharEncoding.UTF_16LE);
```

+ CharRange – 用于设定字符范围并做相应检查；

```
System.out.println(CharUtils.toChar("hello",'o'));
int assii = CharUtils.toIntValue('2');//检查字符是否在0-9
System.out.println(assii);
```

+ CharSet – 用于设定一组字符作为范围并做相应检查；(我的理解是可以用作正则表达式的判断)

```
System.out.println(CharSet.ASCII_ALPHA.toString());//[a-z, A-Z]
System.out.println(CharSet.ASCII_ALPHA.contains('B'));//判断char是否在这个范围内
System.out.println(CharSet.ASCII_ALPHA_LOWER.contains('l'));//判断char是否在这个范围内
System.out.println(CharSet.ASCII_NUMERIC.contains('8'));//判断char是否在这个范围内
System.out.println(CharSet.getInstance("s"));//[s]
```

+ CharSetUtils – 用于操作 CharSet ；

```
 /*这里面所以的输入字符串都会被拆成char[]来判定*/
//删除指定的字符(假如删除的这个会重复那么也会被删除掉)
System.out.println(CharSetUtils.delete("hello World !"," o"));//helloWorld! , hellWrld! ==> input [ o]和[o] 结果都不同
//是否包含任意一个字符
System.out.println(CharSetUtils.containsAny("xudaollong","k","o"));
//当有重复的时候只删除第一次的
System.out.println(CharSetUtils.squeeze("china dong kk a","k"));
//保留指定的char 要注意的是指定的char,这虽然输入的是字符串dong,但是在判定的时候实际上是把这个字符串拆成char[]
System.out.println(CharSetUtils.keep("china g dong","dong"));
//统计char出现的次数
System.out.println(CharSetUtils.count("hello world", "o"));
```

+ CharUtils – 用于操作 char 值和 Character 对象；

```
System.out.println(CharUtils.toChar("hello",'o'));
int num = CharUtils.toIntValue('2');//获取int类型的char但是char必须在Ascii码中
System.out.println(num);
System.out.println(CharUtils.isAsciiNumeric('u'));//false
System.out.println(CharUtils.isAsciiNumeric('7'));//true
System.out.println(CharUtils.isAscii('h'));//判断是否在Ascii 128 范围类,是否属于Ascii
```

+ ClassUtils – 用于对 Java 类的操作，不使用反射；

```
System.out.println(ClassUtils.getShortClassName(UserDO.class));//返回 UserDO
System.out.println(ClassUtils.getName(UserDO.class));//返回 包名.UserDO
System.out.println(ClassUtils.getPackageName(UserDO.class));//返回 包名
System.out.println(ClassUtils.getShortCanonicalName(UserDO.class));//返回 UserDO
System.out.println(ClassUtils.getSimpleName(UserDO.class));//返回 UserDO
System.out.println(ClassUtils.getAbbreviatedName(UserDO.class,2));
ClassUtils.getAllSuperclasses(UserDO.class).stream().forEachOrdered(System.out::println);//获取父类
ClassUtils.getAllInterfaces(UserDO.class).stream().forEachOrdered(System.out::println);//获取接口
```

+ ObjectUtils – 用于操作 Java 对象，提供 null 安全的访问和其他一些功能；


```
UserDO userDO = new UserDO(Zhou_Word.getEnglishName());
UserDO userDO1 = ObjectUtils.clone(userDO);
userDO1 = null;
userDO = Preconditions.checkNotNull(userDO, "不能为null");//不会抛出NullPointerException
/**如果一个类没有重写toString方法本身，将会通过Object类的toString方法获取对象的字符串对象，*/
System.out.println(ObjectUtils.identityToString(null));//null
System.out.println(ObjectUtils.identityToString(""));//java.lang.String@12843fce
System.out.println(ObjectUtils.identityToString(Boolean.TRUE));//java.lang.Boolean@3dd3bcd

/**
 * 累加对象产生的toString
 * 两个参数任意一个为null都会抛出空指针异常
 * buffer-要追加的缓冲区
 * object-要创建对象的toString
 */
StringBuffer buffer = new StringBuffer();
ObjectUtils.identityToString(buffer, "");
ObjectUtils.identityToString(buffer, Boolean.TRUE);
ObjectUtils.identityToString(buffer, 12);
System.out.println(buffer.toString());//java.lang.String@12843fcejava.lang.Boolean@3dd3bcdjava.lang.Integer@97e1986 调用了Object类的toString方法

//封装类型的数字比较
Integer a = 10, b = null, c = 15;
//比较两个封装类型的数字,默认null为小
ObjectUtils.compare(a, b);
//比较两个封装类型的数字,设置null为大
ObjectUtils.compare(a, b, true);
//获取最大的值,默认null为最小
ObjectUtils.max(a, b);
```



+ RandomStringUtils – 用于生成随机的字符串；

```
System.out.println(RandomStringUtils.random(4).length());
System.out.println(RandomStringUtils.random(23));//生成指定长度任意的随机字符
System.out.println(RandomStringUtils.randomNumeric(22));//生成数字组成的随机字符
System.out.println(RandomStringUtils.randomAscii(22));//生成ascii 128内的随机字符
System.out.println(RandomStringUtils.randomAlphabetic(21));//生成大写或者小写或者都有组成的随机字符
```

+ SerializationUtils – 用于处理对象序列化，提供比一般 Java 序列化更高级的处理能力；



+ StringEscapeUtils – 用于正确处理转义字符，产生正确的 Java 、 JavaScript 、 HTML 、 XML 和 SQL 代码；


```
String str = "thi is a test 这是一个测试";
String xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
        "<persons>\n" +
        "   <person id=\"23\">\n" +
        "         <name>张   三</name>\n" +
        "         <age>26</age>\n" +
        "  </person>\n" +
        "  <person id=\"22\">\n" +
        "        <name>李四</name>\n" +
        "        <age>25</age>\n" +
        " </person>\n" +
        "</persons>";
System.out.println("用escapeJava方法转义之后的字符串为:" + org.apache.commons.lang.StringEscapeUtils.escapeJava(str));
System.out.println("用unescapeJava方法反转义之后的字符串为:" + org.apache.commons.lang.StringEscapeUtils.unescapeJava(org.apache.commons.lang.StringEscapeUtils.escapeJava(str)));
System.out.println("用escapeHtml方法转义之后的字符串为:" + org.apache.commons.lang.StringEscapeUtils.escapeHtml(str));
System.out.println("用unescapeHtml方法反转义之后的字符串为:" + org.apache.commons.lang.StringEscapeUtils.unescapeHtml(org.apache.commons.lang.StringEscapeUtils.escapeHtml(str)));
System.out.println("用escapeXml方法转义之后的字符串为:" + org.apache.commons.lang.StringEscapeUtils.escapeXml(xml));
System.out.println("用unescapeXml方法反转义之后的字符串为:" + org.apache.commons.lang.StringEscapeUtils.unescapeXml(org.apache.commons.lang.StringEscapeUtils.escapeXml(xml)));
System.out.println("用escapeJavaScript方法转义之后的字符串为:" + org.apache.commons.lang.StringEscapeUtils.escapeJavaScript(str));
System.out.println("用unescapeJavaScript方法反转义之后的字符串为:" + org.apache.commons.lang.StringEscapeUtils.unescapeJavaScript(org.apache.commons.lang.StringEscapeUtils.unescapeJavaScript(str)));
```



+ StringUtils – 处理 String 的核心类，提供了相当多的功能；


```
System.out.println(StringUtils.isNotEmpty(" ")); //true
System.out.println(StringUtils.isNotBlank(" "));//这个方法里面字符串空白会删除空白 false

System.out.println( StringUtils.repeat( "China ", 5));//将目标字符串累加5次
System.out.println( StringUtils.center( "China", 10,"*"));//**China*** size=10指的是得到的长度为10 将china用*前后包围然后目标长度截取为10
System.out.println(StringUtils.countMatches( "Chinese People", "e"));//取得某字符串在另一字符串中出现的次数

String formatted = " 25 * (30,40) [50,60] | 30";
System.out.print("N0: " + StringUtils.substringBeforeLast( formatted, "*" ) );//取得最后一个指定字符串之前的字符串
System.out.print(", N1: " + StringUtils.substringBetween( formatted, "(", "," ) );//取得两字符之间的字符串
System.out.print(", N2: " + StringUtils.substringBetween( formatted, ",", ")" ) );
System.out.print(", N3: " + StringUtils.substringBetween( formatted, "[", "," ) );
System.out.print(", N4: " + StringUtils.substringBetween( formatted, ",", "]" ) );
System.out.print(", N5: " + StringUtils.substringAfterLast( formatted, "|" ) );//取得最后一个指定字符串之后的字符串

System.out.println( StringUtils.reverse("ABCDE"));//颠倒字符串 EDCBA
根据指定分隔符进行反转，分隔符之间的字符不进行反转
StringUtils.reverseDelimited("china", ',')); // china
StringUtils.reverseDelimited("cxhinxa", 'x')); // axhinxz
StringUtils.reverseDelimited("c.hin.a", '.')); // a.hin.c
StringUtils.reverseDelimited("c.hina", '.')); // hina.c
System.out.println(StringUtils.capitalize("hello"));//首字母大写
System.out.println(StringUtils.uncapitalize(this.getClass().getSimpleName()));//首字母小写

System.out.println(StringUtils.isAllUpperCase(this.getClass().getSimpleName()));//是否全是大写 false
System.out.println(StringUtils.isAllLowerCase(this.getClass().getSimpleName()));//是否全是小写 false
System.out.println(StringUtils.swapCase("I am a-A*a"));//大小写转换，空格不动 i AM A-a*A
System.out.println(StringUtils.join(new String[] {"a","b" ,"c"},","));//分割字符串 a,b,c

判断字符串中是否包含指定的字符或字符序列
1:区分大小写
StringUtils.contains(null, 'a'); // false 
StringUtils.contains("china", 'a');// true
2:不区分大小写
StringUtils.containsIgnoreCase("china", 'a');// true
StringUtils.containsIgnoreCase("china", 'A');// true
3:只需要包含任意一个字符即可 判断字符串中是否包含指定字符集合中或指定字符串中任一字符，区分大小写
StringUtils.containsAny("abc", "ab");// true
StringUtils.containsAny("abc", "ax");// true
StringUtils.containsAny("abc", "xy");// false
4:判断字符串中是否不包含指定的字符或指定的字符串中的字符，区分大小写
StringUtils.containsNone(null, 'a'); // true
StringUtils.containsNone("", 'a'); // true 注意这里，空串总是返回true
StringUtils.containsNone("china", ' '); // true 注意包含空白符为true

从字符串中移除匹配的字符或字符序列，如果要移除的字符或字符序列在字符串中不存在，即无匹配，则不进行移除
1:移除单个字符
StringUtils.remove(null, 'a')); // null (注意此处及下一行为null)
StringUtils.remove('china', null) // china 
StringUtils.remove("china", 'i')); // chna
StringUtils.remove("china", 'b')); // china (如果要移除的字符不存在，则返回原字符串)
2:移除指定字符序列
StringUtils.remove("china", "in")); // cha
StringUtils.remove("china", "nin")); // china
3:移除开头匹配的字符序列
StringUtils.removeStart("china", "ch")); // ina
StringUtils.removeStartIgnoreCase("china", "CHI")); // na (忽略大小写)
4:移除结尾匹配的字符序列
StringUtils.removeEnd("china", "na")); // chi
StringUtils.removeEndIgnoreCase("china", "NA")); // chi (忽略大小写)
5:移除空白字符
StringUtils.deleteWhitespace(null)); //null
StringUtils.deleteWhitespace(" c h  i\tn\ra")); // china
```



+ SystemUtils – 在 java.lang.System 基础上提供更方便的访问，如用户路径、 Java 版本、时区、操作系统等判断；

```
System.out.println(SystemUtils.getHostName());//DESKTOP-AS9FA6P
System.out.println(SystemUtils.getUserDir().getPath());//E:\IdeaProjects\z-utils
System.out.println(SystemUtils.getUserHome().getPath());//C:\Users\noatn
System.out.println(SystemUtils.getJavaHome().getPath());//C:\Program Files\Java\jdk1.8.0_181\jre
System.out.println(SystemUtils.getJavaIoTmpDir().getPath());//C:\Users\noatn\AppData\Local\Temp
System.out.println(SystemUtils.IS_JAVA_1_8);//true
System.out.println(SystemUtils.IS_OS_WINDOWS);//true
System.out.println(SystemUtils.IS_OS_WINDOWS_10);//true
System.out.println(SystemUtils.USER_NAME);//noatn
System.out.println(SystemUtils.USER_DIR);//E:\IdeaProjects\z-utils
System.out.println(SystemUtils.USER_HOME);//C:\Users\noatn
```

+ Validate – 提供验证的操作，有点类似 assert 断言；

+ WordUtils – 用于处理单词大小写、换行等。

# 二:org.apache.commons.lang.math

+ 处理分数的Fraction类；

```
{
    Fraction fraction = Fraction.getFraction(1,2);// first prams 分子 ,second params 分母
    System.out.println(fraction.doubleValue());//输出具体值 0.5
    System.out.println(fraction.toString());//输出具字符串值 1/2
    System.out.println(fraction.toProperString());//输出具字符串值 1/2
}
{
    //当第一个参数大于0的情况 (2*3+1) / 3
    Fraction fraction = Fraction.getFraction(2,1,3);
    System.out.println(fraction.doubleValue());//输出具体值 2.3333333333333335
    //当第一个参数大于0的情况 (-2*3-1) / 3
    fraction = Fraction.getFraction(-2,1,3);
    System.out.println(fraction.doubleValue());

    fraction = Fraction.getFraction("1/2");//可以自动解析为分子1分母2
    System.out.println(fraction.doubleValue());
}
{
    //获取绝对值 即|-1| == 1
    System.out.println(Fraction.getFraction(-1, 2).abs());
    //两个分数相加
    System.out.println(Fraction.getFraction(1, 2).add(Fraction.getFraction("1/2")));
    //两个分数相减
    System.out.println(Fraction.getFraction(1, 2).subtract(
            Fraction.getFraction(1, 2)));
    //两个分数相乘
    System.out.println(Fraction.getFraction(1, 2).multiplyBy(
            Fraction.getFraction(1, 2)));
    //两个分数相除
    System.out.println(Fraction.getFraction(1, 2).divideBy(
            Fraction.getFraction(1, 2)));
    //约数
    System.out.println(Fraction.getFraction(1, 2).pow(2));
}
```




+ 处理数值的NumberUtils和IEEE754rUtils类，这里IEEE745r代表的是IEEE 754的标准，是一种浮点数的处理标准。
+ 处理随机数的JVMRandom和RandomUtils类。


```
// JVMRandom继承了java.util.Random类，其功能和Random差不多，只不过封装了返回不同数据类型的方法而已。而RandomUtils则把JVMRandom的方法静态化了。
for (int i = 0; i < 5; i++) {
    System.out.println(RandomUtils.nextInt(100));
}
```




+ 处理数值范围的Range, DoubleRange, FloatRange, IntRange, LangRange, NumberRange类


```
 Range normalScoreRange = new DoubleRange(90, 120);
double score1 = 102.5;
double score2 = 79.9;
System.out.println("Normal score range is: " + normalScoreRange);//[90.0,120.0] 打印一个范围
System.out.println("Is " + score1 + " a normal score? " + normalScoreRange.containsDouble(score1));//是否在这个范围 true
System.out.println("Is " + score2 + " a normal score? " + normalScoreRange.containsDouble(score2));//是否在这个范围 false
System.out.println(normalScoreRange.overlapsRange(new IntRange(92,119)));//此范围是否在我们预定的范围中 true
```

## 三:Commons Collections

+ CollectionUtils
```
org.apache.commons.collections4.CollectionUtils.isEqualCollection(java.util.Collection<?>, java.util.Collection<?>) 集合是否相等
org.apache.commons.collections4.CollectionUtils.union(Collection<?> a,Collection<?> b) 合集
org.apache.commons.collections4.CollectionUtils.subtract(java.lang.Iterable<? extends O>, java.lang.Iterable<? extends O>) 差集
org.apache.commons.collections4.CollectionUtils.intersection (Collection<?> a,Collection<?> b) 交集
org.apache.commons.collections4.CollectionUtils.isSubCollection(Collection<?> a,Collection<?> b) 集合包含
org.apache.commons.collections4.CollectionUtils.collate(java.lang.Iterable<? extends O>, java.lang.Iterable<? extends O>) 合并
org.apache.commons.collections4.CollectionUtils.isNotEmpty(Collection<?> a) 判断是否为null并且是否包含元素
org.apache.commons.collections4.CollectionUtils.addIgnoreNull(Collection<T> collection, final T object)添加非空的对象到集合中
```



