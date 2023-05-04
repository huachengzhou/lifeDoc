---
title: "异常机制详解"
date: 2022-10-05
draft: false
weight: 3
---


# 异常介绍


> Java异常是Java提供的一种识别及响应错误的一致性机制，java异常机制可以使程序中异常处理代码和正常业务代码分离，保证程序代码更加优雅，并提高程序健壮性。本文综合多篇文章后，总结了Java 异常的相关知识，希望可以提升你对Java中异常的认知效率


{{< mermaid >}}

graph LR
Throwable --> Exception
Throwable --> Exception --> RuntimeException
Throwable --> Exception --> 非运行时异常

Throwable --> Error --> IOError
Throwable --> Error --> ThreadDeath
Throwable --> Error --> AssertionError

{{< /mermaid >}}

{{< hint info >}}
**Throwable**  
Throwable 是 Java 语言中所有错误与异常的超类。Throwable 包含两个子类：Error（错误）和 Exception（异常），它们通常用于指示发生了异常情况。T
hrowable 包含了其线程创建时线程执行堆栈的快照，它提供了 printStackTrace() 等接口用于获取堆栈跟踪数据等信息
{{< /hint >}}


{{< hint warning >}}
**Error（错误）**  
Error 类及其子类：程序中无法处理的错误，表示运行应用程序中出现了严重的错误。此类错误一般表示代码运行时 JVM 出现问题。
通常有 Virtual MachineError（虚拟机运行错误）、NoClassDefFoundError（类定义错误）等。
比如 OutOfMemoryError：内存不足错误；StackOverflowError：栈溢出错误。此类错误发生时，JVM 将终止线程。
这些错误是不受检异常，非代码性错误。因此，当此类错误发生时，应用程序不应该去处理此类错误。按照Java惯例，我们是不应该实现任何新的Error子类的！
{{< /hint >}}


## Exception（异常）
> 程序本身可以捕获并且可以处理的异常。Exception 这种异常又分为两类：运行时异常和编译时异常

{{< columns >}}

### 运行时异常
```
都是RuntimeException类及其子类异常，如NullPointerException(空指针异常)、IndexOutOfBoundsException(下标越界异常)等，这些异常是不检查异常，程序中可以选择捕获处理，也可以不处理。这些异常一般是由程序逻辑错误引起的，程序应该从逻辑角度尽可能避免这类异常的发生。


运行时异常的特点是Java编译器不会检查它，也就是说，当程序中可能出现这类异常，即使没有用try-catch语句捕获它，也没有用throws子句声明抛出它，也会编译通过。
```
<--->

### 非运行时异常 （编译异常）

```
是RuntimeException以外的异常，类型上都属于Exception类及其子类。从程序语法角度讲是必须进行处理的异常，如果不处理，程序就不能编译通过。如IOException、SQLException等以及用户自定义的Exception异常，一般情况下不自定义检查异常
```

{{< /columns >}}


## 可查的异常（checked exceptions）和不可查的异常（unchecked exceptions）

+ 可查异常（编译器要求必须处置的异常）：

正确的程序在运行中，很容易出现的、情理可容的异常状况。可查异常虽然是异常状况，但在一定程度上它的发生是可以预计的，而且一旦发生这种异常状况，就必须采取某种方式进行处理。除了RuntimeException及其子类以外，其他的Exception类及其子类都属于可查异常。这种异常的特点是Java编译器会检查它，也就是说，当程序中可能出现这类异常，要么用try-catch语句捕获它，要么用throws子句声明抛出它，否则编译不会通过。

+ 不可查异常(编译器不要求强制处置的异常)

包括运行时异常（RuntimeException与其子类）和错误（Error）


# 异常基础

## 异常关键字

+ try – 用于监听。将要被监听的代码(可能抛出异常的代码)放在try语句块之内，当try语句块内发生异常时，异常就被抛出。
+ catch – 用于捕获异常。catch用来捕获try语句块中发生的异常。
+ finally – finally语句块总是会被执行。它主要用于回收在try块里打开的物力资源(如数据库连接、网络连接和磁盘文件)。只有finally块，执行完成之后，才会回来执行try或者catch块中的return或者throw语句，如果finally中使用了return或者throw等终止方法的语句，则就不会跳回执行，直接停止。
+ throw – 用于抛出异常。
+ throws – 用在方法签名中，用于声明该方法可能抛出的异常。


