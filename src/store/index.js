import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home-module'
import user from './modules/user-module'

import mutations from './mutations';

Vue.use(Vuex)

function fetchStore(key) {
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
    }
    return {};
}

export default new Vuex.Store({
    state: {
        user: fetchStore('userInfo'), //用户详细信息
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
