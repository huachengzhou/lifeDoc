<template>

  <div>
    <div>
      <router-view></router-view>
    </div>

    <div>
      <MainTabBar></MainTabBar>
    </div>

  </div>



</template>

<script>
  import MainTabBar from '@/components/MainTabBar'

  export default {
    name: "Home",
    components: {
      MainTabBar
    }
  }
</script>

<style scoped>
  /* style中引用使用@import */
  @import url('./../../assets/css/base.css');
  /*@import url('../assets/css/base.css');*/
</style>
