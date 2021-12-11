<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!--<router-link to="/home">home</router-link>-->
    <router-view/>
    <MainTabBar></MainTabBar>
  </div>
</template>

<script>
  import MainTabBar from '@/components/MainTabBar'

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
