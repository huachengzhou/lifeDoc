---
title: "反射机制详解"
date: 2022-10-05
draft: false
weight: 4
---


# 反射机制详解

> JAVA反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意一个方法和属性；这种动态获取的信息以及动态调用对象的方法的功能称为java语言的反射机制


## 反射基础

> RTTI（Run-Time Type Identification）运行时类型识别。在《Thinking in Java》一书第十四章中有提到，其作用是在运行时识别一个对象的类型和类的信息。主要有两种方式：一种是“传统的”RTTI，它假定我们在编译时已经知道了所有的类型；另一种是“反射”机制，它允许我们在运行时发现和使用类的信息。


反射就是把java类中的各种成分映射成一个个的Java对象

例如：一个类有：成员变量、方法、构造方法、包等等信息，利用反射技术可以对一个类进行解剖，把个个组成部分映射成一个个对象。

> 这里我们首先需要理解 Class类，以及类的加载机制； 然后基于此我们如何通过反射获取Class类以及类中的成员变量、方法、构造方法等。


### Class类

Class类，Class类也是一个实实在在的类，存在于JDK的java.lang包中。
Class类的实例表示java应用运行时的类(class ans enum)或接口(interface and annotation)（每个java类运行时都在JVM里表现为一个class对象，
可通过类名.class、类型.getClass()、Class.forName("类名")等方法获取class对象）。数组同样也被映射为class 对象的一个类，
所有具有相同元素类型和维数的数组都共享该 Class 对象。基本类型boolean，byte，char，short，int，long，float，double和关键字void同样表现为 class 对象。


```java
public final class Class<T> implements java.io.Serializable,
                              GenericDeclaration,
                              Type,
                              AnnotatedElement {
    private static final int ANNOTATION= 0x00002000;
    private static final int ENUM      = 0x00004000;
    private static final int SYNTHETIC = 0x00001000;

    private static native void registerNatives();
    static {
        registerNatives();
    }

    /*
     * Private constructor. Only the Java Virtual Machine creates Class objects.   //私有构造器，只有JVM才能调用创建Class对象
     * This constructor is not used and prevents the default constructor being
     * generated.
     */
    private Class(ClassLoader loader) {
        // Initialize final field for classLoader.  The initialization value of non-null
        // prevents future JIT optimizations from assuming this final field is null.
        classLoader = loader;
    }
```

到这我们也就可以得出以下几点信息：


+ Class类也是类的一种，与class关键字是不一样的。

+ 手动编写的类被编译后会产生一个Class对象，其表示的是创建的类的类型信息，而且这个Class对象保存在同名.class的文件中(字节码文件)

+ 每个通过关键字class标识的类，在内存中有且只有一个与之对应的Class对象来描述其类型信息，无论创建多少个实例对象，其依据的都是用一个Class对象。

+ Class类只存私有构造函数，因此对应Class对象只能有JVM创建和加载Class类的对象作用是运行时提供或获得某个对象的类型信息，这点对于反射技术很重要(关于反射稍后分析)。


### 类加载

类加载机制和类字节码技术可以参考如下两篇文章：

