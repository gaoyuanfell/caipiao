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

///lottery/lotterylist