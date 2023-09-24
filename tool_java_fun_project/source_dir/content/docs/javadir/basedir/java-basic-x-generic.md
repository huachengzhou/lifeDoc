---
title: "泛型机制详解"
date: 2022-10-05
draft: false
weight: 6
---


# 泛型机制详解

## 概述

> 泛型，即“参数化类型”。一提到参数，最熟悉的就是定义方法时有形参，然后调用此方法时传递实参。那么参数化类型怎么理解呢？顾名思义，就是将类型由原来的具体的类型参数化，类似于方法中的变量参数，此时类型也定义成参数形式（可以称之为类型形参），然后在使用/调用时传入具体的类型（类型实参）。
泛型的本质是为了参数化类型（在不创建新的类型的情况下，通过泛型指定的不同类型来控制形参具体限制的类型）。也就是说在泛型使用过程中，操作的数据类型被指定为一个参数，这种参数类型可以用在类、接口和方法中，分别被称为泛型类、泛型接口、泛型方法。


## 泛型得小心的地方

+ 例子1

```java
List arrayList = new ArrayList();
arrayList.add("aaaa");
arrayList.add(100);

for(int i = 0; i< arrayList.size();i++){
    String item = (String)arrayList.get(i);
    Log.d("泛型测试","item = " + item);
}
```


+ 例子2
> 第二个例子实际是第一个例子的升级版本质是例子1

```java
public class DemoGeneric2 {

    @Test
    public void test1(){
        Map map = new HashMap();
        map.put(UUID.randomUUID().toString(),UUID.randomUUID().toString()) ;
        printMap(map) ;
    }

    public void printMap(Map<String,Number> numberMap){
        numberMap.entrySet().forEach(stringNumberEntry -> {
            System.out.println(stringNumberEntry.getValue().doubleValue());
        });
    }

}
java.lang.ClassCastException: java.lang.String cannot be cast to java.lang.Number
        at com.my_genericity.basic_usage.DemoGeneric2.lambda$printMap$0(DemoGeneric2.java:24)
        at java.util.HashMap$EntrySet.forEach(HashMap.java:1046)
        at com.my_genericity.basic_usage.DemoGeneric2.printMap(DemoGeneric2.java:23)
        at com.my_genericity.basic_usage.DemoGeneric2.test1(DemoGeneric2.java:19)
        at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
        at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
        at java.lang.reflect.Method.invoke(Method.java:498)
        at org.junit.runners.model.FrameworkMethod$1.runReflectiveCall(FrameworkMethod.java:50)
        at org.junit.internal.runners.model.ReflectiveCallable.run(ReflectiveCallable.java:12)
        at org.junit.runners.model.FrameworkMethod.invokeExplosively(FrameworkMethod.java:47)
        at org.junit.internal.runners.statements.InvokeMethod.evaluate(InvokeMethod.java:17)
        at org.junit.runners.ParentRunner.runLeaf(ParentRunner.java:325)
        at org.junit.runners.BlockJUnit4ClassRunner.runChild(BlockJUnit4ClassRunner.java:78)
        at org.junit.runners.BlockJUnit4ClassRunner.runChild(BlockJUnit4ClassRunner.java:57)
        at org.junit.runners.ParentRunner$3.run(ParentRunner.java:290)
        at org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:71)
        at org.junit.runners.ParentRunner.runChildren(ParentRunner.java:288)
        at org.junit.runners.ParentRunner.access$000(ParentRunner.java:58)
        at org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:268)
        at org.junit.runners.ParentRunner.run(ParentRunner.java:363)
        at org.junit.runner.JUnitCore.run(JUnitCore.java:137)
        at com.intellij.junit4.JUnit4IdeaTestRunner.startRunnerWithArgs(JUnit4IdeaTestRunner.java:68)
        at com.intellij.rt.execution.junit.IdeaTestRunner$Repeater.startRunnerWithArgs(IdeaTestRunner.java:47)
        at com.intellij.rt.execution.junit.JUnitStarter.prepareStreamsAndStart(JUnitStarter.java:242)
        at com.intellij.rt.execution.junit.JUnitStarter.main(JUnitStarter.java:70)
```

## 泛型的基本使用

### 泛型类

+ 简单泛型

```java
public class Point<T> {// 此处可以随便写标识符号，T是type的简称
    private T var;// var的类型由T指定，即：由外部指定

    public T getVar() {// 返回值的类型由外部决定
        return var;
    }

    public void setVar(T var) {// 设置的类型也由外部决定
        this.var = var;
    }
}

public class GenericsDemo03 {

    public static void main(String[] args) {
        Point<String> p = new Point<String>() ;     // 里面的var类型为String类型
        p.setVar("it") ;                            // 设置字符串
        System.out.println(p.getVar().length()) ;   // 取得字符串的长度
    }
}

```


+ 多元泛型

