<template>
    <div class="page-contianer">
        <h2>这是其他界面</h2>
        <p>xx的名字是: {{ userInfo.name }}</p>
        <p>xx的年龄是: {{ userInfo.age }}</p>
        <p>xx的身高是: {{ userInfo.height }}</p>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'Other',
        computed: {
            userInfo() {
                return this.$route.query
            }
        },
        mounted(){
            //载入后
            let user = this.$route.query;
            this.$store.commit('setUser',user) ;

            console.log(this.$store.state.user)
        }
    }
</script>

<style scoped>
</style>
