


### bootstrap3整合
```
<%@include file="/css/cssBootStrap.jsp" %>
```

### bootstrap4整合
```
<%@include file="/css/bootstrap4.jsp" %>
```
### thymeleaf
```
<div th:include="css/cssBootStrap :: html"></div>
```

## 图标
```
# Alibaba国际站图标库
${pageContext.request.contextPath}/components/images/Alibaba国际站图标库/all.png
```

## Font Awesome
```
###url http://fontawesome.dashgame.com/
##引入方式
<link href="${pageContext.request.contextPath}/components/font-awesome-4.7.0/css/font-awesome.css" rel="stylesheet" type="text/css">
##基本写法
<li class="list-group-item"><i class="fa fa-camera-retro"></i></li>
##大图标
<i class="fa fa-camera-retro fa-lg"></i> fa-lg
<i class="fa fa-camera-retro fa-2x"></i> fa-2x
<i class="fa fa-camera-retro fa-3x"></i> fa-3x
<i class="fa fa-camera-retro fa-4x"></i> fa-4x
<i class="fa fa-camera-retro fa-5x"></i> fa-5x
##固定宽度 使用 fa-fw 可以将图标设置为一个固定宽度。主要用于不同宽度图标无法对齐的情况。 尤其在列表或导航时起到重要作用
<div class="list-group">
  <a class="list-group-item" href="#"><i class="fa fa-home fa-fw"></i>&nbsp; Home</a>
  <a class="list-group-item" href="#"><i class="fa fa-book fa-fw"></i>&nbsp; Library</a>
  <a class="list-group-item" href="#"><i class="fa fa-pencil fa-fw"></i>&nbsp; Applications</a>
  <a class="list-group-item" href="#"><i class="fa fa-cog fa-fw"></i>&nbsp; Settings</a>
</div>
## 用于列表 使用 fa-ul 和 fa-li 便可以简单的将无序列表的默认符号替换掉
<ul class="fa-ul">
  <li><i class="fa-li fa fa-check-square"></i>List icons</li>
  <li><i class="fa-li fa fa-check-square"></i>can be used</li>
  <li><i class="fa-li fa fa-spinner fa-spin"></i>as bullets</li>
  <li><i class="fa-li fa fa-square"></i>in lists</li>
</ul>
## 动画 使用 fa-spin 类来使任意图标旋转，现在您还可以使用 fa-pulse 来使其进行8方位旋转。尤其适合 fa-spinner、fa-refresh 和 fa-cog 。
<i class="fa fa-spinner fa-spin"></i>
<i class="fa fa-circle-o-notch fa-spin"></i>
<i class="fa fa-refresh fa-spin"></i>
<i class="fa fa-cog fa-spin"></i>
<i class="fa fa-spinner fa-pulse"></i>
## Bootstrap 3 示例
Font Awesome 完全兼容 Bootstrap 的所有组件。
<a class="btn btn-danger" href="#">
  <i class="fa fa-trash-o fa-lg"></i> Delete</a>
<a class="btn btn-default btn-sm" href="#">
  <i class="fa fa-cog"></i> Settings</a>

<a class="btn btn-lg btn-success" href="#">
  <i class="fa fa-flag fa-2x pull-left"></i> Font Awesome<br>Version 4.7.0</a>

<div class="btn-group">
  <a class="btn btn-default" href="#"><i class="fa fa-align-left"></i></a>
  <a class="btn btn-default" href="#"><i class="fa fa-align-center"></i></a>
  <a class="btn btn-default" href="#"><i class="fa fa-align-right"></i></a>
  <a class="btn btn-default" href="#"><i class="fa fa-align-justify"></i></a>
</div>

<div class="input-group margin-bottom-sm">
  <span class="input-group-addon"><i class="fa fa-envelope-o fa-fw"></i></span>
  <input class="form-control" type="text" placeholder="Email address">
</div>
<div class="input-group">
  <span class="input-group-addon"><i class="fa fa-key fa-fw"></i></span>
  <input class="form-control" type="password" placeholder="Password">
</div>

<div class="btn-group open">
  <a class="btn btn-primary" href="#"><i class="fa fa-user fa-fw"></i> User</a>
  <a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="#">
  <span class="fa fa-caret-down"></span></a>
  <ul class="dropdown-menu">
    <li><a href="#"><i class="fa fa-pencil fa-fw"></i> Edit</a></li>
    <li><a href="#"><i class="fa fa-trash-o fa-fw"></i> Delete</a></li>
    <li><a href="#"><i class="fa fa-ban fa-fw"></i> Ban</a></li>
    <li class="divider"></li>
    <li><a href="#"><i class="i"></i> Make admin</a></li>
  </ul>
</div>
```
