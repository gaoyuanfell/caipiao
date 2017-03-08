import { getUserInfo, userorder, usermoney, usercost, lotteryNotice, noticedetail, noticehistory } from '../service/user-service';

const state = {
    userInfo:{},
    orderList:[],
    usermoney:{},
    usercostList:[],
    lotteryNotices:[],
    noticedetail:{},
    noticehistorys:[],
}

const getters = {
    
}

const actions = {
    //用户信息
    async userInfo_( {commit, state}, body ) {
        let data = await getUserInfo(body).catch( e => { console.info(e) } );
		commit('setUserInfo', data)
    },
    //投注信息
    async orderList_( {commit, state}, body ){
        let data = await userorder(body).catch( e => { console.info(e) } );
        if(data && data.length > 0){
            commit('pushOrderList', data)
        }else{
            throw 'not Data'
        }
    },
    //账户明细 金额
    async usermoney_( {commit, state}, body ){
        let data = await usermoney(body).catch( e => { console.info(e) } );
        commit('setUsermoney', data)
    },
    //账户明细 投注信息
    async usercost_( {commit, state}, body ){
        let data = await usercost(body).catch( e => { console.info(e) } );
        commit('setUsercostList', data)
    },
    //开奖公告
    async lotteryNotice_( {commit, state}, body ){
        try {
            let data = await lotteryNotice(body).catch( e => { console.info(e) } );
            console.info(data);
            if(data && data.length > 0){
                commit('setLotteryNotice', data)
            }else{
                throw 'not Data'
            }
        } catch (e) {
            console.info(e);
        }
    },
    //开奖公告 详情
    async noticedetail_( {commit, state}, body ){
        let data = await noticedetail(body).catch( e => { console.info(e) } );
        commit('setNoticedetail', data)
    },
    //开奖公告 历史记录
    async noticehistory_( { commit, state }, body ){
        let data = await noticehistory(body).catch( e => { console.info(e) } );
        commit('setNoticehistory', data)
    }
}

const mutations = {
    setUserInfo(state,data){
        state.userInfo = data
    },
    destroyOrderList(state){
        state.orderList = [];
    },
    pushOrderList(state,data){
        state.orderList.push(...data)
    },
    setUsermoney(state,data){
        state.usermoney = data
    },
    setUsercostList(state,data){
        state.usercostList = data;
    },
    setLotteryNotice(state,data){
        state.lotteryNotices.push(...data);
    },
    destroyLotteryNotice(state,data){
        state.lotteryNotices = [];
    },
    setNoticedetail(state,data){
        state.noticedetail = data
    },
    setNoticehistory(state,data){
        state.noticehistorys = data
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