```java
public class Notepad<K,V> {// 此处指定了两个泛型类型
    private K key;// 此变量的类型由外部决定
    private V value;// 此变量的类型由外部决定

    public K getKey() {
        return key;
    }

    public void setKey(K key) {
        this.key = key;
    }

    public V getValue() {
        return value;
    }

    public void setValue(V value) {
        this.value = value;
    }
}

public class GenericsDemo04 {

    public static void main(String[] args) {
        Notepad<String, Integer> notepad = null;        // 定义两个泛型类型的对象
        notepad = new Notepad<String, Integer>();       // 里面的key为String，value为Integer
        notepad.setKey("汤姆");        // 设置第一个内容
        notepad.setValue(20);            // 设置第二个内容
        System.out.print("姓名；" + notepad.getKey());      // 取得信息
        System.out.print("，年龄；" + notepad.getValue());       // 取得信息
    }
}
```


### 泛型接口

+ 简单的泛型接口

```java
public class GenericsDemo05 {

    interface Info<T> {// 在接口上定义泛型

        /**
         * 定义抽象方法，抽象方法的返回值就是泛型类型
         *
         * @return
         */
        public T getVar();
    }

    static class InfoImpl<T> implements Info<T> {// 定义泛型接口的子类
        private T var; // 定义属性

        /**
         * 定义抽象方法，抽象方法的返回值就是泛型类型
         *
         * @return
         */
        @Override
        public T getVar() {
            return var;
        }

        public InfoImpl(T var) {// 通过构造方法设置属性内容
            this.var = var;
        }
    }

    public static void main(String[] args) {
        Info<String> info = null;        // 声明接口对象
        info = new InfoImpl<String>("汤姆");  // 通过子类实例化对象
        System.out.println("内容：" + info.getVar());
    }

}
```


### 泛型方法

在java中,泛型类的定义非常简单，但是泛型方法就比较复杂了。

泛型类，是在实例化类的时候指明泛型的具体类型；泛型方法，是在调用方法的时候指明泛型的具体类型 。

```java
/**
 * 泛型方法的基本介绍
 * @param tClass 传入的泛型实参
 * @return T 返回值为T类型
 * 说明：
 *     1）public 与 返回值中间<T>非常重要，可以理解为声明此方法为泛型方法。
 *     2）只有声明了<T>的方法才是泛型方法，泛型类中的使用了泛型的成员方法并不是泛型方法。
 *     3）<T>表明该方法将使用泛型类型T，此时才可以在方法中使用泛型类型T。
 *     4）与泛型类的定义一样，此处T可以随便写为任意标识，常见的如T、E、K、V等形式的参数常用于表示泛型。
 */
public <T> T genericMethod(Class<T> tClass)throws InstantiationException ,
  IllegalAccessException{
        T instance = tClass.newInstance();
        return instance;
}
```


![][img1]
![][img1_]

![][img2]
![][img2_]




说明一下，定义泛型方法时，必须在返回值前边加一个<T>，来声明这是一个泛型方法，持有一个泛型T，然后才可以用泛型T作为方法的返回值。

Class<T>的作用就是指明泛型的具体类型，而Class<T>类型的变量c，可以用来创建泛型类的对象。

为什么要用变量c来创建对象呢？既然是泛型方法，就代表着我们不知道具体的类型是什么，也不知道构造方法如何，因此没有办法去new一个对象，
但可以利用变量c的newInstance方法去创建对象，也就是利用反射创建对象。

泛型方法要求的参数是Class<T>类型，而Class.forName()方法的返回值也是Class<T>，
因此可以用Class.forName()作为参数。其中，forName()方法中的参数是何种类型，返回的Class<T>就是何种类型。

在本例中，forName()方法中传入的是User类的完整路径，因此返回的是Class<User>类型的对象，因此调用泛型方法时，变量c的类型就是Class<User>，
因此泛型方法中的泛型T就被指明为User，因此变量obj的类型为User。

当然，泛型方法不是仅仅可以有一个参数Class<T>，可以根据需要添加其他参数。

为什么要使用泛型方法呢？因为泛型类要在实例化的时候就指明类型，如果想换一种类型，不得不重新new一次，可能不够灵活；而泛型方法可以在调用的时候指明类型，更加灵活。


## 泛型的上下限

```xml
<?> 无限制通配符
<? extends E> extends 关键字声明了类型的上界，表示参数化的类型可能是所指定的类型，或者是此类型的子类
<? super E> super 关键字声明了类型的下界，表示参数化的类型可能是指定的类型，或者是此类型的父类

// 使用原则《Effictive Java》
// 为了获得最大限度的灵活性，要在表示 生产者或者消费者 的输入参数上使用通配符，使用的规则就是：生产者有上限、消费者有下限
1. 如果参数化类型表示一个 T 的生产者，使用 < ? extends T>;
2. 如果它表示一个 T 的消费者，就使用 < ? super T>；
3. 如果既是生产又是消费，那使用通配符就没什么意义了，因为你需要的是精确的参数类型。
```


### 上限

```java
public class DemoGeneric1 {

    private static int add(int a, int b) {
        System.out.println(a + "+" + b + "=" + (a + b));
        return a + b;
    }

    private static float add(float a, float b) {
        System.out.println(a + "+" + b + "=" + (a + b));
        return a + b;
    }

    private static double add(double a, double b) {
        System.out.println(a + "+" + b + "=" + (a + b));
        return a + b;
    }

    public static <T extends Number> double addTwo(T a, T b) {
        System.out.println(a + "+" + b + "=" + (a.doubleValue() + b.doubleValue()));
        return a.doubleValue() + b.doubleValue();
    }

    public static void main(String[] args) {
        double v = DemoGeneric1.addTwo(2L, 5L);
        System.out.println(v);
    }


}
```

