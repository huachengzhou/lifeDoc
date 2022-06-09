<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>

  export default {
    name: "Archives",
    mounted(){
      //载入后
      //载入后
      this.$store.commit('setCount',5) ;

      console.log(this.$store.state.count2) // -> 1

    }
  }
</script>