* [JVM基础 - 类字节码详解](https://www.pdai.tech/md/java/jvm/java-jvm-class.html)
    * 源代码通过编译器编译为字节码，再通过类加载子系统进行加载到JVM中运行
* [JVM基础 - Java 类加载机制](https://www.pdai.tech/md/java/jvm/java-jvm-classload.html)
    * 这篇文章将带你深入理解Java 类加载机制


其中，这里我们需要回顾的是：



![][img2]
![][img2_]

![][img1]
![][img1_]


## 反射的使用

> 基于此我们如何通过反射获取Class类对象以及类中的成员变量、方法、构造方法等


在Java中，Class类与java.lang.reflect类库一起对反射技术进行了全力的支持。
在反射包中，我们常用的类主要有Constructor类表示的是Class 对象所表示的类的构造方法，利用它可以在运行时动态创建对象、Field表示Class对象所表示的类的成员变量，
通过它可以在运行时动态修改成员变量的属性值(包含private)、Method表示Class对象所表示的类的成员方法，通过它可以动态调用对象的方法(包含private)，
下面将对这几个重要类进行分别说明。


### Class类对象的获取

在类加载的时候，jvm会创建一个class对象

class对象是可以说是反射中最常用的，获取class对象的方式的主要有三种

+ 根据类名：类名.class
+ 根据对象：对象.getClass()
+ 根据全限定类名：Class.forName(全限定类名)


```java
public class ReflectionDemo1 {

    public static void main(String[] args) throws Exception {
        Class<UserReflection> reflectionClass = UserReflection.class;
        // 获取Class对象的三种方式
        System.out.println("根据类名:  \t" + UserReflection.class);
        System.out.println("根据对象:  \t" + new UserReflection().getClass());
        System.out.println("根据全限定类名:\t" + Class.forName("com.my_reflection.basic_usage.UserReflection"));
        // 常用的方法
        System.out.println("获取全限定类名:\t" + reflectionClass.getName());
        System.out.println("获取类名:\t" + reflectionClass.getSimpleName());
        System.out.println("实例化:\t" + reflectionClass.newInstance());
    }

}

 class UserReflection {
    private String name = "init";
    private int age;

    public UserReflection(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public UserReflection() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

输出结果：

```console
根据类名:  	class com.my_reflection.basic_usage.UserReflection
根据对象:  	class com.my_reflection.basic_usage.UserReflection
根据全限定类名:	class com.my_reflection.basic_usage.UserReflection
获取全限定类名:	com.my_reflection.basic_usage.UserReflection
获取类名:	UserReflection
实例化:	com.my_reflection.basic_usage.UserReflection@31befd9f
```

+ 再来看看 Class类的方法

| 方法名 | 说明 |
| --- | --- |
| forName() | (1)获取Class对象的一个引用，但引用的类还没有加载(该类的第一个对象没有生成)就加载了这个类。 |
| (2)为了产生Class引用，forName()立即就进行了初始化。 |  |
| Object-getClass() | 获取Class对象的一个引用，返回表示该对象的实际类型的Class引用。 |
| getName() | 取全限定的类名(包括包名)，即类的完整名字。 |
| getSimpleName() | 获取类名(不包括包名) |
| getCanonicalName() | 获取全限定的类名(包括包名) |
| isInterface() | 判断Class对象是否是表示一个接口 |
| getInterfaces() | 返回Class对象数组，表示Class对象所引用的类所实现的所有接口。 |
| getSupercalss() | 返回Class对象，表示Class对象所引用的类所继承的直接基类。应用该方法可在运行时发现一个对象完整的继承结构。 |
| newInstance() | 返回一个Oject对象，是实现“虚拟构造器”的一种途径。使用该方法创建的类，必须带有无参的构造器。 |
| getFields() | 获得某个类的所有的公共（public）的字段，包括继承自父类的所有公共字段。 类似的还有getMethods和getConstructors。 |
| getDeclaredFields | 获得某个类的自己声明的字段，即包括public、private和proteced，默认但是不包括父类声明的任何字段。类似的还有getDeclaredMethods和getDeclaredConstructors。 |


```java
import java.lang.reflect.Field;

/**
 * @author : chengdu
 * @date :  2023/9/24-09
 **/
public class ReflectionDemo2 {

    interface I1 {
    }

    interface I2 {
    }

    static class Cell {
        public int mCellPublic;
    }

    static class Animal extends Cell {
        private int mAnimalPrivate;
        protected int mAnimalProtected;
        int mAnimalDefault;
        public int mAnimalPublic;
        private static int sAnimalPrivate;
        protected static int sAnimalProtected;
        static int sAnimalDefault;
        public static int sAnimalPublic;
    }

    static class Dog extends Animal implements I1, I2 {
        private int mDogPrivate;
        public int mDogPublic;
        protected int mDogProtected;
        private int mDogDefault;
        private static int sDogPrivate;
        protected static int sDogProtected;
        static int sDogDefault;
        public static int sDogPublic;
    }

    public static void main(String[] args) throws Exception {
        Class<Dog> dog = Dog.class;
        //类名打印
        System.out.println(dog.getName()); //com.my_reflection.basic_usage.ReflectionDemo2$Dog
        System.out.println(dog.getSimpleName()); //Dog
        System.out.println(dog.getCanonicalName());//com.my_reflection.basic_usage.ReflectionDemo2.Dog
        //接口
        System.out.println(dog.isInterface()); //false
        for (Class iI : dog.getInterfaces()) {
            System.out.println(iI);
        }
         /*
          interface com.cry.I1
          interface com.cry.I2
         */

        //父类
        System.out.println(dog.getSuperclass());//class com.my_reflection.basic_usage.ReflectionDemo2$Animal
        //创建对象
        Dog d = dog.newInstance();
        //字段
        for (Field f : dog.getFields()) {
            System.out.println(f.getName());
        }
        /*
            mDogPublic
            sDogPublic
            mAnimalPublic
            sAnimalPublic
            mCellPublic  //父类的父类的公共字段也打印出来了
         */
        System.out.println("---------");
        for (Field f : dog.getDeclaredFields()) {
            System.out.println(f.getName());
        }
        /** 只有自己类声明的字段
         mDogPrivate
         mDogPublic
         mDogProtected
         mDogDefault
         sDogPrivate
         sDogProtected
         sDogDefault
         sDogPublic
         */
    }

}
```

getName、getCanonicalName与getSimpleName的区别：

+ getSimpleName：只获取类名

+ getName：类的全限定名，jvm中Class的表示，可以用于动态加载Class对象，例如Class.forName。

+ getCanonicalName：返回更容易理解的表示，主要用于输出（toString）或log打印，大多数情况下和getName一样，但是在内部类、数组等类型的表示形式就不同了。

### Constructor类及其用法

> Constructor类存在于反射包(java.lang.reflect)中，反映的是Class 对象所表示的类的构造方法。

获取Constructor对象是通过Class类中的方法获取的，Class类与Constructor相关的主要方法如下：

| 方法返回值 | 方法名称 | 方法说明 |
| --- | --- | --- |
| static Class<?> | forName(String className) | 返回与带有给定字符串名的类或接口相关联的 Class 对象。 |
| Constructor | getConstructor(Class<?>... parameterTypes) | 返回指定参数类型、具有public访问权限的构造函数对象 |
| Constructor<?>[] | getConstructors() | 返回所有具有public访问权限的构造函数的Constructor对象数组 |
| Constructor | getDeclaredConstructor(Class<?>... parameterTypes) | 返回指定参数类型、所有声明的（包括private）构造函数对象 |
| Constructor<?>[] | getDeclaredConstructors() | 返回所有声明的（包括private）构造函数对象 |
| T | newInstance() | 调用无参构造器创建此 Class 对象所表示的类的一个新实例。 |


关于Constructor类本身一些常用方法如下(仅部分，其他可查API)

| 方法返回值 | 方法名称 | 方法说明 |
| --- | --- | --- |
| Class | getDeclaringClass() | 返回 Class 对象，该对象表示声明由此 Constructor 对象表示的构造方法的类,其实就是返回真实类型（不包含参数） |
| Type[] | getGenericParameterTypes() | 按照声明顺序返回一组 Type 对象，返回的就是 Constructor对象构造函数的形参类型。 |
| String | getName() | 以字符串形式返回此构造方法的名称。 |
| Class<?>[] | getParameterTypes() | 按照声明顺序返回一组 Class 对象，即返回Constructor 对象所表示构造方法的形参类型 |
| T | newInstance(Object... initargs) | 使用此 Constructor对象表示的构造函数来创建新实例 |
| String | toGenericString() | 返回描述此 Constructor 的字符串，其中包括类型参数。 |


### Field类及其用法

> Field 提供有关类或接口的单个字段的信息，以及对它的动态访问权限。反射的字段可能是一个类（静态）字段或实例字段。


同样的道理，我们可以通过Class类的提供的方法来获取代表字段信息的Field对象，Class类与Field对象相关方法如下：


| 方法返回值 | 方法名称 | 方法说明 |
| --- | --- | --- |
| Field | getDeclaredField(String name) | 获取指定name名称的(包含private修饰的)字段，不包括继承的字段 |
| Field[] | getDeclaredFields() | 获取Class对象所表示的类或接口的所有(包含private修饰的)字段,不包括继承的字段 |
| Field | getField(String name) | 获取指定name名称、具有public修饰的字段，包含继承字段 |
| Field[] | getFields() | 获取修饰符为public的字段，包含继承字段 |


下面的代码演示了上述方法的使用过程

```java
public class ReflectionDemo3 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchFieldException {
        Class<?> clazz = Student.class;
        //获取指定字段名称的Field类,注意字段修饰符必须为public而且存在该字段,
        // 否则抛NoSuchFieldException
        Field field = clazz.getField("age");
        System.out.println("field:" + field);

        //获取所有修饰符为public的字段,包含父类字段,注意修饰符为public才会获取
        Field fields[] = clazz.getFields();
        for (Field f : fields) {
            System.out.println("f:" + f.getDeclaringClass());
        }

        System.out.println("================getDeclaredFields====================");
        //获取当前类所字段(包含private字段),注意不包含父类的字段
        Field fields2[] = clazz.getDeclaredFields();
        for (Field f : fields2) {
            System.out.println("f2:" + f.getDeclaringClass());
        }
        //获取指定字段名称的Field类,可以是任意修饰符的自动,注意不包含父类的字段
        Field field2 = clazz.getDeclaredField("desc");
        System.out.println("field2:" + field2);
    }

    /**
     * 输出结果:
     * field:public int reflect.Person.age
     * f:public java.lang.String reflect.Student.desc
     * f:public int reflect.Person.age
     * f:public java.lang.String reflect.Person.name
     * <p>
     * ================getDeclaredFields====================
     * f2:public java.lang.String reflect.Student.desc
     * f2:private int reflect.Student.score
     * field2:public java.lang.String reflect.Student.desc
     */


    static class Person {
        public int age;
        public String name;

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }
    }

    static class Student extends Person {
        public String desc;
        private int score;

        public String getDesc() {
            return desc;
        }

        public void setDesc(String desc) {
            this.desc = desc;
        }

        public int getScore() {
            return score;
        }

        public void setScore(int score) {
            this.score = score;
        }
    }
}