## 异常的申明(throws)

在Java中，当前执行的语句必属于某个方法，Java解释器调用main方法执行开始执行程序。
若方法中存在检查异常，如果不对其捕获，那必须在方法头中显式声明该异常，以便于告知方法调用者此方法有异常，需要进行处理。
 在方法中声明一个异常，方法头中使用关键字throws，后面接上要声明的异常。若声明多个异常，则使用逗号分割。如下所示：


```java
public static void method() throws IOException, FileNotFoundException{
    //something statements
}
```


注意：若是父类的方法没有声明异常，则子类继承方法后，也不能声明异常。

通常，应该捕获那些知道如何处理的异常，将不知道如何处理的异常继续传递下去。传递异常可以在方法签名处使用 throws 关键字声明可能会抛出的异常。


```java
private static void readFile(String filePath) throws IOException {
    File file = new File(filePath);
    String result;
    BufferedReader reader = new BufferedReader(new FileReader(file));
    while((result = reader.readLine())!=null) {
        System.out.println(result);
    }
    reader.close();
}
```


Throws抛出异常的规则：

+ 如果是不可查异常（unchecked exception），即Error、RuntimeException或它们的子类，那么可以不使用throws关键字来声明要抛出的异常，编译仍能顺利通过，但在运行时会被系统抛出。



+ 必须声明方法可抛出的任何可查异常（checked exception）。即如果一个方法可能出现受可查异常，要么用try-catch语句捕获，要么用throws子句声明将它抛出，否则会导致编译错误

+ 仅当抛出了异常，该方法的调用者才必须处理或者重新抛出该异常。当方法的调用者无力处理该异常的时候，应该继续抛出，而不是囫囵吞枣。

+ 调用方法必须遵循任何可查异常的处理和声明规则。若覆盖一个方法，则不能声明与覆盖方法不同的异常。声明的任何异常必须是被覆盖方法所声明异常的同类或子类。


## 异常的抛出(throw)

如果代码可能会引发某种错误，可以创建一个合适的异常类实例并抛出它，这就是抛出异常。如下所示：

```java
public static double method(int value) {
    if(value == 0) {
        throw new ArithmeticException("参数不能为0"); //抛出一个运行时异常
    }
    return 5.0 / value;
}
```


大部分情况下都不需要手动抛出异常，因为Java的大部分方法要么已经处理异常，要么已声明异常。所以一般都是捕获异常或者再往上抛。


有时我们会从 catch 中抛出一个异常，目的是为了改变异常的类型。多用于在多系统集成时，当某个子系统故障，异常类型可能有多种，可以用统一的异常类型向外暴露，不需暴露太多内部异常细节。

```java
private static void readFile(String filePath) throws MyException {    
    try {
        // code
    } catch (IOException e) {
        MyException ex = new MyException("read file failed.");
        ex.initCause(e);
        throw ex;
    }
}
```


## 异常的自定义

习惯上，定义一个异常类应包含两个构造函数，一个无参构造函数和一个带有详细描述信息的构造函数（Throwable 的 toString 方法会打印这些详细信息，调试时很有用）, 比如上面用到的自定义MyException：


```java
public class MyException extends Exception {
    public MyException(){ }
    public MyException(String msg){
        super(msg);
    }
    // ...
}
```


## 异常的捕获

异常捕获处理的方法通常有：


+ try-catch
+ try-catch-finally
+ try-finally
+ try-with-resource


### try-catch

在一个 try-catch 语句块中可以捕获多个异常类型，并对不同类型的异常做出不同的处理

```java
private static void readFile(String filePath) {
    try {
        // code
    } catch (FileNotFoundException e) {
        // handle FileNotFoundException
    } catch (IOException e){
        // handle IOException
    }
}
```


同一个 catch 也可以捕获多种类型异常，用 | 隔开

