<template>
  <div>
    <cpn-home-menu></cpn-home-menu>

    <el-row :gutter="10">
      <el-col :sm="12" :md="12">
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </div>
      </el-col>

      <el-col :sm="12" :md="12">
        <div>

        </div>
      </el-col>

      <el-col :sm="12" :md="12">
        <div>
          <el-row>
            <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
              <el-card :body-style="{ padding: '0px' }">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                     class="image">
                <div style="padding: 14px;">
                  <span>好吃的汉堡</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <el-button type="text" class="button">操作按钮</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>

  import CpnHomeMenu from '@/components/CpnHomeMenu.vue';

  export default {
    name: "Card",
    data() {
      return {
        currentDate: new Date()
      };
    },
    components: {
      "cpn-home-menu":CpnHomeMenu
    }
  }
</script>

<style scoped>

</style>
