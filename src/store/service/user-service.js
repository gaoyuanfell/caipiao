import {
    baseUrl
} from '../config';
import http from '../axios';

/**
 * 获取用户信息
 * @param {} body {PN or UID}
 * 
 */
export const getUserInfo = (body = {}) => {
    return http.post(`/user/userinfo`, body)
}

/**
 * 登录
 * @param {} body 
 */
export const login = (body = {}) => {
    return http.post(`/user/userlogin`, body)
}

/**
 * 登出
 * @param {} body 
 */
export const loginout = () => {
    return http.get(`/user/userloginout`)
}

/**
 * 获取投注记录列表
 * @param {*} body 
 */
export const userorder = (body = {}) => {
    return http.post(`/user/userorder`, body)
}

/**
 * 获取用户账户信息，包括可用余额，冻结金额，账户余额，收支明细
 * @param {*} body 
 */
export const usermoney = (body = {}) => {
    return http.post(`/user/usermoney`, body);
}

/**
 * 获取用户收支明细
 * @param {*} body 
 */
export const usercost = (body = {}) => {
    return http.post(`/user/usercost`, body);
}

/**
 * 获取双色球，竞技彩，快频彩中奖公告列表
 * @param {*} body
 */
export const lotteryNotice = (body = {}) => {
    return http.post(`/notice/noticelist`, body);
}

/**
 * 获取公告详情，包括中奖号，奖金池，销量等
 * @param {*} body
 */
export const noticedetail = (body = {}) => {
    return http.post(`/notice/noticedetail`, body);
}

/**
 * 获取历史开奖记录
 * @param {*} body
 */
export const noticehistory = (body = {}) => {
    return http.post(`/notice/noticehistory`, body);
}
