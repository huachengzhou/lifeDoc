---
title : 'Guava-common'
date : '2021-02-15'
draft : false
tags : ["tool"]
categories : ["java","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---

    
#    Guava 基于java1.6的类库集合的扩展项目

```
    com.google.common.annotations：普通注解类型。 
　　com.google.common.base：基本工具类库和接口。 
　　com.google.common.cache：缓存工具包，非常简单易用且功能强大的JVM内缓存。 
　　com.google.common.collect：带泛型的集合接口扩展和实现，以及工具类，这里你会发现很多好玩的集合。 
　　com.google.common.eventbus：发布订阅风格的事件总线。 
　　com.google.common.hash： 哈希工具包。 
　　com.google.common.io：I/O工具包。 
　　com.google.common.math：原始算术类型和超大数的运算工具包。 
　　com.google.common.net：网络工具包。 
　　com.google.common.primitives：八种原始类型和无符号类型的静态工具包。 
　　com.google.common.reflect：反射工具包。 
　　com.google.common.util.concurrent：多线程工具包。
```

+ 常见Object方法
> hashCode
> compare/compareTo 实现一个比较器[Comparator]，或者直接实现Comparable接口有时也伤不起
  

```
public class ProjectInfo implements Serializable,Comparable<ProjectInfo> {
    private int id;
    private String name;

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public int compareTo(ProjectInfo o) {
        return ComparisonChain.start().compare(this.getName(),o.getName()).compare(this.getId(),o.getId()).result();
    }
    
     @Override
    public int hashCode() {
        return Objects.hashCode(getId(),getName());
    }
}
```

> 当一个对象中的字段可以为null时，实现Object.equals方法会很痛苦，因为不得不分别对它们进行null检查。
使用Objects.equal帮助你执行null敏感的equals判断，从而避免抛出NullPointerException

```
public void testA(){
    System.out.println(Objects.equal("a","a"));// -->true
    System.out.println(Objects.equal("a",""));// -->false
    System.out.println(Objects.equal("",""));// -->true
    System.out.println(Objects.equal("","w"));// -->false
    System.out.println(Objects.equal(null,null));// -->true
    System.out.println(Objects.equal(null,""));// -->false
}
```

> toString 好的toString方法在调试时是无价之宝，但是编写toString方法有时候却很痛苦。使用MoreObjects(低版本还是Objects)

```
System.out.println(MoreObjects.toStringHelper(this).add("x",2).
                add("y",Math.round(Math.random()*10)).toString());
        /*console : ObjectsDemo{x=2, y=9}*/
```

+ Preconditions

> 前置条件Preconditions提供静态方法来检查方法或构造函数，被调用是否给定适当的参数。它检查的先决条件。其方法失败抛出IllegalArgumentException


```
public class PreconditionsDemo {
    public static void main(String[] args) {
        try {
            sum(null,2);
        }catch (IllegalArgumentException e){
            System.out.println(e.getMessage());
        }
    }
    private static int sum(Integer a,Integer b){
        a = Preconditions.checkNotNull(a,"不能为null");
        b = Preconditions.checkNotNull(a,"不能为null");
        return a+b;
    }
    /**
     * 直接写检查表达式
     * @param input
     * @return
     */
    private static double sqrt(double input){
        Preconditions.checkArgument(input >= 0.0);
        return Math.sqrt(input);
    }
    /**
     * 数组索引检查
     * @param index
     * @return
     */
    private static int getValue(int index){
        int[] data = {Integer.parseInt(Math.round(Math.random())+""),Integer.parseInt(Math.round(Math.random())+"")} ;
        index = Preconditions.checkElementIndex(index,data.length,"");
        return data[index];
    }
    /**
     * 直接写检查表达式
     * @param num
     */
    private static void maxTwo(int num){
        Preconditions.checkState(num>2,"抛出异常");
    }
}

```

+ Joiner

> Joiner 提供了各种方法来处理字符串加入操作，对象等(Joiner的实例不可变的，因此是线程安全的)

```
public static void testA() {
         /*
         on:制定拼接符号，如：test1-test2-test3 中的 “-“ 符号
         skipNulls()：忽略NULL,返回一个新的Joiner实例
         useForNull(“Hello”)：NULL的地方都用字符串”Hello”来代替
        */
        Joiner joiner = Joiner.on(",");
        StringBuilder builder = new StringBuilder(1024);
//        joiner.skipNulls().appendTo(builder, "a", "b", "c", null, "d");
        joiner.useForNull("--HH--").appendTo(builder, "a", "b", "c", null, "d");
        System.out.println(builder.toString());

        Map<String, String> map = new HashMap<>();
        map.put("key1", "value1");
        map.put("key2", "value2");
        map.put("key3", "value3");
        System.out.println(Joiner.on(",").withKeyValueSeparator("=").join(map));
    }
    
    console
    a,b,c,--HH--,d
    key1=value1,key2=value2,key3=value3
```

+ Splitter 能够将一个字符串按照指定的分隔符拆分成可迭代遍历的字符串集合，Iterable

```
 public static void testA() {
    /*
         on():指定分隔符来分割字符串
         limit():当分割的子字符串达到了limit个时则停止分割
         fixedLength():根据长度来拆分字符串
         trimResults():去掉子串中的空格
         omitEmptyStrings():去掉空的子串
         withKeyValueSeparator():要分割的字符串中key和value间的分隔符,分割后的子串中key和value间的分隔符默认是=
        */
        Iterable it = null;
        it = Splitter.on(",").limit(3).trimResults().split("a ,b , c, d");
        System.out.println(Splitter.fixedLength(3).split("1 2 3"));//[1 2,  3]
        System.out.println(Splitter.on(" ").omitEmptyStrings().splitToList("1  2 3"));
        System.out.println(Splitter.on(",").omitEmptyStrings().split("1,,,,2,,,3"));//[1, 2, 3]
        System.out.println(Splitter.on(" ").trimResults().split("1 2 3")); //[1, 2, 3],默认的连接符是,
        System.out.println(Splitter.on(";").withKeyValueSeparator(":").split("a:1;b:2;c:3"));//{a=1, b=2, c=3}
    }
```

```
//连接器[Joiner]
    @Test
    public void testJoiner() {
        //创建连接器
        Joiner joiner = Joiner.on("; ").skipNulls();//skipNulls 跳过null

        String join = joiner.join("Harry", null, "Ron", "Hermione");
        System.out.println(join);

        //apache 下的连接器
        String join1 = StringUtils.join(Arrays.asList("Harry", "Ron", "Hermione"), ";");
        System.out.println(join1);

        //useForNull 当连接的字符串有null值那么使用yes代替
        String join2 = Joiner.on("=").useForNull("yes").join(Arrays.asList("Harry", null, "Ron", "Hermione"));
        System.out.println(join2);

        //把连接后的字符串放入StringBuilder里面
        StringBuilder builder = new StringBuilder();
        StringBuilder stringBuilder = Joiner.on("=").useForNull("yes2").appendTo(builder, "Harry", "Ron", null,"Hermione");

        System.out.println(builder.toString());
        System.out.println(stringBuilder.toString());
    }

    @Test
    public void testSplitter() {
        String text = "the ,quick, , brown         , fox,              jumps, over, the, lazy, little dog" ;
//        "dsdh".split() ;
        Iterable<String> split = Splitter.on(",").trimResults().omitEmptyStrings().limit(4).split(text);
        split.spliterator().forEachRemaining(s -> System.out.println(s));
    }
    
    omitEmptyStrings()	从结果中自动忽略空字符串
    trimResults()	移除结果字符串的前导空白和尾部空白
    trimResults(CharMatcher)	给定匹配器，移除结果字符串的前导匹配字符和尾部匹配字符
    limit(int)	限制拆分出的字符串数量
```

+ Collection 不可变集合

* 不可变对象有很多优点，包括

<ul>
<li>当对象被不可信的库调用时，不可变形式是安全的；</li>
<li>不可变对象被多个线程调用时，不存在竞态条件问题</li>
<li>不可变集合不需要考虑变化，因此可以节省时间和空间。所有不可变的集合都比它们的可变形式有更好的内存利用率（分析和测试细节）</li>
<li>不可变对象因为有固定不变，可以作为常量来安全使用。</li>
</ul>
+ 创建不可变集合方法：
<ul>
    <li>copyOf方法，如ImmutableSet.copyOf(set);</li>
    <li>of方法，如ImmutableSet.of(“a”, “b”, “c”)或 ImmutableMap.of(“a”, 1, “b”, 2);</li>
    <li>Builder工具</li>
</ul>

```
public class ImmutableDemo {
    public static void main(String[] args) {
        ImmutableSet<String> set=ImmutableSet.of("a","b","c","d");
        ImmutableSet<String> set1=ImmutableSet.copyOf(set);
        ImmutableSet<String> set2=ImmutableSet.<String>builder().addAll(set).add("e").build();
        System.out.println(set);
        ImmutableList<String> list=set.asList();
    }
}
```

+ Multiset Multiset可统计一个词在文档中出现了多少次

```
public class MultiSetDemo {
    public static void main(String[] args) {
        Multiset<String> set= LinkedHashMultiset.create();
        set.add("a");
        set.add("a");
        set.add("a");
        set.add("a");
        set.setCount("a",5); //添加或删除指定元素使其在集合中的数量是count
        System.out.println(set.count("a")); //给定元素在Multiset中的计数
        System.out.println(set);
        System.out.println(set.size()); //所有元素计数的总和,包括重复元素
        System.out.println(set.elementSet().size()); //所有元素计数的总和,不包括重复元素
        set.clear(); //清空集合
        System.out.println(set);

    }
}

```

+ Multimap可以很容易地把一个键映射到多个值。换句话说，Multimap是把键映射到任意多个值的一般方式。

```
public class MultiMapDemo {
    public static void main(String[] args) {
        Multimap<String, Integer> map = HashMultimap.create(); //Multimap是把键映射到任意多个值的一般方式
        map.put("a", 1); //key相同时不会覆盖原value
        map.put("a", 2);
        map.put("a", 3);
        System.out.println(map); //{a=[1, 2, 3]}
        System.out.println(map.get("a")); //返回的是集合
        System.out.println(map.size()); //返回所有”键-单个值映射”的个数,而非不同键的个数
        System.out.println(map.keySet().size()); //返回不同key的个数
        Map<String, Collection<Integer>> mapView = map.asMap();
    }
}
```

+ Table它有两个支持所有类型的键：”行”和”列”。

```
public class TableDemo {
    public static void main(String[] args) {
        //记录学生在某门课上的成绩
        Table<String,String,Integer> table= HashBasedTable.create();
        table.put("jack","java",100);
        table.put("jack","c",90);
        table.put("mike","java",93);
        table.put("mike","c",100);
        Set<Table.Cell<String,String,Integer>> cells=table.cellSet();
        for (Table.Cell<String,String,Integer> cell : cells) {
            System.out.println(cell.getRowKey()+" "+cell.getColumnKey()+" "+cell.getValue());
        }
        System.out.println(table.row("jack"));
        System.out.println(table);
        System.out.println(table.rowKeySet());
        System.out.println(table.columnKeySet());
        System.out.println(table.values());
    }
}
```

+ 集合操作：交集、差集、并集

```
public class CollectionsDemo {
    public static void main(String[] args) {
        Set<Integer> set1 = Sets.newHashSet(1, 2, 3, 4, 5);
        Set<Integer> set2 = Sets.newHashSet(3, 4, 5, 6);
        Sets.SetView<Integer> inter = Sets.intersection(set1, set2); //交集
        System.out.println(inter);
        Sets.SetView<Integer> diff = Sets.difference(set1, set2); //差集,在A中不在B中
        System.out.println(diff);
        Sets.SetView<Integer> union = Sets.union(set1, set2); //并集
        System.out.println(union);
    }
}

```