### 下限


```java
public class GenericsDemo06 {


    static class DateValue<T extends Object> {
        T t;

        public DateValue(T t) {
            this.t = t;
        }

        public T getT() {
            return t;
        }

        public void setT(T t) {
            this.t = t;
        }
    }

    public static void main(String[] args) {
        GenericsDemo06.fun(new DateValue(6));
        GenericsDemo06.fun(new DateValue(5L));
        GenericsDemo06.fun(new DateValue(3d));
        GenericsDemo06.fun(new DateValue(5.66f));
    }

    public static void fun(DateValue<? super Number> value) {
        System.out.println("value:" + value.getT());
    }

}

```


```java
public class GenericsDemo07 {

    static class AClass implements Comparable {
        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        private Integer id;
        private String title;

        public AClass(Integer id, String title) {
            this.id = id;
            this.title = title;
        }

        @Override
        public String toString() {
            return "AClass{" +
                    "id=" + id +
                    ", title='" + title + '\'' +
                    '}';
        }

        /**
         * Compares this object with the specified object for order.  Returns a
         * negative integer, zero, or a positive integer as this object is less
         * than, equal to, or greater than the specified object.
         *
         * <p>The implementor must ensure <tt>sgn(x.compareTo(y)) ==
         * -sgn(y.compareTo(x))</tt> for all <tt>x</tt> and <tt>y</tt>.  (This
         * implies that <tt>x.compareTo(y)</tt> must throw an exception iff
         * <tt>y.compareTo(x)</tt> throws an exception.)
         *
         * <p>The implementor must also ensure that the relation is transitive:
         * <tt>(x.compareTo(y)&gt;0 &amp;&amp; y.compareTo(z)&gt;0)</tt> implies
         * <tt>x.compareTo(z)&gt;0</tt>.
         *
         * <p>Finally, the implementor must ensure that <tt>x.compareTo(y)==0</tt>
         * implies that <tt>sgn(x.compareTo(z)) == sgn(y.compareTo(z))</tt>, for
         * all <tt>z</tt>.
         *
         * <p>It is strongly recommended, but <i>not</i> strictly required that
         * <tt>(x.compareTo(y)==0) == (x.equals(y))</tt>.  Generally speaking, any
         * class that implements the <tt>Comparable</tt> interface and violates
         * this condition should clearly indicate this fact.  The recommended
         * language is "Note: this class has a natural ordering that is
         * inconsistent with equals."
         *
         * <p>In the foregoing description, the notation
         * <tt>sgn(</tt><i>expression</i><tt>)</tt> designates the mathematical
         * <i>signum</i> function, which is defined to return one of <tt>-1</tt>,
         * <tt>0</tt>, or <tt>1</tt> according to whether the value of
         * <i>expression</i> is negative, zero or positive.
         *
         * @param o the object to be compared.
         * @return a negative integer, zero, or a positive integer as this object
         * is less than, equal to, or greater than the specified object.
         * @throws NullPointerException if the specified object is null
         * @throws ClassCastException   if the specified object's type prevents it
         *                              from being compared to this object.
         */
        @Override
        public int compareTo(Object o) {
            AClass aClass = (AClass) o;
            return this.id.compareTo(aClass.getId());
        }
    }

    static class DataValue<E> {
        public static <E extends Comparable<? super E>> E max(List<? extends E> e1) {
            if (e1 == null) {
                return null;
            }
            //迭代器返回的元素属于 E 的某个子类型
            Iterator<? extends E> iterator = e1.iterator();
            E result = iterator.next();
            while (iterator.hasNext()) {
                E next = iterator.next();
                if (next.compareTo(result) > 0) {
                    result = next;
                }
            }
            return result;
        }
    }

    public static void main(String[] args) {
        List<AClass> aClassList = new ArrayList<>(8) ;
        for (int i = 0; i < 8; i++) {
            AClass aClass = new AClass(i, UUID.randomUUID().toString());
            aClassList.add(aClass);
        }
        AClass max = DataValue.max(aClassList);
        System.out.println(max);
    }

}

```

述代码中的类型参数 E 的范围是<E extends Comparable<? super E>>，我们可以分步查看：

+ 要进行比较，所以 E 需要是可比较的类，因此需要 extends Comparable<…>（注意这里不要和继承的 extends 搞混了，不一样）

+ Comparable< ? super E> 要对 E 进行比较，即 E 的消费者，所以需要用 super

+ 而参数 List< ? extends E> 表示要操作的数据是 E 的子类的列表，指定上限，这样容器才够大



[img1]:../.././imgs/java/generic/java-basic-generic-4.png
[img1_]:../../../imgs/java/generic/java-basic-generic-4.png

[img2]:../.././imgs/java/generic/java-basic-generic-5.png
[img2_]:../../../imgs/java/generic/java-basic-generic-5.png