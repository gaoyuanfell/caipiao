import axios from 'axios';
import { baseUrl } from './config';
import proxyStorage from '../proxyStorage';
import router from '../router';

import { Indicator, Toast } from 'mint-ui';

axios.defaults.baseURL = baseUrl;

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.timeout = 25000;

let toast = null;
let Token = new proxyStorage('express-token-key');;

axios.interceptors.request.use(function (config) {
    Indicator.open({spinnerType:'fading-circle'});
    if(Token){
        config.headers['Token'] = Token.token;
        Token.expires = Date.now();
    }
    return config;
}, function (error) {
    Indicator.close();
    toast && (toast.close())
    toast = Toast('请稍后重试！')
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    Indicator.close();
    let token = response.data.token;
    if(response.status == 200 && token){
        Token.token = token;
        Token.expires = Date.now();
    }
    if(response.data.Code == 200){
        return response.data.Data;
    }
    //弹幕提示用户
    if(response.data.Code == 202){
        Toast(response.data.Msg);
    }
    if(response.data.Code == 203){//没有登录 转向登录页面
        window.localStorage.clear();
        router.push({name:'login'})
    }
    throw 'not Data';
}, function (error) {
    Indicator.close();
    toast && (toast.close())
    toast = Toast('请稍后重试！')
    return Promise.reject(error);
});

const http = axios

export default http
