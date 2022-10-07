<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>
            |
            <router-link to="/about">About</router-link>
            <button v-on:click="onArchives()" type="button">档案</button>
            <button v-on:click="onOther()" type="button">其他</button>
            <router-link to="/element">element ui 简单使用</router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {}
        },
        methods: {
            onArchives() {
                this.$router.push("/archives");
            },
            onOther() {
                let obj = {
                    path: "/other",
                    query: {name: "张三", age: 66, height: 1.88}
                };
                this.$router.push(obj);
            }
        }
    }
</script>

<style lang="less">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
