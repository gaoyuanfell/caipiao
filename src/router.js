import Vuer from 'vue-router';
import {
    Indicator
} from 'mint-ui';


// const betbox = resolve => require(['./page/index/betbox.vue'], resolve)
// const betboxList = resolve => require(['./page/index/betboxList.vue'], resolve)
// const betSuccess = resolve => require(['./page/index/betSuccess.vue'], resolve)
// const info = resolve => require(['./page/info/info.vue'], resolve)
// const doubleball = resolve => require(['./page/info/doubleball.vue'], resolve)
// const history = resolve => require(['./page/info/history.vue'], resolve)

// const login = resolve => require(['./page/user/login.vue'], resolve)
// const register1 = resolve => require(['./page/user/register-1.vue'], resolve)
// const register2 = resolve => require(['./page/user/register-2.vue'], resolve)
// const register3 = resolve => require(['./page/user/register-3.vue'], resolve)
// const register4 = resolve => require(['./page/user/register-4.vue'], resolve)
// const register5 = resolve => require(['./page/user/register-5.vue'], resolve)

// const user = resolve => require(['./page/user/user.vue'], resolve)
// const userInfo = resolve => require(['./page/user/user-info.vue'], resolve)
// const manage = resolve => require(['./page/user/manage.vue'], resolve)
// const bindcard = resolve => require(['./page/user/bindcard.vue'], resolve)
// const addcard = resolve => require(['./page/user/addcard.vue'], resolve)
// const record = resolve => require(['./page/user/record.vue'], resolve)
// const recordDetail = resolve => require(['./page/user/record-detail.vue'], resolve)
// const account = resolve => require(['./page/user/account.vue'], resolve)
// const nameauth = resolve => require(['./page/user/nameauth.vue'], resolve)
// const changePass = resolve => require(['./page/user/changePass.vue'], resolve)
// const money = resolve => require(['./page/user/money.vue'], resolve)
// const moneySuccess = resolve => require(['./page/user/moneySuccess.vue'], resolve)
// const pay = resolve => require(['./page/user/pay.vue'], resolve)
// const paySuccess = resolve => require(['./page/user/paySuccess.vue'], resolve)

import index from './page/index/index.vue'
import betbox from './page/index/betbox.vue'
import betboxList from './page/index/betboxList.vue'
import betSuccess from './page/index/betSuccess.vue'
import info from './page/info/info.vue'
import doubleball from './page/info/doubleball.vue'
import history from './page/info/history.vue'

import user from './page/user/user.vue'
import userInfo from './page/user/user-info.vue'
import manage from './page/user/manage.vue'
import bindcard from './page/user/bindcard.vue'
import addcard from './page/user/addcard.vue'
import record from './page/user/record.vue'
import recordDetail from './page/user/record-detail.vue'
import account from './page/user/account.vue'
import nameauth from './page/user/nameauth.vue'
import changePass from './page/user/changePass.vue'
import money from './page/user/money.vue'
import moneySuccess from './page/user/moneySuccess.vue'
import pay from './page/user/pay.vue'
import paySuccess from './page/user/paySuccess.vue'

import login from './page/user/login.vue'
import register1 from './page/user/register-1.vue'
import register2 from './page/user/register-2.vue'
import register3 from './page/user/register-3.vue'
import register4 from './page/user/register-4.vue'
import register5 from './page/user/register-5.vue'

// 相机
import camera from './page/user/camera.vue'

import accountDetail from './page/user/account-detail.vue'

let routes = [{
    path: '*',
    components: {
        node: index
    }
}];

let tabs = [{
        name: 'index',
        path: '/index',
        components: {
            node: index
        }
    },
    {
        name: 'info',
        path: '/info',
        components: {
            node: info
        }
    },
    {
        name: 'user',
        path: '/user',
        components: {
            node: user
        }
    }
]


let index_c = {
    name: 'betboxList',
    path: '/betboxList',
    component: betboxList,
    children: [{
        name: 'betbox',
        path: 'betbox',
        component: betbox,
        children: [{
            name: 'betSuccess',
            path: 'betSuccess',
            component: betSuccess
        }]
    }]
}

let info_c = {
    name: 'doubleball',
    path: '/doubleball',
    component: doubleball,
    children: [{
        name: 'history',
        path: 'history',
        component: history
    }]
}

let user_c = [{
    name: 'manage',
    path: '/manage',
    component: manage,
    children: [{
        name: 'userInfo',
        path: 'userInfo',
        component: userInfo,
        children: [{
            name: 'camera',
            path: 'camera',
            component: camera,
        }]
    }]
}, {
    name: 'pay',
    path: '/pay',
    component: pay,
    children: [{
        name: 'paySuccess',
        path: 'paySuccess',
        component: paySuccess
    }]
}, {
    name: 'money',
    path: '/money',
    component: money,
    children: [{
        name: 'moneySuccess',
        path: 'moneySuccess',
        component: moneySuccess
    }]
}, {
    name: 'record',
    path: '/record',
    component: record,
    children: [{
        name: 'recordDetail',
        path: 'recordDetail',
        component: recordDetail,
    }]
}, {
    name: 'account',
    path: '/account',
    component: account
}, {
    name: 'nameauth',
    path: '/nameauth',
    component: nameauth
}, {
    name: 'bindcard',
    path: '/bindcard',
    component: bindcard,
    children: [{
        name: 'addcard',
        path: 'addcard',
        component: addcard,
    }]
}, {
    name: 'changePass',
    path: '/changePass',
    component: changePass
}]

let login_ = {
    name: 'login',
    path: '/login',
    component: login,
    children: [{
            name: 'register1',
            path: 'register1',
            component: register1,
        },
        {
            name: 'register2',
            path: 'register2',
            component: register2,
        },
        {
            name: 'register3',
            path: 'register3',
            component: register3,
        },
        {
            name: 'register4',
            path: 'register4',
            component: register4,
        },
        {
            name: 'register5',
            path: 'register5',
            component: register5,
        }
    ]
}

routes.unshift(...[...tabs, ...user_c, info_c, index_c, login_]);

const router = new Vuer({
    routes: routes
})

//登录拦截
let zIndex = 100;
router.beforeEach((to, from, next) => {
    to.params.zIndex = ++zIndex;
    // Indicator.close();//路由改变需要把遮罩层去掉
    next();
})

export default router;
