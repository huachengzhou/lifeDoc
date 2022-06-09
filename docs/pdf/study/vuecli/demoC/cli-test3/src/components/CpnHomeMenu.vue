<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/">主页</el-menu-item>
      <el-menu-item index="/element/table">表格</el-menu-item>
      <el-submenu index="2">
        <template slot="title">主要样式</template>
        <el-menu-item index="/element/form">Form 表单</el-menu-item>
        <el-menu-item index="/element/tag">Tag 标签</el-menu-item>
        <el-menu-item index="/element/progress">Progress 进度条</el-menu-item>
        <el-menu-item index="/element/tree">Tree 树形控件</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">日期组件</template>
          <el-menu-item index="/element/date/TimePicker">TimePicker 时间选择器</el-menu-item>
          <el-menu-item index="/element/date/DatePicker">DatePicker 日期选择器</el-menu-item>
          <el-menu-item index="/element/date/DateTimePicker">DateTimePicker 日期时间选择器</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="/element/message">Message 消息提示</el-menu-item>
      <el-menu-item index="/element/card"><a href="#">Card 卡片</a></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "v-data-menu",
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>

</style>
