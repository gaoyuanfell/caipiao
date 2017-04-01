import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home-module'
import user from './modules/user-module'

import mutations from './mutations';

import proxyStorage from '../proxyStorage';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: new proxyStorage('userInfo'), //用户详细信息 user改变 将改变本地存储的值
    },
    getters: {
        getUser: state => {
            return state.user;
        }
    },
    mutations,
    modules: {
        $home: home,
        $user: user,
    },
})
