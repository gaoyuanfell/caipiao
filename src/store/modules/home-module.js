import Vue from 'vue';
import { lotterylist, aorder, noticetrend } from '../service/home-service';
import { arrayslice } from '../../util';

const state = {
    doubleBall: {
        0: [],//红球 或 胆红
        1: [],//篮球
        2: [],//拖红
        type: 2,//1 自动获取注数 2 手动获取注数
        ballType: 1,//下注方式 1普通下注 2复试下注 3胆拖下注
    },
    doubleBallList: [],
    lotterylist: null,
    lotteryType: 1,
}

const getters = {
    //获取单个注数
    doubleBallBet: state => {
        let r = state.doubleBall[0].length;
        let b = state.doubleBall[1].length;
        let r_t = state.doubleBall[2].length;
        let ballType = state.doubleBall.ballType;
        switch (+ballType) {
            case 1:
                if (r >= 6 && b >= 1) {
                    return getBet(b, r);
                }
                break;
            case 3:
                return tdb_betting(r,r_t,b);
        }
        return 0;
    },
    //获取总注数
    doubleBallListBet: state => {
        let box = state.doubleBallList;
        if (box.length > 0) {
            let sum = 0;
            for (let i = 0; i < box.length; i++) {
                let r = box[i][0].length;
                let b = box[i][1].length;
                sum += getBet(b, r);
            }
            return sum
        }
        return 0
    },
}

const actions = {
    async lotterylist_( {commit, state} ){
        let data = await lotterylist();
        if(data){
            state.lotterylist = arrayslice(data,4);
        }else{
            throw 'not data';
        }
    },
    async aorder_( {commit, state}, body){
        let data = await aorder(body);
        return data;
    },
    async noticetrend_( {commit, state}, body ){
        let data = await noticetrend(body);
        return data;
    }
}

const mutations = {
    //设置投注详情页的球的情况
    setDoubleBall(state, ball) {
        state.doubleBall = ball || {
            0: [],
            1: [],
            2: [],
            type: 2,
            ballType: 1,
        }
    },
    //设置下注类型
    setDoubleBallType(state, type){
        state.doubleBall.ballType = type || 1;
    },
    //增加注数
    addDoubleBallList(state, ball) {
        state.doubleBallList.unshift(ball)
    },
    //修改某项数据
    updateDoubleBallList(state, data) {
        let l = data.$index;
        let ball = data.ball;
        state.doubleBallList.splice(l, 1, ball);
    },
    //移除某项数据
    removeDoubleBallList(state, index){
        state.doubleBallList.splice(index, 1);
    },
    //销毁投注列表
    distroyDoubleBallList(state) {
        state.doubleBallList = [];
        state.doubleBall = {
            0: [],
            1: [],
            2: [],
            type: 2,
            ballType: 1,
        }
    },
    //设置彩票类型
    setLotteryType(state,type){
        state.lotteryType = type;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

/**
 * 获取随机双色球号
 */
function getNotes(ele, count, state) {
    let Num = document.querySelector('#index_number_box');
    let box = Num.querySelectorAll(`.${ele}`);
    let arrBall = [];
    let i = 0;
    let timer = 10;
    let isRed = ele == 'red';
    for (let i = 1; i < count; i++) {
        arrBall.push(i);
    }
    arrBall.sort(function () {
        return (Math.random() < 0.5 ? 1 : -1)
    });

    function setNum() {
        for (let j = 0; j < box.length; j++) {
            box[j].innerHTML = arrBall[Math.floor(Math.random() * (count - 1))]
        }
        i++;
        if (i > count + 16) {
            arrBall.sort(function () {
                return (Math.random() < 0.5 ? 1 : -1)
            });
            for (let j = 0; j < box.length; j++) {
                let num = arrBall[j];
                if (isRed) {
                    state.notes[0].push(num)
                } else {
                    state.notes[1].push(num)
                }
                box[j].innerHTML = num;
            }
            isRed && (state.notes[0] = state.notes[0].sort((a, b) => {
                return a - b
            }));
            return;
        }
        setTimeout(setNum, timer);
    }
    setNum();
}

/**
 * 计算注数 b：篮球数 r：红球数
 */
function getBet(b, r) {
    function factorial(n, m) {
        return (n < m) ? 1 : n * factorial(n - 1, m);
    }
    let sum = factorial(r, r - 5) || 0;
    let c = factorial(6, 1) || 1;
    return sum / c * b
}
/**
 * 胆拖注数计算
 * @param {*} hd 
 * @param {*} ht 
 * @param {*} ldt 
 */
function tdb_betting(hd = 0, ht = 0, ldt = 0) {
    //求M的阶乘
    function jiecheng(m) { //求阶乘
        if (m == 1 || m == 0) return 1;
        else return m * (jiecheng(m - 1)); //递归算:法n!=n*(n-1)!
    }
    if(hd > 5 || ldt < 1 || ht < 2 || (hd + ht) < 7 || isNaN(hd + ht + ldt)){
        return 0
    }
    var r = 6 - hd;
    var n = ht;
    return (jiecheng(n) / (jiecheng(r) * jiecheng(n - r))) * ldt;
}
