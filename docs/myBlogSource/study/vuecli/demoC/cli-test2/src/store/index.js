import Vuex from 'vuex'
import cart from './modules/cart'
import products from './modules/products'
import Vue from 'vue'

Vue.use(Vuex)

const moduleA = {
    namespaced: true,  //便于维护需要设置namespaced为true，使其成为带有命名空间的模块
    state: () => ({
        priceTotal:10,
        priceIds:[]
    }),
    mutations: {
        setPriceId(state,id){
            state.priceIds.push(id) ;
        },
        setPriceTotal(state,priceTotal){
            state.priceTotal = priceTotal;
        }
    },
    actions: {

    },
    getters: {
        donePricesCount: (state, getters) => {
            return getters.priceIds.length
        }
    }
};

const moduleB = {
    state: () => ({

    }),
    mutations: {

    },
    actions: {

    }
};

let store = new Vuex.Store({
    state: {
        count: 0,
        count2: 0,
        user:{}
    },
    // vuex中公共数据在motations中设置
    mutations: {
        //设置状态
        increment (state) {
            state.count++
        },
        setCount(state,count2){
            state.count2 = count2;
        },
        //设置用户状态
        setUser(state,user){
            state.user = user;
        }
    },
    modules: {
        cart,
        products,
        a: moduleA,
        b: moduleB
    }
});


export default store
