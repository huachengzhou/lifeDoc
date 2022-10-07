<template>
    <div class="welcome-wrap">
        <img src="http://i1.buimg.com/1949/43ab520761604482.jpg" alt="">
    </div>
</template>
<script>
    export default{
        data(){
            return{
                name:'welcome'
            }
        }
    }
</script>
<style lang="scss" scoped>
    .welcome-wrap{
        height: 100%;
        width: 100%;
        img{
            display: block;
            width: 100%;
            height: 100%;
        }
        .hd{
            font-size: 30px;
            text-align: center;
        }
        .bd{

        }
    }
</style>
<style lang="scss">
    .welcome-steps{
        .el-step__line-inner{
            height: 100% !important;
        }
    }
</style>
