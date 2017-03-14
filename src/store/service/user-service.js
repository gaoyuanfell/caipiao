import http from '../axios';
import md5 from '../../md5';

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
    let PD = body.PD;
    body.PD = md5(PD);
    return http.post(`/user/lg`, body)
}

/**
 * 注册
 * @param {} body 
 */
export const register = (body = {}) => {
    let PWD = body.PWD;
    body.PWD = md5(PWD);
    return http.post(`/user/reg`, body)
}

/**
 * 修改密码
 * @param {} body 
 */
export const userpwd = (body = {}) => {
    let OPWD = body.OPWD;
    let PWD = body.PWD;
    body.OPWD = md5(OPWD);
    body.PWD = md5(PWD);
    return http.post(`/user/pwd`, body)
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

/**
 * 投注详情
 * @param {*} body
 */
export const userorderdetail = (body = {}) => {
    return http.post(`/user/userorderdetail`, body);
}