```

上述方法需要注意的是，如果我们不期望获取其父类的字段，则需使用Class类的getDeclaredField/getDeclaredFields方法来获取字段即可，倘若需要连带获取到父类的字段，那么请使用Class类的getField/getFields，但是也只能获取到public修饰的的字段，无法获取父类的私有字段。下面将通过Field类本身的方法对指定类属性赋值，代码演示如下：

```java
public class ReflectionDemo3 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchFieldException, Exception {
//        run1();
        run2();
    }

    private static void run2() throws Exception {
        //获取Class对象引用
        Class<?> clazz = Student.class;

        Student st = (Student) clazz.newInstance();
        //获取父类public字段并赋值
        Field ageField = clazz.getField("age");
        ageField.set(st, 18);
        Field nameField = clazz.getField("name");
        nameField.set(st, "Lily");

        //只获取当前类的字段,不获取父类的字段
        Field descField = clazz.getDeclaredField("desc");
        descField.set(st, "I am student");
        Field scoreField = clazz.getDeclaredField("score");
        //设置可访问，score是private的
        scoreField.setAccessible(true);
        scoreField.set(st, 88);
        System.out.println(st.toString());

        //输出结果：Student{age=18, name='Lily ,desc='I am student', score=88}

        //获取字段值
        System.out.println(scoreField.get(st));
        // 88
    }

    private static void run1() throws NoSuchFieldException {
        Class<?> clazz = Student.class;
        //获取指定字段名称的Field类,注意字段修饰符必须为public而且存在该字段,
        // 否则抛NoSuchFieldException
        Field field = clazz.getField("age");
        System.out.println("field:" + field);

        //获取所有修饰符为public的字段,包含父类字段,注意修饰符为public才会获取
        Field fields[] = clazz.getFields();
        for (Field f : fields) {
            System.out.println("f:" + f.getDeclaringClass());
        }

        System.out.println("================getDeclaredFields====================");
        //获取当前类所字段(包含private字段),注意不包含父类的字段
        Field fields2[] = clazz.getDeclaredFields();
        for (Field f : fields2) {
            System.out.println("f2:" + f.getDeclaringClass());
        }
        //获取指定字段名称的Field类,可以是任意修饰符的自动,注意不包含父类的字段
        Field field2 = clazz.getDeclaredField("desc");
        System.out.println("field2:" + field2);
    }

    /**
     * 输出结果:
     * field:public int reflect.Person.age
     * f:public java.lang.String reflect.Student.desc
     * f:public int reflect.Person.age
     * f:public java.lang.String reflect.Person.name
     * <p>
     * ================getDeclaredFields====================
     * f2:public java.lang.String reflect.Student.desc
     * f2:private int reflect.Student.score
     * field2:public java.lang.String reflect.Student.desc
     */


    static class Person {
        public int age;
        public String name;

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }
    }

    static class Student extends Person {
        public String desc;
        private int score;

        public String getDesc() {
            return desc;
        }

        public void setDesc(String desc) {
            this.desc = desc;
        }

        public int getScore() {
            return score;
        }

        public void setScore(int score) {
            this.score = score;
        }
    }
}
```

### Method类及其用法

> Method 提供关于类或接口上单独某个方法（以及如何访问该方法）的信息，所反映的方法可能是类方法或实例方法（包括抽象方法）。


下面是Class类获取Method对象相关的方法：


| 方法返回值 | 方法名称 | 方法说明 |
| --- | --- | --- |
| Method | getDeclaredMethod(String name, Class<?>... parameterTypes) | 返回一个指定参数的Method对象，该对象反映此 Class 对象所表示的类或接口的指定已声明方法。 |
| Method[] | getDeclaredMethods() | 返回 Method 对象的一个数组，这些对象反映此 Class 对象表示的类或接口声明的所有方法，包括公共、保护、默认（包）访问和私有方法，但不包括继承的方法。 |
| Method | getMethod(String name, Class<?>... parameterTypes) | 返回一个 Method 对象，它反映此 Class 对象所表示的类或接口的指定公共成员方法。 |
| Method[] | getMethods() | 返回一个包含某些 Method 对象的数组，这些对象反映此 Class 对象所表示的类或接口（包括那些由该类或接口声明的以及从超类和超接口继承的那些的类或接口）的公共 member 方法。 |


同样通过案例演示上述方法

```java
public class ReflectionDemo4 {

    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException {

        Class clazz = Circle.class;

        //根据参数获取public的Method,包含继承自父类的方法
        Method method = clazz.getMethod("draw", int.class, String.class);

        System.out.println("method:" + method);

        //获取所有public的方法:
        Method[] methods = clazz.getMethods();
        for (Method m : methods) {
            System.out.println("m::" + m);
        }

        System.out.println("=========================================");

        //获取当前类的方法包含private,该方法无法获取继承自父类的method
        Method method1 = clazz.getDeclaredMethod("drawCircle");
        System.out.println("method1::" + method1);
        //获取当前类的所有方法包含private,该方法无法获取继承自父类的method
        Method[] methods1 = clazz.getDeclaredMethods();
        for (Method m : methods1) {
            System.out.println("m1::" + m);
        }
    }
}

