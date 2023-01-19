---
title : 'vue > index'
date : '2021-02-15'
draft : false
tags : ["vue"]
categories : ["web","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---



### vue学习


#  [**vue学习**](/resume/blog/example/vue/index.html)

#  [**vue学习2**](D:/IdeaProjects/studyDoc/resume/blog/example/vue/index.html)



+ vue 官网 https://cn.vuejs.org/

+ vue 是什么?

```
Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。
另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。
```



+ v-text 文本指令

```

<span v-text="msg"></span>
<!-- 和下面的一样 -->
<span>{{msg}}</span>

var vm = new Vue({
    el: "#frmApp",
    data: {
        nameTo: Math.random().toString(36).slice(-8) ,
    }
});

//获取绑定的实例  再次更新
vm.$data.nameTo = Math.random().toString(36).slice(-8);

```

+ v-html 网页指令

```
内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译 。如果试图使用 v-html 组合模板，可以重新考虑是否通过使用组件来替代。
<div v-html="html"></div>
<p v-html="htmlContent">
                    </p>
```

+ v-model 这个指令用于在表单上创建双向数据绑定。
> v-model会忽略所有表单元素的value、checked、selected特性的初始值。因为它选择Vue实例数据做为具体的值。

```
<div id="app">
    <input v-model="somebody">
    <p>hello {{somebody}}</p>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            somebody:'小明'
        }
    })
</script>

这个例子中直接在浏览器input中输入别的名字，下面的p的内容会直接跟着变。这就是双向数据绑定。
v-model修饰符
<1>  .lazy
默认情况下，v-model同步输入框的值和数据。可以通过这个修饰符，转变为在change事件再同步。
<input v-model.lazy="msg">

<2>  .number
自动将用户的输入值转化为数值类型
<input v-model.number="msg">

<3>  .trim
自动过滤用户输入的首尾空格
<input v-model.trim="msg">
```

+ v-bind html中特性或者属性绑定

```

```

















































