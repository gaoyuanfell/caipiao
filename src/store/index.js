import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home-module'
import user from './modules/user-module'

import mutations from './mutations';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        zIndex: 10000,//页面层级
        mask:{
            maskState:false,//弹出层状态
            maskContent:'请等待....',//弹出层问题提示
            maskLoding:true,
            time:2000,
        },
    },
    getters: {
        getZindex: state => {
            return ++state.zIndex
        }
    },
    mutations,
    modules: {
        $home:home,
        $user:user,
    },
})
