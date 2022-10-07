<template>
  <div id="baseReport">
    <remote-css href="https://cdn.bootcss.com/twitter-bootstrap/4.2.1/css/bootstrap-grid.min.css"></remote-css>
    <remote-css href="https://cdn.bootcss.com/twitter-bootstrap/4.2.1/css/bootstrap-reboot.css"></remote-css>
    <remote-css href="https://cdn.bootcss.com/twitter-bootstrap/4.2.1/css/bootstrap.css"></remote-css>
    <remote-js src="https://cdn.bootcss.com/twitter-bootstrap/4.2.1/js/bootstrap.bundle.js"></remote-js>
    <remote-js src="https://cdn.bootcss.com/twitter-bootstrap/4.2.1/js/bootstrap.js"></remote-js>

    <div class="container">
      <div class="col-md-12">
        <h5>{{message}}</h5>
      </div>

      <div class="col-md-12">
        <div class="card-group" v-for="(item ,index) in dataList">
          <div class="card">
            {{index+1}} &nbsp;&nbsp;&nbsp;&nbsp; {{item.content}}
          </div>
        </div>
      </div>
    </div>


  </div>
</template>
<script>

  export default {
    components: {
      'remote-css': {
        render(createElement) {
          return createElement('link', {attrs: {rel: 'stylesheet', href: this.href}});
        },
        props: {
          href: {type: String, required: true},
        },
      },
      'remote-js': {
        render(createElement) {
          return createElement('script', {attrs: {type: 'text/javascript', src: this.src}});
        },
        props: {
          src: {type: String, required: true},
        },
      },
    },
    name: "baseReport",
    data() {
      return {
        message: "世界你好!",
        dataList: function () {
          let arr = [];
          const num = 3;
          let _this = this;
          for (let i = 0; i < num; i++) {
            let obj = {
              content: _this.getRandomChineseWord(5)
            };
            arr.push(obj);
          }
          return arr;
        }
      }
    },
    watch: {},
    computed: {},
    mounted() {

    },
    methods: {
      getRandomNumber() {
        let num = Math.random() * 10000 + Math.random() * 1000 + Math.round(Math.random()) * 100 + Math.round(Math.random()) * 10 + Math.round(Math.random());
        return num.toFixed(2);
      },
      getRandomIntegerNumber() {
        let count = 1000;
        let num = 0;
        for (let i = 0; i < count; i += 2) {
          num += Math.round(Math.random()) * i;
        }
        for (let i = 0; i < count; i += 3) {
          num += Math.floor(Math.random()) * i;
        }
        for (let i = 0; i < count; i += 5) {
          num += Math.floor(Math.random()) * i + Math.round(Math.random()) * i;
        }
        return num;
      },
      /**
       *  Number NameLength 要获取的名字长度
       * @param NameLength
       * @returns {string}
       */
      getRandomName(NameLength) {
        let name = "";
        for (let i = 0; i < NameLength; i++) {
          let unicodeNum = "";
          unicodeNum = randomAccess(0x4e00, 0x9fa5).toString(16);
          name += decodeUnicode(unicodeNum)
        }
        return name
      },
      getRandomChineseWord(NameLength) {
        if (!NameLength) {
          NameLength = 4;
        }
        return this.getRandomName(NameLength);
      }
    }
  };
</script>

<style scoped>
</style>
