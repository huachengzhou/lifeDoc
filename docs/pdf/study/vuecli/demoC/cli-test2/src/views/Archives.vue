<template>
    <div class="Archives">
        <h1>This is an Archives page</h1>
    </div>
</template>

<script>
    import { mapState } from 'vuex'  ;  //导入映射
    export default {
        name: "Archives",
        mounted(){
            //载入后
            //https://www.cnblogs.com/wzx-blog/p/15995287.html
            this.$store.commit('a/setPriceTotal',300) ;
            console.log(this.$store.state.a.priceTotal) ;
            console.log(mapState) ;
            //获取对象字面量形式
            console.log(mapState(['count','user'])) ;
        }
    }
</script>

<style scoped>

</style>