```java
private static void readFile(String filePath) {
    try {
        // code
    } catch (FileNotFoundException | UnknownHostException e) {
        // handle FileNotFoundException or UnknownHostException
    } catch (IOException e){
        // handle IOException
    }
}
```


### try-catch-finally

+ 常规语法

```java
try {                        
    //执行程序代码，可能会出现异常                 
} catch(Exception e) {   
    //捕获异常并处理   
} finally {
    //必执行的代码
}
```


* 执行的顺序
    * 当try没有捕获到异常时：try语句块中的语句逐一被执行，程序将跳过catch语句块，执行finally语句块和其后的语句；
    
    * 当try捕获到异常，catch语句块里没有处理此异常的情况：当try语句块里的某条语句出现异常时，而没有处理此异常的catch语句块时，此异常将会抛给JVM处理，finally语句块里的语句还是会被执行，但finally语句块后的语句不会被执行；
    
    * 当try捕获到异常，catch语句块里有处理此异常的情况：在try语句块中是按照顺序来执行的，当执行到某一条语句出现异常时，程序将跳到catch语句块，并与catch语句块逐一匹配，找到与之对应的处理程序，其他的catch语句块将不会被执行，而try语句块中，出现异常之后的语句也不会被执行，catch语句块执行完后，执行finally语句块里的语句，最后执行finally语句块后的语句；



![][img2]
![][img2_]


+ 一个完整的例子

