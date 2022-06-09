<template>
  <div>


    <div class="line"></div>
    <common-title></common-title>
   <div>
     <cpn-home-menu></cpn-home-menu>
   </div>

    <el-calendar v-model="value">
    </el-calendar>
  </div>
</template>

<script>
  import CpnHomeMenu from '@/components/CpnHomeMenu.vue';

  export default {
    name: "Home",
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        value: new Date()
      };
    },
    components: {
      "cpn-home-menu":CpnHomeMenu
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      toRouter:function (path,query) {
        let obj = {
          path: path,
          query: query
        };
        this.$router.push(obj);
      }
    }
  }
</script>

<style scoped>

</style>
