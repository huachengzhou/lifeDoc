---
title: "java类型转换,构造,重要语法"
date: 2022-10-05
draft: false
weight: 2
---


## 基本类型

+ 八个基本类型:

| 基本类型     |  位数       |  字节     |	默认值      |	取值范围     |
| :-----:    | :----:     |:----:    |:----:        |:----:         |
|    byte    |    8     |      1    |    0        |  -128 ~ 127      |
|    short    |    16     |      2    |    0      |  -32768 ~ 32767  |
|    int    |    32     |      4    |    0      |  -2147483648 ~ 2147483647  |
|    long    |    64     |      8    |    0l      |  -9223372036854775808 ~ 9223372036854775807  |
|    char    |    16     |      2    |    'u0000'      |  0 ~ 65535 |
|    float    |    32     |      4    |    0f      |  1.4E-45 ~ 3.4028235E38 |
|    double    |    64     |      8    |    0d      |  4.9E-324 ~ 1.7976931348623157E308 |
|    boolean    |    1     |          |    false      |  true、false |

+ 基本类型都有对应的包装类型，基本类型与其对应的包装类型之间的赋值使用自动装箱与拆箱完成

```java
Integer x = 2;     // 装箱
int y = x;         // 拆箱
```

+ 缓存池

new Integer(123) 与 Integer.valueOf(123) 的区别在于:

+ new Integer(123) 每次都会新建一个对象
+ Integer.valueOf(123) 会使用缓存池中的对象，多次调用会取得同一个对象的引用。

```java
Integer x = new Integer(123);
Integer y = new Integer(123);
System.out.println(x == y);    // false
Integer z = Integer.valueOf(123);
Integer k = Integer.valueOf(123);
System.out.println(z == k);   // true
```


valueOf() 方法的实现比较简单，就是先判断值是否在缓存池中，如果在的话就直接返回缓存池的内容。

```java
public static Integer valueOf(int i) {
    if (i >= IntegerCache.low && i <= IntegerCache.high)
        return IntegerCache.cache[i + (-IntegerCache.low)];
    return new Integer(i);
}
```

在 Java 8 中，Integer 缓存池的大小默认为 -128~127。

```java
static final int low = -128;
static final int high;
static final Integer cache[];

static {
    // high value may be configured by property
    int h = 127;
    String integerCacheHighPropValue =
        sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
    if (integerCacheHighPropValue != null) {
        try {
            int i = parseInt(integerCacheHighPropValue);
            i = Math.max(i, 127);
            // Maximum array size is Integer.MAX_VALUE
            h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
        } catch( NumberFormatException nfe) {
            // If the property cannot be parsed into an int, ignore it.
        }
    }
    high = h;

    cache = new Integer[(high - low) + 1];
    int j = low;
    for(int k = 0; k < cache.length; k++)
        cache[k] = new Integer(j++);

    // range [-128, 127] must be interned (JLS7 5.1.7)
    assert IntegerCache.high >= 127;
}
```

编译器会在缓冲池范围内的基本类型自动装箱过程调用 valueOf() 方法，因此多个 Integer 实例使用自动装箱来创建并且值相同，那么就会引用相同的对象。

```java
Integer m = 123;
Integer n = 123;
System.out.println(m == n); // true
```


基本类型对应的缓冲池如下:

+ boolean values true and false
+ all byte values
+ short values between -128 and 127
+ int values between -128 and 127
+ char in the range \u0000 to \u007F

在使用这些基本类型对应的包装类型时，就可以直接使用缓冲池中的对象。

如果在缓冲池之外：

```java
Integer m = 323;
Integer n = 323;
System.out.println(m == n); // false
```

## 修饰符

### final

> 被修饰的元素其基本地址不能发生改变

+ **1.数据**

声明数据为常量，可以是编译时常量，也可以是在运行时被初始化后不能被改变的常量。

对于基本类型，final 使数值不变；
对于引用类型，final 使引用不变，也就不能引用其它对象，但是被引用的对象本身是可以修改的。(引用类型都是对象  相当于对象的地址不能再发生改变)

```java
final int x = 1;
// x = 2;  // cannot assign value to final variable 'x'
final A y = new A();
y.a = 1;
```

+ **2.方法**

声明方法不能被子类重写。
private 方法隐式地被指定为 final，如果在子类中定义的方法和基类中的一个 private 方法签名相同，此时子类的方法不是重写基类方法，而是在子类中定义了一个新的方法。

+ **3.类**

声明类不允许被继承。


### static

+ **1.静态变量**

静态变量: 又称为类变量，也就是说这个变量属于类的，类所有的实例都共享静态变量，可以直接通过类名来访问它；静态变量在内存中只存在一份。

实例变量: 每创建一个实例就会产生一个实例变量，它与该实例同生共死。

```java
public class A {
    private int x;         // 实例变量
    private static int y;  // 静态变量

    public static void main(String[] args) {
        // int x = A.x;  // Non-static field 'x' cannot be referenced from a static context
        A a = new A();
        int x = a.x;
        int y = A.y;
    }
}
```

+ **2.静态方法**

静态方法在类加载的时候就存在了，它不依赖于任何实例。所以静态方法必须有实现，也就是说它不能是抽象方法(abstract)。

```java
public abstract class A {
    public static void func1(){
    }
    // public abstract static void func2();  // Illegal combination of modifiers: 'abstract' and 'static'
}
```

只能访问所属类的静态字段和静态方法，方法中不能有 this 和 super 关键字

```java
public class A {
    private static int x;
    private int y;

    public static void func1(){
        int a = x;
        // int b = y;  // Non-static field 'y' cannot be referenced from a static context
        // int b = this.y;     // 'A.this' cannot be referenced from a static context
    }
}
```

## 接口

### 重要接口的妙处

