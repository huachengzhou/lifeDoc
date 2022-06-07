---
title: "uniapp基础知识 "
date: 2021-06-17
draft: false
weight: 5
---


#### uni-app的基本使用

课程介绍：

基础部分：

+ 环境搭建
+ 页面外观配置
+ 数据绑定
+ uni-app的生命周期
+ 组件的使用
+ uni-app中样式学习
+ 在uni-app中使用字体图标和开启scss
+ 条件注释跨端兼容
+ uni中的事件
+ 导航跳转
+ 组件创建和通讯，及组件的生命周期
+ uni-app中使用uni-ui库

项目：xxxx

##### uni-app介绍 [官方网页](https://uniapp.dcloud.io/resource)
##### uni-app view [uni-app view](https://hellouniapp.dcloud.net.cn/pages/component/view/view)

`uni-app` 是一个使用 [Vue.js](https://vuejs.org/) 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、H5、以及各种小程序（微信/支付宝/百度/头条/QQ/钉钉）等多个平台。

即使不跨端，`uni-app`同时也是更好的小程序开发框架。

具有vue和微信小程序的开发经验，可快速上手uni-app

为什么要去学习uni-app？

相对开发者来说，减少了学习成本，因为只学会uni-app之后，即可开发出iOS、Android、H5、以及各种小程序的应用，不需要再去学习开发其他应用的框架，相对公司而言，也大大减少了开发成本。

##### 环境搭建

安装编辑器HbuilderX  [下载地址](https://www.dcloud.io/hbuilderx.html)

HBuilderX是通用的前端开发工具，但为`uni-app`做了特别强化。

下载App开发版，可开箱即用

安装微信开发者工具 [下载地址](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

##### 利用HbuilderX初始化项目

+ 点击HbuilderX菜单栏文件>项目>新建

+ 选择uni-app,填写项目名称，项目创建的目录

![create][base1]


##### 运行项目

在菜单栏中点击运行，运行到浏览器，选择浏览器即可运行

在微信开发者工具里运行：进入hello-uniapp项目，点击工具栏的运行 -> 运行到小程序模拟器 -> 微信开发者工具，即可在微信开发者工具里面体验uni-app

在微信开发者工具里运行：进入hello-uniapp项目，点击工具栏的运行 -> 运行到手机或模拟器 -> 选择调式的手机

**注意：**

+ 如果是第一次使用，需要先配置小程序ide的相关路径，才能运行成功
+ 微信开发者工具在设置中安全设置，服务端口开启


##### 介绍项目目录和文件作用

`pages.json` 文件用来对 uni-app 进行全局配置，决定页面文件的路径、窗口样式、原生的导航栏、底部的原生tabbar 等

`manifest.json` 文件是应用的配置文件，用于指定应用的名称、图标、权限等。

`App.vue`是我们的跟组件，所有页面都是在`App.vue`下进行切换的，是页面入口文件，可以调用应用的生命周期函数。

`main.js`是我们的项目入口文件，主要作用是初始化`vue`实例并使用需要的插件。

`uni.scss`文件的用途是为了方便整体控制应用的风格。比如按钮颜色、边框风格，`uni.scss`文件里预置了一批scss变量预置。

```unpackage``` 就是打包目录，在这里有各个平台的打包文件

```pages``` 所有的页面存放目录

```static``` 静态资源目录，例如图片等

```components``` 组件存放目录

为了实现多端兼容，综合考虑编译速度、运行性能等因素，`uni-app` 约定了如下开发规范：

- 页面文件遵循 [Vue 单文件组件 (SFC) 规范](https://vue-loader.vuejs.org/zh/spec.html)
- 组件标签靠近小程序规范，详见[uni-app 组件规范](https://uniapp.dcloud.io/component/README)
- 接口能力（JS API）靠近微信小程序规范，但需将前缀 `wx` 替换为 `uni`，详见[uni-app接口规范](https://uniapp.dcloud.io/api/README)
- 数据绑定及事件处理同 `Vue.js` 规范，同时补充了App及页面的生命周期
- 为兼容多端运行，建议使用flex布局进行开发

#### 全局配置和页面配置

##### 通过globalStyle进行全局配置

用于设置应用的状态栏、导航条、标题、窗口背景色等。[详细文档](https://uniapp.dcloud.io/collocation/pages?id=globalstyle)

| 属性                           | 类型       | 默认值     | 描述                                       |
| ---------------------------- | -------- | ------- | ---------------------------------------- |
| navigationBarBackgroundColor | HexColor | #F7F7F7 | 导航栏背景颜色（同状态栏背景色）                         |
| navigationBarTextStyle       | String   | white   | 导航栏标题颜色及状态栏前景颜色，仅支持 black/white          |
| navigationBarTitleText       | String   |         | 导航栏标题文字内容                                |
| backgroundColor              | HexColor | #ffffff | 窗口的背景色                                   |
| backgroundTextStyle          | String   | dark    | 下拉 loading 的样式，仅支持 dark / light          |
| enablePullDownRefresh        | Boolean  | false   | 是否开启下拉刷新，详见[页面生命周期](https://uniapp.dcloud.io/use?id=%e9%a1%b5%e9%9d%a2%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f)。 |
| onReachBottomDistance        | Number   | 50      | 页面上拉触底事件触发时距页面底部距离，单位只支持px，详见[页面生命周期](https://uniapp.dcloud.io/use?id=%e9%a1%b5%e9%9d%a2%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f) |

##### 创建新的message页面

右键pages新建message目录，在message目录下右键新建.vue文件,并选择基本模板

```html
<template>
	<view>
		这是信息页面
	</view>
</template>

<script>
</script>

<style>
</style>
```

##### 通过pages来配置页面

| 属性    | 类型     | 默认值  | 描述                                       |
| ----- | ------ | ---- | ---------------------------------------- |
| path  | String |      | 配置页面路径                                   |
| style | Object |      | 配置页面窗口表现，配置项参考 [pageStyle](https://uniapp.dcloud.io/collocation/pages?id=style) |

pages数组数组中第一项表示应用启动页

```html
"pages": [ 、
		{
			"path":"pages/message/message"
		},
		{
			"path": "pages/index/index",
			"style": {
				"navigationBarTitleText": "uni-app"
			}
		}
	]
```

通过style修改页面的标题和导航栏背景色，并且设置h5下拉刷新的特有样式

```js
"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path":"pages/message/message",
			"style": {
				"navigationBarBackgroundColor": "#007AFF",
				"navigationBarTextStyle": "white",
				"enablePullDownRefresh": true,
				"disableScroll": true,
				"h5": {
					"pullToRefresh": {
						"color": "#007AFF"
					}
				}
			}
		}
	]
```
##### 配置tabbar

如果应用是一个多 tab 应用，可以通过 tabBar 配置项指定 tab 栏的表现，以及 tab 切换时显示的对应页。

**Tips**

- 当设置 position 为 top 时，将不会显示 icon
- tabBar 中的 list 是一个数组，只能配置最少2个、最多5个 tab，tab 按数组的顺序排序。

**属性说明：**

| 属性              | 类型       | 必填   | 默认值    | 描述                                 | 平台差异说明             |
| --------------- | -------- | ---- | ------ | ---------------------------------- | ------------------ |
| color           | HexColor | 是    |        | tab 上的文字默认颜色                       |                    |
| selectedColor   | HexColor | 是    |        | tab 上的文字选中时的颜色                     |                    |
| backgroundColor | HexColor | 是    |        | tab 的背景色                           |                    |
| borderStyle     | String   | 否    | black  | tabbar 上边框的颜色，仅支持 black/white      | App 2.3.4+ 支持其他颜色值 |
| list            | Array    | 是    |        | tab 的列表，详见 list 属性说明，最少2个、最多5个 tab |                    |
| position        | String   | 否    | bottom | 可选值 bottom、top                     | top 值仅微信小程序支持      |

其中 list 接收一个数组，数组中的每个项都是一个对象，其属性值如下：

| 属性               | 类型     | 必填   | 说明                                       |
| ---------------- | ------ | ---- | ---------------------------------------- |
| pagePath         | String | 是    | 页面路径，必须在 pages 中先定义                      |
| text             | String | 是    | tab 上按钮文字，在 5+APP 和 H5 平台为非必填。例如中间可放一个没有文字的+号图标 |
| iconPath         | String | 否    | 图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，当 postion 为 top 时，此参数无效，不支持网络图片，不支持字体图标 |
| selectedIconPath | String | 否    | 选中时的图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px ，当 postion 为 top 时，此参数无效 |

案例代码：

```js
"tabBar": {
		"list": [
			{
				"text": "首页",
				"pagePath":"pages/index/index",
				"iconPath":"static/tabs/home.png",
				"selectedIconPath":"static/tabs/home-active.png"
			},
			{
				"text": "信息",
				"pagePath":"pages/message/message",
				"iconPath":"static/tabs/message.png",
				"selectedIconPath":"static/tabs/message-active.png"
			},
			{
				"text": "我们",
				"pagePath":"pages/contact/contact",
				"iconPath":"static/tabs/contact.png",
				"selectedIconPath":"static/tabs/contact-active.png"
			}
		]
	}
```

##### condition启动模式配置

启动模式配置，仅开发期间生效，用于模拟直达页面的场景，如：小程序转发后，用户点击所打开的页面。

**属性说明：**

| 属性      | 类型     | 是否必填 | 描述                 |
| ------- | ------ | ---- | ------------------ |
| current | Number | 是    | 当前激活的模式，list节点的索引值 |
| list    | Array  | 是    | 启动模式列表             |

**list说明：**

| 属性    | 类型     | 是否必填 | 描述                                       |
| ----- | ------ | ---- | ---------------------------------------- |
| name  | String | 是    | 启动模式名称                                   |
| path  | String | 是    | 启动页面路径                                   |
| query | String | 否    | 启动参数，可在页面的 [onLoad](https://uniapp.dcloud.io/use?id=%e9%a1%b5%e9%9d%a2%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f) 函数里获得 |

#### 组件的基本使用

uni-app提供了丰富的基础组件给开发者，开发者可以像搭积木一样，组合各种组件拼接称自己的应用

uni-app中的组件，就像 `HTML` 中的 `div` 、`p`、`span` 等标签的作用一样，用于搭建页面的基础结构

##### text文本组件的用法

###### 001 - text 组件的属性

|     属性     |   类型    |  默认值  |  必填  |                说明                |
| :--------: | :-----: | :---: | :--: | :------------------------------: |
| selectable | boolean | false |  否   |              文本是否可选              |
|   space    | string  |   .   |  否   | 显示连续空格，可选参数：`ensp`、`emsp`、`nbsp` |
|   decode   | boolean | false |  否   |               是否解码               |

- `text` 组件相当于行内标签、在同一行显示
- 除了文本节点以外的其他节点都无法长按选中

###### 002 - 代码案例

```html
<view>
  <!-- 长按文本是否可选 -->
  <text selectable='true'>来了老弟</text>
</view>

<view>
  <!-- 显示连续空格的方式 -->
  <view>
    <text space='ensp'>来了  老弟</text>
  </view>
  <view>
    <text space='emsp'>来了  老弟</text>
  </view>
  <view>
    <text space='nbsp'>来了  老弟</text>
  </view>
</view>

<view>
  <text>skyblue</text>
</view>

<view>
  <!-- 是否解码 -->
  <text decode='true'>&nbsp; &lt; &gt; &amp; &apos; &ensp; &emsp;</text>
</view>
```

##### view视图容器组件的用法

> View 视图容器， 类似于 HTML 中的 div

###### 001 - 组件的属性

![][base2]

###### 002 - 代码案例

```html
<view class="box2" hover-class="box2_active">
  <view class='box1' hover-class='active' hover-stop-propagation :hover-start-time="2000" :hover-stay-time='2000'>

  </view>
</view>
```

##### button按钮组件的用法

###### 001 - 组件的属性

|   属性名    |   类型    |   默认值   |        说明         |
| :------: | :-----: | :-----: | :---------------: |
|   size   | String  | default |       按钮的大小       |
|   type   | String  | default |      按钮的样式类型      |
|  plain   | Boolean |  false  |   按钮是否镂空，背景色透明    |
| disabled | Boolean |  false  |       是否按钮        |
| loading  | Boolean |  false  | 名称是否带 loading t图标 |

- `button` 组件默认独占一行，设置 `size` 为 `mini` 时可以在一行显示多个

###### 002 - 案例代码

```html
<button size='mini' type='primary'>前端</button>

<button size='mini' type='default' disabled='true'>前端</button>

<button size='mini' type='warn' loading='true'>前端</button>
```

##### image组件的使用

###### [image](https://uniapp.dcloud.io/component/image?id=image)

图片。

| 属性名  | 类型     | 默认值           | 说明         | 平台差异说明 |
| ---- | ------ | ------------- | ---------- | ------ |
| src  | String |               | 图片资源地址     |        |
| mode | String | 'scaleToFill' | 图片裁剪、缩放的模式 |        |

**Tips**

- `<image>` 组件默认宽度 300px、高度 225px；
- `src` 仅支持相对路径、绝对路径，支持 base64 码；
- 页面结构复杂，css样式太多的情况，使用 image 可能导致样式生效较慢，出现 “闪一下” 的情况，此时设置 `image{will-change: transform}` ,可优化此问题。

#### uni-app中的样式

+ rpx 即响应式px，一种根据屏幕宽度自适应的动态单位。以750宽的屏幕为基准，750rpx恰好为屏幕宽度。屏幕变宽，rpx 实际显示效果会等比放大。

+ 使用`@import`语句可以导入外联样式表，`@import`后跟需要导入的外联样式表的相对路径，用`;`表示语句结束

+ 支持基本常用的选择器class、id、element等

+ 在 `uni-app` 中不能使用 `*` 选择器。

+ `page` 相当于 `body` 节点

+ 定义在 App.vue 中的样式为全局样式，作用于每一个页面。在 pages 目录下 的 vue 文件中定义的样式为局部样式，只作用在对应的页面，并会覆盖 App.vue 中相同的选择器。

+ `uni-app` 支持使用字体图标，使用方式与普通 `web` 项目相同，需要注意以下几点：

  - 字体文件小于 40kb，`uni-app` 会自动将其转化为 base64 格式；

  - 字体文件大于等于 40kb， 需开发者自己转换，否则使用将不生效；

  - 字体文件的引用路径推荐使用以 ~@ 开头的绝对路径。

    ```
     @font-face {
         font-family: test1-icon;
         src: url('~@/static/iconfont.ttf');
     }
    ```

+ 如何使用scss或者less

#### uni-app中的数据绑定

在页面中需要定义数据，和我们之前的vue一摸一样，直接在data中定义数据即可

```js
export default {
  data () {
    return {
      msg: 'hello-uni'
    }
  }
}
```

##### 插值表达式的使用

+ 利用插值表达式渲染基本数据

  ```html
  <view>{{msg}}</view>
  ```

+ 在插值表达式中使用三元运算

  ```html
  <view>{{ flag ? '我是真的':'我是假的' }}</view>
  ```

+ 基本运算

  ```html
  <view>{{1+1}}</view>
  ```


##### v-bind动态绑定属性

在data中定义了一张图片，我们希望把这张图片渲染到页面上

```js
export default {
  data () {
    return {
      img: 'http://destiny001.gitee.io/image/monkey_02.jpg'
    }
  }
}
```

利用v-bind进行渲染

```html
<image v-bind:src="img"></image>
```

还可以缩写成:

```html
<image :src="img"></image>
```

##### v-for的使用

data中定以一个数组，最终将数组渲染到页面上

```js
data () {
  return {
    arr: [
      { name: '刘能', age: 29 },
      { name: '赵四', age: 39 },
      { name: '宋小宝', age: 49 },
      { name: '小沈阳', age: 59 }
    ]
  }
}
```

利用v-for进行循环

```js
<view v-for="(item,i) in arr" :key="i">名字：{{item.name}}---年龄：{{item.age}}</view>
```

#### uni中的事件

##### 事件绑定

在uni中事件绑定和vue中是一样的，通过v-on进行事件的绑定，也可以简写为@

```html
<button @click="tapHandle">点我啊</button>
```

事件函数定义在methods中

```js
methods: {
  tapHandle () {
    console.log('真的点我了')
  }
}
```

##### 事件传参

- 默认如果没有传递参数，事件函数第一个形参为事件对象

  ```
  // template
  <button @click="tapHandle">点我啊</button>
  // script
  methods: {
    tapHandle (e) {
      console.log(e)
    }
  }
  ```

- 如果给事件函数传递参数了，则对应的事件函数形参接收的则是传递过来的数据

  ```
  // template
  <button @click="tapHandle(1)">点我啊</button>
  // script
  methods: {
    tapHandle (num) {
      console.log(num)
    }
  }
  ```

- 如果获取事件对象也想传递参数

  ```
  // template
  <button @click="tapHandle(1,$event)">点我啊</button>
  // script
  methods: {
    tapHandle (num,e) {
      console.log(num,e)
    }
  }
  ```

#### uni的生命周期

##### 应用的生命周期

生命周期的概念：一个对象从创建、运行、销毁的整个过程被成为生命周期。

生命周期函数：在生命周期中每个阶段会伴随着每一个函数的触发，这些函数被称为生命周期函数

`uni-app` 支持如下应用生命周期函数：

| 函数名      | 说明                           |
| -------- | ---------------------------- |
| onLaunch | 当`uni-app` 初始化完成时触发（全局只触发一次） |
| onShow   | 当 `uni-app` 启动，或从后台进入前台显示    |
| onHide   | 当 `uni-app` 从前台进入后台          |
| onError  | 当 `uni-app` 报错时触发            |

##### 页面的生命周期

`uni-app` 支持如下页面生命周期函数：

| 函数名      | 说明                                       | 平台差异说明 | 最低版本 |
| -------- | ---------------------------------------- | ------ | ---- |
| onLoad   | 监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参），参考[示例](https://uniapp.dcloud.io/api/router?id=navigateto) |        |      |
| onShow   | 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面    |        |      |
| onReady  | 监听页面初次渲染完成。                              |        |      |
| onHide   | 监听页面隐藏                                   |        |      |
| onUnload | 监听页面卸载                                   |        |      |

#### 下拉刷新

##### 开启下拉刷新

在uni-app中有两种方式开启下拉刷新

+ 需要在 `pages.json` 里，找到的当前页面的pages节点，并在 `style` 选项中开启 `enablePullDownRefresh`
+ 通过调用uni.startPullDownRefresh方法来开启下拉刷新


###### 通过配置文件开启

创建list页面进行演示

```html
<template>
	<view>
		杭州学科
		<view v-for="(item,index) in arr" :key="index">
			{{item}}
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				arr: ['前端','java','ui','大数据']
			}
		}
	}
</script>

<style>
</style>
```

通过pages.json文件中找到当前页面的pages节点，并在 `style` 选项中开启 `enablePullDownRefresh`

```js
{
  "path":"pages/list/list",
    "style":{
      "enablePullDownRefresh": true
    }
}
```

###### 通过API开启

[api文档](https://uniapp.dcloud.io/api/ui/pulldown)

```html
uni.startPullDownRefresh()
```

##### 监听下拉刷新

通过onPullDownRefresh可以监听到下拉刷新的动作

```js
export default {
  data () {
    return {
      arr: ['前端','java','ui','大数据']
    }
  },
  methods: {
    startPull () {
      uni.startPullDownRefresh()
    }
  },
  onPullDownRefresh () {
    console.log('触发下拉刷新了')
  }
}
```

##### 关闭下拉刷新

uni.stopPullDownRefresh()

停止当前页面下拉刷新。

案例演示

```html
<template>
	<view>
		<button type="primary" @click="startPull">开启下拉刷新</button>
		杭州学科
		<view v-for="(item,index) in arr" :key="index">
			{{item}}
		</view>
	</view>
</template>
<script>
	export default {
		data () {
			return {
				arr: ['前端','java','ui','大数据']
			}
		},
		methods: {
			startPull () {
				uni.startPullDownRefresh()
			}
		},
		
		onPullDownRefresh () {
			this.arr = []
			setTimeout(()=> {
				this.arr = ['前端','java','ui','大数据']
				uni.stopPullDownRefresh()
			}, 1000);
		}
	}
</script>
```

#### 上拉加载

通过在pages.json文件中找到当前页面的pages节点下style中配置onReachBottomDistance可以设置距离底部开启加载的距离，默认为50px

通过onReachBottom监听到触底的行为

```js
<template>
	<view>
		<button type="primary" @click="startPull">开启下拉刷新</button>
		杭州学科
		<view v-for="(item,index) in arr" :key="index">
			{{item}}
		</view>
	</view>
</template>
<script>
	export default {
		data () {
			return {
				arr: ['前端','java','ui','大数据','前端','java','ui','大数据']
			}
		},
		onReachBottom () {
			console.log('触底了')
		}
	}
</script>

<style>
	view{
		height: 100px;
		line-height: 100px;
	}
</style>
```

#### 网络请求

在uni中可以调用uni.request方法进行请求网络请求

需要注意的是：在小程序中网络相关的 API 在使用前需要配置域名白名单。

**发送get请求**

```js
<template>
	<view>
		<button @click="sendGet">发送请求</button>
	</view>
</template>
<script>
	export default {
		methods: {
			sendGet () {
				uni.request({
					url: 'http://localhost:8082/api/getlunbo',
					success(res) {
						console.log(res)
					}
				})
			}
		}
	}
</script>
```

**发送post请求**

#### 数据缓存

##### **uni.setStorage**

[官方文档](https://uniapp.dcloud.io/api/storage/storage?id=setstorage)

将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。

代码演示

```js
<template>
	<view>
		<button type="primary" @click="setStor">存储数据</button>
	</view>
</template>

<script>
	export default {
		methods: {
			setStor () {
				uni.setStorage({
				 	key: 'id',
				 	data: 100,
				 	success () {
				 		console.log('存储成功')
				 	}
				 })
			}
		}
	}
</script>

<style>
</style>
```

##### uni.setStorageSync

将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。

代码演示

```js
<template>
	<view>
		<button type="primary" @click="setStor">存储数据</button>
	</view>
</template>

<script>
	export default {
		methods: {
			setStor () {
				uni.setStorageSync('id',100)
			}
		}
	}
</script>

<style>
</style>
```

##### uni.getStorage

从本地缓存中异步获取指定 key 对应的内容。

代码演示

```html
<template>
	<view>
		<button type="primary" @click="getStorage">获取数据</button>
	</view>
</template>
<script>
	export default {
		data () {
			return {
				id: ''
			}
		},
		methods: {
			getStorage () {
				uni.getStorage({
					key: 'id',
					success:  res=>{
						this.id = res.data
					}
				})
			}
		}
	}
</script>
```

##### uni.getStorageSync

从本地缓存中同步获取指定 key 对应的内容。

代码演示

```html
<template>
	<view>
		<button type="primary" @click="getStorage">获取数据</button>
	</view>
</template>
<script>
	export default {
		methods: {
			getStorage () {
				const id = uni.getStorageSync('id')
				console.log(id)
			}
		}
	}
</script>
```

##### uni.removeStorage

从本地缓存中异步移除指定 key。

代码演示

```html
<template>
	<view>
		<button type="primary" @click="removeStorage">删除数据</button>
	</view>
</template>
<script>
	export default {
		methods: {
			removeStorage () {
				uni.removeStorage({
					key: 'id',
					success: function () {
						console.log('删除成功')
					}
				})
			}
		}
	}
</script>
```

##### uni.removeStorageSync

从本地缓存中同步移除指定 key。

代码演示

```html
<template>
	<view>
		<button type="primary" @click="removeStorage">删除数据</button>
	</view>
</template>
<script>
	export default {
		methods: {
			removeStorage () {
				uni.removeStorageSync('id')
			}
		}
	}
</script>
```

#### 上传图片、预览图片

##### 上传图片

uni.chooseImage方法从本地相册选择图片或使用相机拍照。

案例代码

```html
<template>
	<view>
		<button @click="chooseImg" type="primary">上传图片</button>
		<view>
			<image v-for="item in imgArr" :src="item" :key="index"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				imgArr: []
			}
		},
		methods: {
			chooseImg () {
				uni.chooseImage({
					count: 9,
					success: res=>{
						this.imgArr = res.tempFilePaths
					}
				})
			}
		}
	}
</script>
```

##### 预览图片

结构

```html
<view>
	<image v-for="item in imgArr" :src="item" @click="previewImg(item)" :key="item"></image>
</view>
```

预览图片的方法

```js
previewImg (current) {
  uni.previewImage({
    urls: this.imgArr,
    current
  })
}
```

#### 条件注释实现跨段兼容

条件编译是用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。

**写法：**以 #ifdef 加平台标识 开头，以 #endif 结尾。

平台标识

| 值          | 平台                             | 参考文档                                     |
| ---------- | ------------------------------ | ---------------------------------------- |
| APP-PLUS   | 5+App                          | [HTML5+ 规范](http://www.html5plus.org/doc/) |
| H5         | H5                             |                                          |
| MP-WEIXIN  | 微信小程序                          | [微信小程序](https://developers.weixin.qq.com/miniprogram/dev/api/) |
| MP-ALIPAY  | 支付宝小程序                         | [支付宝小程序](https://docs.alipay.com/mini/developer/getting-started) |
| MP-BAIDU   | 百度小程序                          | [百度小程序](https://smartprogram.baidu.com/docs/develop/tutorial/codedir/) |
| MP-TOUTIAO | 头条小程序                          | [头条小程序](https://developer.toutiao.com/dev/cn/mini-app/develop/framework/basic-reference/introduction) |
| MP-QQ      | QQ小程序                          | （目前仅cli版支持）                              |
| MP         | 微信小程序/支付宝小程序/百度小程序/头条小程序/QQ小程序 |                                          |

##### 组件的条件注释

代码演示

```html
<!-- #ifdef H5 -->
<view>
  h5页面会显示
</view>
<!-- #endif -->
<!-- #ifdef MP-WEIXIN -->
<view>
  微信小程序会显示
</view>
<!-- #endif -->
<!-- #ifdef APP-PLUS -->
<view>
  app会显示
</view>
<!-- #endif -->
```

##### api的条件注释

代码演示

```js
onLoad () {
  //#ifdef MP-WEIXIN
  console.log('微信小程序')
  //#endif
  //#ifdef H5
  console.log('h5页面')
  //#endif
}
```

样式的条件注释

代码演示

```css
/* #ifdef H5 */
view{
  height: 100px;
  line-height: 100px;
  background: red;
}
/* #endif */
/* #ifdef MP-WEIXIN */
view{
  height: 100px;
  line-height: 100px;
  background: green;
}
/* #endif */
```

#### uni中的导航跳转

##### 利用navigator进行跳转

navigator详细文档：[文档地址](https://uniapp.dcloud.io/component/navigator)

跳转到普通页面

```html
<navigator url="/pages/about/about" hover-class="navigator-hover">
  <button type="default">跳转到关于页面</button>
</navigator>
```

跳转到tabbar页面

```html
<navigator url="/pages/message/message" open-type="switchTab">
  <button type="default">跳转到message页面</button>
</navigator>
```

##### 利用编程式导航进行跳转

[导航跳转文档]( [uni.navigateTo](https://uniapp.dcloud.io/api/router?id=navigateto))

**利用navigateTo进行导航跳转**

保留当前页面，跳转到应用内的某个页面，使用`uni.navigateBack`可以返回到原页面。

```html
<button type="primary" @click="goAbout">跳转到关于页面</button>
```

通过navigateTo方法进行跳转到普通页面

```js
goAbout () {
  uni.navigateTo({
    url: '/pages/about/about',
  })
}
```

**通过switchTab跳转到tabbar页面**

跳转到tabbar页面

```html
<button type="primary" @click="goMessage">跳转到message页面</button>
```

通过switchTab方法进行跳转

```js
goMessage () {
  uni.switchTab({
    url: '/pages/message/message'
  })
}
```

**redirectTo进行跳转** 

关闭当前页面，跳转到应用内的某个页面。

```html
<!-- template -->
<button type="primary" @click="goMessage">跳转到message页面</button>
<!-- js -->
goMessage () {
  uni.switchTab({
    url: '/pages/message/message'
  })
}
```

通过onUnload测试当前组件确实卸载

```js
onUnload () {
  console.log('组件卸载了')
}
```

##### 导航跳转传递参数

在导航进行跳转到下一个页面的同时，可以给下一个页面传递相应的参数，接收参数的页面可以通过onLoad生命周期进行接收

传递参数的页面

```js
goAbout () {
  uni.navigateTo({
    url: '/pages/about/about?id=80',
  });
}
```

接收参数的页面

```js
<script>
	export default {
		onLoad (options) {
			console.log(options)
		}
	}
</script>
```

#### 

#### uni-app中组件的创建

在uni-app中，可以通过创建一个后缀名为vue的文件，即创建一个组件成功，其他组件可以将该组件通过impot的方式导入，在通过components进行注册即可

+ 创建login组件，在component中创建login目录，然后新建login.vue文件

  ```
  <template>
  	<view>
  		这是一个自定义组件
  	</view>
  </template>

  <script>
  </script>

  <style>
  </style>
  ```

+ 在其他组件中导入该组件并注册

  ```
  import login from "@/components/test/test.vue"
  ```

+ 注册组件

  ```js
  components: {test}
  ```

+ 使用组件

  ```
  <test></test>
  ```


##### 组件的生命周期函数

| beforeCreate  | 在实例初始化之后被调用。[详见](https://cn.vuejs.org/v2/api/#beforeCreate) |         |      |
| ------------- | ---------------------------------------- | ------- | ---- |
| created       | 在实例创建完成后被立即调用。[详见](https://cn.vuejs.org/v2/api/#created) |         |      |
| beforeMount   | 在挂载开始之前被调用。[详见](https://cn.vuejs.org/v2/api/#beforeMount) |         |      |
| mounted       | 挂载到实例上去之后调用。[详见](https://cn.vuejs.org/v2/api/#mounted) 注意：此处并不能确定子组件被全部挂载，如果需要子组件完全挂载之后在执行操作可以使用`$nextTick`[Vue官方文档](https://cn.vuejs.org/v2/api/#Vue-nextTick) |         |      |
| beforeUpdate  | 数据更新时调用，发生在虚拟 DOM 打补丁之前。[详见](https://cn.vuejs.org/v2/api/#beforeUpdate) | 仅H5平台支持 |      |
| updated       | 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。[详见](https://cn.vuejs.org/v2/api/#updated) | 仅H5平台支持 |      |
| beforeDestroy | 实例销毁之前调用。在这一步，实例仍然完全可用。[详见](https://cn.vuejs.org/v2/api/#beforeDestroy) |         |      |
| destroyed     | Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。[详见](https://cn.vuejs.org/v2/api/#destroyed) |         |      |

#### 组件的通讯

##### 父组件给子组件传值

通过props来接受外界传递到组件内部的值

```
<template>
	<view>
		这是一个自定义组件 {{msg}}
	</view>
</template>

<script>
	export default {
		props: ['msg']
	}
</script>

<style>
</style>
```

其他组件在使用login组件的时候传递值

```
<template>
	<view>
		<test :msg="msg"></test>
	</view>
</template>

<script>
	import test from "@/components/test/test.vue"
	export default {
		data () {
			return {
				msg: 'hello'
			}
		},
		
		components: {test}
	}
</script>
```

##### 子组件给父组件传值

通过$emit触发事件进行传递参数

```html
<template>
	<view>
		这是一个自定义组件 {{msg}}
		<button type="primary" @click="sendMsg">给父组件传值</button>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				status: '打篮球'
			}
		},
		props: {
			msg: {
				type: String,
				value: ''
			}
		},
		methods: {
			sendMsg () {
				this.$emit('myEvent',this.status)
			}
		}
	}
</script>
```

父组件定义自定义事件并接收参数

```html
<template>
	<view>
		<test :msg="msg" @myEvent="getMsg"></test>
	</view>
</template>
<script>
	import test from "@/components/test/test.vue"
	export default {
		data () {
			return {
				msg: 'hello'
			}
		},
		methods: {
			getMsg (res) {
				console.log(res)
			}
		},
		
		components: {test}
	}
</script>
```

##### 兄弟组件通讯

#### uni-ui的使用

[uni-ui文档](https://uniapp.dcloud.io/component/README?id=uniui)

1、进入Grid宫格组件

2、使用HBuilderX导入该组件

3、导入该组件

```html
import uniGrid from "@/components/uni-grid/uni-grid.vue"
import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
```

4、注册组件

```html
components: {uniGrid,uniGridItem}
```

5、使用组件

```html
<uni-grid :column="3">
  <uni-grid-item>
    <text class="text">文本</text>
  </uni-grid-item>
  <uni-grid-item>
    <text class="text">文本</text>
  </uni-grid-item>
  <uni-grid-item>
    <text class="text">文本</text>
  </uni-grid-item>
</uni-grid>
```
[base2]:data:image/png;base64,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
[base1]:data:image/jpeg;base64,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TpmIAACJuOhYJCg7ZSICACTiomORoOyUiQgAkIiLjkWCslMmIgBAIi46FgnKTpmIAACJuOhYJCg7ZSICACTiomORoOyUiQgAkIiLjkWCslMmIgBAIi46FgnKToWJqCiKoiiKoqTCcUhQAACAzZCgAAAAmyFBAQAANkOCAgAAbIYEBQAA2AwJCgAAsBkSFAAAYDMkKAAAwGZIUAAAgM2QoAAAAJshQQEAADZDggIAAGyGBAUAANgMCQoAALAZEhQAAGAzJCgAAMBmSFAAAIDNkKAAAACbIUEBAAA2Q4ICAABshgQFAADYDAnKTn3th19XFEVRFEVR+sJxSFB2ykQEAEjERcciQdkpExEAIBEXHYsEZadMRACARFx0LBKUnTIRAQAScdGxSFB2ykQEAEjERcciQdkpExEAIBEXHYsEZadMRACARFx0LBKUnTIRAQAScdGxSFB2ykQEAEjERcciQdkpExEAIBEXHYsEZadMRACARFx0LBKUnTIRAQAScdGxSFB2ykQEAEjERcciQdkpExEAIBEXHYsEZadMRACARFx0LBKUnTIRAQAScdGxSFB2ykQEAEjERcciQdkpExEAIBEXHYsEZadMRACARFx0LBKUnTIRgUVffv/0enef+NrHP+oXtH3w8eVtCl98t7v/fPf0Qf8SYAvERcciQdkpExFYEhOPj751MUl52ATlR6e38/PHfbvXP/zW6b0v06KJfpu3v0gvY/2WtgfoiIuORYKyUyYiMOfp029194ghieiThI++f3p6fj0G/HmCkvYLCcFYQqKQkoSFcj527sen9z7q1uXJzzlBmdunUyUoQUq2ZrYH6IT7BschQdkpExFoagT452QhBvnzCUquTHIy8fjZ8vC6lTzE7apPPvq6vf5RSoTKOvZa9e+/rtbcHqAjLjoWCcpOmYjAxJAAPP1xvyCXkpS3v1iRoGTJRetTldlyPk7j05PgnHz062cToGky4lMUYEm4b3AcEpSdMhGB3JBItJOT3IUEpf+0YvY4MYG48AnK3CceefIx9yP+mQQlLa8+kQHoiYuORYKyUyYikIsJysffTb83aZb8NylzCcrMJx+5NQlKvc2gSj6GpKpIRqptRqHereUA4qKjkaDslIkITM0E8UXCsJCgDJ9qZCUcK25TLS9KlaDExGP2dyl5/fLfxvRmE5S07eVPiIAXUbhvcBwS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

