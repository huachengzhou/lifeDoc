
---
title: " groovy对象比较以及空判断 "
date: 2021-04-15
draft: false
weight: 6
---

# groovy 对象比较以及空判断

> 目前测试得知 groovy的比较貌似很多直接可以使用==来比较



## groovy对象的比较



### 1.字符串比较

```
def str1 = "Hello World1"
if ("Hello World" == str1) {
    println "Hello World"
} else {
    println "不匹配"
}
```

### 2.map集合的比较（list集合也可以这样比较）

```
		def m1=["name":"李明","age":20]
        def m2=["name":"李明","age":21]
        def m3=["name":"李明","age":21]
        if(m1==m2){
            println "m1和m2匹配"
        }else{
            println "m1和m2不匹配"
        }

```



+ 特别是字符串的比较，是不是比java要简洁的多呢



+ 如果要比较两个对象的引用是否相同在groovy中可以使用is

```
def list1 = []
def list2 = [1,2,3,4]

boolean check = list1.is(list2) ;
println(check)
```





## if 判断对象是否为空



+ groovy中判断对象是否为空，直接if(对象){}即可，这种便捷真的很强

```
def list1 = []
def list2 = [1,2,3,4]
//直接写入 有点像C语言里面if可以直接把0,和非0作为boolean来比较
if (!list1){
    println("list1为null") ;
}
if (list2){
    println("list2不为null") ;
}
```



+ 特殊判断法

```
//def m5 = [name:"a"];
def m5 = [];
println "${m5?.name}" ;
//注意目前我用list失败了
println "${list1?.get(0)}" ; //报error 数组越界 因此这种写法只适合map
```




