import { login, register, userpwd, getUserInfo, userorder, usermoney, usercost, lotteryNotice, noticedetail, noticehistory, userorderdetail } from '../service/user-service';

const state = {
    userReg:{},
    userInfo:{},
    orderList:[],
    usermoney:{},
    usercostList:[],
    lotteryNotices:[],
    noticedetail:{},
    noticehistorys:[],
    userorderdetail:{},
}

const getters = {
    
}

const actions = {
    //用户信息
    async userInfo_( {commit, state, rootState}, body ) {
        let data = await getUserInfo(body).catch( e => { console.info(e) } );
        state.userInfo = data;
        rootState.user = data;
		// commit('setUserInfo', data)
    },
    //登录
    login_( {commit, state}, body ){
        return login(body);
    },
    //注册
    register_( {commit, state}, body ){
        return register(body);
    },
    //修改密码
    userpwd_( {commit, state}, body ){
        return userpwd(body);
    },
    //投注信息
    async orderList_( {commit, state}, body ){
        let data = await userorder(body);
        if(data && data.length > 0){
            state.orderList.push(...data)
            // commit('pushOrderList', data)
        }else{
            throw 'not Data'
        }
    },
    //账户明细 金额
    async usermoney_( {commit, state}, body ){
        let data = await usermoney(body);
        state.usermoney = data
        // commit('setUsermoney', data)
    },
    //账户明细 投注信息
    async usercost_( {commit, state}, body ){
        let data = await usercost(body);
        state.usercostList = data;
        // commit('setUsercostList', data)
    },
    //开奖公告
    async lotteryNotice_( {commit, state}, body ){
        let data = await lotteryNotice(body);
        if(data && data.length > 0){
            state.lotteryNotices.push(...data);
            // commit('setLotteryNotice', data)
        }else{
            throw 'not Data'
        }
    },
    //开奖公告 详情
    async noticedetail_( {commit, state}, body ){
        let data = await noticedetail(body);
        state.noticedetail = data
        // commit('setNoticedetail', data)
    },
    //开奖公告 历史记录
    async noticehistory_( { commit, state }, body ){
        let data = await noticehistory(body);
        state.noticehistorys = data
        // commit('setNoticehistory', data)
    },
    //投注详情
    async userorderdetail_( { commit, state }, body ){
        let data = await userorderdetail(body);
        state.userorderdetail = data
    }
}

const mutations = {
    destroyOrderList(state){
        state.orderList = [];
    },
    destroyLotteryNotice(state,data){
        state.lotteryNotices = [];
    },
    setUserRegByKey(state,data){
        if(data){
            let key = data.key;
            let value = data.value;
            state.userReg[key] = value;
        }else{
            state.userReg = {};
        }
    },
    // setUserInfo(state,data){
    //     state.userInfo = data
    // },
    // pushOrderList(state,data){
    //     state.orderList.push(...data)
    // },
    // setUsermoney(state,data){
    //     state.usermoney = data
    // },
    // setUsercostList(state,data){
    //     state.usercostList = data;
    // },
    // setLotteryNotice(state,data){
    //     state.lotteryNotices.push(...data);
    // },
    
    // setNoticedetail(state,data){
    //     state.noticedetail = data
    // },
    // setNoticehistory(state,data){
    //     state.noticehistorys = data
    // }
}

export default {
    state,
    getters,
    actions,
    mutations
}