```java
private static void readFile(String filePath) throws MyException {
    File file = new File(filePath);
    String result;
    BufferedReader reader = null;
    try {
        reader = new BufferedReader(new FileReader(file));
        while((result = reader.readLine())!=null) {
            System.out.println(result);
        }
    } catch (IOException e) {
        System.out.println("readFile method catch block.");
        MyException ex = new MyException("read file failed.");
        ex.initCause(e);
        throw ex;
    } finally {
        System.out.println("readFile method finally block.");
        if (null != reader) {
            try {
                reader.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

### try-finally

> 可以直接用try-finally吗？ 可以。

try块中引起异常，异常代码之后的语句不再执行，直接执行finally语句。 try块没有引发异常，则执行完try块就执行finally语句。

try-finally可用在不需要捕获异常的代码，可以保证资源在使用后被关闭。例如IO流中执行完相应操作后，关闭相应资源；
使用Lock对象保证线程同步，通过finally可以保证锁会被释放；数据库连接代码时，关闭连接操作等等。


```java
//以Lock加锁为例，演示try-finally
ReentrantLock lock = new ReentrantLock();
try {
    //需要加锁的代码
} finally {
    lock.unlock(); //保证锁一定被释放
}
```

finally遇见如下情况不会执行

+ 在前面的代码中用了System.exit()退出程序。
+ finally语句块中发生了异常。
+ 程序所在的线程死亡。
+ 关闭CPU。

### try-with-resource

> try-with-resource是Java 7中引入的，很容易被忽略。

上面例子中，finally 中的 close 方法也可能抛出 IOException, 从而覆盖了原始异常。
JAVA 7 提供了更优雅的方式来实现资源的自动释放，自动释放的资源需要是实现了 AutoCloseable 接口的类。


+ 代码实现

```java
private  static void tryWithResourceTest(){
    try (Scanner scanner = new Scanner(new FileInputStream("c:/abc"),"UTF-8")){
        // code
    } catch (IOException e){
        // handle exception
    }
}
```


+ 看下Scanner

```java
public final class Scanner implements Iterator<String>, Closeable {
  // ...
}
public interface Closeable extends AutoCloseable {
    public void close() throws IOException;
}
```


try 代码块退出时，会自动调用 scanner.close 方法，和把 scanner.close 方法放在 finally 代码块中不同的是，若 scanner.close 抛出异常，则会被抑制，抛出的仍然为原始异常。被抑制的异常会由 addSusppressed 方法添加到原来的异常，如果想要获取被抑制的异常列表，可以调用 getSuppressed 方法来获取。



## 异常基础总结

+ try、catch和finally都不能单独使用，只能是try-catch、try-finally或者try-catch-finally。
+ try语句块监控代码，出现异常就停止执行下面的代码，然后将异常移交给catch语句块来处理。
+ finally语句块中的代码一定会被执行，常用于回收资源 。
+ throws：声明一个异常，告知方法调用者。
+ throw ：抛出一个异常，至于该异常被捕获还是继续抛出都与它无关。

java编程思想一书中，对异常的总结。


+ 在恰当的级别处理问题。（在知道该如何处理的情况下了捕获异常。）
+ 解决问题并且重新调用产生异常的方法。
+ 进行少许修补，然后绕过异常发生的地方继续执行。
+ 用别的数据进行计算，以代替方法预计会返回的值。
+ 把当前运行环境下能做的事尽量做完，然后把相同的异常重抛到更高层。
+ 把当前运行环境下能做的事尽量做完，然后把不同的异常抛到更高层。
+ 终止程序。
+ 进行简化（如果你的异常模式使问题变得太复杂，那么用起来会非常痛苦）。
+ 让类库和程序更安全。


## 常用的异常

在Java中提供了一些异常用来描述经常发生的错误，对于这些异常，有的需要程序员进行捕获处理或声明抛出，有的是由Java虚拟机自动进行捕获处理。Java中常见的异常类:

+ RuntimeException

    * java.lang.ArrayIndexOutOfBoundsException 数组索引越界异常。当对数组的索引值为负数或大于等于数组大小时抛出。
    * java.lang.ArithmeticException 算术条件异常。譬如：整数除零等。
    * java.lang.NullPointerException 空指针异常。当应用试图在要求使用对象的地方使用了null时，抛出该异常。譬如：调用null对象的实例方法、访问null对象的属性、计算null对象的长度、使用throw语句抛出null等等
    * java.lang.ClassNotFoundException 找不到类异常。当应用试图根据字符串形式的类名构造类，而在遍历CLASSPAH之后找不到对应名称的class文件时，抛出该异常。
    * java.lang.NegativeArraySizeException 数组长度为负异常
    * java.lang.ArrayStoreException 数组中包含不兼容的值抛出的异常
    * java.lang.SecurityException 安全性异常
    * java.lang.IllegalArgumentException 非法参数异常


+ IOException
    * IOException：操作输入流和输出流时可能出现的异常。
    * EOFException 文件已结束异常
    * FileNotFoundException 文件未找到异常
    
+ 其他
    * ClassCastException 类型转换异常类
    * ArrayStoreException 数组中包含不兼容的值抛出的异常
    * SQLException 操作数据库异常类
    * NoSuchFieldException 字段未找到异常
    * NoSuchMethodException 方法未找到抛出的异常
    * NumberFormatException 字符串转换为数字抛出的异常
    * StringIndexOutOfBoundsException 字符串索引超出范围抛出的异常
    * IllegalAccessException 不允许访问某类异常
    * InstantiationException 当应用程序试图使用Class类中的newInstance()方法创建一个类的实例，而指定的类对象无法被实例化时，抛出该异常
    

## 异常实践


+ **只针对不正常的情况才使用异常**

+ **尽量使用标准的异常**

+ **对异常进行文档说明**

在 Javadoc 添加 @throws 声明，并且描述抛出异常的场景。

```java
/**
* Method description
* 
* @throws MyBusinessException - businuess exception description
*/
public void doSomething(String input) throws MyBusinessException {
   // ...
}
```


+ **不要在finally块中使用return**

try块中的return语句执行成功后，并不马上返回，而是继续执行finally块中的语句，如果此处存在return语句，则在此直接返回，无情丢弃掉try块中的返回点。

```java
private int x = 0;
public int checkReturn() {
    try {
        // x等于1，此处不返回
        return ++x;
    } finally {
        // 返回的结果是2
        return ++x;
    }
}
```



[img2]:../.././imgs/java/other/java-basic-exception-2.jpg
[img2_]:../../../imgs/java/other/java-basic-exception-2.jpg



[img3]:../.././imgs/java/other/java-basic-exception-3.jpg
[img3_]:../../../imgs/java/other/java-basic-exception-3.jpg