class Shape {
    public void draw() {
        System.out.println("draw");
    }

    public void draw(int count, String name) {
        System.out.println("draw " + name + ",count=" + count);
    }

}

class Circle extends Shape {

    private void drawCircle() {
        System.out.println("drawCircle");
    }

    public int getAllCount() {
        return 100;
    }

}
```


输出结果:

```console
method:public void com.my_reflection.basic_usage.Shape.draw(int,java.lang.String)
m::public int com.my_reflection.basic_usage.Circle.getAllCount()
m::public void com.my_reflection.basic_usage.Shape.draw()
m::public void com.my_reflection.basic_usage.Shape.draw(int,java.lang.String)
m::public final void java.lang.Object.wait() throws java.lang.InterruptedException
m::public final void java.lang.Object.wait(long,int) throws java.lang.InterruptedException
m::public final native void java.lang.Object.wait(long) throws java.lang.InterruptedException
m::public boolean java.lang.Object.equals(java.lang.Object)
m::public java.lang.String java.lang.Object.toString()
m::public native int java.lang.Object.hashCode()
m::public final native java.lang.Class java.lang.Object.getClass()
m::public final native void java.lang.Object.notify()
m::public final native void java.lang.Object.notifyAll()
=========================================
method1::private void com.my_reflection.basic_usage.Circle.drawCircle()
m1::public int com.my_reflection.basic_usage.Circle.getAllCount()
m1::private void com.my_reflection.basic_usage.Circle.drawCircle()
```

方法api

| 方法返回值 | 方法名称 | 方法说明 |
| --- | --- | --- |
| Object | invoke(Object obj, Object... args) | 对带有指定参数的指定对象调用由此 Method 对象表示的底层方法。 |
| Class<?> | getReturnType() | 返回一个 Class 对象，该对象描述了此 Method 对象所表示的方法的正式返回类型,即方法的返回类型 |
| Type | getGenericReturnType() | 返回表示由此 Method 对象所表示方法的正式返回类型的 Type 对象，也是方法的返回类型。 |
| Class<?>[] | getParameterTypes() | 按照声明顺序返回 Class 对象的数组，这些对象描述了此 Method 对象所表示的方法的形参类型。即返回方法的参数类型组成的数组 |
| Type[] | getGenericParameterTypes() | 按照声明顺序返回 Type 对象的数组，这些对象描述了此 Method 对象所表示的方法的形参类型的，也是返回方法的参数类型 |
| String | getName() | 以 String 形式返回此 Method 对象表示的方法名称，即返回方法的名称 |
| boolean | isVarArgs() | 判断方法是否带可变参数，如果将此方法声明为带有可变数量的参数，则返回 true；否则，返回 false。 |
| String | toGenericString() | 返回描述此 Method 的字符串，包括类型参数。 |


getReturnType方法/getGenericReturnType方法都是获取Method对象表示的方法的返回类型，只不过前者返回的Class类型后者返回的Type(前面已分析过)，Type就是一个接口而已，在Java8中新增一个默认的方法实现，返回的就参数类型信息


而getParameterTypes/getGenericParameterTypes也是同样的道理，都是获取Method对象所表示的方法的参数类型，其他方法与前面的Field和Constructor是类似的。



[img1]:../.././imgs/java/other/java-basic-reflection-3.png
[img1_]:../../../imgs/java/other/java-basic-reflection-3.png

[img2]:../.././imgs/java/other/java_jvm_classload_2.png
[img2_]:../../../imgs/java/other/java_jvm_classload_2.png