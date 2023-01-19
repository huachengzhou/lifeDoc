---
title : 'js > console.log用法'
date : '2021-02-15'
draft : false
tags : ["tool"]
categories : ["java","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---

# Console 对象方法

>> 常用 Console 调试命令

``` 
console.log('hello');
console.info('信息');
console.error('错误');
console.warn('警告');
```

## assert()
+ ssert方法接受两个参数，第一个参数是表达式，第二个参数是字符串。只有当第一个参数为false，才会输出第二个参数，否则不会有任何结果。
```
// 实例
console.assert(true === false, "判断条件不成立")
// Assertion failed: 判断条件不成立
```

## clear()
+ 清除当前控制台的所有输出，将光标回置到第一行。
``` 
console.clear()
```
## count()
+ 用于计数，输出它被调用了多少次。
``` 
(function() {
  for (var i = 0; i < 5; i++) { 
    console.count('count'); 
  }
})()
```

## error()
+ 输出信息时，在最前面加一个红色的叉，表示出错，同时会显示错误发生的堆栈。
``` 
console.error("Error: %s (%i)", "Server is not responding",500)
```

## group()
+ 用于将显示的信息分组，可以把信息进行折叠和展开。
``` 
console.group('第一层');
  console.group('第二层');

    console.log('error');
    console.error('error');
    console.warn('error');

  console.groupEnd(); 
console.groupEnd();
```

## info()
+ console.log 别名，输出信息
``` 
console.info("runoob")
```

## log()
+ 输出信息
``` 
console.log("runoob")
```

## table()
+ 将复合类型的数据转为表格显示。
``` 
var arr= [ 
         { num: "1"},
         { num: "2"}, 
         { num: "3" }
    ];
console.table(arr);

var obj= {
     a:{ num: "1"},
     b:{ num: "2"},
     c:{ num: "3" }
};
console.table(obj);
```

## time()
++ 计时开始
``` 
console.time('计时器1');
for (var i = 0; i < 100; i++) {
  for (var j = 0; j < 100; j++) {}
}
console.timeEnd('计时器1');
console.time('计时器2');
for (var i = 0; i < 1000; i++) {
  for (var j = 0; j < 1000; j++) {}
}
console.timeEnd('计时器2');
```

## timeEnd()
+ 计时结束
``` 
console.time('计时器1');
for (var i = 0; i < 100; i++) {
  for (var j = 0; j < 100; j++) {}
}
console.timeEnd('计时器1');
console.time('计时器2');
for (var i = 0; i < 1000; i++) {
  for (var j = 0; j < 1000; j++) {}
}
console.timeEnd('计时器2');
```

## warn()
+ 输出警告信息
``` 
console.warn("警告")
```

* 最常用的就是 console.log 了。
* console上述的集中度支持printf的占位符格式，支持的占位符有：字符（%s）、整数（%d或%i）、浮点数（%f）和对象（%o）:

``` 
    占位符	    作用
    %s	        字符串
    %d or %i	整数
    %f	        浮点数
    %o	        可展开的DOM
    %O	        列出DOM的属性
    %c	        根据提供的css样式格式化字符串
    实例:
console.log("%d年%d月%d日",2011,3,26);

```










