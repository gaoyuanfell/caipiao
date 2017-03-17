import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home-module'
import user from './modules/user-module'

import mutations from './mutations';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user:{},//用户详细信息
    },
    getters: {
        getUser: state => {
            return state.user;
        }
    },
    mutations,
    modules: {
        $home:home,
        $user:user,
    },
})
