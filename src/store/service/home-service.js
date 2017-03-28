import http from '../axios';

/**
 * 得到代售彩票清单
 * @param {} body 
 * 
 */
export const lotterylist = () => {
    return http.get(`/lottery/lotterylist`);
}

/**
 * 用户下单
 * @param {} body 
 * 
 */
export const aorder = (body = {}) => {
    return http.post(`/order/aorder`, body);
}

/**
 * 获取走势图数据
 * @param {*} body 
 */
export const noticetrend = (body = {}) => {
    return http.post(`/notice/noticetrend`, body);
}

///lottery/lotterylist